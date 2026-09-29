import React from 'react';
import { COUNTRY_MATRIX_SAMPLE } from '../data/conferenceData';
import { TextReveal } from './gallery/TextReveal';
import { FlagImg } from './gallery/FlagImg';

/**
 * Nations at the table — member states as clearly separated placard
 * cards with real flag images. Calm static grid, readable everywhere.
 */
export const NationsGrid: React.FC = () => {
  const seen = new Map<string, { flag: string; code: string; committee: string }>();
  for (const c of COUNTRY_MATRIX_SAMPLE) {
    if (!seen.has(c.country)) {
      seen.set(c.country, { flag: c.flagEmoji, code: c.flagCode, committee: c.committeeAcronym });
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

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
          {nations.map(([country, info]) => (
            <div
              key={country}
              className="duo-card p-4 sm:p-5 text-center hover:border-[#f4a024] transition-colors"
            >
              <FlagImg code={info.code} emoji={info.flag} country={country} />
              <div className="font-bold text-[#00387d] text-[15px] mt-2.5 leading-snug">{country}</div>
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
