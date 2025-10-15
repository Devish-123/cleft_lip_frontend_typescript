import React from 'react';
import { PhoneIcon } from './icons/PhoneIcon';
import { ResetIcon } from './icons/ResetIcon';

const dummyHospitals = [
  { name: 'Apollo Main Hospital', address: '123 Health St, Downtown', phone: '555-0101' },
  { name: 'City General', address: '456 Care Ave, Uptown', phone: '555-0102' },
  { name: 'St. Jude\'s Medical Center', address: '789 Wellness Blvd, Suburbia', phone: '555-0103' },
  { name: 'Emergency Care Clinic', address: '101 Rescue Rd, Riverside', phone: '555-0104' },
];

interface HospitalListProps {
  city: string;
  area: string;
  onReset: () => void;
}

export const HospitalList: React.FC<HospitalListProps> = ({ city, area, onReset }) => {
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
                {dummyHospitals.map((hospital, index) => (
                    <div key={index} className="bg-slate-700/50 rounded-lg p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                        <div>
                            <h3 className="font-semibold text-lg text-white">{hospital.name}</h3>
                            <p className="text-slate-400 text-sm">{hospital.address}</p>
                        </div>
                        <a 
                            href={`tel:${hospital.phone}`}
                            className="flex-shrink-0 flex items-center justify-center space-x-2 w-full sm:w-auto bg-red-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-red-700 transition-all text-sm"
                        >
                            <PhoneIcon className="w-4 h-4" />
                            <span>Call Now</span>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};
