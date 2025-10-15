import React from 'react';
import { AlertIcon } from './icons/AlertIcon';

export const Disclaimer: React.FC = () => {
  return (
    <footer className="w-full max-w-3xl mx-auto mt-12 mb-8 p-4 bg-yellow-900/30 border-l-4 border-yellow-500 rounded-r-lg text-center animate-fade-in animation-delay-500">
      <div className="flex items-center justify-center space-x-3">
        <AlertIcon className="w-6 h-6 flex-shrink-0 text-yellow-400" />
        <p className="text-sm sm:text-base text-yellow-200 font-medium">
          <strong className="font-bold text-yellow-100">Disclaimer:</strong> This AI tool is for preliminary screening only and not a substitute for professional medical advice. Please consult a qualified healthcare provider for confirmation.
        </p>
      </div>
    </footer>
  );
};