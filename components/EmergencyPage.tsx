import React, { useState } from 'react';
import { HospitalList } from './HospitalList';

export const EmergencyPage: React.FC = () => {
    const [step, setStep] = useState<'video' | 'form' | 'list'>('video');
    const [city, setCity] = useState('');
    const [area, setArea] = useState('');

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (city && area) {
            setStep('list');
        }
    };

    const renderContent = () => {
        switch (step) {
            case 'video':
                return (
                    <div className="relative z-20 flex flex-col items-center text-center px-4 animate-fade-in">
                        <h1 className="text-5xl md:text-7xl font-extrabold text-white uppercase tracking-wider [text-shadow:_0_3px_10px_rgb(0_0_0_/_0.8)]">
                            Emergency
                        </h1>
                        <p className="mt-4 text-lg text-slate-200 [text-shadow:_0_2px_5px_rgb(0_0_0_/_0.8)] max-w-lg">
                            If this is a life-threatening emergency, please call your local emergency number immediately.
                        </p>
                        <button
                            onClick={() => setStep('form')}
                            className="mt-10 px-12 py-4 bg-red-600 text-white text-xl font-bold rounded-lg shadow-lg hover:bg-red-700 transition-all transform active:scale-95 animate-pulse-glow"
                        >
                            Get Nearest Hospital
                        </button>
                    </div>
                );
            case 'form':
                return (
                     <div className="relative z-20 w-full max-w-md bg-slate-800/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-slate-700 animate-fade-in">
                        <h2 className="text-3xl font-bold text-white text-center mb-6">Find a Hospital</h2>
                        <form onSubmit={handleFormSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="city" className="block text-sm font-medium text-slate-300 mb-2">City</label>
                                <input
                                    type="text"
                                    id="city"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    placeholder="e.g., New York"
                                    required
                                    className="w-full bg-slate-700 border border-slate-600 rounded-lg py-3 px-4 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                                />
                            </div>
                             <div>
                                <label htmlFor="area" className="block text-sm font-medium text-slate-300 mb-2">Area / Neighborhood</label>
                                <input
                                    type="text"
                                    id="area"
                                    value={area}
                                    onChange={(e) => setArea(e.target.value)}
                                    placeholder="e.g., Manhattan"
                                    required
                                    className="w-full bg-slate-700 border border-slate-600 rounded-lg py-3 px-4 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-3 bg-red-600 text-white text-lg font-bold rounded-lg shadow-lg hover:bg-red-700 transition-all transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-red-500"
                            >
                                Find Hospitals
                            </button>
                        </form>
                    </div>
                );
            case 'list':
                return <HospitalList city={city} area={area} onReset={() => setStep('form')} />;
            default:
                return null;
        }
    };
    
    return (
        <div className="relative h-[calc(100vh-5rem)] w-full flex items-center justify-center overflow-hidden bg-slate-900">
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
                poster="https://videos.pexels.com/video-files/3129579/3129579-still-2560x1440.jpg"
                aria-label="Flashing emergency lights background video"
            >
                <source src="https://videos.pexels.com/video-files/3209828/3209828-hd_1920_1080_25fps.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/60 to-transparent z-10"></div>
            {renderContent()}
        </div>
    );
};