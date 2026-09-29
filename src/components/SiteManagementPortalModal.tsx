import React, { useState, useRef } from 'react';
import {
  X,
  Upload,
  Download,
  Trash2,
  Plus,
  Edit3,
  Save,
  RotateCcw,
  FileText,
  CheckCircle2,
  AlertCircle,
  Users,
  Calendar,
  HelpCircle,
  Settings,
  Image as ImageIcon,
  BookOpen,
  Shield,
  Lock,
  Key,
  LogOut,
  UserCheck,
  User,
  LayoutDashboard,
  CreditCard,
  Newspaper
} from 'lucide-react';
import { useConferenceData } from '../context/ConferenceContext';
import { Committee, SecretariatMember, FAQItem } from '../types';
import { ExecutiveOverview, RegistrationsManager } from './ExecutiveDashboard';
import { MediaManager } from './MediaManager';
import { LogoBadge } from './LogoBadge';

interface SiteManagementPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** 'page' renders full-screen for the #/admin route; 'modal' floats over content. */
  layout?: 'modal' | 'page';
}

export const SiteManagementPortalModal: React.FC<SiteManagementPortalModalProps> = ({ isOpen, onClose, layout = 'modal' }) => {
  const {
    conferenceInfo,
    committees,
    secretariatTeam,
    schedule,
    faqs,
    isExecutive,
    executiveUser,
    loginExecutive,
    logoutExecutive,
    updateConferenceInfo,
    addCommittee,
    deleteCommittee,
    addSecretariatMember,
    deleteSecretariatMember,
    addScheduleItem,
    deleteScheduleItem,
    addFaq,
    deleteFaq,
    importFullJson,
    exportFullJson,
    clearAllDataToEmpty,
    resetToDefaults
  } = useConferenceData();

  const [activeTab, setActiveTab] = useState<'dashboard' | 'registrations' | 'media' | 'info' | 'committees' | 'secretariat' | 'schedule' | 'faqs' | 'import-export'>('dashboard');
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Executive Login State
  const [loginEmail, setLoginEmail] = useState('secretariat@timun.org');
  const [loginPasscode, setLoginPasscode] = useState('timun2027');
  const [loginError, setLoginError] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const res = loginExecutive(loginEmail, loginPasscode);
    if (res.success) {
      showNotify('success', 'Executive credentials verified! Welcome to the Secretariat Management Portal.');
    } else {
      setLoginError(res.error || 'Authentication failed. Please check credentials.');
    }
  };

  const handleQuickDemoLogin = () => {
    setLoginEmail('secretariat@timun.org');
    setLoginPasscode('timun2027');
    const res = loginExecutive('secretariat@timun.org', 'timun2027');
    if (res.success) {
      showNotify('success', 'Quick Executive Login successful!');
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  // General Info Form State
  const [infoForm, setInfoForm] = useState(conferenceInfo);

  // New Committee Form State
  const [newCommittee, setNewCommittee] = useState({
    name: '',
    acronym: '',
    category: 'general-assembly' as 'general-assembly' | 'specialized' | 'crisis',
    level: 'Intermediate' as 'Beginner' | 'Intermediate' | 'Advanced' | 'Crisis / Dual',
    delegateCapacity: 30,
    roomLocation: '',
    description: '',
    studyGuideUrl: '#',
    bgImage: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1000&q=80',
    topic1Title: '',
    topic1Desc: '',
    chairName: '',
    chairRole: 'Head Chair',
    chairBio: ''
  });

  // New Secretariat Member Form State
  const [newMember, setNewMember] = useState({
    name: '',
    role: '',
    department: 'Executive' as 'Executive' | 'Academics' | 'Logistics' | 'Delegate Affairs' | 'Communications',
    bio: '',
    email: '',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
  });

  // New Schedule Item Form State
  const [newSchedule, setNewSchedule] = useState({
    dayNumber: 1,
    time: '09:00 AM - 12:00 PM',
    title: '',
    location: '',
    description: '',
    type: 'session' as 'ceremony' | 'session' | 'social' | 'meal' | 'break' | 'workshop'
  });

  // New FAQ Form State
  const [newFaq, setNewFaq] = useState({
    category: 'General' as 'General' | 'Registration' | 'Academics & Rules' | 'Venue & Hotel',
    question: '',
    answer: ''
  });

  if (!isOpen) return null;

  const showNotify = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleSaveInfo = (e: React.FormEvent) => {
    e.preventDefault();
    updateConferenceInfo(infoForm);
    showNotify('success', 'Conference details updated successfully!');
  };

  const handleAddCommitteeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommittee.name || !newCommittee.acronym) {
      showNotify('error', 'Committee name and acronym are required.');
      return;
    }

    const created: Committee = {
      id: newCommittee.acronym.toLowerCase().replace(/[^a-z0-9]/g, '') || `comm-${Date.now()}`,
      name: newCommittee.name,
      acronym: newCommittee.acronym,
      category: newCommittee.category,
      level: newCommittee.level,
      delegateCapacity: newCommittee.delegateCapacity,
      assignedCount: 0,
      description: newCommittee.description || 'Description pending secretariat update.',
      roomLocation: newCommittee.roomLocation || 'Campus Center Hall',
      bgImage: newCommittee.bgImage,
      studyGuideUrl: newCommittee.studyGuideUrl,
      topics: newCommittee.topic1Title ? [
        {
          title: newCommittee.topic1Title,
          description: newCommittee.topic1Desc || 'Topic background guide available.',
          keywords: ['Policy', 'Diplomacy', 'International Law']
        }
      ] : [
        {
          title: 'Topic A: Agenda & Policy Debate',
          description: 'Official committee topic overview.',
          keywords: ['Resolution', 'Multilateralism']
        }
      ],
      chairs: newCommittee.chairName ? [
        {
          name: newCommittee.chairName,
          role: newCommittee.chairRole,
          university: 'Trinity University',
          bio: newCommittee.chairBio || 'Dais head.',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
        }
      ] : []
    };

    addCommittee(created);
    setNewCommittee({
      name: '',
      acronym: '',
      category: 'general-assembly',
      level: 'Intermediate',
      delegateCapacity: 30,
      roomLocation: '',
      description: '',
      studyGuideUrl: '#',
      bgImage: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1000&q=80',
      topic1Title: '',
      topic1Desc: '',
      chairName: '',
      chairRole: 'Head Chair',
      chairBio: ''
    });
    showNotify('success', `Committee '${created.acronym}' added successfully!`);
  };

  const handleAddSecretariatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMember.name || !newMember.role) {
      showNotify('error', 'Member name and role are required.');
      return;
    }

    addSecretariatMember({
      id: `sec-${Date.now()}`,
      name: newMember.name,
      role: newMember.role,
      department: newMember.department,
      bio: newMember.bio || 'Secretariat member.',
      email: newMember.email || 'secretariat@timun.org',
      image: newMember.image
    });

    setNewMember({
      name: '',
      role: '',
      department: 'Executive',
      bio: '',
      email: '',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
    });
    showNotify('success', 'Secretariat member added!');
  };

  const handleAddScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSchedule.title) {
      showNotify('error', 'Schedule title is required.');
      return;
    }

    addScheduleItem(newSchedule.dayNumber, {
      time: newSchedule.time,
      title: newSchedule.title,
      location: newSchedule.location || 'Trinity Campus',
      description: newSchedule.description || 'Session event.',
      type: newSchedule.type
    });

    setNewSchedule({
      dayNumber: 1,
      time: '09:00 AM - 12:00 PM',
      title: '',
      location: '',
      description: '',
      type: 'session'
    });
    showNotify('success', 'Schedule event added!');
  };

  const handleAddFaqSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFaq.question || !newFaq.answer) {
      showNotify('error', 'Question and answer are required.');
      return;
    }

    addFaq({
      id: `faq-${Date.now()}`,
      category: newFaq.category,
      question: newFaq.question,
      answer: newFaq.answer
    });

    setNewFaq({
      category: 'General',
      question: '',
      answer: ''
    });
    showNotify('success', 'FAQ added!');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (importFullJson(content)) {
        showNotify('success', 'Site configuration imported and applied live!');
      } else {
        showNotify('error', 'Invalid JSON file structure.');
      }
    };
    reader.readAsText(file);
  };

  const handleExportDownload = () => {
    const jsonStr = exportFullJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `timun_2027_site_config_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showNotify('success', 'Site configuration JSON exported successfully!');
  };

  const handleImageFileConvert = (e: React.ChangeEvent<HTMLInputElement>, callback: (base64: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      if (evt.target?.result) {
        callback(evt.target.result as string);
        showNotify('success', 'Image uploaded successfully!');
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={layout === 'page'
      ? 'min-h-screen bg-[#FDFCF9]'
      : 'fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn'
    }>
      {layout === 'page' && (
        <div className="sticky top-0 z-10 bg-white border-b-2 border-slate-200">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
            <LogoBadge size="sm" />
            <button
              onClick={onClose}
              className="duo-btn duo-btn-ghost !py-2 !px-4"
            >
              ← Back to site
            </button>
          </div>
        </div>
      )}
      <div className={layout === 'page'
        ? 'w-full max-w-6xl mx-auto px-4 py-6 sm:py-8'
        : 'bg-white border border-slate-200 w-full max-w-5xl rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]'
      }>
        
        {/* Header Bar */}
        <div className="px-6 py-4 bg-slate-100 border-b border-slate-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#f4a024] text-slate-950 flex items-center justify-center font-black">
              {isExecutive ? <Settings className="w-5 h-5" /> : <Lock className="w-5 h-5 text-slate-950" />}
            </div>
            <div>
              <h2 className="text-lg font-serif font-bold text-slate-800 flex items-center gap-2">
                <span>{isExecutive ? 'Secretariat Content & Site Manager' : 'Executive Portal Login'}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-xl bg-[#f4a024]/20 text-[#b56a00] font-sans uppercase font-bold border border-[#f4a024]/30">
                  {isExecutive ? 'Executive Directorate' : 'Restricted Access'}
                </span>
              </h2>
              <p className="text-xs text-slate-500">
                {isExecutive 
                  ? 'Populate, edit, upload JSON files, and customize real conference data live on the website.' 
                  : 'Restricted management portal for Trinity International Model UN Secretariat officers.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isExecutive && (
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-[#f4a024]/10 border border-[#f4a024]/30 rounded-xl text-xs text-[#b56a00]">
                  <UserCheck className="w-3.5 h-3.5 text-[#f4a024]" />
                  <span className="font-semibold">{executiveUser?.name || 'Executive Secretariat'}</span>
                  <span className="text-[10px] opacity-75 font-mono">({executiveUser?.role || 'Director'})</span>
                </div>
                <button
                  onClick={() => {
                    logoutExecutive();
                    showNotify('success', 'Logged out of Executive session.');
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-200 hover:bg-[#fde2e2] text-slate-700 hover:text-[#a80e0e] text-xs font-semibold transition-colors cursor-pointer border border-slate-300"
                  title="Sign out of Executive Session"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Log Out</span>
                </button>
              </div>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-500 hover:text-[#00387d] hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notification Alert */}
        {notification && (
          <div className={`px-6 py-2.5 text-xs font-medium flex items-center gap-2 shrink-0 ${
            notification.type === 'success' ? 'bg-[#dcf3e5] text-[#1f4a32] border-b border-[#9adbb5]' : 'bg-[#fde2e2] text-[#a80e0e] border-b border-[#f8bcbc]'
          }`}>
            {notification.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
            <span>{notification.message}</span>
          </div>
        )}

        {!isExecutive ? (
          /* Executive Login Screen */
          <div className="p-8 space-y-6 max-w-md mx-auto w-full my-auto animate-fadeIn">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-[#00387d]/80 border-2 border-[#f4a024]/80 text-[#b56a00] rounded-full flex items-center justify-center mx-auto shadow-xl">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="font-serif font-bold text-2xl text-[#00387d]">Executive Login</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Enter your Secretariat credentials or security passcode to access the Site Population and Content Management system.
              </p>
            </div>

            {loginError && (
              <div className="p-3 bg-[#fde2e2] border border-[#f8bcbc] text-[#a80e0e] text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4 bg-white p-6 rounded-xl border border-slate-200 shadow-xl">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#f4a024]" />
                  <span>Executive Email</span>
                </label>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="secretariat@timun.org"
                  className="w-full bg-white border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder:text-slate-500 focus:outline-none focus:border-[#f4a024]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-[#f4a024]" />
                  <span>Executive Passcode</span>
                </label>
                <input
                  type="password"
                  required
                  value={loginPasscode}
                  onChange={(e) => setLoginPasscode(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#f4a024]"
                />
              </div>

              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  className="w-full bg-[#f4a024] text-slate-950 font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider hover:bg-[#f7b955] transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Authenticate Executive Access</span>
                </button>

                <button
                  type="button"
                  onClick={handleQuickDemoLogin}
                  className="w-full bg-slate-100 text-[#b56a00] border border-slate-300 hover:bg-slate-200 font-semibold py-2 rounded-xl text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Shield className="w-3.5 h-3.5 text-[#f4a024]" />
                  <span>Quick Demo Executive Sign-In</span>
                </button>
              </div>

              <div className="pt-3 border-t border-slate-200/80 text-center">
                <p className="text-[11px] text-slate-500">
                  Demo Passcode: <code className="text-[#b56a00] bg-slate-100 px-1.5 py-0.5 rounded-xl font-mono">timun2027</code>
                </p>
              </div>
            </form>
          </div>
        ) : (
          <>
        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-100 overflow-x-auto shrink-0 px-4">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-3 text-xs font-bold uppercase tracking-wider border-b-2 flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'dashboard' ? 'border-[#00387d] text-[#00387d] bg-white' : 'border-transparent text-slate-500 hover:text-[#00387d]'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('registrations')}
            className={`px-4 py-3 text-xs font-bold uppercase tracking-wider border-b-2 flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'registrations' ? 'border-[#00387d] text-[#00387d] bg-white' : 'border-transparent text-slate-500 hover:text-[#00387d]'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Registrations & Payments</span>
          </button>

          <button
            onClick={() => setActiveTab('media')}
            className={`px-4 py-3 text-xs font-bold uppercase tracking-wider border-b-2 flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'media' ? 'border-[#00387d] text-[#00387d] bg-white' : 'border-transparent text-slate-500 hover:text-[#00387d]'
            }`}
          >
            <Newspaper className="w-4 h-4" />
            <span>Media & Newsletter</span>
          </button>

          <button
            onClick={() => setActiveTab('info')}
            className={`px-4 py-3 text-xs font-bold uppercase tracking-wider border-b-2 flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'info' ? 'border-[#00387d] text-[#00387d] bg-white' : 'border-transparent text-slate-500 hover:text-[#00387d]'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>General Info</span>
          </button>

          <button
            onClick={() => setActiveTab('committees')}
            className={`px-4 py-3 text-xs font-bold uppercase tracking-wider border-b-2 flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'committees' ? 'border-[#00387d] text-[#00387d] bg-white' : 'border-transparent text-slate-500 hover:text-[#00387d]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Committees ({committees.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('secretariat')}
            className={`px-4 py-3 text-xs font-bold uppercase tracking-wider border-b-2 flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'secretariat' ? 'border-[#00387d] text-[#00387d] bg-white' : 'border-transparent text-slate-500 hover:text-[#00387d]'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Secretariat Team ({secretariatTeam.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('schedule')}
            className={`px-4 py-3 text-xs font-bold uppercase tracking-wider border-b-2 flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'schedule' ? 'border-[#00387d] text-[#00387d] bg-white' : 'border-transparent text-slate-500 hover:text-[#00387d]'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Schedule</span>
          </button>

          <button
            onClick={() => setActiveTab('faqs')}
            className={`px-4 py-3 text-xs font-bold uppercase tracking-wider border-b-2 flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'faqs' ? 'border-[#00387d] text-[#00387d] bg-white' : 'border-transparent text-slate-500 hover:text-[#00387d]'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>FAQs ({faqs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('import-export')}
            className={`px-4 py-3 text-xs font-bold uppercase tracking-wider border-b-2 flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'import-export' ? 'border-[#00387d] text-[#00387d] bg-white' : 'border-transparent text-slate-500 hover:text-[#00387d]'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Site Uploads & JSON</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-700">

          {/* TAB: EXECUTIVE DASHBOARD (analytics + revenue overview) */}
          {activeTab === 'dashboard' && (
            <ExecutiveOverview />
          )}

          {/* TAB: REGISTRATIONS & PAYMENTS */}
          {activeTab === 'registrations' && (
            <RegistrationsManager notify={showNotify} />
          )}

          {/* TAB: MEDIA & NEWSLETTER */}
          {activeTab === 'media' && (
            <MediaManager notify={showNotify} />
          )}

          {/* TAB 1: GENERAL INFO */}
          {activeTab === 'info' && (
            <form onSubmit={handleSaveInfo} className="space-y-6">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#b56a00] mb-4 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span>Conference Identity & Dates</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-500 font-medium mb-1">Conference Full Title</label>
                    <input
                      type="text"
                      value={infoForm.title}
                      onChange={e => setInfoForm({ ...infoForm, title: e.target.value })}
                      className="w-full bg-white border-slate-300 rounded-xl p-2 text-slate-800 focus:border-[#f4a024] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-500 font-medium mb-1">Acronym</label>
                    <input
                      type="text"
                      value={infoForm.acronym}
                      onChange={e => setInfoForm({ ...infoForm, acronym: e.target.value })}
                      className="w-full bg-white border-slate-300 rounded-xl p-2 text-slate-800 focus:border-[#f4a024] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-500 font-medium mb-1">Edition Subtitle</label>
                    <input
                      type="text"
                      value={infoForm.edition}
                      onChange={e => setInfoForm({ ...infoForm, edition: e.target.value })}
                      className="w-full bg-white border-slate-300 rounded-xl p-2 text-slate-800 focus:border-[#f4a024] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-500 font-medium mb-1">Dates</label>
                    <input
                      type="text"
                      value={infoForm.dates}
                      onChange={e => setInfoForm({ ...infoForm, dates: e.target.value })}
                      className="w-full bg-white border-slate-300 rounded-xl p-2 text-slate-800 focus:border-[#f4a024] outline-none"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-slate-500 font-medium mb-1">Official Theme</label>
                    <textarea
                      rows={2}
                      value={infoForm.theme}
                      onChange={e => setInfoForm({ ...infoForm, theme: e.target.value })}
                      className="w-full bg-white border-slate-300 rounded-xl p-2 text-slate-800 focus:border-[#f4a024] outline-none resize-none"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#b56a00] mb-4 flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  <span>Venue & Registration Details</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-500 font-medium mb-1">Campus Location</label>
                    <input
                      type="text"
                      value={infoForm.location}
                      onChange={e => setInfoForm({ ...infoForm, location: e.target.value })}
                      className="w-full bg-white border-slate-300 rounded-xl p-2 text-slate-800 focus:border-[#f4a024] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-500 font-medium mb-1">Primary Venue Buildings</label>
                    <input
                      type="text"
                      value={infoForm.venue}
                      onChange={e => setInfoForm({ ...infoForm, venue: e.target.value })}
                      className="w-full bg-white border-slate-300 rounded-xl p-2 text-slate-800 focus:border-[#f4a024] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-500 font-medium mb-1">Registration Deadline</label>
                    <input
                      type="text"
                      value={infoForm.registrationDeadline}
                      onChange={e => setInfoForm({ ...infoForm, registrationDeadline: e.target.value })}
                      className="w-full bg-white border-slate-300 rounded-xl p-2 text-slate-800 focus:border-[#f4a024] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-500 font-medium mb-1">Contact Email</label>
                    <input
                      type="text"
                      value={infoForm.contactEmail}
                      onChange={e => setInfoForm({ ...infoForm, contactEmail: e.target.value })}
                      className="w-full bg-white border-slate-300 rounded-xl p-2 text-slate-800 focus:border-[#f4a024] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-500 font-medium mb-1">Early-Bird Deadline</label>
                    <input
                      type="text"
                      value={infoForm.earlyBirdDeadline}
                      onChange={e => setInfoForm({ ...infoForm, earlyBirdDeadline: e.target.value })}
                      className="w-full bg-white border-slate-300 rounded-xl p-2 text-slate-800 focus:border-[#f4a024] outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#b56a00] mb-1 flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  <span>Registration Fees (live on checkout)</span>
                </h3>
                <p className="text-[11px] text-slate-500 mb-4">
                  These numbers power the registration checkout instantly — USD base,
                  Naira derived automatically. Chair applications stay free.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-500 font-medium mb-1">Individual Delegate (USD $)</label>
                    <input
                      type="number"
                      min={0}
                      value={infoForm.feeIndividualUsd ?? 65}
                      onChange={e => setInfoForm({ ...infoForm, feeIndividualUsd: Number(e.target.value) })}
                      className="w-full bg-white border-slate-300 rounded-xl p-2 text-slate-800 focus:border-[#f4a024] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-500 font-medium mb-1">Delegation Base Fee (USD $)</label>
                    <input
                      type="number"
                      min={0}
                      value={infoForm.feeDelegationBaseUsd ?? 110}
                      onChange={e => setInfoForm({ ...infoForm, feeDelegationBaseUsd: Number(e.target.value) })}
                      className="w-full bg-white border-slate-300 rounded-xl p-2 text-slate-800 focus:border-[#f4a024] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-500 font-medium mb-1">Per Extra Delegate (USD $)</label>
                    <input
                      type="number"
                      min={0}
                      value={infoForm.feePerDelegateUsd ?? 55}
                      onChange={e => setInfoForm({ ...infoForm, feePerDelegateUsd: Number(e.target.value) })}
                      className="w-full bg-white border-slate-300 rounded-xl p-2 text-slate-800 focus:border-[#f4a024] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-500 font-medium mb-1">Naira Rate (1 USD = ₦)</label>
                    <input
                      type="number"
                      min={1}
                      value={infoForm.ngnPerUsd ?? 1500}
                      onChange={e => setInfoForm({ ...infoForm, ngnPerUsd: Number(e.target.value) })}
                      className="w-full bg-white border-slate-300 rounded-xl p-2 text-slate-800 focus:border-[#f4a024] outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#b56a00] mb-4 flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  <span>Hero Numbers</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-500 font-medium mb-1">Delegates</label>
                    <input
                      type="text"
                      value={infoForm.stats?.delegates ?? ''}
                      onChange={e => setInfoForm({ ...infoForm, stats: { ...infoForm.stats, delegates: e.target.value } })}
                      className="w-full bg-white border-slate-300 rounded-xl p-2 text-slate-800 focus:border-[#f4a024] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-500 font-medium mb-1">Nations</label>
                    <input
                      type="text"
                      value={infoForm.stats?.nations ?? ''}
                      onChange={e => setInfoForm({ ...infoForm, stats: { ...infoForm.stats, nations: e.target.value } })}
                      className="w-full bg-white border-slate-300 rounded-xl p-2 text-slate-800 focus:border-[#f4a024] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-500 font-medium mb-1">Schools</label>
                    <input
                      type="text"
                      value={infoForm.stats?.schools ?? ''}
                      onChange={e => setInfoForm({ ...infoForm, stats: { ...infoForm.stats, schools: e.target.value } })}
                      className="w-full bg-white border-slate-300 rounded-xl p-2 text-slate-800 focus:border-[#f4a024] outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#f4a024] hover:bg-[#f7b955] text-slate-950 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save General Changes</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: COMMITTEES */}
          {activeTab === 'committees' && (
            <div className="space-y-6">
              
              {/* Add Committee Form */}
              <form onSubmit={handleAddCommitteeSubmit} className="bg-white p-4 rounded-xl border border-slate-200 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#b56a00] flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  <span>Add New Committee / Council</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-500 mb-1 font-medium">Committee Full Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. UN Security Council"
                      value={newCommittee.name}
                      onChange={e => setNewCommittee({ ...newCommittee, name: e.target.value })}
                      className="w-full bg-white border-slate-300 rounded-xl p-2 text-slate-800 focus:border-[#f4a024] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-500 mb-1 font-medium">Acronym *</label>
                    <input
                      type="text"
                      placeholder="e.g. UNSC"
                      value={newCommittee.acronym}
                      onChange={e => setNewCommittee({ ...newCommittee, acronym: e.target.value })}
                      className="w-full bg-white border-slate-300 rounded-xl p-2 text-slate-800 focus:border-[#f4a024] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-500 mb-1 font-medium">Category</label>
                    <select
                      value={newCommittee.category}
                      onChange={e => setNewCommittee({ ...newCommittee, category: e.target.value as any })}
                      className="w-full bg-white border-slate-300 rounded-xl p-2 text-slate-800 focus:border-[#f4a024] outline-none"
                    >
                      <option value="general-assembly">General Assembly</option>
                      <option value="specialized">Specialized Organ</option>
                      <option value="crisis">Crisis / Dual Cabinet</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-500 mb-1 font-medium">Difficulty Level</label>
                    <select
                      value={newCommittee.level}
                      onChange={e => setNewCommittee({ ...newCommittee, level: e.target.value as any })}
                      className="w-full bg-white border-slate-300 rounded-xl p-2 text-slate-800 focus:border-[#f4a024] outline-none"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="Crisis / Dual">Crisis / Dual</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-500 mb-1 font-medium">Room Location</label>
                    <input
                      type="text"
                      placeholder="e.g. Senate Hall 101"
                      value={newCommittee.roomLocation}
                      onChange={e => setNewCommittee({ ...newCommittee, roomLocation: e.target.value })}
                      className="w-full bg-white border-slate-300 rounded-xl p-2 text-slate-800 focus:border-[#f4a024] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-500 mb-1 font-medium">Delegate Capacity</label>
                    <input
                      type="number"
                      value={newCommittee.delegateCapacity}
                      onChange={e => setNewCommittee({ ...newCommittee, delegateCapacity: parseInt(e.target.value) || 20 })}
                      className="w-full bg-white border-slate-300 rounded-xl p-2 text-slate-800 focus:border-[#f4a024] outline-none"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-slate-500 mb-1 font-medium">Topic A Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Maritime Security and Freedom of Navigation in International Straits"
                      value={newCommittee.topic1Title}
                      onChange={e => setNewCommittee({ ...newCommittee, topic1Title: e.target.value })}
                      className="w-full bg-white border-slate-300 rounded-xl p-2 text-slate-800 focus:border-[#f4a024] outline-none"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-slate-500 mb-1 font-medium">Committee Synopsis & Background</label>
                    <textarea
                      rows={2}
                      placeholder="Brief description of the committee mandate and agenda."
                      value={newCommittee.description}
                      onChange={e => setNewCommittee({ ...newCommittee, description: e.target.value })}
                      className="w-full bg-white border-slate-300 rounded-xl p-2 text-slate-800 focus:border-[#f4a024] outline-none resize-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-slate-500 mb-1 font-medium">Header Background Image URL</label>
                    <input
                      type="text"
                      value={newCommittee.bgImage}
                      onChange={e => setNewCommittee({ ...newCommittee, bgImage: e.target.value })}
                      className="w-full bg-white border-slate-300 rounded-xl p-2 text-slate-800 focus:border-[#f4a024] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-500 mb-1 font-medium">Upload Header Photo</label>
                    <label className="flex items-center justify-center gap-2 p-2 bg-slate-200 hover:bg-slate-300 rounded-xl text-xs font-bold text-slate-800 cursor-pointer transition-colors">
                      <ImageIcon className="w-4 h-4 text-[#f4a024]" />
                      <span>Browse Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageFileConvert(e, (base64) => setNewCommittee({ ...newCommittee, bgImage: base64 }))}
                      />
                    </label>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#f4a024] hover:bg-[#f7b955] text-slate-950 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Committee</span>
                  </button>
                </div>
              </form>

              {/* Committee Roster List */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Current Committees ({committees.length})
                </h3>

                {committees.length === 0 ? (
                  <div className="text-center py-8 bg-slate-100 rounded-xl border border-slate-200 text-slate-500 text-xs">
                    No committees loaded. Add one above or import a JSON dataset.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {committees.map((comm) => (
                      <div key={comm.id} className="bg-white p-3.5 rounded-xl border border-slate-200 flex justify-between items-start text-xs">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded-xl bg-[#00387d]/80 text-[#b56a00] font-mono font-bold text-[10px]">
                              {comm.acronym}
                            </span>
                            <span className="font-bold text-slate-800">{comm.name}</span>
                          </div>
                          <p className="text-slate-500 text-[11px] mt-1 line-clamp-1">{comm.description}</p>
                          <div className="text-[10px] text-slate-500 mt-1 flex items-center gap-3">
                            <span>Level: {comm.level}</span>
                            <span>Topics: {comm.topics.length}</span>
                            <span>Cap: {comm.delegateCapacity}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            deleteCommittee(comm.id);
                            showNotify('success', `Committee '${comm.acronym}' deleted.`);
                          }}
                          className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: SECRETARIAT */}
          {activeTab === 'secretariat' && (
            <div className="space-y-6">
              
              {/* Add Secretariat Form */}
              <form onSubmit={handleAddSecretariatSubmit} className="bg-white p-4 rounded-xl border border-slate-200 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#b56a00] flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  <span>Add Secretariat Member</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-500 mb-1 font-medium">Full Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Catherine DeWitt"
                      value={newMember.name}
                      onChange={e => setNewMember({ ...newMember, name: e.target.value })}
                      className="w-full bg-white border-slate-300 rounded-xl p-2 text-slate-800 focus:border-[#f4a024] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-500 mb-1 font-medium">Role / Title *</label>
                    <input
                      type="text"
                      placeholder="e.g. Secretary-General"
                      value={newMember.role}
                      onChange={e => setNewMember({ ...newMember, role: e.target.value })}
                      className="w-full bg-white border-slate-300 rounded-xl p-2 text-slate-800 focus:border-[#f4a024] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-500 mb-1 font-medium">Department</label>
                    <select
                      value={newMember.department}
                      onChange={e => setNewMember({ ...newMember, department: e.target.value as any })}
                      className="w-full bg-white border-slate-300 rounded-xl p-2 text-slate-800 focus:border-[#f4a024] outline-none"
                    >
                      <option value="Executive">Executive</option>
                      <option value="Academics">Academics</option>
                      <option value="Logistics">Logistics</option>
                      <option value="Delegate Affairs">Delegate Affairs</option>
                      <option value="Communications">Communications</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-500 mb-1 font-medium">Contact Email</label>
                    <input
                      type="text"
                      placeholder="e.g. sg@timun.org"
                      value={newMember.email}
                      onChange={e => setNewMember({ ...newMember, email: e.target.value })}
                      className="w-full bg-white border-slate-300 rounded-xl p-2 text-slate-800 focus:border-[#f4a024] outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-slate-500 mb-1 font-medium">Short Bio</label>
                    <input
                      type="text"
                      placeholder="e.g. Senior in Political Science leading conference affairs."
                      value={newMember.bio}
                      onChange={e => setNewMember({ ...newMember, bio: e.target.value })}
                      className="w-full bg-white border-slate-300 rounded-xl p-2 text-slate-800 focus:border-[#f4a024] outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-slate-500 mb-1 font-medium">Photo URL</label>
                    <input
                      type="text"
                      value={newMember.image}
                      onChange={e => setNewMember({ ...newMember, image: e.target.value })}
                      className="w-full bg-white border-slate-300 rounded-xl p-2 text-slate-800 focus:border-[#f4a024] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-500 mb-1 font-medium">Upload Headshot</label>
                    <label className="flex items-center justify-center gap-2 p-2 bg-slate-200 hover:bg-slate-300 rounded-xl text-xs font-bold text-slate-800 cursor-pointer transition-colors">
                      <ImageIcon className="w-4 h-4 text-[#f4a024]" />
                      <span>Upload Avatar</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageFileConvert(e, (base64) => setNewMember({ ...newMember, image: base64 }))}
                      />
                    </label>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#f4a024] hover:bg-[#f7b955] text-slate-950 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Member</span>
                  </button>
                </div>
              </form>

              {/* Secretariat List */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Secretariat Roster ({secretariatTeam.length})
                </h3>

                {secretariatTeam.length === 0 ? (
                  <div className="text-center py-8 bg-slate-100 rounded-xl border border-slate-200 text-slate-500 text-xs">
                    No secretariat members loaded. Add members above.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {secretariatTeam.map((mem) => (
                      <div key={mem.id} className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                          <img src={mem.image} alt={mem.name} className="w-10 h-10 rounded-full object-cover border border-[#f4a024]" />
                          <div>
                            <div className="font-bold text-slate-800">{mem.name}</div>
                            <div className="text-[10px] text-[#b56a00] font-medium">{mem.role}</div>
                            <div className="text-[10px] text-slate-500">{mem.department}</div>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            deleteSecretariatMember(mem.id);
                            showNotify('success', `Member '${mem.name}' deleted.`);
                          }}
                          className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-slate-700 rounded-xl transition-colors cursor-pointer shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: SCHEDULE */}
          {activeTab === 'schedule' && (
            <div className="space-y-6">
              
              {/* Add Schedule Item */}
              <form onSubmit={handleAddScheduleSubmit} className="bg-white p-4 rounded-xl border border-slate-200 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#b56a00] flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  <span>Add Itinerary Event</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-500 mb-1 font-medium">Conference Day</label>
                    <select
                      value={newSchedule.dayNumber}
                      onChange={e => setNewSchedule({ ...newSchedule, dayNumber: parseInt(e.target.value) || 1 })}
                      className="w-full bg-white border-slate-300 rounded-xl p-2 text-slate-800 focus:border-[#f4a024] outline-none"
                    >
                      {schedule.map(d => (
                        <option key={d.dayNumber} value={d.dayNumber}>
                          Day {d.dayNumber} ({d.dayName})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-500 mb-1 font-medium">Time Slot</label>
                    <input
                      type="text"
                      placeholder="e.g. 09:00 AM - 12:30 PM"
                      value={newSchedule.time}
                      onChange={e => setNewSchedule({ ...newSchedule, time: e.target.value })}
                      className="w-full bg-white border-slate-300 rounded-xl p-2 text-slate-800 focus:border-[#f4a024] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-500 mb-1 font-medium">Event Type</label>
                    <select
                      value={newSchedule.type}
                      onChange={e => setNewSchedule({ ...newSchedule, type: e.target.value as any })}
                      className="w-full bg-white border-slate-300 rounded-xl p-2 text-slate-800 focus:border-[#f4a024] outline-none"
                    >
                      <option value="session">Committee Session</option>
                      <option value="ceremony">Ceremony / Keynote</option>
                      <option value="social">Social / Gala</option>
                      <option value="workshop">Workshop / Briefing</option>
                      <option value="meal">Meal / Catering</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-slate-500 mb-1 font-medium">Event Title *</label>
                    <input
                      type="text"
                      placeholder="e.g. Opening Plenary Ceremony & Keynote Address"
                      value={newSchedule.title}
                      onChange={e => setNewSchedule({ ...newSchedule, title: e.target.value })}
                      className="w-full bg-white border-slate-300 rounded-xl p-2 text-slate-800 focus:border-[#f4a024] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-500 mb-1 font-medium">Location</label>
                    <input
                      type="text"
                      placeholder="e.g. Main Auditorium"
                      value={newSchedule.location}
                      onChange={e => setNewSchedule({ ...newSchedule, location: e.target.value })}
                      className="w-full bg-white border-slate-300 rounded-xl p-2 text-slate-800 focus:border-[#f4a024] outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#f4a024] hover:bg-[#f7b955] text-slate-950 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Event</span>
                  </button>
                </div>
              </form>

              {/* Schedule Days */}
              <div className="space-y-4">
                {schedule.map((day) => (
                  <div key={day.dayNumber} className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#b56a00] mb-3">
                      Day {day.dayNumber}: {day.dayName} ({day.date})
                    </h4>

                    {day.items.length === 0 ? (
                      <p className="text-xs text-slate-500 italic">No events scheduled for Day {day.dayNumber}.</p>
                    ) : (
                      <div className="space-y-2">
                        {day.items.map((item, idx) => (
                          <div key={idx} className="bg-white p-2.5 rounded-xl border border-slate-200 flex justify-between items-center text-xs">
                            <div>
                              <div className="font-bold text-slate-800 flex items-center gap-2">
                                <span className="text-[10px] text-[#f4a024] font-mono">{item.time}</span>
                                <span>{item.title}</span>
                              </div>
                              <div className="text-[10px] text-slate-500 mt-0.5">{item.location}</div>
                            </div>

                            <button
                              onClick={() => {
                                deleteScheduleItem(day.dayNumber, idx);
                                showNotify('success', 'Event removed.');
                              }}
                              className="p-1 text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: FAQS */}
          {activeTab === 'faqs' && (
            <div className="space-y-6">
              
              {/* Add FAQ Form */}
              <form onSubmit={handleAddFaqSubmit} className="bg-white p-4 rounded-xl border border-slate-200 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#b56a00] flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  <span>Add FAQ Item</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-500 mb-1 font-medium">Category</label>
                    <select
                      value={newFaq.category}
                      onChange={e => setNewFaq({ ...newFaq, category: e.target.value as any })}
                      className="w-full bg-white border-slate-300 rounded-xl p-2 text-slate-800 focus:border-[#f4a024] outline-none"
                    >
                      <option value="General">General</option>
                      <option value="Registration">Registration</option>
                      <option value="Academics & Rules">Academics & Rules</option>
                      <option value="Venue & Hotel">Venue & Hotel</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-slate-500 mb-1 font-medium">Question *</label>
                    <input
                      type="text"
                      placeholder="e.g. What is the dress code for committee sessions?"
                      value={newFaq.question}
                      onChange={e => setNewFaq({ ...newFaq, question: e.target.value })}
                      className="w-full bg-white border-slate-300 rounded-xl p-2 text-slate-800 focus:border-[#f4a024] outline-none"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-slate-500 mb-1 font-medium">Answer *</label>
                    <textarea
                      rows={2}
                      placeholder="Clear explanation for delegates and advisors."
                      value={newFaq.answer}
                      onChange={e => setNewFaq({ ...newFaq, answer: e.target.value })}
                      className="w-full bg-white border-slate-300 rounded-xl p-2 text-slate-800 focus:border-[#f4a024] outline-none resize-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#f4a024] hover:bg-[#f7b955] text-slate-950 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add FAQ</span>
                  </button>
                </div>
              </form>

              {/* FAQ List */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  FAQs List ({faqs.length})
                </h3>

                <div className="space-y-2">
                  {faqs.map(faq => (
                    <div key={faq.id} className="bg-white p-3 rounded-xl border border-slate-200 flex justify-between items-start text-xs">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#b56a00] px-1.5 py-0.5 rounded-xl bg-[#f4a024]/10 border border-[#f4a024]/20">
                          {faq.category}
                        </span>
                        <div className="font-bold text-slate-800 mt-1">{faq.question}</div>
                        <p className="text-slate-500 text-[11px] mt-1">{faq.answer}</p>
                      </div>

                      <button
                        onClick={() => {
                          deleteFaq(faq.id);
                          showNotify('success', 'FAQ removed.');
                        }}
                        className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors cursor-pointer shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: SITE UPLOADS & JSON */}
          {activeTab === 'import-export' && (
            <div className="space-y-6">
              
              {/* File Upload Box */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#f4a024]/20 text-[#b56a00] flex items-center justify-center mx-auto">
                  <Upload className="w-6 h-6" />
                </div>

                <div>
                  <h3 className="text-base font-serif font-bold text-slate-800">
                    Upload & Import Site Configuration
                  </h3>
                  <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 leading-relaxed">
                    Upload a custom <code className="text-[#b56a00] bg-slate-100 px-1.5 py-0.5 rounded-xl">.json</code> conference data file to populate all committees, secretariat rosters, themes, and schedules instantly.
                  </p>
                </div>

                <div className="pt-2 flex justify-center gap-3">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept=".json"
                    onChange={handleFileUpload}
                    className="hidden"
                  />

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-5 py-2.5 bg-[#f4a024] hover:bg-[#f7b955] text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Select JSON File to Upload</span>
                  </button>

                  <button
                    onClick={handleExportDownload}
                    className="px-5 py-2.5 bg-[#00387d] hover:bg-[#294a70] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-[#f4a024]" />
                    <span>Export Current JSON Backup</span>
                  </button>
                </div>
              </div>

              {/* Data Reset Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-100 p-4 rounded-xl border border-slate-200 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-rose-300 flex items-center gap-2">
                    <Trash2 className="w-4 h-4" />
                    <span>Clear All Dummy Information</span>
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Empties all placeholder items so you can populate TiMUN 2027 from a completely clean slate.
                  </p>
                  <button
                    onClick={() => {
                      if (window.confirm("Are you sure you want to clear all dummy items and start fresh?")) {
                        clearAllDataToEmpty();
                        showNotify('success', 'Cleared all dummy information! You now have a clean slate.');
                      }
                    }}
                    className="mt-2 px-3.5 py-2 bg-[#fde2e2] hover:bg-[#f8bcbc] text-[#a80e0e] border border-[#f8bcbc] rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                  >
                    Clear All Dummy Data
                  </button>
                </div>

                <div className="bg-slate-100 p-4 rounded-xl border border-slate-200 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#b56a00] flex items-center gap-2">
                    <RotateCcw className="w-4 h-4" />
                    <span>Restore Starter Sample Template</span>
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Resets the site data back to the default TiMUN 2027 starter template structure.
                  </p>
                  <button
                    onClick={() => {
                      if (window.confirm("Restore default sample starter data?")) {
                        resetToDefaults();
                        showNotify('success', 'Restored default TiMUN 2027 starter template.');
                      }
                    }}
                    className="mt-2 px-3.5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                  >
                    Restore Starter Template
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>
        </>
        )}

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-slate-100 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500 shrink-0">
          <span>TiMUN 2027 Secretariat Content System</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#00387d] hover:bg-[#294a70] text-white font-bold rounded-xl cursor-pointer transition-colors"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
