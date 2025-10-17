
import React, { useState } from 'react';
import { PredictionResult } from '../types';
import { UploadZone } from './UploadZone';
import { ResultCard } from './ResultCard';
import { AlertIcon } from './icons/AlertIcon';

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

            // The backend endpoint URL. In a real application, this would come from a config file.
            const backendUrl = 'http://localhost:3001/api/predict';

            const response = await fetch(backendUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    image: base64Image,
                    mimeType: imageFile.type,
                }),
            });
    
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ error: 'An unknown server error occurred.' }));
                throw new Error(errorData.error || `Request failed with status: ${response.status}`);
            }
    
            const resultJson: PredictionResult = await response.json();
            
            resultJson.confidence = parseFloat(resultJson.confidence.toFixed(1));
            setResult(resultJson);

        } catch (err) {
            console.error("Error during prediction:", err);
            let displayError = "An unknown error occurred. Please try again.";
            if (err instanceof Error) {
                if (err.message.includes('Failed to fetch')) {
                    displayError = "Could not connect to the analysis server. Please ensure it's running and try again.";
                } else {
                    displayError = err.message;
                }
            }
            setError(displayError);
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
                
                {error && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-800 p-4 rounded-md animate-fade-in" role="alert">
                        <div className="flex">
                            <div className="py-1">
                                <AlertIcon className="w-6 h-6 text-red-500 mr-4" />
                            </div>
                            <div>
                                <p className="font-bold">Analysis Failed</p>
                                <p className="text-sm">{error}</p>
                            </div>
                        </div>
                    </div>
                )}
                
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
