import React from 'react';

/**
 * Hand-drawn marks for the gallery landing — wobbly, human, never generic.
 * Replaces lucide icons inside landing/gallery scope (de-AI rule).
 */

export const Squiggle: React.FC<{ className?: string }> = ({ className = 'w-24 h-3' }) => (
  <svg viewBox="0 0 96 12" fill="none" className={className} aria-hidden="true">
    <path
      d="M2 8 C 12 2, 20 2, 28 7 S 44 11, 52 6 S 68 2, 76 7 S 90 10, 94 5"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

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

export const Asterisk: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
    <path
      d="M8 1.5 V 14.5 M 1.8 4.5 L 14.2 11.5 M 14.2 4.5 L 1.8 11.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const Stamp: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <span
    className={`inline-flex items-center gap-2 px-4 py-1.5 border-2 border-dashed border-current rounded-lg rotate-[-1.5deg] text-xs font-bold uppercase tracking-widest ${className}`}
  >
    {children}
  </span>
);
