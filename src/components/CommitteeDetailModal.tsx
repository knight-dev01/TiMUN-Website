import React, { useState } from 'react';
import { X, BookOpen, Users, MapPin, Download, CheckCircle, ShieldAlert, Sparkles, FileText, ArrowRight } from 'lucide-react';
import { Committee, CountryMatrixItem } from '../types';
import { COUNTRY_MATRIX_SAMPLE } from '../data/conferenceData';

interface CommitteeDetailModalProps {
  committee: Committee | null;
  onClose: () => void;
  onSelectCountryToRegister: (committeeAcronym: string, countryName: string) => void;
}

export const CommitteeDetailModal: React.FC<CommitteeDetailModalProps> = ({
  committee,
  onClose,
  onSelectCountryToRegister
}) => {
  if (!committee) return null;

  const [downloadedGuide, setDownloadedGuide] = useState(false);
  const [activeTab, setActiveTab] = useState<'topics' | 'matrix' | 'chairs'>('topics');

  // Filter country matrix items for this committee
  const matrixItems = COUNTRY_MATRIX_SAMPLE.filter(
    item => item.committeeId === committee.id || item.committeeAcronym === committee.acronym
  );

  const handleDownload = () => {
    setDownloadedGuide(true);
    setTimeout(() => setDownloadedGuide(false), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col text-slate-900">
        
        {/* Modal Header Banner */}
        <div className="relative h-48 sm:h-56 overflow-hidden rounded-t-lg bg-blue-900">
          <img
            src={committee.bgImage}
            alt={committee.name}
            className="w-full h-full object-cover filter brightness-75"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-900/60 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white border border-slate-700 transition-colors z-10 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider">
                {committee.acronym}
              </span>
              <span className="px-2.5 py-0.5 rounded bg-blue-900 text-amber-300 text-xs font-bold border border-amber-400/40">
                {committee.level} Level
              </span>
              <span className="px-2.5 py-0.5 rounded bg-blue-950 text-slate-200 text-xs font-semibold flex items-center gap-1 border border-blue-800">
                <MapPin className="w-3 h-3 text-amber-400" />
                {committee.roomLocation}
              </span>
            </div>

            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-white">
              {committee.name}
            </h2>
          </div>
        </div>

        {/* Navigation Tabs inside modal */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-2">
          <button
            onClick={() => setActiveTab('topics')}
            className={`px-4 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer ${
              activeTab === 'topics'
                ? 'border-amber-400 text-blue-900 font-extrabold'
                : 'border-transparent text-slate-600 hover:text-blue-900'
            }`}
          >
            Topics & Agenda
          </button>
          <button
            onClick={() => setActiveTab('matrix')}
            className={`px-4 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer ${
              activeTab === 'matrix'
                ? 'border-amber-400 text-blue-900 font-extrabold'
                : 'border-transparent text-slate-600 hover:text-blue-900'
            }`}
          >
            Country Availability Matrix ({matrixItems.length > 0 ? matrixItems.length : 'All Open'})
          </button>
          <button
            onClick={() => setActiveTab('chairs')}
            className={`px-4 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer ${
              activeTab === 'chairs'
                ? 'border-amber-400 text-blue-900 font-extrabold'
                : 'border-transparent text-slate-600 hover:text-blue-900'
            }`}
          >
            Chair Staff
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 space-y-6 flex-1">
          
          {/* Tab 1: Topics & Agenda */}
          {activeTab === 'topics' && (
            <div className="space-y-6 animate-fadeIn">
              <p className="text-slate-700 text-sm leading-relaxed bg-slate-50 p-4 rounded border border-slate-200">
                {committee.description}
              </p>

              <div className="space-y-4">
                <h3 className="font-serif font-bold text-lg text-blue-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-amber-600" />
                  <span>Agenda Topics</span>
                </h3>

                {committee.topics.map((topic, idx) => (
                  <div key={idx} className="bg-slate-50 p-5 rounded border border-slate-200 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded bg-blue-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <h4 className="font-serif font-bold text-blue-900 text-base">
                        {topic.title}
                      </h4>
                    </div>
                    <p className="text-slate-600 text-xs sm:text-sm pl-8 leading-relaxed">
                      {topic.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pl-8 pt-2">
                      {topic.keywords.map((kw, kIdx) => (
                        <span key={kIdx} className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 border border-amber-300 text-amber-900">
                          #{kw}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Study Guide Download Section */}
              <div className="p-5 bg-blue-900 text-white rounded border-l-4 border-amber-400 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-amber-300 text-sm flex items-center gap-2 uppercase tracking-wide">
                    <FileText className="w-4 h-4 text-amber-400" />
                    <span>Official Committee Study Guide (PDF)</span>
                  </h4>
                  <p className="text-xs text-slate-200 mt-1">
                    Complete background guide including bloc positions, legal treaties, and position paper prompts.
                  </p>
                </div>

                <button
                  onClick={handleDownload}
                  className="px-4 py-2 rounded text-xs font-bold uppercase tracking-wider text-blue-950 bg-amber-400 hover:bg-amber-300 transition-colors flex items-center gap-2 shrink-0 cursor-pointer"
                >
                  {downloadedGuide ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-emerald-950" />
                      <span>Downloaded Packet!</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Download Packet</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Tab 2: Country Matrix */}
          {activeTab === 'matrix' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex justify-between items-center text-xs text-slate-500 font-semibold uppercase tracking-wider">
                <span>Select an available nation to pre-fill your delegate application:</span>
                <span className="text-blue-900 font-bold">{matrixItems.length > 0 ? `${matrixItems.length} allocations listed` : 'Full Country List'}</span>
              </div>

              {matrixItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-1">
                  {matrixItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 rounded bg-slate-50 border border-slate-200 flex items-center justify-between hover:border-blue-900 transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl">{item.flagEmoji}</span>
                        <div>
                          <div className="font-bold text-blue-900 text-xs sm:text-sm">{item.country}</div>
                          <div className="text-[10px] text-slate-500 font-semibold">{item.region}</div>
                        </div>
                      </div>

                      <div>
                        {item.status === 'available' ? (
                          <button
                            onClick={() => {
                              onClose();
                              onSelectCountryToRegister(committee.acronym, item.country);
                            }}
                            className="px-2.5 py-1 rounded bg-amber-100 text-amber-900 border border-amber-300 hover:bg-blue-900 hover:text-white hover:border-blue-900 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1 cursor-pointer"
                          >
                            <span>Select</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        ) : (
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                            item.status === 'assigned' ? 'bg-red-100 text-red-800 border border-red-200' : 'bg-amber-100 text-amber-800 border border-amber-200'
                          }`}>
                            {item.status}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center bg-slate-50 rounded border border-slate-200 text-slate-600 text-xs leading-relaxed">
                  Country matrix for this committee opens during general registration. Standard UN member state positions are available.
                </div>
              )}
            </div>
          )}

          {/* Tab 3: Chair Staff */}
          {activeTab === 'chairs' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fadeIn">
              {committee.chairs.map((chair, idx) => (
                <div key={idx} className="p-4 rounded bg-slate-50 border border-slate-200 flex gap-4">
                  <img
                    src={chair.avatar}
                    alt={chair.name}
                    className="w-16 h-16 rounded object-cover border-2 border-amber-400 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-bold text-blue-900 text-sm">{chair.name}</h4>
                    <p className="text-xs font-bold text-amber-700 uppercase tracking-wider">{chair.role}</p>
                    <p className="text-[11px] text-slate-500 font-medium">{chair.university}</p>
                    <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">{chair.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex justify-between items-center rounded-b-lg">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-blue-900 cursor-pointer"
          >
            Close Window
          </button>

          <button
            onClick={() => {
              onClose();
              onSelectCountryToRegister(committee.acronym, '');
            }}
            className="px-5 py-2.5 rounded text-xs font-bold uppercase tracking-widest text-white bg-blue-900 hover:bg-blue-800 shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            <span>Register for {committee.acronym}</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>
        </div>

      </div>
    </div>
  );
};
