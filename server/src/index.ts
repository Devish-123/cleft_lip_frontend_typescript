

import express from 'express';
import cors from 'cors';
import { GoogleGenAI, GenerateContentResponse, Type, Content } from "@google/genai";
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 3001;

// Allow requests from any origin
app.use(cors()); 

// Increase payload size limit for base64 images
app.use(express.json({ limit: '10mb' }));

// FIX: Use express.Request and express.Response to avoid type conflicts with global types. This resolves the type errors.
app.get('/', (req: express.Request, res: express.Response) => {
    res.send('Cleftix Backend is running!');
});

// FIX: Use express.Request and express.Response to avoid type conflicts with global types. This resolves the type errors.
app.post('/api/predict', async (req: express.Request, res: express.Response) => {
    const { image, mimeType } = req.body;

    if (!image || !mimeType) {
        return res.status(400).json({ error: 'Missing image data or mimeType' });
    }

    if (!process.env.API_KEY) {
        console.error('API_KEY is not set in environment variables.');
        return res.status(500).json({ error: 'Server configuration error.' });
    }

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

        const imagePart = {
            inlineData: {
                mimeType: mimeType,
                data: image,
            },
        };

        const textPart = {
            text: `You are a highly specialized medical AI trained to screen for Cleft Lip Syndrome in fetal ultrasound images. Your primary function is to perform a detailed visual analysis of the provided image, focusing on the oral and nasal structures.

**Analysis Instructions:**
1.  **Locate the Fetal Face:** Identify the baby's face, specifically the upper lip and nose area.
2.  **Examine the Upper Lip:** Scrutinize the continuity of the upper lip tissue. Look for any vertical gaps, splits, or indentations that break the normal contour of the lip.
3.  **Assess Severity:** Note if the gap is a small notch or a wider separation extending towards the nostril.
4.  **Formulate a Conclusion:** Based on these visual indicators, determine the likelihood of a cleft lip.

**Output Format:**
Provide your analysis in a strict JSON format. The JSON object must contain these exact fields:
- "outcome": A string, either "Likely" or "Unlikely". This should be based on the presence or absence of clear visual indicators.
- "confidence": A number between 0 and 100. This score should reflect your certainty in the "outcome" based on the clarity and quality of the image and the visibility of the key facial structures. A clear, well-defined gap should result in high confidence for a "Likely" outcome. A clear, continuous lip should result in high confidence for an "Unlikely" outcome. If the image is blurry or the face is obscured, the confidence score should be lower.
- "recommendation": A brief, clear recommendation. For "Likely" outcomes, strongly advise consulting a healthcare professional for a definitive diagnosis. For "Unlikely", state that indicators were not found but professional consultation is always best for health concerns.`,
        };
        
        const responseSchema = {
            type: Type.OBJECT,
            properties: {
                outcome: { type: Type.STRING, description: 'The screening outcome, "Likely" or "Unlikely".' },
                confidence: { type: Type.NUMBER, description: 'The confidence score from 0 to 100.' },
                recommendation: { type: Type.STRING, description: 'Actionable recommendation for the user.' },
            },
            required: ["outcome", "confidence", "recommendation"],
        };

        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [imagePart, textPart] },
            config: {
                responseMimeType: "application/json",
                responseSchema,
                temperature: 0.2,
            },
        });
        
        const resultJson = JSON.parse(response.text);
        res.status(200).json(resultJson);

    } catch (error) {
        console.error('Error calling Gemini API:', error);
        res.status(500).json({ error: 'Failed to analyze image' });
    }
});

// FIX: Use express.Request and express.Response to avoid type conflicts with global types. This resolves the type errors.
app.post('/api/chat', async (req: express.Request, res: express.Response) => {
    const { history, message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Missing message in request body' });
    }
    if (!process.env.API_KEY) {
        console.error('API_KEY is not set in environment variables.');
        return res.status(500).json({ error: 'Server configuration error.' });
    }

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        // Map the frontend history to the format expected by the Gemini API
        const geminiHistory: Content[] = history.map((msg: { role: 'user' | 'model'; text: string; }) => ({
            role: msg.role,
            parts: [{ text: msg.text }],
        }));

        const chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            history: geminiHistory,
            config: {
                systemInstruction: 'You are Cleftix AI, a friendly and knowledgeable assistant specialized in Cleft Lip Syndrome. Provide clear, supportive, and informative answers to user questions. Always remind users that you are an AI assistant and not a substitute for professional medical advice.',
            },
        });

        const responseStream = await chat.sendMessageStream({ message });

        res.setHeader('Content-Type', 'text/plain');
        res.setHeader('Transfer-Encoding', 'chunked');

        for await (const chunk of responseStream) {
            res.write(chunk.text);
        }
        res.end();

    } catch (error) {
        console.error('Error in chat API:', error);
        res.status(500).json({ error: 'Failed to get chat response' });
    }
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
