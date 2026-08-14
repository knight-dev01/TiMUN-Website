import React, { useState } from 'react';
import { Award, Mail } from 'lucide-react';
import { useConferenceData } from '../context/ConferenceContext';

export const SecretariatSection: React.FC = () => {
  const { secretariatTeam, conferenceInfo } = useConferenceData();
  const [selectedDept, setSelectedDept] = useState<string>('All');

  const departments = ['All', 'Executive', 'Academics', 'Logistics', 'Delegate Affairs', 'Communications'];

  const filteredMembers = secretariatTeam.filter(member => {
    if (selectedDept === 'All') return true;
    return member.department === selectedDept;
  });

  return (
    <section id="secretariat" className="py-20 bg-white text-slate-900 border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-100 border border-amber-300 text-amber-900 text-[11px] font-bold uppercase tracking-widest mb-3">
            <Award className="w-3.5 h-3.5 text-amber-700" />
            <span>Executive Board & Leadership</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-blue-900 tracking-tight">
            The Conference Secretariat
          </h2>
          <p className="text-slate-600 mt-2 text-sm sm:text-base leading-relaxed">
            Meet the student leaders driving academic content, delegate affairs, and conference operations for {conferenceInfo.acronym || 'TiMUN 2027'}.
          </p>
        </div>


        {/* Department Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-3.5 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                selectedDept === dept
                  ? 'bg-blue-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:text-blue-900 border border-slate-200'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>

        {/* Secretariat Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="bg-slate-50 rounded border border-slate-200 p-6 hover:border-blue-900 transition-all duration-300 flex flex-col items-center text-center shadow-xs group"
            >
              <div className="w-28 h-28 rounded overflow-hidden border-2 border-amber-400 mb-4 shadow-xs group-hover:scale-105 transition-transform">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300 mb-2">
                {member.department}
              </span>

              <h3 className="font-serif font-bold text-lg text-blue-900">
                {member.name}
              </h3>

              <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mt-0.5">
                {member.role}
              </p>

              <p className="text-xs text-slate-600 mt-3 line-clamp-3 leading-relaxed">
                {member.bio}
              </p>

              <div className="pt-4 mt-auto border-t border-slate-200 w-full flex items-center justify-center gap-3">
                <a
                  href={`mailto:${member.email}`}
                  className="text-xs text-slate-600 hover:text-blue-900 flex items-center gap-1.5 font-medium transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-amber-600" />
                  <span>{member.email}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};


