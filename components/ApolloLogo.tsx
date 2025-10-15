import React from 'react';

// This is a stylized logo for Cleftix, inspired by the Apollo Hospitals design.
export const ApolloLogo: React.FC = () => (
    <div className="flex items-center space-x-2">
        <svg 
            width="32" 
            height="32" 
            viewBox="0 0 32 32" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="transition-all duration-500 ease-in-out group-hover:scale-110 group-hover:-rotate-6 group-hover:drop-shadow-[0_0_10px_rgba(245,130,32,0.8)]"
        >
            <path d="M16.2082 5.33301C14.7348 7.33301 13.9137 9.53987 13.9137 12.0413C13.9137 16.9246 17.6537 20.9163 22.1256 20.9163C22.3423 20.9163 22.559 20.8997 22.7756 20.883C21.701 24.333 18.5276 26.6663 14.8339 26.6663C9.73484 26.6663 5.66724 22.2597 5.66724 16.6663C5.66724 12.7246 8.01957 9.38299 11.2396 7.49967C11.1652 8.74967 11.5396 10.233 12.4482 11.4163C13.3569 12.5997 14.6537 13.4163 16.1256 13.583C15.9396 11.483 15.6537 8.59967 16.2082 5.33301Z" fill="#F58220"/>
        </svg>
        <div className="flex items-baseline text-xl font-bold tracking-wider text-slate-200 group-hover:text-amber-300 transition-colors duration-500">
            {'CLEFTIX'.split('').map((char, index) => (
                <span
                    key={index}
                    className="inline-block group-hover:animate-bouncy-letter"
                    style={{ animationDelay: `${index * 0.07}s` }}
                >
                    {char}
                </span>
            ))}
        </div>
    </div>
);