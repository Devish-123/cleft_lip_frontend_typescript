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
    const { image, mimeType } = await req.json();

    if (!image) {
      return new Response(
        JSON.stringify({ error: "No image provided" }),
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
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are a medical AI assistant specializing in prenatal ultrasound analysis for cleft lip detection. Analyze this ultrasound image carefully.

Your task:
1. Determine if there are signs of cleft lip in the ultrasound
2. Provide a confidence level (0-100)
3. Give detailed observations

Respond ONLY with a valid JSON object in this exact format:
{
  "prediction": "Cleft Lip Detected" or "No Cleft Lip Detected",
  "confidence": <number between 0 and 100>,
  "details": "<detailed analysis of what you observe in the image>"
}

Be professional, clear, and precise in your analysis.`;

    const imagePart = {
      inlineData: {
        data: image,
        mimeType: mimeType || "image/jpeg",
      },
    };

    const result = await model.generateContent([prompt, imagePart]);
    const response = result.response;
    const text = response.text();

    let jsonResponse;
    try {
      const cleanText = text.replace(/```json\n?|```\n?/g, "").trim();
      jsonResponse = JSON.parse(cleanText);
    } catch (e) {
      return new Response(
        JSON.stringify({
          error: "Failed to parse AI response",
          rawResponse: text,
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey);
      
      await supabase.from("predictions").insert({
        prediction: jsonResponse.prediction,
        confidence: jsonResponse.confidence,
        details: jsonResponse.details,
      });
    }

    return new Response(JSON.stringify(jsonResponse), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in prediction:", error);
    return new Response(
      JSON.stringify({ 
        error: "An error occurred during prediction",
        details: error.message 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
