import React, { useState } from 'react';
import { PenTool, HelpCircle, FileCheck, Sparkles, Search, BookOpen, ChevronRight, CheckCircle2 } from 'lucide-react';
import { ROP_CHEAT_SHEET } from '../data/conferenceData';

interface DelegateToolkitProps {
  onOpenResolutionBuilder: () => void;
}

export const DelegateToolkit: React.FC<DelegateToolkitProps> = ({ onOpenResolutionBuilder }) => {
  const [activeTab, setActiveTab] = useState<'rop' | 'position' | 'resolution'>('rop');
  const [searchRop, setSearchRop] = useState('');

  const filteredRop = ROP_CHEAT_SHEET.filter(
    item => item.motion.toLowerCase().includes(searchRop.toLowerCase()) ||
            item.description.toLowerCase().includes(searchRop.toLowerCase())
  );

  return (
    <section id="toolkit" className="py-20 bg-slate-50 text-slate-900 border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-100 border border-amber-300 text-amber-900 text-[11px] font-bold uppercase tracking-widest mb-3">
            <PenTool className="w-3.5 h-3.5 text-amber-700" />
            <span>Academic & Diplomatic Preparation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-blue-900 tracking-tight">
            Delegate Preparation Toolkit
          </h2>
          <p className="text-slate-600 mt-2 text-sm sm:text-base leading-relaxed">
            Master UN parliamentary procedure, draft winning position papers, and build resolutions using our digital tools.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 bg-white rounded border border-slate-200 shadow-xs">
            <button
              onClick={() => setActiveTab('rop')}
              className={`px-4 sm:px-6 py-2.5 rounded text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'rop'
                  ? 'bg-blue-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-blue-900'
              }`}
            >
              Parliamentary Rules (ROP)
            </button>
            <button
              onClick={() => setActiveTab('position')}
              className={`px-4 sm:px-6 py-2.5 rounded text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'position'
                  ? 'bg-blue-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-blue-900'
              }`}
            >
              Position Paper Guidelines
            </button>
            <button
              onClick={() => setActiveTab('resolution')}
              className={`px-4 sm:px-6 py-2.5 rounded text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'resolution'
                  ? 'bg-blue-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-blue-900'
              }`}
            >
              Draft Resolution Helper
            </button>
          </div>
        </div>

        {/* Tab 1: Rules of Procedure Table */}
        {activeTab === 'rop' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 rounded border border-slate-200 gap-3 shadow-xs">
              <span className="text-xs text-slate-600 font-bold uppercase tracking-wider">Quick Parliamentary Reference Guide</span>
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter motion or point..."
                  value={searchRop}
                  onChange={(e) => setSearchRop(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded pl-9 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-900"
                />
              </div>
            </div>

            <div className="overflow-x-auto bg-white rounded border border-slate-200 shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-blue-900 text-white uppercase font-bold text-[11px] tracking-wider">
                  <tr>
                    <th className="p-4">Motion / Point</th>
                    <th className="p-4">Purpose & Description</th>
                    <th className="p-4 text-center">Can Interrupt Speaker?</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  {filteredRop.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-bold text-blue-900 font-serif text-sm">
                        {item.motion}
                      </td>
                      <td className="p-4 leading-relaxed text-slate-600">
                        {item.description}
                      </td>
                      <td className="p-4 text-center font-bold">
                        <span className={`px-2.5 py-0.5 rounded text-[10px] uppercase tracking-wider ${
                          item.interruption.startsWith('Yes')
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}>
                          {item.interruption}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Position Paper Guidelines */}
        {activeTab === 'position' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
            <div className="bg-white p-6 rounded border border-slate-200 space-y-4 shadow-xs">
              <h3 className="font-serif font-bold text-lg text-blue-900 flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-amber-600" />
                <span>Required Structure (2 Pages Maximum)</span>
              </h3>

              <div className="space-y-3 text-xs text-slate-600">
                <div className="p-3 bg-slate-50 rounded border border-slate-200">
                  <strong className="text-blue-900 block mb-1 font-serif text-sm">Section I: Topic Background & History</strong>
                  Explain the historical context, key treaties, and past UN resolutions related to your committee's topic.
                </div>

                <div className="p-3 bg-slate-50 rounded border border-slate-200">
                  <strong className="text-blue-900 block mb-1 font-serif text-sm">Section II: National Position & Past Actions</strong>
                  Detail your assigned country's specific policy, national legislation, voting record, and regional alliance stance.
                </div>

                <div className="p-3 bg-slate-50 rounded border border-slate-200">
                  <strong className="text-blue-900 block mb-1 font-serif text-sm">Section III: Proposed Multilateral Solutions</strong>
                  Propose actionable, realistic operative clauses your delegation intends to introduce during committee debate.
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded border border-slate-200 space-y-4 shadow-xs">
              <h3 className="font-serif font-bold text-lg text-blue-900">
                Award Eligibility Criteria
              </h3>

              <ul className="space-y-3 text-xs text-slate-600 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>Submitted via email to <strong>positionpapers@timun.org</strong> by October 31, 2026.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>Formatted in Times New Roman 12pt, 1.15 line spacing, 1-inch margins.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>Includes full Chicago or APA citations for all facts and statistics cited.</span>
                </li>
              </ul>

              <div className="p-4 bg-amber-50 border border-amber-300 rounded text-xs text-amber-900 font-semibold leading-relaxed">
                Note: Plagiarism checks are run on all submitted position papers. AI-assisted research must be verified and cited properly.
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Resolution Helper Promo */}
        {activeTab === 'resolution' && (
          <div className="bg-white p-8 rounded border border-slate-200 text-center space-y-4 animate-fadeIn max-w-2xl mx-auto shadow-sm">
            <div className="w-14 h-14 rounded bg-amber-100 border border-amber-300 text-amber-800 flex items-center justify-center mx-auto">
              <Sparkles className="w-7 h-7" />
            </div>

            <h3 className="font-serif font-bold text-2xl text-blue-900">
              Interactive UN Resolution Assistant
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Build compliant preambular and operative clauses with proper UN formatting. Export cleanly formatted text to copy directly into working papers on the committee floor.
            </p>

            <button
              onClick={onOpenResolutionBuilder}
              className="px-6 py-3 rounded text-xs font-bold uppercase tracking-widest text-white bg-blue-900 hover:bg-blue-800 shadow-sm flex items-center gap-2 mx-auto cursor-pointer"
            >
              <span>Launch Resolution Drafter</span>
              <ChevronRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
