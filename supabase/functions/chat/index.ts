import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { GoogleGenerativeAI } from "npm:@google/generative-ai@0.21.0";
import { createClient } from "npm:@supabase/supabase-js@2.39.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { message, history } = await req.json();

    if (!message) {
      return new Response(
        JSON.stringify({ error: "No message provided" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const apiKey = Deno.env.get("GEMINI_API_KEY");
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "API key not configured" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: `You are a knowledgeable and compassionate medical AI assistant specializing in Cleft Lip Syndrome and related conditions. Your role is to:

1. Provide accurate, evidence-based information about cleft lip and palate conditions
2. Explain medical concepts in simple, easy-to-understand language
3. Be empathetic and supportive, as parents and families dealing with these conditions may be anxious
4. Discuss causes, diagnosis, treatment options, and outcomes
5. Provide information about prenatal detection and postnatal care
6. Answer questions about surgery, speech therapy, and long-term outcomes
7. Always remind users that you are an AI assistant and encourage them to consult qualified healthcare providers for diagnosis and treatment decisions

Keep your responses clear, concise, and helpful. Focus on being informative while remaining sensitive to the emotional nature of these topics.`
    });

    const chatHistory = history?.map((msg: any) => ({
      role: msg.role === 'model' ? 'model' : 'user',
      parts: [{ text: msg.text }],
    })) || [];

    const chat = model.startChat({
      history: chatHistory,
    });

    const result = await chat.sendMessageStream(message);

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text();
            controller.enqueue(encoder.encode(text));
          }
          controller.close();
        } catch (error) {
          console.error('Stream error:', error);
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error) {
    console.error("Error in chat:", error);
    return new Response(
      JSON.stringify({ 
        error: "An error occurred during chat",
        details: error.message 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
