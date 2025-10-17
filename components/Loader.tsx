import React from 'react';
import { MedicalCrossIcon } from './icons/MedicalCrossIcon';

export const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 text-center animate-fade-in">
        <div className="relative w-24 h-24">
            <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse-glow"></div>
            <div className="absolute inset-2 bg-primary/30 rounded-full animate-pulse-glow delay-200"></div>
            <MedicalCrossIcon className="relative w-full h-full text-primary" />
        </div>
        <div className="mt-4">
            <h2 className="text-2xl font-bold text-slate-200 tracking-wide">Analyzing Image...</h2>
            <p className="text-slate-400 mt-1">Our AI is checking for indicators of Cleft Lip Syndrome.</p>
        </div>
    </div>
  );
};