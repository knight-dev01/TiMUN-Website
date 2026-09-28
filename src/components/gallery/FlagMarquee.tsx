import React from 'react';
import { COUNTRY_MATRIX_SAMPLE } from '../../data/conferenceData';

/**
 * Assembly-of-nations ticker: member-state flags + names drifting past
 * on a single GPU transform. Pauses on hover, static under reduced-motion.
 */
export const FlagMarquee: React.FC = () => {
  const seen = new Map<string, string>();
  for (const c of COUNTRY_MATRIX_SAMPLE) {
    if (!seen.has(c.country)) seen.set(c.country, c.flagEmoji);
  }
  const nations = [...seen.entries()].slice(0, 16);
  const loop = [...nations, ...nations];

  return (
    <div className="hall-marquee relative overflow-hidden bg-[#041D50] border-y border-white/10 py-3" aria-label="Member states represented at TiMUN">
      <div className="hall-marquee-track flex w-max items-center gap-8 pr-8">
        {loop.map(([country, flag], i) => (
          <span key={`${country}-${i}`} className="flex items-center gap-2 text-sm text-white/85 whitespace-nowrap">
            <span className="text-xl" aria-hidden="true">{flag}</span>
            <span className="font-semibold">{country}</span>
            <span className="ml-6 text-[#0BE149]" aria-hidden="true">·</span>
          </span>
        ))}
      </div>
      {/* Soft edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#041D50] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#041D50] to-transparent" />
    </div>
  );
};
