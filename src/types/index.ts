export type CommitteeCategory = 'all' | 'general-assembly' | 'specialized' | 'crisis';

export interface Chair {
  name: string;
  role: string;
  bio: string;
  university: string;
  avatar: string;
}

export interface Committee {
  id: string;
  name: string;
  acronym: string;
  category: Exclude<CommitteeCategory, 'all'>;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Crisis / Dual' | 'Beginner / Intermediate' | 'Intermediate / Advanced';
  delegateCapacity: number;
  assignedCount: number;
  topics: {
    title: string;
    description: string;
    keywords: string[];
  }[];
  chairs: Chair[];
  description: string;
  studyGuideUrl: string;
  roomLocation: string;
  bgImage: string;
}

export interface CountryMatrixItem {
  id: string;
  country: string;
  flagCode: string;
  flagEmoji: string;
  region: 'Africa' | 'Americas' | 'Asia-Pacific' | 'Europe' | 'Middle East' | 'Middle East / Africa';
  status: 'available' | 'reserved' | 'assigned';
  committeeId: string;
  committeeAcronym: string;
}

export interface ScheduleItem {
  time: string;
  title: string;
  location: string;
  description: string;
  type: 'ceremony' | 'session' | 'social' | 'meal' | 'break' | 'workshop';
  dressCode?: string;
}

export interface DaySchedule {
  dayNumber: number;
  date: string;
  dayName: string;
  items: ScheduleItem[];
}

export interface SecretariatMember {
  id: string;
  name: string;
  role: string;
  department: 'Executive' | 'Academics' | 'Logistics' | 'Delegate Affairs' | 'Communications';
  bio: string;
  email: string;
  image: string;
  linkedIn?: string;
}

export interface FAQItem {
  id: string;
  category: 'General' | 'Registration' | 'Academics & Rules' | 'Venue & Hotel' | 'Partnerships';
  question: string;
  answer: string;
}

export interface PreambularClause {
  id: string;
  starter: string; // e.g. "Affirming", "Bearing in mind", "Deeply concerned"
  text: string;
}

export interface OperativeClause {
  id: string;
  number: number;
  starter: string; // e.g. "Calls upon", "Recommends", "Urges", "Decides"
  text: string;
  subClauses: string[];
}

export interface ResolutionDraft {
  committeeName: string;
  topicTitle: string;
  sponsors: string[];
  signatories: string[];
  preambularClauses: PreambularClause[];
  operativeClauses: OperativeClause[];
}

export interface RegistrationFormData {
  type: 'individual' | 'delegation' | 'chair';
  fullName: string;
  email: string;
  phone: string;
  institution: string;
  delegationSize?: number;
  firstChoiceCommittee: string;
  secondChoiceCommittee: string;
  preferredCountries: string;
  dietaryRequirements: string;
  experienceLevel: 'Novice (0-2 MUNs)' | 'Experienced (3-6 MUNs)' | 'Veteran (7+ MUNs)';
  positionPaperAgree: boolean;
  notes?: string;
}

