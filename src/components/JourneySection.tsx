import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Check } from 'lucide-react';
import { HandArrow } from './gallery/HumanMarks';
import { Watermark } from './gallery/Watermark';

interface JourneySectionProps {
  onOpenRegister: () => void;
  onOpenResolutionBuilder: () => void;
  onExploreCommittees: () => void;
}

const DONE_KEY = 'timun_journey_done_v1';

function readDone(): Record<string, boolean> {
  try {
    return JSON.parse(localStorage.getItem(DONE_KEY) || '{}');
  } catch {
    return {};
  }
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

/**
 * Road to the Gavel — static six-step guide path. No XP, no streaks:
 * just the clear order of business, Duo-path style, TiMUN voice.
 */
export const JourneySection: React.FC<JourneySectionProps> = ({
  onOpenRegister,
  onOpenResolutionBuilder,
  onExploreCommittees,
}) => {
  const reduceMotion = useReducedMotion();
  const [done, setDone] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setDone(readDone());
    const refresh = () => setDone(readDone());
    window.addEventListener('focus', refresh);
    return () => window.removeEventListener('focus', refresh);
  }, []);

  const complete = (key: string) => {
    const next = { ...readDone(), [key]: true };
    try {
      localStorage.setItem(DONE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
    setDone(next);
  };

  const steps = [
    {
      key: 'registered',
      title: 'Take your seat',
      hint: 'Register as delegate, delegation or chair staff',
      cta: 'Register',
      action: onOpenRegister,
    },
    {
      key: 'committees_explored',
      title: 'Meet your council',
      hint: 'Tour the 8 committees and pick your arena',
      cta: 'Explore',
      action: () => {
        complete('committees_explored');
        onExploreCommittees();
      },
    },
    {
      key: 'toolkit_opened',
      title: 'Learn the rules',
      hint: 'Master motions, points and position papers',
      cta: 'Open toolkit',
      action: () => {
        complete('toolkit_opened');
        scrollTo('toolkit');
      },
    },
    {
      key: 'resolution_opened',
      title: 'Draft a resolution',
      hint: 'Write clauses at the resolution desk',
      cta: 'Draft',
      action: () => {
        complete('resolution_opened');
        onOpenResolutionBuilder();
      },
    },
    {
      key: 'subscribed',
      title: 'Get the bulletin',
      hint: 'Study guides and country alerts by email',
      cta: 'Subscribe',
      action: () => {
        complete('subscribed');
        scrollTo('bulletin');
      },
    },
    {
      key: 'arrival',
      title: 'Walk in on Nov 12',
      hint: 'Accreditation opens in Yaba, Lagos',
      cta: '',
      action: () => scrollTo('venue'),
    },
  ];

  const firstOpen = steps.findIndex(s => !done[s.key] && s.key !== 'arrival');

  return (
    <section id="journey" className="relative bg-white py-20 overflow-hidden">
      <Watermark side="left" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-[15px] font-bold uppercase tracking-widest text-[#dd0000]">
            Your road to the gavel
          </p>
          <h2 className="duo-section-title text-4xl sm:text-5xl mt-2">
            Six small steps. One big hall.
          </h2>
          <p className="text-[#777777] text-[17px] mt-3">
            Do them in any order — each one brings the opening gavel closer.
          </p>
        </div>

        <ol className="relative">
          <span
            aria-hidden="true"
            className="absolute left-[27px] sm:left-1/2 top-2 bottom-2 w-0 sm:-translate-x-1/2 border-l-[3px] border-dashed border-[#00387d]/25"
          />
          {steps.map((step, i) => {
            const isDone = !!done[step.key];
            const locked = step.key === 'arrival';
            const isCurrent = i === firstOpen;
            const left = i % 2 === 0;
            return (
              <li key={step.key} className="relative flex sm:justify-center gap-4 pb-8 last:pb-0">
                <motion.span
                  initial={false}
                  animate={isCurrent && !isDone && !reduceMotion ? { scale: [1, 1.12, 1] } : { scale: 1 }}
                  transition={{ repeat: isCurrent && !isDone ? Infinity : 0, duration: 1.8 }}
                  className={`relative z-10 ml-3 sm:ml-0 shrink-0 flex w-14 h-14 rounded-full items-center justify-center border-[3px] font-bold text-lg ${
                    isDone
                      ? 'bg-[#54b77e] border-[#35794f] text-white'
                      : locked
                      ? 'bg-slate-100 border-slate-200 text-[#afafaf]'
                      : 'bg-white border-[#f4a024] text-[#00387d]'
                  }`}
                >
                  {isDone ? <Check className="w-6 h-6" /> : <span>{i + 1}</span>}
                </motion.span>

                <div
                  className={`flex-1 sm:flex-none sm:w-[42%] duo-card p-5 sm:absolute sm:top-0 ${
                    left ? 'sm:right-[54%]' : 'sm:left-[54%]'
                  } ${isCurrent ? '!border-[#f4a024]' : ''}`}
                >
                  <h3 className="duo-section-title text-xl">{step.title}</h3>
                  <p className="text-[15px] text-[#777777] mt-1">{step.hint}</p>
                  {!isDone && !locked && (
                    <button onClick={step.action} className="duo-btn duo-btn-gold mt-3 !py-2 !px-4">
                      <span>{isCurrent ? 'Do this next' : step.cta}</span>
                      <HandArrow className="w-6 h-4" />
                    </button>
                  )}
                  {isDone && (
                    <p className="text-[13px] font-bold text-[#35794f] mt-2 uppercase tracking-wider">
                      Done — nicely played.
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};
