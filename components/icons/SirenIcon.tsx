import React from 'react';

export const SirenIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14.5 16.5a2.5 2.5 0 0 1-5 0" />
    <path d="M12 2v4" />
    <path d="M12 12v-1.5" />
    <path d="m4.2 4.2 1.4 1.4" />
    <path d="M18.4 5.6 17 7" />
    <path d="M12 12a5 5 0 0 1-5-5 5 5 0 0 1 5-5 5 5 0 0 1 5 5 5 5 0 0 1-5 5Z" />
    <path d="M2.2 11.7 4 11" />
    <path d="M20 11l-1.8.7" />
  </svg>
);
