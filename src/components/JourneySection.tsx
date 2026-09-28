import React, { useCallback, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Check, Flame, Star, Lock } from 'lucide-react';
import {
  Passport,
  awardXp,
  nextRankFor,
  rankFor,
  readPassport,
  touchVisit,
} from '../lib/passport';
import { HandArrow } from './gallery/HumanMarks';

interface JourneySectionProps {
  onOpenRegister: () => void;
  onOpenResolutionBuilder: () => void;
  onExploreCommittees: () => void;
}

interface Node {
  key: string;
  title: string;
  hint: string;
  xp: number;
  action: () => void;
  cta: string;
}

const NODES: Node[] = [
  {
    key: 'registered',
    title: 'Take your seat',
    hint: 'Register as delegate, delegation or chair staff',
    xp: 100,
    action: () => {},
    cta: 'Register',
  },
  {
    key: 'committees_explored',
    title: 'Meet your council',
    hint: 'Tour the 8 committees and pick your arena',
    xp: 10,
    action: () => {},
    cta: 'Explore',
  },
  {
    key: 'toolkit_opened',
    title: 'Learn the rules',
    hint: 'Master motions, points and position papers',
    xp: 10,
    action: () => {},
    cta: 'Open toolkit',
  },
  {
    key: 'resolution_opened',
    title: 'Draft a resolution',
    hint: 'Write clauses at the resolution desk',
    xp: 20,
    action: () => {},
    cta: 'Draft',
  },
  {
    key: 'subscribed',
    title: 'Get the bulletin',
    hint: 'Study guides and country alerts by email',
    xp: 15,
    action: () => {},
    cta: 'Subscribe',
  },
  {
    key: 'arrival',
    title: 'Walk in on Nov 12',
    hint: 'Accreditation opens at Laurie Auditorium',
    xp: 0,
    action: () => {},
    cta: 'Locked',
  },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

/**
 * Road to the Gavel — Duolingo-style winding path, TiMUN voice.
 * One node at a time, XP for every step, streak for coming back.
 */
export const JourneySection: React.FC<JourneySectionProps> = ({
  onOpenRegister,
  onOpenResolutionBuilder,
  onExploreCommittees,
}) => {
  const [passport, setPassport] = useState<Passport>(() => touchVisit());

  const refresh = useCallback(() => setPassport(readPassport()), []);

  useEffect(() => {
    refresh();
    window.addEventListener('timun:xp', refresh);
    window.addEventListener('focus', refresh);
    return () => {
      window.removeEventListener('timun:xp', refresh);
      window.removeEventListener('focus', refresh);
    };
  }, [refresh]);

  const bound: Node[] = [
    { ...NODES[0], action: onOpenRegister },
    {
      ...NODES[1],
      action: () => {
        awardXp('committees_explored');
        onExploreCommittees();
      },
    },
    {
      ...NODES[2],
      action: () => {
        awardXp('toolkit_opened');
        scrollTo('toolkit');
      },
    },
    { ...NODES[3], action: onOpenResolutionBuilder },
    {
      ...NODES[4],
      action: () => {
        awardXp('subscribed');
        scrollTo('bulletin');
      },
    },
    { ...NODES[5], action: () => scrollTo('venue') },
  ];

  const firstOpen = bound.findIndex(n => !passport.done[n.key] && n.key !== 'arrival');
  const next = nextRankFor(passport.xp);
  const progress = next
    ? Math.min(100, Math.round((passport.xp / (passport.xp + next.need)) * 100))
    : 100;

  return (
    <section id="journey" className="py-20 vx-paper text-slate-900 border-b border-amber-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-4">
          <div className="text-xs font-bold uppercase tracking-widest text-amber-700 mb-2">
            Your road to the gavel
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Six small steps. One big hall.
          </h2>
          <p className="text-slate-500 mt-3 text-sm sm:text-base">
            Do them in any order — every step earns XP and brings the opening
            gavel closer.
          </p>
        </div>

        {/* Passport strip: rank, XP bar, streak */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#041D50] text-white text-xs font-bold">
            <Star className="w-3.5 h-3.5 text-amber-400" />
            {rankFor(passport.xp)} · {passport.xp} XP
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-amber-200 text-xs font-bold text-slate-700">
            <Flame className={`w-3.5 h-3.5 ${passport.streakDays > 1 ? 'text-orange-500' : 'text-slate-300'}`} />
            {passport.streakDays > 0 ? `${passport.streakDays}-day streak` : 'Start your streak today'}
          </span>
          {next && (
            <span className="text-xs text-slate-500">
              {next.need} XP to {next.title}
            </span>
          )}
        </div>
        <div className="h-2 rounded-full bg-amber-100 overflow-hidden mb-12 max-w-xl mx-auto">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-amber-400 to-[#0BE149]"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ type: 'spring', stiffness: 90, damping: 20 }}
          />
        </div>

        {/* Winding path */}
        <ol className="relative">
          {/* Dashed spine */}
          <span
            aria-hidden="true"
            className="absolute left-[27px] sm:left-1/2 top-2 bottom-2 w-0 sm:-translate-x-1/2 border-l-2 border-dashed border-[#08307F]/25"
          />
          {bound.map((node, i) => {
            const done = !!passport.done[node.key];
            const locked = node.key === 'arrival';
            const isCurrent = i === firstOpen;
            const left = i % 2 === 0;
            return (
              <li key={node.key} className="relative flex sm:justify-center gap-4 sm:gap-0 pb-8 last:pb-0">
                {/* Node dot */}
                <span className="relative z-10 ml-3 sm:ml-0 shrink-0">
                  <motion.span
                    initial={false}
                    animate={isCurrent && !done ? { scale: [1, 1.12, 1] } : { scale: 1 }}
                    transition={{ repeat: isCurrent && !done ? Infinity : 0, duration: 1.8 }}
                    className={`flex w-12 h-12 rounded-full items-center justify-center border-[3px] font-bold ${
                      done
                        ? 'bg-[#0BE149] border-[#0BE149] text-[#041D50]'
                        : locked
                        ? 'bg-slate-100 border-slate-200 text-slate-400'
                        : 'bg-white border-amber-400 text-slate-900 shadow-md'
                    }`}
                  >
                    {done ? <Check className="w-5 h-5" /> : locked ? <Lock className="w-5 h-5" /> : <span>{i + 1}</span>}
                  </motion.span>
                </span>

                {/* Card */}
                <div
                  className={`flex-1 sm:flex-none sm:w-[42%] bg-white rounded-2xl border p-4 sm:absolute sm:top-0 ${
                    left ? 'sm:right-[54%]' : 'sm:left-[54%]'
                  } ${
                    done
                      ? 'border-[#0BE149]/50'
                      : isCurrent
                      ? 'border-amber-400 shadow-lg'
                      : 'border-slate-200'
                  } ${i % 2 === 0 ? 'sm:rotate-[-0.5deg]' : 'sm:rotate-[0.5deg]'}`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-bold text-slate-900">{node.title}</h3>
                    {node.xp > 0 && (
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          done ? 'bg-[#0BE149]/15 text-emerald-800' : 'bg-amber-100 text-amber-900'
                        }`}
                      >
                        +{node.xp} XP
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{node.hint}</p>
                  {!done && !locked && (
                    <button
                      onClick={node.action}
                      className="duo-btn mt-3 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider cursor-pointer"
                    >
                      <span>{isCurrent ? 'Do this next' : node.cta}</span>
                      <HandArrow className="w-6 h-4" />
                    </button>
                  )}
                  {done && (
                    <p className="text-[11px] font-bold text-emerald-700 mt-2 uppercase tracking-wider">
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
