import React, { useState } from 'react';
import { X, Plus, Trash2, Copy, Check, Download, Sparkles, FileText, Globe } from 'lucide-react';
import { useConferenceData } from '../context/ConferenceContext';
import { OPERATIVE_STARTERS, PREAMBULAR_STARTERS } from '../data/conferenceData';
import { OperativeClause, PreambularClause, ResolutionDraft } from '../types';

interface ResolutionBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResolutionBuilderModal: React.FC<ResolutionBuilderModalProps> = ({ isOpen, onClose }) => {
  const { committees } = useConferenceData();
  if (!isOpen) return null;

  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');

  const [draft, setDraft] = useState<ResolutionDraft>({
    committeeName: committees[0]?.acronym || 'UNSC',
    topicTitle: committees[0]?.topics[0]?.title || 'Global Peace & Security',
    sponsors: ['United States', 'Germany', 'Japan'],
    signatories: ['Nigeria', 'Brazil', 'Canada', 'Australia'],
    preambularClauses: [
      { id: 'p1', starter: 'Bearing in mind', text: 'the vital necessity of maintaining international peace and stability in global trade routes,' },
      { id: 'p2', starter: 'Deeply concerned', text: 'by recent unilateral disruptions and asymmetric security hazards in maritime chokepoints,' }
    ],
    operativeClauses: [
      { id: 'o1', number: 1, starter: 'Calls upon', text: 'all UN Member States to establish joint maritime safety communication hubs in regional ports;', subClauses: ['Providing real-time navigational telemetry to merchant vessels', 'Coordinating search and rescue operations'] },
      { id: 'o2', number: 2, starter: 'Encourages', text: 'the creation of a multilateral task force under UN Peacekeeping guidelines to monitor international waters;', subClauses: [] }
    ]
  });


  const handleAddPreambular = () => {
    const newClause: PreambularClause = {
      id: 'p_' + Date.now(),
      starter: PREAMBULAR_STARTERS[0],
      text: 'insert preambular context here,'
    };
    setDraft(prev => ({ ...prev, preambularClauses: [...prev.preambularClauses, newClause] }));
  };

  const handleRemovePreambular = (id: string) => {
    setDraft(prev => ({
      ...prev,
      preambularClauses: prev.preambularClauses.filter(p => p.id !== id)
    }));
  };

  const handleAddOperative = () => {
    const newClause: OperativeClause = {
      id: 'o_' + Date.now(),
      number: draft.operativeClauses.length + 1,
      starter: OPERATIVE_STARTERS[0],
      text: 'insert operative recommendation here;',
      subClauses: []
    };
    setDraft(prev => ({ ...prev, operativeClauses: [...prev.operativeClauses, newClause] }));
  };

  const handleRemoveOperative = (id: string) => {
    const filtered = draft.operativeClauses.filter(o => o.id !== id);
    // re-number
    const renumbered = filtered.map((c, idx) => ({ ...c, number: idx + 1 }));
    setDraft(prev => ({ ...prev, operativeClauses: renumbered }));
  };

  const generateFullText = () => {
    let output = `DRAFT RESOLUTION 1.1\n`;
    output += `COMMITTEE: ${draft.committeeName}\n`;
    output += `TOPIC: ${draft.topicTitle}\n`;
    output += `SPONSORS: ${draft.sponsors.join(', ')}\n`;
    output += `SIGNATORIES: ${draft.signatories.join(', ')}\n\n`;
    output += `The ${draft.committeeName},\n\n`;

    draft.preambularClauses.forEach(p => {
      output += `${p.starter} ${p.text}\n\n`;
    });

    draft.operativeClauses.forEach((o, idx) => {
      output += `${o.number}. ${o.starter} ${o.text}\n`;
      o.subClauses.forEach((sub, sIdx) => {
        const letter = String.fromCharCode(97 + sIdx);
        output += `    (${letter}) ${sub};\n`;
      });
      if (idx === draft.operativeClauses.length - 1) {
        output = output.slice(0, -2) + '.\n';
      } else {
        output += `\n`;
      }
    });

    return output;
  };

