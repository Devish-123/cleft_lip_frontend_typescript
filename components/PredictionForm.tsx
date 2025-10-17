import React from 'react';

interface PredictionFormProps {
  imagePreviewUrl: string;
  notes: string;
  onNotesChange: (notes: string) => void;
  onPredict: () => void;
  onResetImage: () => void;
}

export const PredictionForm: React.FC<PredictionFormProps> = ({
  imagePreviewUrl,
  notes,
  onNotesChange,
  onPredict,
  onResetImage,
}) => {
  return (
    <div className="w-full max-w-lg bg-slate-800 rounded-2xl shadow-xl border border-slate-700/80 p-6 animate-fade-in">
      <div className="flex flex-col space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-slate-200 mb-3">Image Preview</h2>
          <div className="relative group w-full aspect-square rounded-xl overflow-hidden bg-slate-900">
             <img src={imagePreviewUrl} alt="Baby's image preview" className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                 <button
                    onClick={onResetImage}
                    className="px-4 py-2 text-sm bg-slate-100/90 text-slate-800 font-semibold rounded-lg shadow-md hover:bg-white"
                 >
                    Change Image
                 </button>
             </div>
          </div>
        </div>
        <div>
           <label htmlFor="notes" className="block text-lg font-semibold text-slate-200 mb-2">
            Optional Notes
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => onNotesChange(e.target.value)}
            placeholder="Add any relevant clinical notes or context..."
            className="w-full h-24 p-3 bg-slate-700 border border-slate-600 text-slate-200 placeholder:text-slate-400 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition duration-150 resize-none"
            aria-label="Optional notes"
          />
        </div>
        <div className="pt-2">
          <button
            onClick={onPredict}
            className="w-full py-3 bg-primary text-primary-foreground text-lg font-bold rounded-lg shadow-lg hover:bg-primary/90 transition-all transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Predict Cleft Lip
          </button>
        </div>
      </div>
    </div>
  );
};