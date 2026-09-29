import React from 'react';
import { COUNTRY_MATRIX_SAMPLE } from '../data/conferenceData';
import { TextReveal } from './gallery/TextReveal';

/**
 * Nations at the table — a static placard wall of member states.
 * No animation cost: pure HTML, readable everywhere, unmistakably MUN.
 */
export const NationsGrid: React.FC = () => {
  const seen = new Map<string, { flag: string; committee: string }>();
  for (const c of COUNTRY_MATRIX_SAMPLE) {
    if (!seen.has(c.country)) {
      seen.set(c.country, { flag: c.flagEmoji, committee: c.committeeAcronym });
    }
  }
  const nations = [...seen.entries()].slice(0, 16);

  return (
    <section id="nations" className="py-12 sm:py-20 bg-white border-b border-slate-100">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-[15px] font-bold uppercase tracking-widest text-[#dd0000]">
            Roll call
          </p>
          <TextReveal
            text="Nations at the table"
            className="duo-section-title text-4xl sm:text-5xl mt-2"
          />
          <p className="text-[#777777] text-[17px] mt-3">
            Delegates speak for real member states — here are sixteen
            placards already claimed for 2027.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {nations.map(([country, info]) => (
            <div
              key={country}
              className="duo-card p-4 text-center hover:border-[#f4a024] transition-colors"
            >
              <div className="text-4xl leading-none" aria-hidden="true">
                {info.flag}
              </div>
              <div className="font-bold text-[#00387d] text-[15px] mt-2 leading-snug">
                {country}
              </div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#777777] mt-1">
                {info.committee}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
