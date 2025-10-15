
import React, { useState } from 'react';
import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";
import { PredictionResult } from '../types';
import { UploadZone } from './UploadZone';
import { ResultCard } from './ResultCard';

type Status = 'idle' | 'processing' | 'analyzing';

export const PredictionPage: React.FC = () => {
    const [status, setStatus] = useState<Status>('idle');
    const [result, setResult] = useState<PredictionResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handlePredict = async (imageFile: File) => {
        if (!imageFile) return;

        setStatus('processing');
        setError(null);
        setResult(null); 

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

            const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve((reader.result as string).split(',')[1]);
                reader.onerror = error => reject(error);
            });
            
            const base64Image = await toBase64(imageFile);
            
            // Artificial delay to make the processing step more visible
            await new Promise(resolve => setTimeout(resolve, 500));

            setStatus('analyzing');

            const imagePart = {
                inlineData: {
                    mimeType: imageFile.type,
                    data: base64Image,
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
            resultJson.confidence = parseFloat(resultJson.confidence.toFixed(1));
            setResult(resultJson as PredictionResult);

        } catch (err) {
            console.error("Error during prediction:", err);
            setError("An error occurred during the analysis. Please try again.");
        } finally {
            setStatus('idle');
        }
    };

    return (
        <main className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">Cleft Lip Prediction</h1>
                <p className="mt-4 text-lg text-gray-600">Upload ultrasound. Get instant results.</p>
            </div>

            <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">What is Cleft Lip?</h2>
                    <p className="text-gray-600">
                        A cleft lip is a birth defect characterized by a split or opening in the upper lip. Early diagnosis is important for planning treatment and improving outcomes.
                    </p>
                </div>

                <UploadZone onPredict={handlePredict} status={status} />
                
                {error && <p className="text-center text-sm text-red-600">{error}</p>}
                
                {result && <ResultCard result={result} />}

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Understand Your Options</h2>
                    <button className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        Learn About Cleft Lip Treatment
                    </button>
                </div>
            </div>
        </main>
    );
};
