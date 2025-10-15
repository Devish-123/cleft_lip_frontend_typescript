import React, { useState } from 'react';
import { PhoneIcon } from './icons/PhoneIcon';
import { EmailIcon } from './icons/EmailIcon';
import { LocationIcon } from './icons/LocationIcon';
import { SendIcon } from './icons/SendIcon';
import { CheckIcon } from './icons/CheckIcon';

const ContactInfoItem: React.FC<{ icon: React.ReactNode, title: string, children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 w-12 h-12 bg-apollo-teal/10 text-apollo-teal rounded-lg flex items-center justify-center">
            {icon}
        </div>
        <div>
            <h4 className="text-lg font-semibold text-gray-900">{title}</h4>
            <p className="text-gray-600">{children}</p>
        </div>
    </div>
);

export const ContactPage: React.FC = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
    };

    return (
        <div className="bg-gray-50 text-gray-800 min-h-[calc(100vh-5rem)]">
            <div className="bg-white pt-20 pb-16 text-center border-b border-gray-200">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-apollo-teal">
                        Get In Touch
                    </h1>
                    <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                        We're here to help and answer any question you might have. We look forward to hearing from you.
                    </p>
                </div>
            </div>

            <div className="py-16 sm:py-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                        {/* Contact Information */}
                        <div className="space-y-8">
                            <ContactInfoItem icon={<LocationIcon className="w-6 h-6" />} title="Our Office">
                                123 Health Innovation Drive, Med-Tech City, 54321
                            </ContactInfoItem>
                            <ContactInfoItem icon={<EmailIcon className="w-6 h-6" />} title="Email Us">
                                <a href="mailto:support@cleftix.com" className="hover:text-apollo-teal transition-colors">support@cleftix.com</a>
                            </ContactInfoItem>
                            <ContactInfoItem icon={<PhoneIcon className="w-6 h-6" />} title="Call Us">
                                <a href="tel:+1234567890" className="hover:text-apollo-teal transition-colors">(123) 456-7890</a>
                            </ContactInfoItem>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
                            {isSubmitted ? (
                                <div className="flex flex-col items-center justify-center h-full text-center">
                                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4 animate-bounce-in">
                                        <CheckIcon className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                                    <p className="text-gray-600">Your message has been sent successfully. We will get back to you shortly.</p>
                                </div>
                            ) : (
                                <>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <div>
                                            <label htmlFor="name" className="sr-only">Name</label>
                                            <input type="text" id="name" placeholder="Your Name" required className="w-full bg-white border border-gray-300 rounded-lg py-3 px-4 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-apollo-teal focus:border-apollo-teal" />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="sr-only">Email</label>
                                            <input type="email" id="email" placeholder="Your Email" required className="w-full bg-white border border-gray-300 rounded-lg py-3 px-4 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-apollo-teal focus:border-apollo-teal" />
                                        </div>
                                        <div>
                                            <label htmlFor="subject" className="sr-only">Subject</label>
                                            <input type="text" id="subject" placeholder="Subject" required className="w-full bg-white border border-gray-300 rounded-lg py-3 px-4 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-apollo-teal focus:border-apollo-teal" />
                                        </div>
                                        <div>
                                            <label htmlFor="message" className="sr-only">Message</label>
                                            <textarea id="message" placeholder="Your Message" required rows={5} className="w-full bg-white border border-gray-300 rounded-lg py-3 px-4 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-apollo-teal focus:border-apollo-teal resize-none"></textarea>
                                        </div>
                                        <div>
                                            <button type="submit" className="w-full flex items-center justify-center space-x-2 py-3 px-6 bg-apollo-teal text-white text-lg font-bold rounded-lg shadow-lg hover:bg-apollo-teal/90 transition-all transform active:scale-95">
                                                <span>Send Message</span>
                                                <SendIcon className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};