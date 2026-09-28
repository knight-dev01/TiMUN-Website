import React, { useState } from 'react';
import { TextReveal } from './gallery/TextReveal';
import { HelpCircle, ChevronDown, ChevronUp, Mail, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { useConferenceData } from '../context/ConferenceContext';

export const FaqContactSection: React.FC = () => {
  const { faqs, conferenceInfo } = useConferenceData();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq1');

  // Contact Form State
  const [contactSubmitted, setContactSubmitted] = useState<boolean>(false);
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  const categories = ['All', 'General', 'Registration', 'Academics & Rules', 'Partnerships', 'Venue & Hotel'];

  const filteredFaqs = faqs.filter(faq => {
    if (activeCategory === 'All') return true;
    return faq.category === activeCategory;
  });


  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setContactData({ name: '', email: '', subject: 'General Inquiry', message: '' });
    }, 4000);
  };

  return (
    <section id="faq" className="py-12 sm:py-20 vx-paper text-slate-900 border-b border-[#fdeecd] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#fdeecd] border border-[#f7b955] text-[#5f3a00] text-[11px] font-bold uppercase tracking-widest mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#8a5200]" />
            <span>Support & Delegate Inquiries</span>
          </div>
          <TextReveal
            text="Frequently Asked Questions"
            className="text-3xl sm:text-4xl font-serif font-bold text-[#00387d] tracking-tight"
          />
          <p className="text-slate-600 mt-2 text-sm sm:text-base leading-relaxed">
            Everything you need to know about delegate registration, background guides, and conference logistics.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#00387d] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:text-[#00387d] border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* FAQ Accordion Column */}
          <div className="lg:col-span-7 space-y-3">
            {filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-slate-50 rounded border border-slate-200 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className="w-full p-4 text-left font-serif font-bold text-sm text-[#00387d] flex justify-between items-center gap-4 hover:text-[#8a5200] transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-[#b56a00] shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs text-slate-600 border-t border-slate-200 leading-relaxed animate-fadeIn">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Contact Secretariat Form Column */}
          <div className="lg:col-span-5 bg-white p-6 rounded border border-slate-200 space-y-4 shadow-xs">
            <div className="flex items-center gap-2 text-[#00387d] font-bold text-sm">
              <MessageSquare className="w-5 h-5 text-[#b56a00]" />
              <span>Contact Secretariat Directly</span>
            </div>

            {!contactSubmitted ? (
              <form onSubmit={handleContactSubmit} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Full name"
                    value={contactData.name}
                    onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-[#00387d]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="delegate@school.edu"
                    value={contactData.email}
                    onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-[#00387d]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">Inquiry Subject</label>
                  <select
                    value={contactData.subject}
                    onChange={(e) => setContactData({ ...contactData, subject: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-[#00387d]"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Institutional Partnership">Institutional Partnership & Sponsorship</option>
                    <option value="NYSC / Young Professional Track">NYSC & Young Professional Program</option>
                    <option value="Country Allocation">Country Allocation & Committee Placement</option>
                    <option value="Financial & Payment">Registration Fee & Invoice</option>
                    <option value="Position Paper">Position Paper & Academic Study Guides</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">Message</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Write your question for the Secretariat..."
                    value={contactData.message}
                    onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-[#00387d]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded text-xs font-bold uppercase tracking-widest text-white bg-[#00387d] hover:bg-[#294a70] transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Send className="w-3.5 h-3.5 text-[#f4a024]" />
                  <span>Send Inquiry to Secretariat</span>
                </button>
              </form>
            ) : (
              <div className="p-6 text-center space-y-3 animate-fadeIn">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-[#00387d] text-sm">Message Sent!</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our Delegate Affairs team will respond to <strong>{contactData.email}</strong> within 24 hours.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
