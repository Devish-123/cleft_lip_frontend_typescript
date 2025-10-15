import React from 'react';
import { AppointmentForm } from './AppointmentForm';

export const ExpertOpinionPage: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-5rem)] bg-slate-50 w-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Introduction Section */}
        <div className="animate-fade-in text-slate-700">
          <h1 className="text-4xl font-bold text-apollo-teal mb-4">Introduction</h1>
          <div className="space-y-4 text-lg text-slate-600">
            <p>
              Cleft lip is a condition where a baby is born with a small opening or gap in the upper lip. It happens when the lip does not fully form during the early weeks of pregnancy. The gap may be on one side or sometimes on both sides of the lip. Although it can look different, it is a common and treatable condition.
            </p>
             <p>
              Some children with cleft lip may have trouble with feeding, speech, or teeth alignment. Doctors usually recommend surgery in the first year of life to repair the lip. With timely treatment and care, children can grow up healthy and live happily.
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div>
          <AppointmentForm title="Get Expert Advice" />
        </div>
      </div>
    </div>
  );
};