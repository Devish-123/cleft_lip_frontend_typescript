import React from 'react';
import { BotIcon } from './icons/BotIcon';

interface ChatbotIntroProps {
  onStart: () => void;
}

export const ChatbotIntro: React.FC<ChatbotIntroProps> = ({ onStart }) => {
  return (
    <div className="w-full max-w-lg p-4 animate-fade-in">
      <div className="bg-slate-800 rounded-2xl shadow-xl border border-slate-700/80 p-6">
        <div className="flex space-x-4 items-start">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center ring-4 ring-slate-800">
              <BotIcon className="w-7 h-7 text-primary" />
            </div>
          </div>
          <div className="flex-1 bg-slate-700/50 rounded-xl p-4">
            <p className="font-semibold text-slate-100">Welcome to Cleftix.</p>
            <p className="mt-2 text-slate-300">
              I'm an AI assistant designed to help with a preliminary screening for Cleft Lip Syndrome.
            </p>
          </div>
        </div>

        <div className="mt-4 space-y-3 text-slate-400">
          <h3 className="text-slate-200 font-semibold text-lg">About Cleft Lip Syndrome</h3>
          <p>Cleft lip is a common birth condition that creates an opening in the upper lip. Early awareness helps families and healthcare providers plan for the best possible care. This tool provides a non-invasive, preliminary screening using advanced AI.</p>
          <p className="text-sm"><strong>Important:</strong> This is a screening tool and does not provide a medical diagnosis. You must consult a qualified healthcare provider for any health concerns.</p>
        </div>

        <div className="mt-6 border-t border-slate-700 pt-5 text-center">
            <p className="text-lg font-semibold text-slate-200 mb-4">Do you want to predict Cleft Lip Syndrome?</p>
            <button
              onClick={onStart}
              className="px-8 py-3 bg-primary text-primary-foreground text-lg font-bold rounded-lg shadow-lg hover:bg-primary/90 transition-all transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Start Screening
            </button>
        </div>
      </div>
    </div>
  );
};