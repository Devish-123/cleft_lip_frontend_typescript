import React, { useState } from 'react';
import { ChevronDownIcon } from './icons/ChevronDownIcon';

interface AppointmentFormProps {
  title: string;
}

export const AppointmentForm: React.FC<AppointmentFormProps> = ({ title }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const recipient = '919966647375';
    const message = `Hello, I want expert advice.\nName: ${name}\nPhone: ${phone}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${recipient}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md animate-fade-in">
      <h3 className="text-2xl font-bold text-slate-800 mb-6">{title}</h3>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="relative">
          <select
            id="city"
            required
            className="w-full appearance-none bg-white border border-slate-300 rounded-md py-3 px-4 text-slate-700 leading-tight focus:outline-none focus:ring-2 focus:ring-apollo-teal"
          >
            <option value="" disabled selected>Select City</option>
            <option>New York</option>
            <option>London</option>
            <option>Tokyo</option>
            <option>Sydney</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
            <ChevronDownIcon className="w-5 h-5" />
          </div>
        </div>
        <div>
          <input
            type="text"
            id="name"
            placeholder="Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-md py-3 px-4 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-apollo-teal"
          />
        </div>
        <div>
          <input
            type="tel"
            id="phone"
            placeholder="Phone Number"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-md py-3 px-4 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-apollo-teal"
          />
        </div>
        <div className="flex items-center space-x-3">
            <div className="flex-shrink-0 bg-slate-200 border border-slate-300 rounded-md px-4 py-3 select-none">
                <span className="text-slate-700 font-mono tracking-widest text-lg italic">
                    Xy5gZ
                </span>
            </div>
            <input
                type="text"
                id="captcha"
                placeholder="Enter CAPTCHA"
                required
                className="flex-grow w-full bg-white border border-slate-300 rounded-md py-3 px-4 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-apollo-teal"
            />
        </div>
        <div className="relative">
          <select
            id="time"
            required
            className="w-full appearance-none bg-white border border-slate-300 rounded-md py-3 px-4 text-slate-700 leading-tight focus:outline-none focus:ring-2 focus:ring-apollo-teal"
          >
            <option value="" disabled selected>- Preferred time to call -</option>
            <option>Morning (9 AM - 12 PM)</option>
            <option>Afternoon (12 PM - 4 PM)</option>
            <option>Evening (4 PM - 7 PM)</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
            <ChevronDownIcon className="w-5 h-5" />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-apollo-gold text-slate-800 font-bold py-3 px-4 rounded-md hover:bg-amber-400/90 transition-all text-lg"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};