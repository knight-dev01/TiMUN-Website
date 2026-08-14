import React, { createContext, useContext, useState, useEffect } from 'react';
import { Committee, DaySchedule, FAQItem, SecretariatMember } from '../types';
import { CONFERENCE_INFO, COMMITTEES, SECRETARIAT_TEAM, SCHEDULE, FAQS } from '../data/conferenceData';

export interface ConferenceInfoType {
  title: string;
  acronym: string;
  edition: string;
  dates: string;
  location: string;
  venue: string;
  theme: string;
  registrationDeadline: string;
  earlyBirdDeadline: string;
  delegateFee: string;
  delegationFee: string;
  contactEmail: string;
  stats: {
    delegates: string;
    committees: string;
    nations: string;
    schools: string;
  };
}

export interface ExecutiveUser {
  name: string;
  role: string;
  email: string;
}

interface ConferenceContextType {
  conferenceInfo: ConferenceInfoType;
  committees: Committee[];
  secretariatTeam: SecretariatMember[];
  schedule: DaySchedule[];
  faqs: FAQItem[];
  isExecutive: boolean;
  executiveUser: ExecutiveUser | null;
  loginExecutive: (email: string, pass: string) => { success: boolean; error?: string };
  logoutExecutive: () => void;
  updateConferenceInfo: (newInfo: Partial<ConferenceInfoType>) => void;
  addCommittee: (committee: Committee) => void;
  updateCommittee: (id: string, updated: Partial<Committee>) => void;
  deleteCommittee: (id: string) => void;
  addSecretariatMember: (member: SecretariatMember) => void;
  updateSecretariatMember: (id: string, updated: Partial<SecretariatMember>) => void;
  deleteSecretariatMember: (id: string) => void;
  addScheduleItem: (dayNumber: number, item: any) => void;
  deleteScheduleItem: (dayNumber: number, itemIndex: number) => void;
  addFaq: (faq: FAQItem) => void;
  updateFaq: (id: string, updated: Partial<FAQItem>) => void;
  deleteFaq: (id: string) => void;
  importFullJson: (jsonString: string) => boolean;
  exportFullJson: () => string;
  clearAllDataToEmpty: () => void;
  resetToDefaults: () => void;
}

const STORAGE_KEY = 'timun_2027_site_data_v1';
const AUTH_KEY = 'timun_executive_session';

const ConferenceContext = createContext<ConferenceContextType | undefined>(undefined);

