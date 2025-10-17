import React from 'react';
import { TargetIcon } from './icons/TargetIcon';
import { ChipIcon } from './icons/ChipIcon';
import { AlertIcon } from './icons/AlertIcon';
import { ArrowRightIcon } from './icons/ArrowRightIcon';

interface InfoCardProps {
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, title, children }) => (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col items-start text-center sm:text-left sm:flex-row sm:space-x-6 shadow-md">
        <div className="w-16 h-16 bg-apollo-teal/10 text-apollo-teal rounded-lg flex items-center justify-center flex-shrink-0 mb-4 sm:mb-0">
            {icon}
        </div>
        <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600">{children}</p>
        </div>
    </div>
);


interface AboutPageProps {
  onPredictClick: () => void;
  onExpertOpinionClick: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onPredictClick, onExpertOpinionClick }) => {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Header Section */}
      <div className="bg-white pt-20 pb-16 text-center border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-apollo-teal">
                Pioneering Early Detection with AI
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                Cleftix is dedicated to leveraging cutting-edge artificial intelligence to provide an accessible, preliminary screening tool for Cleft Lip Syndrome, empowering families and healthcare providers with early insights.
            </p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <InfoCard icon={<TargetIcon className="w-8 h-8"/>} title="Our Mission">
                To bridge the gap in early detection of Cleft Lip Syndrome by providing a reliable, non-invasive AI-powered screening tool. We aim to offer peace of mind and crucial early awareness to expectant parents, facilitating timely consultation with medical professionals.
            </InfoCard>

            <InfoCard icon={<ChipIcon className="w-8 h-8"/>} title="Our Technology">
                Cleftix utilizes a sophisticated deep learning model trained on thousands of ultrasound images. Our AI analyzes the facial structures in an image to identify subtle indicators associated with cleft lip, providing a probability-based assessment with a high degree of accuracy for screening purposes.
            </InfoCard>
            
             <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg p-6 text-left">
                <div className="flex items-start space-x-4">
                    <AlertIcon className="w-8 h-8 flex-shrink-0 text-yellow-500" />
                    <div>
                        <h3 className="text-xl font-bold text-yellow-900">AI's Role and Limitations</h3>
                        <p className="mt-2 text-yellow-800">
                           It is crucial to understand that <strong>Cleftix is a screening tool, not a diagnostic one.</strong> Our AI provides a preliminary analysis to indicate the likelihood of Cleft Lip Syndrome. It does not replace the expertise and comprehensive evaluation of a qualified healthcare professional. A definitive diagnosis can only be made by a doctor through clinical examination and further medical imaging if necessary.
                        </p>
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className="text-center pt-10">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Take the Next Step</h2>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button onClick={onPredictClick} className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-3 bg-primary text-primary-foreground text-lg font-bold rounded-lg shadow-lg hover:bg-primary/90 transition-all transform active:scale-95">
                        <span>Try the Screener</span>
                        <ArrowRightIcon className="w-5 h-5"/>
                    </button>
                    <button onClick={onExpertOpinionClick} className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-3 border-2 border-apollo-teal text-apollo-teal text-lg font-bold rounded-lg shadow-lg hover:bg-apollo-teal/10 transition-all transform active:scale-95">
                        <span>Get an Expert Opinion</span>
                         <ArrowRightIcon className="w-5 h-5"/>
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};