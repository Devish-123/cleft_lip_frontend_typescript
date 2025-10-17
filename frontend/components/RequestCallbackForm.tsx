import React, { useState } from 'react';

export const RequestCallbackForm: React.FC = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <div className="bg-apollo-teal py-12">
                <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[30rem]">
                            <div className="p-8 md:p-12 text-white flex flex-col justify-center items-center text-center">
                                <h2 className="text-3xl font-bold text-apollo-gold mb-4">Thank You!</h2>
                                <p className="text-lg text-slate-200">
                                    Thank you for contacting us. We will reach out to you very soon.
                                </p>
                            </div>
                            <div className="relative hidden md:block">
                                <img src="https://png.pngtree.com/thumb_back/fh260/background/20240526/pngtree-asian-doctor-standing-on-green-background-image_15731333.jpg" alt="Doctor" className="absolute bottom-0 right-0 h-full w-auto object-contain" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-apollo-teal py-12">
            <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="p-8 md:p-12 text-white">
                            <p className="text-lg">Could not find what you are looking for?</p>
                            <h2 className="text-4xl font-bold mt-1 mb-6">Request a Callback</h2>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label htmlFor="name-callback" className="sr-only">Name</label>
                                    <input type="text" id="name-callback" placeholder="Name" required className="w-full bg-apollo-teal/60 border-2 border-apollo-teal rounded-lg py-3 px-4 placeholder:text-slate-200 focus:outline-none focus:ring-2 focus:ring-apollo-gold" />
                                </div>
                                <div>
                                    <label htmlFor="mobile-callback" className="sr-only">Mobile Number</label>
                                    <input type="tel" id="mobile-callback" placeholder="Mobile Number" required className="w-full bg-apollo-teal/60 border-2 border-apollo-teal rounded-lg py-3 px-4 placeholder:text-slate-200 focus:outline-none focus:ring-2 focus:ring-apollo-gold" />
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="flex-shrink-0 bg-apollo-teal/60 border-2 border-apollo-teal rounded-lg px-4 py-3 select-none">
                                        <span className="text-slate-200 font-mono tracking-widest text-lg italic">
                                            8hK3P
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        id="captcha-callback"
                                        placeholder="Enter CAPTCHA"
                                        required
                                        className="flex-grow w-full bg-apollo-teal/60 border-2 border-apollo-teal rounded-lg py-3 px-4 placeholder:text-slate-200 focus:outline-none focus:ring-2 focus:ring-apollo-gold"
                                    />
                                </div>
                                <div>
                                    <button type="submit" className="w-full sm:w-auto bg-apollo-gold text-slate-800 font-bold py-3 px-10 rounded-lg text-lg hover:bg-amber-400/90 transition-all">Submit</button>
                                </div>
                            </form>
                        </div>
                        <div className="relative hidden md:block">
                            <img src="https://png.pngtree.com/thumb_back/fh260/background/20240526/pngtree-asian-doctor-standing-on-green-background-image_15731333.jpg" alt="Doctor" className="absolute bottom-0 right-0 h-full w-auto object-contain" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};