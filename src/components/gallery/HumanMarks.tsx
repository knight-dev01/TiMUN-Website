import React from 'react';

/**
 * Hand-drawn marks kept in the system: wobbly arrow + check.
 * Used sparingly beside CTAs and checklists so buttons feel human.
 */

export const HandArrow: React.FC<{ className?: string }> = ({ className = 'w-10 h-6' }) => (
  <svg viewBox="0 0 40 24" fill="none" className={className} aria-hidden="true">
    <path
      d="M2 13 C 12 11, 22 11, 30 12 M 24 6 C 27 8, 30 10, 32 13 M 24 19 C 27 17, 30 15, 32 13"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const HandCheck: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
    <path
      d="M3 11 C 5 13, 6 14, 8 16 M 7 15 C 10 11, 13 7, 17 4"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
