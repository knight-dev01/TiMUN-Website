import React, { useState } from 'react';
import { Users, Search, BookOpen, MapPin, ChevronRight, Filter, Shield, Globe } from 'lucide-react';
import { Committee, CommitteeCategory } from '../types';
import { useConferenceData } from '../context/ConferenceContext';
import { COUNTRY_MATRIX_SAMPLE } from '../data/conferenceData';
import { CommitteeDetailModal } from './CommitteeDetailModal';

interface CommitteesSectionProps {
  onOpenRegisterWithChoice: (committeeAcronym: string, countryName: string) => void;
}

export const CommitteesSection: React.FC<CommitteesSectionProps> = ({ onOpenRegisterWithChoice }) => {
  const { committees } = useConferenceData();
  const [selectedCategory, setSelectedCategory] = useState<CommitteeCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCommittee, setSelectedCommittee] = useState<Committee | null>(null);

  // Country Matrix State
  const [matrixRegionFilter, setMatrixRegionFilter] = useState<string>('All');

  // Filter committees
  const filteredCommittees = committees.filter((c) => {
    const matchesCategory = selectedCategory === 'all' || c.category === selectedCategory;
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.acronym.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.topics.some(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Filter matrix items
  const filteredMatrix = COUNTRY_MATRIX_SAMPLE.filter((item) => {
    return matrixRegionFilter === 'All' || item.region === matrixRegionFilter;
  });

  return (
    <section id="committees" className="py-20 vx-paper text-slate-900 border-b border-[#fdeecd] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-[#fdeecd] border border-[#f7b955] text-[#5f3a00] text-[11px] font-bold uppercase tracking-widest mb-3">
            <Users className="w-3.5 h-3.5 text-[#8a5200]" />
            <span>Academic Organs & Councils</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#00387d] tracking-tight">
            Committees & Agenda Topics
          </h2>
          <p className="text-slate-600 mt-2 text-sm sm:text-base leading-relaxed">
            Explore {committees.length} specialized committees designed to challenge diplomats across all levels of Model UN experience.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {[
              { id: 'all', label: `All Councils (${committees.length})` },
              { id: 'general-assembly', label: 'General Assembly' },
              { id: 'specialized', label: 'Specialized Organs' },
              { id: 'crisis', label: 'Crisis Suites' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as CommitteeCategory)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#00387d] text-white shadow-xs'
                    : 'text-slate-600 hover:text-[#00387d] hover:bg-slate-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search committee or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#00387d]"
            />
          </div>

        </div>

        {/* Committee Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCommittees.map((committee) => {
            const percentage = Math.round((committee.assignedCount / committee.delegateCapacity) * 100);
            return (
              <div
                key={committee.id}
                className="group bg-white rounded-xl border border-slate-200 hover:border-[#00387d] transition-all duration-300 flex flex-col overflow-hidden shadow-xs hover:shadow-md"
              >
                {/* Header Image Thumbnail */}
                <div className="relative h-44 overflow-hidden bg-slate-900">
                  <img
                    src={committee.bgImage}
                    alt={committee.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#00387d]/90 via-[#00387d]/30 to-transparent" />
                  
                  {/* Category Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-xl bg-[#00387d] text-white text-[11px] font-bold uppercase tracking-wider border border-[#f4a024]/40">
                      {committee.acronym}
                    </span>
                    <span className="px-2 py-0.5 rounded-xl bg-[#fdeecd] text-[#5f3a00] text-[10px] font-bold border border-[#f7b955]">
                      {committee.level}
                    </span>
                  </div>

                  {/* Room Tag */}
                  <div className="absolute bottom-3 left-3 text-[11px] text-white flex items-center gap-1 font-medium bg-[#15305b]/80 px-2 py-0.5 rounded-xl backdrop-blur-sm">
                    <MapPin className="w-3 h-3 text-[#f4a024]" />
                    <span>{committee.roomLocation}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-serif font-bold text-lg text-[#00387d] group-hover:text-[#8a5200] transition-colors">
                      {committee.name}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 mt-1 leading-relaxed">
                      {committee.description}
                    </p>

                    {/* Topics List Preview */}
                    <div className="mt-3 space-y-1 pt-3 border-t border-slate-200">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-[#8a5200]">
                        Primary Agenda Topic:
                      </div>
                      <div className="text-xs font-semibold text-slate-800 line-clamp-2">
                        {committee.topics[0]?.title}
                      </div>
                    </div>
                  </div>

                  {/* Capacity Bar & Action Button */}
                  <div className="space-y-3 pt-3 border-t border-slate-200">
                    <div>
                      <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                        <span>Delegate Capacity ({committee.assignedCount}/{committee.delegateCapacity})</span>
                        <span className="font-bold text-[#00387d]">{percentage}% Assigned</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                        <div
                          className="h-full bg-[#00387d] rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <button
                        onClick={() => setSelectedCommittee(committee)}
                        className="flex-1 px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 hover:border-[#00387d] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-[#b56a00]" />
                        <span>Study Guide</span>
                      </button>

                      <button
                        onClick={() => onOpenRegisterWithChoice(committee.acronym, '')}
                        className="px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-[#00387d] hover:bg-[#294a70] transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <span>Apply</span>
                        <ChevronRight className="w-3.5 h-3.5 text-[#f4a024]" />
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Live Country Matrix Widget Section */}
        <div className="mt-16 bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#8a5200] mb-1">
                <Globe className="w-4 h-4 text-[#b56a00]" />
                <span>Live Delegation Matrix</span>
              </div>
              <h3 className="font-serif font-bold text-xl text-[#00387d]">
                Country Allocations & Seat Availability
              </h3>
            </div>

            {/* Region Filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider hidden sm:inline">Region:</span>
              <div className="flex flex-wrap gap-1">
                {['All', 'Africa', 'Americas', 'Asia-Pacific', 'Europe', 'Middle East'].map((reg) => (
                  <button
                    key={reg}
                    onClick={() => setMatrixRegionFilter(reg)}
                    className={`px-2.5 py-1 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                      matrixRegionFilter === reg
                        ? 'bg-[#00387d] text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {reg}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredMatrix.map((item) => (
              <div
                key={item.id}
                className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between hover:border-[#00387d] transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.flagEmoji}</span>
                  <div>
                    <div className="text-xs font-bold text-[#00387d]">{item.country}</div>
                    <div className="text-[10px] text-[#8a5200] font-bold uppercase tracking-wider">{item.committeeAcronym}</div>
                  </div>
                </div>

                {item.status === 'available' ? (
                  <button
                    onClick={() => onOpenRegisterWithChoice(item.committeeAcronym, item.country)}
                    className="px-2.5 py-1 rounded-xl bg-[#fdeecd] text-[#5f3a00] border border-[#f7b955] hover:bg-[#00387d] hover:text-white hover:border-[#00387d] text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer"
                  >
                    Select Seat
                  </button>
                ) : (
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xl ${
                    item.status === 'assigned' ? 'bg-[#fde2e2] text-[#a80e0e] border border-[#f8bcbc]' : 'bg-[#fdeecd] text-[#8a5200] border border-[#fbdda1]'
                  }`}>
                    {item.status}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Committee Detail Modal */}
      <CommitteeDetailModal
        committee={selectedCommittee}
        onClose={() => setSelectedCommittee(null)}
        onSelectCountryToRegister={(committeeAcronym, countryName) => {
          setSelectedCommittee(null);
          onOpenRegisterWithChoice(committeeAcronym, countryName);
        }}
      />
    </section>
  );
};
