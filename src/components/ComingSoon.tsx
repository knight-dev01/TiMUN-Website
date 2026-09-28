import React from 'react';
import { Users, Calendar, PenTool, Award } from 'lucide-react';
import { Watermark } from './gallery/Watermark';

const PENDING = [
  {
    icon: Users,
    title: 'Committees & Country Matrix',
    hint: 'The 8 councils and member-state allocations are being finalized.',
  },
  {
    icon: Calendar,
    title: 'Full 3-Day Schedule',
    hint: 'Session times, workshops and the gala program land here.',
  },
  {
    icon: PenTool,
    title: 'Delegate Toolkit',
    hint: 'Rules of procedure, study guides and the resolution desk.',
  },
  {
    icon: Award,
    title: 'Secretariat Roster',
    hint: 'Meet the student leaders running the conference.',
  },
];

/**
 * Honest placeholder: everything beyond About / Stories / Venue /
 * Registration is openly marked as loading for 2027. Sections return
 * here simply by re-adding them in App — no code is deleted.
 */
export const ComingSoon: React.FC = () => (
  <section id="coming-soon" className="relative bg-white py-20 overflow-hidden">
    <Watermark side="right" />
    <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <p className="text-[15px] font-bold uppercase tracking-widest text-[#dd0000]">
          Still in the oven
        </p>
        <h2 className="duo-section-title text-4xl sm:text-5xl mt-2">
          More rooms opening soon
        </h2>
        <p className="text-[#777777] text-[17px] mt-3">
          We are starting with the essentials. These halls unlock as the
          Secretariat publishes them — watch the Stories below.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {PENDING.map(item => (
          <div key={item.title} className="duo-card p-5 opacity-90">
            <span className="inline-flex w-11 h-11 rounded-xl bg-slate-100 border-2 border-slate-200 items-center justify-center">
              <item.icon className="w-5 h-5 text-[#afafaf]" />
            </span>
            <h3 className="duo-section-title text-lg mt-3">{item.title}</h3>
            <p className="text-[13px] text-[#777777] mt-1 leading-relaxed">{item.hint}</p>
            <span className="duo-chip mt-3 !border-[#f4a024] !text-[#b56a00]">
              Pending
            </span>
          </div>
        ))}
      </div>
    </div>
  </section>
);