  const handleCopy = () => {
    const text = generateFullText();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-xl relative flex flex-col text-slate-900">
        
        {/* Header */}
        <div className="p-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-[#fdeecd] border border-[#f7b955] flex items-center justify-center text-[#5f3a00] font-bold shadow-xs">
              <Sparkles className="w-5 h-5 text-[#8a5200]" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-[#00387d] flex items-center gap-2">
                <span>Interactive UN Resolution Drafter</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#fdeecd] text-[#5f3a00] border border-[#f7b955] font-mono font-bold">
                  UN Format Standard
                </span>
              </h3>
              <p className="text-xs text-slate-600">
                Build preambular and operative clauses formatted for TUMUN committee floor action.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab(activeTab === 'editor' ? 'preview' : 'editor')}
              className="px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider bg-slate-100 text-[#00387d] border border-slate-200 hover:bg-slate-200 cursor-pointer"
            >
              {activeTab === 'editor' ? 'Switch to UN Paper View' : 'Back to Editor'}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded text-slate-500 hover:text-[#00387d] bg-white border border-slate-200 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 flex-1">
          
          {activeTab === 'editor' ? (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Basic Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded border border-slate-200">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Committee
                  </label>
                  <select
                    value={draft.committeeName}
                    onChange={(e) => setDraft(prev => ({ ...prev, committeeName: e.target.value }))}
                    className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-[#00387d]"
                  >
                    {committees.map(c => (
                      <option key={c.id} value={c.acronym}>{c.acronym} — {c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Topic Title
                  </label>
                  <input
                    type="text"
                    value={draft.topicTitle}
                    onChange={(e) => setDraft(prev => ({ ...prev, topicTitle: e.target.value }))}
                    className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-[#00387d]"
                  />
                </div>
              </div>

              {/* Preambular Clauses */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif font-bold text-[#00387d] text-sm italic">
                    Preambular Clauses (Context & References)
                  </h4>
                  <button
                    onClick={handleAddPreambular}
                    className="px-2.5 py-1 rounded bg-[#fdeecd] text-[#5f3a00] border border-[#f7b955] hover:bg-[#fbdda1] text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#8a5200]" />
                    <span>Add Preambular</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {draft.preambularClauses.map((clause) => (
                    <div key={clause.id} className="flex gap-2 items-center bg-slate-50 p-3 rounded border border-slate-200">
                      <select
                        value={clause.starter}
                        onChange={(e) => {
                          const val = e.target.value;
                          setDraft(prev => ({
                            ...prev,
                            preambularClauses: prev.preambularClauses.map(p => p.id === clause.id ? { ...p, starter: val } : p)
                          }));
                        }}
                        className="bg-white border border-slate-300 rounded px-2.5 py-1 text-xs font-bold italic text-[#8a5200] shrink-0"
                      >
                        {PREAMBULAR_STARTERS.map(st => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>

                      <input
                        type="text"
                        value={clause.text}
                        onChange={(e) => {
                          const val = e.target.value;
                          setDraft(prev => ({
                            ...prev,
                            preambularClauses: prev.preambularClauses.map(p => p.id === clause.id ? { ...p, text: val } : p)
                          }));
                        }}
                        className="flex-1 bg-white border border-slate-300 rounded px-3 py-1 text-xs text-slate-800"
                      />

                      <button
                        onClick={() => handleRemovePreambular(clause.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Operative Clauses */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif font-bold text-[#00387d] text-sm uppercase tracking-wider">
                    Operative Clauses (Actions & Directives)
                  </h4>
                  <button
                    onClick={handleAddOperative}
                    className="px-2.5 py-1 rounded bg-[#fdeecd] text-[#5f3a00] border border-[#f7b955] hover:bg-[#fbdda1] text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#8a5200]" />
                    <span>Add Operative</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {draft.operativeClauses.map((clause) => (
                    <div key={clause.id} className="bg-slate-50 p-3.5 rounded border border-slate-200 space-y-2">
                      <div className="flex gap-2 items-center">
                        <span className="font-bold text-[#00387d] text-xs w-6">{clause.number}.</span>

                        <select
                          value={clause.starter}
                          onChange={(e) => {
                            const val = e.target.value;
                            setDraft(prev => ({
                              ...prev,
                              operativeClauses: prev.operativeClauses.map(o => o.id === clause.id ? { ...o, starter: val } : o)
                            }));
                          }}
                          className="bg-white border border-slate-300 rounded px-2 py-1 text-xs font-bold text-[#8a5200] shrink-0"
                        >
                          {OPERATIVE_STARTERS.map(st => (
                            <option key={st} value={st}>{st}</option>
                          ))}
                        </select>

                        <input
                          type="text"
                          value={clause.text}
                          onChange={(e) => {
                            const val = e.target.value;
                            setDraft(prev => ({
                              ...prev,
                              operativeClauses: prev.operativeClauses.map(o => o.id === clause.id ? { ...o, text: val } : o)
                            }));
                          }}
                          className="flex-1 bg-white border border-slate-300 rounded px-3 py-1 text-xs text-slate-800"
                        />

                        <button
                          onClick={() => handleRemoveOperative(clause.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            /* UN Paper Format Preview */
            <div className="bg-[#fef6e7]/30 p-8 rounded border border-[#fbdda1]/80 font-serif text-slate-900 space-y-6 animate-fadeIn shadow-xs">
              <div className="text-center space-y-1 border-b border-[#fbdda1]/80 pb-4">
                <div className="text-xs font-sans tracking-widest text-[#00387d] uppercase font-bold">
                  TRINITY UNIVERSITY MODEL UNITED NATIONS
                </div>
                <h2 className="text-xl font-bold uppercase tracking-wide text-[#00387d]">
                  DRAFT RESOLUTION 1.1
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-sans bg-white p-4 rounded border border-slate-200">
                <div><strong className="text-[#00387d]">COMMITTEE:</strong> {draft.committeeName}</div>
                <div><strong className="text-[#00387d]">TOPIC:</strong> {draft.topicTitle}</div>
                <div className="col-span-2"><strong className="text-[#00387d]">SPONSORS:</strong> {draft.sponsors.join(', ')}</div>
                <div className="col-span-2"><strong className="text-[#00387d]">SIGNATORIES:</strong> {draft.signatories.join(', ')}</div>
              </div>

              <div className="space-y-3 text-sm leading-relaxed font-serif">
                <p className="font-bold text-[#00387d]">The {draft.committeeName},</p>

                {/* Preambulars */}
                {draft.preambularClauses.map((p) => (
                  <p key={p.id} className="pl-4 italic text-slate-800">
                    <span className="font-bold underline text-[#00387d]">{p.starter}</span> {p.text}
                  </p>
                ))}

                <div className="my-4 border-t border-slate-200" />

                {/* Operative Clauses */}
                {draft.operativeClauses.map((o) => (
                  <div key={o.id} className="pl-4 space-y-1">
                    <p className="text-slate-800">
                      <strong className="text-[#00387d]">{o.number}. </strong>
                      <span className="font-bold underline text-[#00387d]">{o.starter}</span> {o.text}
                    </p>
                    {o.subClauses.map((sub, sIdx) => (
                      <p key={sIdx} className="pl-8 text-xs text-slate-700 font-sans">
                        ({String.fromCharCode(97 + sIdx)}) {sub};
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center rounded-b">
          <button
            onClick={() => setActiveTab(activeTab === 'editor' ? 'preview' : 'editor')}
            className="px-4 py-2 rounded text-xs font-bold uppercase tracking-wider text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 cursor-pointer"
          >
            {activeTab === 'editor' ? 'Preview Official Document' : 'Back to Editing'}
          </button>

          <button
            onClick={handleCopy}
            className="px-5 py-2.5 rounded text-xs font-bold uppercase tracking-widest text-white bg-[#00387d] hover:bg-[#294a70] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#f4a024]" />
                <span>Copy Full Resolution Text</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
