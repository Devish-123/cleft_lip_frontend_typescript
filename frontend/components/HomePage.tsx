
import React, { useState, useEffect } from 'react';
import { ArrowRightIcon } from './icons/ArrowRightIcon';
import { BotIcon } from './icons/BotIcon';

const ActionButton: React.FC<{children: React.ReactNode, onClick?: () => void}> = ({ children, onClick }) => (
    <button onClick={onClick} className="flex-1 bg-slate-50/90 hover:bg-white text-slate-800 font-semibold py-3 px-4 flex items-center justify-center space-x-3 transition-all duration-300">
        <span>{children}</span>
        <div className="w-6 h-6 rounded-full border-2 border-slate-400 flex items-center justify-center">
            <ArrowRightIcon className="w-4 h-4 text-slate-600" />
        </div>
    </button>
);

interface HomePageProps {
    onKnowMoreClick: () => void;
    onPredictClick: () => void;
    onExpertOpinionClick: () => void;
    onAskAIClick: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onKnowMoreClick, onPredictClick, onExpertOpinionClick, onAskAIClick }) => {
  const fullTitle = "Detect Early. Care Better.";
  const [title, setTitle] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [donationStep, setDonationStep] = useState<'details' | 'amount' | 'qr'>('details');
  const [donorName, setDonorName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);

  useEffect(() => {
    if (title.length < fullTitle.length) {
      const timeout = setTimeout(() => {
        setTitle(fullTitle.slice(0, title.length + 1));
      }, 150); // Typing speed
      return () => clearTimeout(timeout);
    } else {
      const cursorTimeout = setTimeout(() => {
        setIsTyping(false);
      }, 1000); // Keep cursor for 1 second after typing
      return () => clearTimeout(cursorTimeout);
    }
  }, [title]);
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Delay resetting state to allow for fade-out animation
    setTimeout(() => {
        setDonationStep('details');
        setDonorName('');
        setMobileNumber('');
        setAmount('');
        setQrCodeUrl(null);
    }, 300);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            handleCloseModal();
        }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
        window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (donorName && mobileNumber) {
        setDonationStep('amount');
    }
  };

  const handleAmountSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseFloat(amount) > 0) {
        const upiId = '9966647375@axl';
        const payeeName = 'Cleftix Foundation';
        // Note: Standard UPI links do not have a field for the donor's name ('pn' is Payee Name).
        // The donor's name is collected for our records.
        const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${amount}&cu=INR`;
        const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(upiLink)}`;
        setQrCodeUrl(qrApiUrl);
        setDonationStep('qr');
    }
  };

  const renderModalContent = () => {
    switch(donationStep) {
        case 'details':
            return (
                <form onSubmit={handleDetailsSubmit} className="animate-fade-in">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Your Details</h3>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="donorName" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input
                                type="text"
                                id="donorName"
                                value={donorName}
                                onChange={(e) => setDonorName(e.target.value)}
                                placeholder="Enter your name"
                                required
                                className="w-full border border-gray-300 rounded-lg py-2 px-3 text-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                        <div>
                            <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                            <input
                                type="tel"
                                id="mobileNumber"
                                value={mobileNumber}
                                onChange={(e) => setMobileNumber(e.target.value)}
                                placeholder="Enter your mobile number"
                                required
                                className="w-full border border-gray-300 rounded-lg py-2 px-3 text-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                    </div>
                    <button type="submit" className="w-full mt-6 py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-all">
                        Next
                    </button>
                </form>
            );
        case 'amount':
            return (
                <form onSubmit={handleAmountSubmit} className="animate-fade-in">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Make a Donation</h3>
                    <div className="mb-5">
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">Amount (INR)</label>
                        <input
                            type="number"
                            id="amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter amount"
                            required
                            min="1"
                            className="w-full border border-gray-300 rounded-lg py-2 px-3 text-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <button type="button" onClick={() => setDonationStep('details')} className="w-full py-3 bg-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-300 transition-all">
                            Back
                        </button>
                        <button type="submit" className="w-full py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-all">
                            Generate QR Code
                        </button>
                    </div>
                </form>
            );
        case 'qr':
            return (
                <div className="text-center animate-fade-in">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Scan to Pay</h3>
                    <p className="text-gray-600 mb-1">Donating: <span className="font-bold">₹{amount}</span></p>
                    <p className="text-gray-600 mb-4">Thank you, <span className="font-bold">{donorName}</span>!</p>
                    <div className="flex justify-center">
                      <img src={qrCodeUrl!} alt="UPI QR Code" className="w-56 h-56 border-4 border-gray-200 rounded-lg" />
                    </div>
                     <p className="text-xs text-gray-500 mt-4">UPI ID: 9966647375@axl</p>
                     <button type="button" onClick={() => setDonationStep('amount')} className="w-full mt-4 py-2 bg-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-300 transition-all">
                        Back
                    </button>
                </div>
            );
    }
  }


  return (
    <main className="w-full">
      {/* Hero Section */}
      <section className="relative h-[calc(100vh-5rem)] w-full overflow-hidden flex flex-col items-center justify-center bg-slate-900">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          poster="https://videos.pexels.com/video-files/3209828/3209828-still_1920_1080.jpg"
          aria-label="Abstract DNA strand animation background video"
        >
          <source src="https://videos.pexels.com/video-files/3209828/3209828-hd_1920_1080_25fps.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/60 to-transparent z-10"></div>
        
        <div className="relative z-20 flex flex-col items-center text-center px-4 w-full max-w-4xl space-y-10">
          
          <div className="w-full max-w-3xl h-[72px] flex items-center justify-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-wide [text-shadow:_0_2px_8px_rgb(0_0_0_/_0.7)] font-sans">
              {title}
              <span className={`inline-block border-l-4 border-white ml-2 h-12 align-middle ${isTyping ? 'animate-blink' : 'hidden'}`}></span>
            </h1>
          </div>

          <div className="w-full max-w-4xl bg-white/10 backdrop-blur-md border border-white/20 rounded-lg overflow-hidden flex flex-col sm:flex-row sm:divide-x sm:divide-white/20 shadow-lg">
              <ActionButton onClick={onKnowMoreClick}>Know about Cleft Lip</ActionButton>
              <ActionButton onClick={onPredictClick}>Predict Cleft Lip</ActionButton>
              <ActionButton onClick={onAskAIClick}>Ask Cleftix AI</ActionButton>
              <ActionButton onClick={onExpertOpinionClick}>Get Expert Opinion</ActionButton>
          </div>
        </div>
      </section>

      {/* Causes Section */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Understanding the Causes of Cleft Lip</h2>
                <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">While the exact cause is often unknown, a combination of genetic and environmental factors can increase the risk.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Alcohol Consumption */}
                <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-2xl flex items-center justify-start p-8 md:p-12">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute top-0 left-0 w-full h-full object-cover z-0"
                        poster="https://videos.pexels.com/video-files/854002/854002-still_1920_1080.jpg"
                    >
                        <source src="https://videos.pexels.com/video-files/3209828/3209828-hd_1920_1080_25fps.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/50 to-transparent z-10"></div>
                    <div className="relative z-20 max-w-lg">
                        <h3 className="text-2xl lg:text-3xl font-extrabold text-white [text-shadow:_0_2px_4px_rgb(0_0_0_/_0.7)]">Alcohol Consumption During Pregnancy</h3>
                        <p className="mt-4 text-slate-200 [text-shadow:_0_1px_3px_rgb(0_0_0_/_0.7)]">
                            Consuming alcohol during pregnancy is a significant risk factor. It can interfere with the normal formation of facial structures.
                        </p>
                    </div>
                </div>

                {/* Other Factors */}
                <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-2xl flex items-center justify-end text-right p-8 md:p-12">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute top-0 left-0 w-full h-full object-cover z-0"
                        poster="https://videos.pexels.com/video-files/3130182/3130182-still_1920_1080.jpg"
                    >
                        <source src="https://videos.pexels.com/video-files/3209828/3209828-hd_1920_1080_25fps.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-l from-slate-900/80 via-slate-900/50 to-transparent z-10"></div>
                    <div className="relative z-20 max-w-lg">
                        <h3 className="text-2xl lg:text-3xl font-extrabold text-white [text-shadow:_0_2px_4px_rgb(0_0_0_/_0.7)]">Genetics & Other Factors</h3>
                        <p className="mt-4 text-slate-200 [text-shadow:_0_1px_3px_rgb(0_0_0_/_0.7)]">
                            A family history, smoking, certain medications, and nutritional deficiencies can also increase the risk. Understanding these helps in prenatal planning.
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Support Our Cause Section */}
      <section className="relative h-96 w-full overflow-hidden flex flex-col items-center justify-center bg-slate-800">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-30"
            poster="https://videos.pexels.com/video-files/853874/853874-still_1920_1080.jpg"
            aria-label="Happy child playing background video"
          >
            <source src="https://videos.pexels.com/video-files/853874/853874-hd_1920_1080_25fps.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent z-10"></div>
          <div className="relative z-20 flex flex-col items-center text-center px-4">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl [text-shadow:_0_2px_4px_rgb(0_0_0_/_0.7)]">Support Our Cause</h2>
              <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto [text-shadow:_0_1px_3px_rgb(0_0_0_/_0.7)]">
                  Your contribution helps us continue our mission to provide early screening and support for families.
              </p>
              <button
                  onClick={() => setIsModalOpen(true)}
                  className="mt-8 px-10 py-3 bg-primary text-primary-foreground text-lg font-bold rounded-lg shadow-lg hover:bg-primary/90 transition-all transform active:scale-95"
              >
                  Donate Now
              </button>
          </div>
      </section>

      {/* Donation Modal */}
      {isModalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in p-4">
              <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-sm relative">
                  <button 
                      onClick={handleCloseModal}
                      className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
                      aria-label="Close donation modal"
                  >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                  </button>
                  
                  {renderModalContent()}
              </div>
          </div>
      )}

      <button onClick={onAskAIClick} className="fixed bottom-6 right-6 w-16 h-16 bg-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform duration-300 z-30" aria-label="Open Chatbot">
        <div className="w-10 h-10 rounded-full bg-apollo-orange flex items-center justify-center">
            <BotIcon className="w-6 h-6 text-white"/>
        </div>
      </button>
    </main>
  );
};
