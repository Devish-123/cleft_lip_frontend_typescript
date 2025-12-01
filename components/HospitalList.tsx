import React from 'react';
import { PhoneIcon } from './icons/PhoneIcon';
import { ResetIcon } from './icons/ResetIcon';
import { Hospital } from '../types';

interface HospitalListProps {
  city: string;
  area: string;
  hospitals: Hospital[];
  onReset: () => void;
}

export const HospitalList: React.FC<HospitalListProps> = ({ city, area, onReset, hospitals }) => {
  return (
    <div className="relative z-20 w-full max-w-3xl animate-fade-in p-4">
        <div className="bg-slate-800/80 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-2xl border border-slate-700">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-white">Nearby Hospitals</h2>
                    <p className="text-slate-300 mt-1">Showing results for: <span className="font-semibold text-red-400">{area}, {city}</span></p>
                </div>
                <button 
                    onClick={onReset}
                    className="flex-shrink-0 flex items-center space-x-2 text-sm text-slate-300 hover:text-white bg-slate-700/50 hover:bg-slate-700 px-4 py-2 rounded-lg transition-colors self-start sm:self-center"
                    aria-label="Search again"
                >
                    <ResetIcon className="w-4 h-4" />
                    <span>Search Again</span>
                </button>
            </div>
            
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                {hospitals.length > 0 ? (
                    hospitals.map((hospital, index) => (
                        <div key={index} className="bg-slate-700/50 rounded-lg p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                            <div>
                                <h3 className="font-semibold text-lg text-white">{hospital.name}</h3>
                                <p className="text-slate-400 text-sm">{hospital.address}</p>
                            </div>
                            <a 
                                href={`tel:${hospital.phone}`}
                                className="flex-shrink-0 flex items-center justify-center space-x-2 w-full sm:w-auto bg-red-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-red-700 transition-all text-sm"
                            >
                                <PhoneIcon className="w-4 h-4" />
                                <span>{hospital.phone || 'Call Now'}</span>
                            </a>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-10 bg-slate-700/30 rounded-lg">
                        <p className="text-slate-300 font-semibold">No Hospitals Found</p>
                        <p className="text-sm text-slate-400 mt-1">We couldn't find any hospitals for your search. Please try a different area or city.</p>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};