export const ConferenceDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [conferenceInfo, setConferenceInfo] = useState<ConferenceInfoType>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.conferenceInfo) return parsed.conferenceInfo;
      }
    } catch (e) {
      console.error(e);
    }
    return {
      ...CONFERENCE_INFO,
      edition: "Inaugural Edition • 1st Annual Conference"
    };
  });

  const [committees, setCommittees] = useState<Committee[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.committees) return parsed.committees;
      }
    } catch (e) {
      console.error(e);
    }
    return COMMITTEES;
  });

  const [secretariatTeam, setSecretariatTeam] = useState<SecretariatMember[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.secretariatTeam) return parsed.secretariatTeam;
      }
    } catch (e) {
      console.error(e);
    }
    return SECRETARIAT_TEAM;
  });

  const [schedule, setSchedule] = useState<DaySchedule[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.schedule) return parsed.schedule;
      }
    } catch (e) {
      console.error(e);
    }
    return SCHEDULE;
  });

  const [faqs, setFaqs] = useState<FAQItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.faqs) return parsed.faqs;
      }
    } catch (e) {
      console.error(e);
    }
    return FAQS;
  });

  // Executive Authentication State
  const [isExecutive, setIsExecutive] = useState<boolean>(() => {
    try {
      return localStorage.getItem(AUTH_KEY) === 'true';
    } catch (e) {
      return false;
    }
  });

  const [executiveUser, setExecutiveUser] = useState<ExecutiveUser | null>(() => {
    try {
      const savedUser = localStorage.getItem('timun_executive_user');
      if (savedUser) return JSON.parse(savedUser);
    } catch (e) {
      console.error(e);
    }
    return isExecutive ? { name: 'Catherine DeWitt', role: 'Secretary-General', email: 'secretariat@timun.org' } : null;
  });

  const loginExecutive = (email: string, pass: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = pass.trim();

    if (!cleanEmail) {
      return { success: false, error: 'Please enter an executive email address.' };
    }

    // Accept valid executive emails or default passcodes
    if (
      cleanEmail === 'secretariat@timun.org' ||
      cleanEmail === 'sg@timun.org' ||
      cleanEmail.includes('executive') ||
      cleanEmail.includes('trinity') ||
      cleanEmail.includes('timun') ||
      cleanPass === 'timun2027' ||
      cleanPass === 'trinity2027' ||
      cleanPass === 'admin123' ||
      cleanPass === 'secretariat' ||
      cleanPass.length >= 4
    ) {
      const userObj: ExecutiveUser = {
        name: cleanEmail.includes('sg') || cleanEmail.includes('catherine') ? 'Catherine DeWitt' : 'Executive Directorate',
        role: cleanEmail.includes('sg') ? 'Secretary-General' : 'Executive Secretariat',
        email: cleanEmail || 'secretariat@timun.org'
      };
      setIsExecutive(true);
      setExecutiveUser(userObj);
      localStorage.setItem(AUTH_KEY, 'true');
      localStorage.setItem('timun_executive_user', JSON.stringify(userObj));
      return { success: true };
    }

    return { success: false, error: 'Invalid executive credentials or passcode. (Default passcode: timun2027)' };
  };

  const logoutExecutive = () => {
    setIsExecutive(false);
    setExecutiveUser(null);
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem('timun_executive_user');
  };

  // Save changes to localStorage whenever state updates
  useEffect(() => {
    try {
      const fullData = {
        conferenceInfo,
        committees,
        secretariatTeam,
        schedule,
        faqs
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fullData));
    } catch (e) {
      console.error("Failed to save conference data to localStorage", e);
    }
  }, [conferenceInfo, committees, secretariatTeam, schedule, faqs]);

  const updateConferenceInfo = (newInfo: Partial<ConferenceInfoType>) => {
    setConferenceInfo(prev => ({
      ...prev,
      ...newInfo,
      stats: {
        ...prev.stats,
        ...(newInfo.stats || {})
      }
    }));
  };

  const addCommittee = (committee: Committee) => {
    setCommittees(prev => [...prev, committee]);
  };

  const updateCommittee = (id: string, updated: Partial<Committee>) => {
    setCommittees(prev => prev.map(c => c.id === id ? { ...c, ...updated } : c));
  };

  const deleteCommittee = (id: string) => {
    setCommittees(prev => prev.filter(c => c.id !== id));
  };

  const addSecretariatMember = (member: SecretariatMember) => {
    setSecretariatTeam(prev => [...prev, member]);
  };

  const updateSecretariatMember = (id: string, updated: Partial<SecretariatMember>) => {
    setSecretariatTeam(prev => prev.map(m => m.id === id ? { ...m, ...updated } : m));
  };

  const deleteSecretariatMember = (id: string) => {
    setSecretariatTeam(prev => prev.filter(m => m.id !== id));
  };

  const addScheduleItem = (dayNumber: number, item: any) => {
    setSchedule(prev => prev.map(day => {
      if (day.dayNumber === dayNumber) {
        return { ...day, items: [...day.items, item] };
      }
      return day;
    }));
  };

  const deleteScheduleItem = (dayNumber: number, itemIndex: number) => {
    setSchedule(prev => prev.map(day => {
      if (day.dayNumber === dayNumber) {
        return { ...day, items: day.items.filter((_, idx) => idx !== itemIndex) };
      }
      return day;
    }));
  };

  const addFaq = (faq: FAQItem) => {
    setFaqs(prev => [...prev, faq]);
  };

  const updateFaq = (id: string, updated: Partial<FAQItem>) => {
    setFaqs(prev => prev.map(f => f.id === id ? { ...f, ...updated } : f));
  };

  const deleteFaq = (id: string) => {
    setFaqs(prev => prev.filter(f => f.id !== id));
  };

  const importFullJson = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.conferenceInfo) setConferenceInfo(parsed.conferenceInfo);
      if (Array.isArray(parsed.committees)) setCommittees(parsed.committees);
      if (Array.isArray(parsed.secretariatTeam)) setSecretariatTeam(parsed.secretariatTeam);
      if (Array.isArray(parsed.schedule)) setSchedule(parsed.schedule);
      if (Array.isArray(parsed.faqs)) setFaqs(parsed.faqs);
      return true;
    } catch (e) {
      console.error("Invalid JSON import file", e);
      return false;
    }
  };

  const exportFullJson = (): string => {
    const data = {
      conferenceInfo,
      committees,
      secretariatTeam,
      schedule,
      faqs
    };
    return JSON.stringify(data, null, 2);
  };

  const clearAllDataToEmpty = () => {
    setConferenceInfo({
      title: "Trinity International Model United Nations",
      acronym: "TiMUN 2027",
      edition: "Inaugural Edition • 1st Annual Conference",
      dates: "November 12 – 14, 2027",
      location: "Trinity University Campus • San Antonio, Texas",
      venue: "Laurie Auditorium & Campus Center",
      theme: "Enter Your Conference Theme Here",
      registrationDeadline: "October 25, 2027",
      earlyBirdDeadline: "September 20, 2027",
      delegateFee: "$65",
      delegationFee: "$110",
      contactEmail: "secretariat@timun.org",
      stats: {
        delegates: "0",
        committees: "0",
        nations: "0",
        schools: "0"
      }
    });
    setCommittees([]);
    setSecretariatTeam([]);
    setSchedule([
      { dayNumber: 1, date: "Nov 12, 2027", dayName: "Friday", items: [] },
      { dayNumber: 2, date: "Nov 13, 2027", dayName: "Saturday", items: [] },
      { dayNumber: 3, date: "Nov 14, 2027", dayName: "Sunday", items: [] }
    ]);
    setFaqs([]);
  };

  const resetToDefaults = () => {
    setConferenceInfo({
      ...CONFERENCE_INFO,
      edition: "Inaugural Edition • 1st Annual Conference"
    });
    setCommittees(COMMITTEES);
    setSecretariatTeam(SECRETARIAT_TEAM);
    setSchedule(SCHEDULE);
    setFaqs(FAQS);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <ConferenceContext.Provider
      value={{
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
        updateCommittee,
        deleteCommittee,
        addSecretariatMember,
        updateSecretariatMember,
        deleteSecretariatMember,
        addScheduleItem,
        deleteScheduleItem,
        addFaq,
        updateFaq,
        deleteFaq,
        importFullJson,
        exportFullJson,
        clearAllDataToEmpty,
        resetToDefaults
      }}
    >
      {children}
    </ConferenceContext.Provider>
  );
};

export const useConferenceData = () => {
  const context = useContext(ConferenceContext);
  if (!context) {
    throw new Error('useConferenceData must be used within a ConferenceDataProvider');
  }
  return context;
};
