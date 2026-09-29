import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { X, CheckCircle, ShieldCheck, ChevronRight, ChevronLeft, User, Users, Award, Printer, CreditCard, Landmark, Loader2, AlertTriangle } from 'lucide-react';
import { useConferenceData } from '../context/ConferenceContext';
import { RegistrationRecord, PaymentCurrency } from '../types';
import {
  feeFor,
  formatMoney,
  payWithPaystack,
  isPaystackConfigured,
  manualPaymentDetails,
} from '../lib/payments';
import { trackEvent } from '../lib/analytics';

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
  const { committees, addRegistration, conferenceInfo } = useConferenceData();
  const reduceMotion = useReducedMotion();

  const [step, setStep] = useState<number>(1);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [registrationId, setRegistrationId] = useState<string>('');
  const [savedPaymentStatus, setSavedPaymentStatus] = useState<string>('pending');
  const [savedAmount, setSavedAmount] = useState<string>('');

  const [currency, setCurrency] = useState<PaymentCurrency>('NGN');
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState('');

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

  // Sync incoming committee/country choices when the modal opens
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setSubmitted(false);
      setPayError('');
      if (initialCommittee) {
        setFormData(prev => ({ ...prev, firstChoiceCommittee: initialCommittee }));
      }
      if (initialCountry) {
        setFormData(prev => ({ ...prev, preferredCountries: initialCountry }));
      }
      trackEvent('registration_started', initialCommittee ? { committee: initialCommittee } : undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  if (!isOpen) return null;

  const fee = feeFor(formData.type, currency, Number(formData.delegationSize) || 5, {
    feeIndividualUsd: conferenceInfo.feeIndividualUsd,
    feeDelegationBaseUsd: conferenceInfo.feeDelegationBaseUsd,
    feePerDelegateUsd: conferenceInfo.feePerDelegateUsd,
    ngnPerUsd: conferenceInfo.ngnPerUsd,
  });
  const paystackReady = isPaystackConfigured();
  const manual = manualPaymentDetails();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: target.checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const makeRecord = (
    status: RegistrationRecord['paymentStatus'],
    method: RegistrationRecord['paymentMethod'],
    reference: string
  ): RegistrationRecord => ({
    id: reference,
    createdAt: Date.now(),
    type: formData.type,
    fullName: formData.fullName,
    email: formData.email,
    phone: formData.phone,
    institution: formData.institution,
    delegationSize: formData.type === 'delegation' ? Number(formData.delegationSize) || 5 : 1,
    firstChoiceCommittee: formData.firstChoiceCommittee,
    secondChoiceCommittee: formData.secondChoiceCommittee,
    preferredCountries: formData.preferredCountries,
    experienceLevel: formData.experienceLevel,
    feeUsd: fee.usd,
    feeCharged: fee.amount,
    feeCurrency: currency,
    paymentStatus: status,
    paymentMethod: method,
    paymentReference: reference,
  });

  const finalize = (status: RegistrationRecord['paymentStatus'], method: RegistrationRecord['paymentMethod'], refOverride?: string) => {
    const ref = refOverride || ('TiMUN-2027-' + Math.floor(100000 + Math.random() * 900000));
    const record = makeRecord(status, method, ref);
    addRegistration(record);
    setRegistrationId(ref);
    setSavedPaymentStatus(status);
    setSavedAmount(`${formatMoney(fee.amount, currency)}${fee.usd > 0 ? ` (≈ $${fee.usd})` : ''}`);
    setSubmitted(true);
    trackEvent('registration_completed', {
      type: formData.type,
      committee: formData.firstChoiceCommittee,
      currency,
      amount: fee.amount,
      payment_status: status,
      payment_method: method,
    });
    // Parked: registration relaunches here (confetti returns with it).
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handlePaystack = async () => {
    if (!formData.email) {
      setPayError('Enter your email address (step 2) before paying online.');
      return;
    }
    setPayError('');
    setPaying(true);
    const ref = 'TiMUN-2027-' + Math.floor(100000 + Math.random() * 900000);
    trackEvent('payment_initiated', { method: 'paystack', currency, amount: fee.amount, type: formData.type });
    try {
      const res = await payWithPaystack({
        email: formData.email,
        amount: fee.amount,
        currency,
        reference: ref,
        metadata: {
          fullName: formData.fullName,
          type: formData.type,
          committee: formData.firstChoiceCommittee,
        },
      });
      trackEvent('payment_success', { method: 'paystack', reference: res.reference });
      finalize('paid', 'paystack', res.reference || ref);
    } catch (err: any) {
      trackEvent('payment_failed', { method: 'paystack', error: String(err?.message || err).slice(0, 120) });
      setPayError(err?.message || 'Payment did not complete. Try again or use bank transfer.');
    } finally {
      setPaying(false);
    }
  };

  const handleManual = () => {
    trackEvent('payment_initiated', { method: 'manual-transfer', currency, amount: fee.amount, type: formData.type });
    finalize('pending', 'manual-transfer');
  };

  const handlePrint = () => {
    window.print();
  };

  const steps = [
    { s: 1, label: 'Role' },
    { s: 2, label: 'Contact' },
    { s: 3, label: 'Preferences' },
    { s: 4, label: 'Payment' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <motion.div
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 44, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        className="bg-white border border-slate-200 rounded max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-xl relative text-slate-900"
      >

        {/* Header */}
        <div className="p-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-[#fdeecd] border border-[#f7b955] flex items-center justify-center text-[#5f3a00] font-bold shadow-xs">
              <ShieldCheck className="w-5 h-5 text-[#8a5200]" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-[#00387d]">
                TiMUN 2027 Registration
              </h3>
              <p className="text-xs text-slate-600">
                Official Delegate & School Portal • NGN + USD payments
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded text-slate-500 hover:text-[#00387d] bg-white border border-slate-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        {!submitted ? (
          <form onSubmit={handleNext} className="p-6 space-y-6">

            {/* Step Indicators */}
            <div className="flex items-center justify-between max-w-md mx-auto mb-6">
              {steps.map((st) => (
                <div key={st.s} className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded text-xs font-bold flex items-center justify-center transition-colors ${
                    step === st.s
                      ? 'bg-[#00387d] text-white shadow-xs'
                      : step > st.s
                      ? 'bg-[#fdeecd] text-[#5f3a00] border border-[#f7b955]'
                      : 'bg-slate-100 text-slate-500 border border-slate-200'
                  }`}>
                    {step > st.s ? '✓' : st.s}
                  </div>
                  <span className={`text-xs font-bold uppercase tracking-wider ${step === st.s ? 'text-[#00387d]' : 'text-slate-400'}`}>
                    {st.label}
                  </span>
                </div>
              ))}
            </div>

            {/* STEP 1: Registration Type */}
            {step === 1 && (
              <div className="space-y-4 animate-fadeIn">
                <label className="block text-xs font-bold text-[#00387d] uppercase tracking-wider">
                  Select Registration Type:
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'individual', title: 'Individual Delegate', fee: `$${conferenceInfo.feeIndividualUsd ?? 65}`, desc: 'Student, NYSC corps member, or young professional representing a country/state.', icon: User },
                    { id: 'delegation', title: 'Institutional Delegation', fee: `$${conferenceInfo.feeDelegationBaseUsd ?? 110} Base + $${conferenceInfo.feePerDelegateUsd ?? 55}/del`, desc: 'University, School, or Organization registering a group team.', icon: Users },
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
                            ? 'bg-[#fef6e7]/80 border-[#00387d] shadow-xs ring-1 ring-[#00387d]'
                            : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <Icon className={`w-5 h-5 ${selected ? 'text-[#00387d]' : 'text-slate-500'}`} />
                          <span className="text-xs font-extrabold text-[#8a5200]">{option.fee}</span>
                        </div>
                        <div className="font-serif font-bold text-[#00387d] text-sm">{option.title}</div>
                        <div className="text-[11px] text-slate-600 mt-1 leading-relaxed">{option.desc}</div>
                      </div>
                    );
                  })}
                </div>

                <div className="p-4 bg-slate-50 rounded border border-slate-200 text-xs text-slate-600 space-y-1">
                  <div className="font-bold text-[#00387d] uppercase tracking-wider">Registration Package Includes:</div>
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
                      className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#00387d]"
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
                      className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#00387d]"
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
                      placeholder="+234 ..."
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#00387d]"
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
                      className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#00387d]"
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
                      className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#00387d]"
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
                    className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#00387d]"
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
                      className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#00387d]"
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
                      className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#00387d]"
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
                    className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#00387d]"
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
                    className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#00387d]"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="positionPaperAgree"
                    name="positionPaperAgree"
                    checked={formData.positionPaperAgree}
                    onChange={handleChange}
                    className="rounded text-[#00387d] focus:ring-[#00387d] bg-slate-50 border-slate-300"
                  />
                  <label htmlFor="positionPaperAgree" className="text-xs text-slate-600">
                    I agree to submit my 2-page Position Paper before the announced deadline to be eligible for conference awards.
                  </label>
                </div>
              </div>
            )}

            {/* STEP 4: Payment */}
            {step === 4 && (
              <div className="space-y-4 animate-fadeIn">
                <div className="p-4 bg-[#fef6e7] rounded border border-[#f7b955]">
                  <div className="flex flex-wrap justify-between items-center gap-3">
                    <div>
                      <div className="font-bold text-[#00387d]">Total due:</div>
                      <div className="text-xs text-slate-600">
                        {formData.type === 'chair'
                          ? 'Chair staff application — no payment required.'
                          : `${formData.type === 'delegation' ? `Delegation of ${formData.delegationSize}` : 'Individual delegate'} • ≈ $${fee.usd} USD`}
                      </div>
                    </div>
                    <div className="text-2xl font-extrabold text-[#5f3a00]">
                      {formData.type === 'chair' ? '$0' : formatMoney(fee.amount, currency)}
                    </div>
                  </div>
                  {formData.type !== 'chair' && (
                    <div className="mt-3 flex gap-2">
                      {(['NGN', 'USD'] as PaymentCurrency[]).map(c => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setCurrency(c)}
                          className={`px-4 py-1.5 rounded text-xs font-bold uppercase tracking-wider border cursor-pointer ${
                            currency === c
                              ? 'bg-[#00387d] text-white border-[#00387d]'
                              : 'bg-white text-slate-600 border-slate-300 hover:border-[#00387d]'
                          }`}
                        >
                          Pay in {c === 'NGN' ? '₦ Naira' : '$ Dollar'}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {payError && (
                  <div className="p-3 rounded border border-rose-300 bg-rose-50 text-rose-900 text-xs flex gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{payError}</span>
                  </div>
                )}

                {formData.type === 'chair' ? (
                  <button
                    type="button"
                    onClick={() => finalize('waived', 'none')}
                    className="duo-btn duo-btn-navy w-full"
                  >
                    Submit Chair Application (Free)
                  </button>
                ) : (
                  <div className="space-y-3">
                    <button
                      type="button"
                      disabled={paying || !paystackReady}
                      onClick={handlePaystack}
                      title={paystackReady ? 'Pay securely online' : 'Add VITE_PAYSTACK_PUBLIC_KEY to enable online payments'}
                      className={`duo-btn w-full ${
                        paystackReady
                          ? 'duo-btn-green'
                          : '!bg-slate-100 !text-slate-400 !border-slate-200'
                      }`}
                    >
                      {paying ? <Loader2 className="w-4 h-4 animate-spin" /> : <CreditCard className="w-4 h-4" />}
                      <span>{paying ? 'Opening secure checkout…' : `Pay ${formatMoney(fee.amount, currency)} online (${currency})`}</span>
                    </button>
                    {!paystackReady && (
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        Online checkout is in setup mode (no Paystack public key yet). Use bank transfer below —
                        your registration is still saved and the Secretariat confirms payment manually.
                      </p>
                    )}

                    <div className="p-4 bg-slate-50 rounded border border-slate-200 text-xs space-y-1.5">
                      <div className="font-bold text-[#00387d] uppercase tracking-wider flex items-center gap-1.5">
                        <Landmark className="w-4 h-4" />
                        <span>Or pay by bank transfer</span>
                      </div>
                      <div className="text-slate-600">Bank: <strong className="text-slate-900">{manual.bank}</strong></div>
                      <div className="text-slate-600">Account: <strong className="text-slate-900">{manual.accountName} • {manual.accountNumber}</strong></div>
                      <div className="text-slate-500 leading-relaxed">{manual.note}</div>
                      <button
                        type="button"
                        onClick={handleManual}
                        className="mt-2 px-4 py-2 rounded text-xs font-bold uppercase tracking-wider text-slate-700 bg-white border border-slate-300 hover:border-[#00387d] cursor-pointer"
                      >
                        I've transferred / will pay on arrival — save as pending
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Form Footer Controls */}
            {!(step === 4) && (
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
                  className="duo-btn duo-btn-navy"
                >
                  <span>{step === 3 ? 'Continue to Payment' : 'Next Step'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
            {step === 4 && (
              <div className="pt-2 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-4 py-2 rounded text-xs font-bold uppercase tracking-wider text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <span className="text-[11px] text-slate-400">256-bit encrypted checkout via Paystack</span>
              </div>
            )}

          </form>
        ) : (
          /* Confirmation Receipt View */
          <div className="p-8 space-y-6 text-center animate-fadeIn" id="printable-ticket">
            <div className="w-16 h-16 rounded bg-[#dcf3e5] text-[#1f4a32] border border-[#9adbb5] flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle className="w-8 h-8 text-[#35794f]" />
            </div>

            <div>
              <span className="px-3 py-1 rounded bg-[#fdeecd] border border-[#f7b955] text-[#5f3a00] text-xs font-mono font-bold">
                REGISTRATION REF: {registrationId}
              </span>
              <h3 className="font-serif font-bold text-2xl text-[#00387d] mt-3">
                Registration Confirmed!
              </h3>
              <p className="text-slate-600 text-sm mt-1 max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-slate-900">{formData.fullName}</strong>. Your {formData.type} application for <strong className="text-[#00387d]">{formData.institution}</strong> has been saved.
              </p>
              <p className="mt-2 inline-block px-3 py-1 rounded text-xs font-bold uppercase tracking-wider border bg-slate-50 border-slate-200 text-slate-700">
                Payment: {savedPaymentStatus} • {savedAmount}
              </p>
              {savedPaymentStatus === 'pending' && (
                <p className="text-xs text-slate-500 mt-2 max-w-md mx-auto">
                  Show this reference when you transfer, or pay online later from your confirmation email. The Secretariat confirms manual payments in the executive dashboard.
                </p>
              )}
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
                <span className="text-[#00387d] font-bold">{formData.firstChoiceCommittee}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Country Preference:</span>
                <span className="text-slate-900">{formData.preferredCountries || 'General Selection'}</span>
              </div>
            </div>

            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={handlePrint}
                className="px-4 py-2 rounded text-xs font-bold uppercase tracking-wider text-slate-700 bg-slate-100 border border-slate-200 hover:bg-slate-200 flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4 text-[#00387d]" />
                <span>Print Confirmation Ticket</span>
              </button>

              <button
                onClick={onClose}
                className="duo-btn duo-btn-navy"
              >
                Done
              </button>
            </div>
          </div>
        )}

      </motion.div>
    </div>
  );
};
