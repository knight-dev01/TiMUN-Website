import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, ChevronRight, ChevronLeft, User, Users, Award, Mail, Phone, Building, FileText, Sparkles, Printer } from 'lucide-react';
import { useConferenceData } from '../context/ConferenceContext';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCommittee?: string;
  initialCountry?: string;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  initialCommittee = '',
  initialCountry = ''
}) => {
  const { committees, conferenceInfo } = useConferenceData();
  if (!isOpen) return null;

  const [step, setStep] = useState<number>(1);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [registrationId, setRegistrationId] = useState<string>('');

  const [formData, setFormData] = useState({
    type: 'individual' as 'individual' | 'delegation' | 'chair',
    fullName: '',
    email: '',
    phone: '',
    institution: '',
    delegationSize: 5,
    firstChoiceCommittee: initialCommittee || (committees[0]?.acronym || 'UNSC'),
    secondChoiceCommittee: committees[1]?.acronym || 'DISEC',
    preferredCountries: initialCountry || '',
    dietaryRequirements: 'None',
    experienceLevel: 'Novice (0-2 MUNs)' as const,
    positionPaperAgree: true,
    notes: ''
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: target.checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Submit registration
      const randomId = 'TiMUN-2027-' + Math.floor(100000 + Math.random() * 900000);
      setRegistrationId(randomId);
      setSubmitted(true);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-xl relative text-slate-900">
        
        {/* Header */}
        <div className="p-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-900 font-bold shadow-xs">
              <ShieldCheck className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-blue-900">
                TiMUN 2027 Registration
              </h3>
              <p className="text-xs text-slate-600">
                Official Delegate & School Portal
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded text-slate-500 hover:text-blue-900 bg-white border border-slate-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        {!submitted ? (
          <form onSubmit={handleNext} className="p-6 space-y-6">
            
            {/* Step Indicators */}
            <div className="flex items-center justify-between max-w-xs mx-auto mb-6">
              {[
                { s: 1, label: 'Role' },
                { s: 2, label: 'Contact' },
                { s: 3, label: 'Preferences' }
              ].map((st) => (
                <div key={st.s} className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded text-xs font-bold flex items-center justify-center transition-colors ${
                    step === st.s
                      ? 'bg-blue-900 text-white shadow-xs'
                      : step > st.s
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : 'bg-slate-100 text-slate-500 border border-slate-200'
                  }`}>
                    {step > st.s ? '✓' : st.s}
                  </div>
                  <span className={`text-xs font-bold uppercase tracking-wider ${step === st.s ? 'text-blue-900' : 'text-slate-400'}`}>
                    {st.label}
                  </span>
                </div>
              ))}
            </div>

            {/* STEP 1: Registration Type */}
            {step === 1 && (
              <div className="space-y-4 animate-fadeIn">
                <label className="block text-xs font-bold text-blue-900 uppercase tracking-wider">
                  Select Registration Type:
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'individual', title: 'Individual Delegate', fee: '$65', desc: 'Student, NYSC corps member, or young professional representing a country/state.', icon: User },
                    { id: 'delegation', title: 'Institutional Delegation', fee: '$110 Base + $55/del', desc: 'University, School, or Organization registering a group team.', icon: Users },
                    { id: 'chair', title: 'Chair Staff Application', fee: 'Free (Honorarium)', desc: 'Apply to serve as Committee Director / Dais Member.', icon: Award }
                  ].map((option) => {
                    const Icon = option.icon;
                    const selected = formData.type === option.id;
                    return (
                      <div
                        key={option.id}
                        onClick={() => setFormData(prev => ({ ...prev, type: option.id as any }))}
                        className={`p-4 rounded border cursor-pointer transition-all ${
                          selected
                            ? 'bg-amber-50/80 border-blue-900 shadow-xs ring-1 ring-blue-900'
                            : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <Icon className={`w-5 h-5 ${selected ? 'text-blue-900' : 'text-slate-500'}`} />
                          <span className="text-xs font-extrabold text-amber-700">{option.fee}</span>
                        </div>
                        <div className="font-serif font-bold text-blue-900 text-sm">{option.title}</div>
                        <div className="text-[11px] text-slate-600 mt-1 leading-relaxed">{option.desc}</div>
                      </div>
                    );
                  })}
                </div>

                <div className="p-4 bg-slate-50 rounded border border-slate-200 text-xs text-slate-600 space-y-1">
                  <div className="font-bold text-blue-900 uppercase tracking-wider">Registration Package Includes:</div>
                  <div>• Full access to 4 Committee sessions & Plenary</div>
                  <div>• Official TiMUN Handbook, Conference Folder & Credentials</div>
                  <div>• Practical Leadership Workshops & Rules of Procedure Masterclasses</div>
                  <div>• Diplomatic Icebreaker & Saturday Gala Buffet Dinner</div>
                </div>
              </div>
            )}

            {/* STEP 2: Personal / Academic Contact */}
            {step === 2 && (
              <div className="space-y-4 animate-fadeIn">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="e.g. Eleanor Vance"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="delegate@university.edu"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+1 (210) 555-0199"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      School / University Institution *
                    </label>
                    <input
                      type="text"
                      name="institution"
                      required
                      placeholder="e.g. Trinity University / St. Jude Academy"
                      value={formData.institution}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-900"
                    />
                  </div>
                </div>

                {formData.type === 'delegation' && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Number of Delegates in Delegation
                    </label>
                    <input
                      type="number"
                      name="delegationSize"
                      min={2}
                      max={40}
                      value={formData.delegationSize}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-900"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    MUN Experience Level
                  </label>
                  <select
                    name="experienceLevel"
                    value={formData.experienceLevel}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-900"
                  >
                    <option value="Novice (0-2 MUNs)">Novice (0-2 MUNs)</option>
                    <option value="Experienced (3-6 MUNs)">Experienced (3-6 MUNs)</option>
                    <option value="Veteran (7+ MUNs)">Veteran (7+ MUNs)</option>
                  </select>
                </div>
              </div>
            )}

            {/* STEP 3: Committee Choices & Confirmation */}
            {step === 3 && (
              <div className="space-y-4 animate-fadeIn">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      First Choice Committee *
                    </label>
                    <select
                      name="firstChoiceCommittee"
                      value={formData.firstChoiceCommittee}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-900"
                    >
                      {committees.map(c => (
                        <option key={c.id} value={c.acronym}>
                          {c.acronym} — {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Second Choice Committee *
                    </label>
                    <select
                      name="secondChoiceCommittee"
                      value={formData.secondChoiceCommittee}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-900"
                    >
                      {committees.map(c => (
                        <option key={c.id} value={c.acronym}>
                          {c.acronym} — {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Preferred Countries (e.g. United States, Germany, Japan)
                  </label>
                  <input
                    type="text"
                    name="preferredCountries"
                    placeholder="List top 3 country preferences"
                    value={formData.preferredCountries}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Dietary Requirements / Accessibility Requests
                  </label>
                  <input
                    type="text"
                    name="dietaryRequirements"
                    placeholder="e.g. Vegetarian, Halal, Gluten-free, Wheelchair access"
                    value={formData.dietaryRequirements}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-900"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="positionPaperAgree"
                    name="positionPaperAgree"
                    checked={formData.positionPaperAgree}
                    onChange={handleChange}
                    className="rounded text-blue-900 focus:ring-blue-900 bg-slate-50 border-slate-300"
                  />
                  <label htmlFor="positionPaperAgree" className="text-xs text-slate-600">
                    I agree to submit my 2-page Position Paper by October 31, 2026 to be eligible for conference awards.
                  </label>
                </div>

                {/* Pricing Summary */}
                <div className="p-4 bg-amber-50 rounded border border-amber-300 flex justify-between items-center text-sm">
                  <div>
                    <div className="font-bold text-blue-900">Calculated Fee:</div>
                    <div className="text-xs text-slate-600">Invoice payment instructions will be emailed.</div>
                  </div>
                  <div className="text-xl font-extrabold text-amber-900">
                    {formData.type === 'individual' ? '$65' : formData.type === 'delegation' ? `$${110 + (formData.delegationSize * 55)}` : '$0'}
                  </div>
                </div>
              </div>
            )}

            {/* Form Footer Controls */}
            <div className="pt-4 border-t border-slate-200 flex justify-between items-center">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-4 py-2 rounded text-xs font-bold uppercase tracking-wider text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
              ) : <div />}

              <button
                type="submit"
                className="px-6 py-2.5 rounded text-xs font-bold uppercase tracking-widest text-white bg-blue-900 hover:bg-blue-800 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>{step === 3 ? 'Complete & Submit Registration' : 'Next Step'}</span>
                <ChevronRight className="w-4 h-4 text-amber-400" />
              </button>
            </div>

          </form>
        ) : (
          /* Confirmation Receipt View */
          <div className="p-8 space-y-6 text-center animate-fadeIn" id="printable-ticket">
            <div className="w-16 h-16 rounded bg-emerald-100 text-emerald-900 border border-emerald-300 flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle className="w-8 h-8 text-emerald-700" />
            </div>

            <div>
              <span className="px-3 py-1 rounded bg-amber-100 border border-amber-300 text-amber-900 text-xs font-mono font-bold">
                REGISTRATION REF: {registrationId}
              </span>
              <h3 className="font-serif font-bold text-2xl text-blue-900 mt-3">
                Registration Confirmed!
              </h3>
              <p className="text-slate-600 text-sm mt-1 max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-slate-900">{formData.fullName}</strong>. Your delegate application for <strong className="text-blue-900">{formData.institution}</strong> has been logged into the TiMUN 2027 database.
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded border border-slate-200 text-left text-xs space-y-2 max-w-md mx-auto font-mono">
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Applicant:</span>
                <span className="text-slate-900 font-bold">{formData.fullName}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Email:</span>
                <span className="text-slate-900">{formData.email}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Primary Committee Choice:</span>
                <span className="text-blue-900 font-bold">{formData.firstChoiceCommittee}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Country Preference:</span>
                <span className="text-slate-900">{formData.preferredCountries || 'General Selection'}</span>
              </div>
            </div>

            <p className="text-xs text-slate-500">
              A copy of your invoice and study guide login credentials have been sent to {formData.email}.
            </p>

            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={handlePrint}
                className="px-4 py-2 rounded text-xs font-bold uppercase tracking-wider text-slate-700 bg-slate-100 border border-slate-200 hover:bg-slate-200 flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4 text-blue-900" />
                <span>Print Confirmation Ticket</span>
              </button>

              <button
                onClick={onClose}
                className="px-5 py-2 rounded text-xs font-bold uppercase tracking-wider text-white bg-blue-900 hover:bg-blue-800 cursor-pointer shadow-xs"
              >
                Done
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
