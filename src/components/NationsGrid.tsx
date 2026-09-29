import React from 'react';
import { useReducedMotion } from 'motion/react';
import { COUNTRY_MATRIX_SAMPLE } from '../data/conferenceData';
import { TextReveal } from './gallery/TextReveal';

/**
 * Nations at the table — member-state placards riding a slowly turning
 * 3D cylinder (pure CSS, one GPU transform). Pauses on hover, rests as
 * a plain grid under reduced-motion.
 */
export const NationsGrid: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const seen = new Map<string, { flag: string; committee: string }>();
  for (const c of COUNTRY_MATRIX_SAMPLE) {
    if (!seen.has(c.country)) {
      seen.set(c.country, { flag: c.flagEmoji, committee: c.committeeAcronym });
    }
  }
  const nations = [...seen.entries()].slice(0, 16);
  const step = 360 / nations.length;

  return (
    <section id="nations" className="py-12 sm:py-20 bg-white border-b border-slate-100 overflow-hidden">
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
            Delegates speak for real member states — sixteen placards
            already claimed for 2027.
          </p>
        </div>

        {reduceMotion ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {nations.map(([country, info]) => (
              <div key={country} className="duo-card p-4 text-center">
                <div className="text-4xl leading-none" aria-hidden="true">{info.flag}</div>
                <div className="font-bold text-[#00387d] text-[15px] mt-2 leading-snug">{country}</div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#777777] mt-1">
                  {info.committee}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="cyl-stage" role="list" aria-label="Member states">
            <div className="cyl-rotor">
              {nations.map(([country, info], i) => (
                <div
                  key={country}
                  role="listitem"
                  className="cyl-card duo-card"
                  style={{ transform: `rotateY(${i * step}deg) translateZ(var(--cyl-r))` }}
                >
                  <div className="text-4xl leading-none" aria-hidden="true">{info.flag}</div>
                  <div className="font-bold text-[#00387d] text-[15px] mt-2 leading-snug">{country}</div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#777777] mt-1">
                    {info.committee}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
