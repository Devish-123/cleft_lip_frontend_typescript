import React from 'react';

export const LogoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg 
        {...props}
        viewBox="0 0 24 24" 
        fill="currentColor" 
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M12.24,2.32a1.2,1.2,0,0,0-1.9,0C4.84,8,2.2,12.43,4.52,17.4a8.4,8.4,0,0,0,14.47,0C21.3,12.43,18.66,8,12.24,2.32Z" />
    </svg>
);