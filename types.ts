// FIX: Define and export the PredictionResult type to be used in ResultCard.tsx.
export interface PredictionResult {
  outcome: string;
  confidence: number;
  recommendation: string;
}
