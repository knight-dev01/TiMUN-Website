import React from 'react';

interface WaveDividerProps {
  /** Fill color of the wave (the section below shows through around it). */
  fill?: string;
  /** Background behind the wave (the section above). */
  bg?: string;
  flip?: boolean;
}

/**
 * Hand-drawn-feeling curved divider between hall rooms.
 * Pure SVG, zero JS, zero cost.
 */
export const WaveDivider: React.FC<WaveDividerProps> = ({
  fill = '#FFFDF7',
  bg = 'transparent',
  flip = false,
}) => (
  <div
    aria-hidden="true"
    style={{ background: bg, transform: flip ? 'scaleY(-1)' : undefined, lineHeight: 0 }}
  >
    <svg viewBox="0 0 1440 72" preserveAspectRatio="none" className="w-full h-[44px] sm:h-[72px] block">
      <path
        d="M0,40 C180,78 320,8 520,26 S860,74 1080,44 S1330,10 1440,34 L1440,72 L0,72 Z"
        fill={fill}
      />
      <path
        d="M0,48 C200,80 360,20 560,36 S880,76 1100,50 S1340,22 1440,42"
        fill="none"
        stroke={fill}
        strokeOpacity="0.35"
        strokeWidth="2"
      />
    </svg>
  </div>
);
