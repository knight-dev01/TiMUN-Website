import { Committee, CountryMatrixItem, DaySchedule, FAQItem, SecretariatMember } from '../types';

export const CONFERENCE_INFO = {
  title: "Trinity International Model United Nations",
  acronym: "TiMUN 2027",
  edition: "Annual International Youth Diplomacy & Leadership Conference",
  dates: "2027",
  location: "Trinity University, Yaba • Lagos, Nigeria",
  venue: "Main Auditorium & Senate Hall Complex",
  theme: "Beyond the Classroom: Equipping Youth to Lead in Diplomacy, Governance & Global Affairs",
  registrationDeadline: "To be announced",
  earlyBirdDeadline: "To be announced",
  delegateFee: "$65",
  delegationFee: "$110",
  contactEmail: "secretariat@timun.org",
  stats: {
    delegates: "500+",
    committees: "8",
    nations: "50+",
    schools: "60+"
  }
};

export const COMMITTEES: Committee[] = [
  {
    id: "unsc",
    name: "United Nations Security Council",
    acronym: "UNSC",
    category: "specialized",
    level: "Advanced",
    delegateCapacity: 15,
    assignedCount: 11,
    description: "The premier global organ for international peace and security. Delegates navigate fast-moving crisis scenarios, maritime chokepoints, and conflict de-escalation.",
    roomLocation: "Senate Hall 101",
    bgImage: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80",
    studyGuideUrl: "#",
    topics: [
      {
        title: "Maritime Security & Freedom of Navigation in International Trade Corridors",
        description: "Evaluating asymmetric naval threats, protecting critical chokepoints, and stabilizing international shipping routes without escalating regional hostilities.",
        keywords: ["Maritime Security", "Trade Corridors", "UNCLOS", "Naval Escorts"]
      },
      {
        title: "Mitigating Regional Security Spillovers & Countering Cross-Border Insurgencies",
        description: "Coordinating multilateral peace operations, border security management, and intelligence sharing across fragile border regions.",
        keywords: ["Peacekeeping Mandates", "Border Security", "Multilateral Defense"]
      }
    ],
    chairs: [
      {
        name: "Alexander Vance",
        role: "Head Chair",
        university: "Trinity University (Associate Institution)",
        bio: "Specialist in international diplomacy, UNSC parliamentary procedure, and regional conflict de-escalation.",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
      },
      {
        name: "Sofia Rodriguez-Chen",
        role: "Deputy Chair",
        university: "TiMUN Academic Directorate",
        bio: "Expertise in crisis directive dynamics and multilateral treaty frameworks.",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80"
      }
    ]
  },
  {
    id: "au-psc",
    name: "African Union Peace & Security Council",
    acronym: "AU-PSC",
    category: "specialized",
    level: "Intermediate / Advanced",
    delegateCapacity: 30,
    assignedCount: 22,
    description: "Simulating the African Union's standing decision-making organ for the prevention, management, and resolution of conflicts under the African Peace and Security Architecture (APSA).",
    roomLocation: "Arts Block Hall B",
    bgImage: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1200&q=80",
    studyGuideUrl: "#",
    topics: [
      {
        title: "Operationalizing the African Standby Force & Silencing the Guns Framework",
        description: "Addressing constitutional transitions, regional security mechanisms, and sustainable funding for continental peace support operations.",
        keywords: ["APSA", "African Standby Force", "Silencing the Guns", "Constitutional Order"]
      },
      {
        title: "Youth, Peace and Security (YPS): Mainstreaming Youth Leadership in Regional Mediation",
        description: "Translating continental youth policy declarations into actionable mediation and disarmament frameworks across Member States.",
        keywords: ["YPS Framework", "Youth Mediation", "Disarmament", "Continental Integration"]
      }
    ],
    chairs: [
      {
        name: "David K. Osei",
        role: "Head Chair",
        university: "TiMUN Diplomatic Directorate",
        bio: "Experienced diplomat simulation trainer with focus on AU institutions, continental trade, and multilateral diplomacy.",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80"
      }
    ]
  },
  {
    id: "ecowas",
    name: "ECOWAS Authority of Heads of State & Government",
    acronym: "ECOWAS",
    category: "specialized",
    level: "Intermediate",
    delegateCapacity: 25,
    assignedCount: 19,
    description: "Regional economic community simulation addressing West African regional integration, trade harmonization (AfCFTA), democratic governance, and cross-border security cooperation.",
    roomLocation: "Heritage Chamber 202",
    bgImage: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80",
    studyGuideUrl: "#",
    topics: [
      {
        title: "Strengthening Regional Democratic Governance & Constitutional Convergence",
        description: "Evaluating regional protocols on democracy and good governance, sanctions enforcement, and diplomatic mediation strategies.",
        keywords: ["Democratic Protocols", "ECOWAS Commission", "Good Governance", "Mediation"]
      },
      {
        title: "Accelerating Cross-Border Trade Liberalization & Common Currency Implementation",
        description: "Eliminating non-tariff barriers, integrating energy grids, and advancing financial settlement systems across West Africa.",
        keywords: ["AfCFTA", "ECOWAS Trade Liberalization", "Regional Infrastructure", "ECO Currency"]
      }
    ],
    chairs: [
      {
        name: "Amina Al-Mansoor",
        role: "Head Chair",
        university: "TiMUN Executive Committee",
        bio: "Specializes in West African regional integration, international trade law, and multilateral negotiations.",
        avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=300&q=80"
      }
    ]
  },
  {
    id: "nass",
    name: "National Assembly: Joint Committee on Foreign Affairs & Youth Development",
    acronym: "NASS Joint Committee",
    category: "specialized",
    level: "Beginner / Intermediate",
    delegateCapacity: 40,
    assignedCount: 28,
    description: "Legislative and national governance simulation where delegates act as distinguished legislators, debating national foreign policy bills, youth empowerment funding, and international treaty ratification.",
    roomLocation: "Parliamentary Chamber",
    bgImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    studyGuideUrl: "#",
    topics: [
      {
        title: "Legislative Oversight for National Youth Empowerment & Entrepreneurship Funding Act",
        description: "Drafting legislative policy instruments to fund youth innovation hubs, vocational tech incubators, and accessible seed capital for young graduates and NYSC corps members.",
        keywords: ["Youth Innovation Act", "Legislative Oversight", "Appropriations", "NYSC Entrepreneurship"]
      },
      {
        title: "National Diaspora Engagement & Foreign Service Modernization Bill",
        description: "Establishing legislative frameworks for diaspora investment protection, citizen diplomacy, and bilateral labor agreements.",
        keywords: ["Diaspora Commission", "Foreign Service Reform", "Bilateral Agreements"]
      }
    ],
    chairs: [
      {
        name: "Hon. Marcus Thorne",
        role: "Presiding Chair",
        university: "TiMUN Policy Directorate",
        bio: "Experienced in parliamentary procedure, legislative drafting, and public policy analysis.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
      }
    ]
  },
  {
    id: "disec",
    name: "General Assembly 1: Disarmament & International Security",
    acronym: "GA1: DISEC",
    category: "general-assembly",
    level: "Intermediate",
    delegateCapacity: 60,
    assignedCount: 42,
    description: "The General Assembly First Committee dealing with global disarmament, preventing militarization of outer space, and AI weapon governance.",
    roomLocation: "Main Auditorium East Wing",
    bgImage: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1200&q=80",
    studyGuideUrl: "#",
    topics: [
      {
        title: "Regulating Lethal Autonomous Weapons Systems (LAWS) & Military AI",
        description: "Drafting international legally binding instruments on military AI applications, human command verification, and automated targeting constraints.",
        keywords: ["Autonomous Weapons", "Military AI", "Geneva Protocol", "International Humanitarian Law"]
      },
      {
        title: "Preventing an Arms Race in Outer Space (PAROS) & Satellite Infrastructure Protection",
        description: "Establishing orbital debris accountability and moratoriums on destructive anti-satellite tests.",
        keywords: ["PAROS Treaty", "Space Security", "Orbital Debris", "ASAT Moratorium"]
      }
    ],
    chairs: [
      {
        name: "Julian Thorne",
        role: "Co-Chair",
        university: "TiMUN Secretariat",
        bio: "Specialist in cyber defense, disarmament treaties, and international security architecture.",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80"
      }
    ]
  },
  {
    id: "ecosoc",
    name: "Economic and Social Council",
    acronym: "ECOSOC",
    category: "general-assembly",
    level: "Beginner / Intermediate",
    delegateCapacity: 50,
    assignedCount: 38,
    description: "Coordinates multilateral economic and social development, debt relief frameworks for developing nations, and SDG Agenda 2030 implementation.",
    roomLocation: "Science Block 204",
    bgImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    studyGuideUrl: "#",
    topics: [
      {
        title: "Sovereign Debt Restructuring & Climate Finance Architecture for Developing Nations",
        description: "Designing debt-for-climate swaps, reform of multilateral development banks, and capital access for emerging markets.",
        keywords: ["Sovereign Debt", "Climate Finance", "Debt-for-Nature", "MDB Reform"]
      },
      {
        title: "Building Resilient Agricultural Supply Chains & Combating Global Food Insecurity",
        description: "Ensuring trade corridor logistics remain open and establishing regional grain reserves.",
        keywords: ["Food Security", "Trade Logistics", "Agricultural Subsidies", "SDG 2"]
      }
    ],
    chairs: [
      {
        name: "Priya Nair",
        role: "Head Chair",
        university: "TiMUN Academic Directorate",
        bio: "Passionate about macro-economic policy, international development economics, and multilateral finance.",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80"
      }
    ]
  },
  {
    id: "unhcr",
    name: "United Nations High Commissioner for Refugees",
    acronym: "UNHCR",
    category: "specialized",
    level: "Beginner",
    delegateCapacity: 45,
    assignedCount: 30,
    description: "Dedicated to protecting rights, international legal protections, and long-term socio-economic inclusion for refugees and displaced communities.",
    roomLocation: "Humanities Block 110",
    bgImage: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80",
    studyGuideUrl: "#",
    topics: [
      {
        title: "Legal Frameworks & Human Rights Protection for Climate-Induced Cross-Border Displaced Persons",
        description: "Addressing protection gaps for individuals displaced by environmental disasters and sea-level rise.",
        keywords: ["Climate Migration", "1951 Convention", "Non-refoulement", "Humanitarian Aid"]
      },
      {
        title: "Economic Self-Reliance & Right-to-Work Integration for Protracted Refugee Populations",
        description: "Transitioning from emergency camp dependency to dignified work permits and educational inclusion in host nations.",
        keywords: ["Right to Work", "Refugee Integration", "Host Communities", "Livelihood Programs"]
      }
    ],
    chairs: [
      {
        name: "Gabriel Santos",
        role: "Head Chair",
        university: "TiMUN Human Rights Desk",
        bio: "Specializes in international humanitarian law, refugee protection, and civic rights advocacy.",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80"
      }
    ]
  },
  {
    id: "who",
    name: "World Health Organization",
    acronym: "WHO",
    category: "specialized",
    level: "Intermediate",
    delegateCapacity: 50,
    assignedCount: 35,
    description: "Directing international public health standards, global pathogen surveillance, equitable vaccine technology transfer, and health system resilience.",
    roomLocation: "Science Complex 302",
    bgImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    studyGuideUrl: "#",
    topics: [
      {
        title: "Operationalizing the Global Pandemic Accord & Equitable Biologics Manufacturing",
        description: "Establishing binding protocols for real-time pathogen genomic sharing, IP waivers during emergencies, and decentralized vaccine production in the Global South.",
        keywords: ["Pandemic Accord", "Biologics Transfer", "Genomic Surveillance", "Universal Healthcare"]
      },
      {
        title: "Combatting Antimicrobial Resistance (AMR) Through a Unified One Health Approach",
        description: "Coordinating global surveillance against multi-drug resistant superbugs across agriculture and clinical systems.",
        keywords: ["Antimicrobial Resistance", "One Health", "Pharma R&D", "Public Health"]
      }
    ],
    chairs: [
      {
        name: "Dr. Elena Rostova",
        role: "Guest Chair & Advisor",
        university: "Public Health Directorate",
        bio: "Specialist in multilateral biosecurity policy, disease surveillance, and global health diplomacy.",
        avatar: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=300&q=80"
      }
    ]
  }
];

export const COUNTRY_MATRIX_SAMPLE: CountryMatrixItem[] = [
  { id: "c1", country: "United States", flagCode: "us", flagEmoji: "🇺🇸", region: "Americas", status: "assigned", committeeId: "unsc", committeeAcronym: "UNSC" },
  { id: "c2", country: "United Kingdom", flagCode: "gb", flagEmoji: "🇬🇧", region: "Europe", status: "assigned", committeeId: "unsc", committeeAcronym: "UNSC" },
  { id: "c3", country: "France", flagCode: "fr", flagEmoji: "🇫🇷", region: "Europe", status: "assigned", committeeId: "unsc", committeeAcronym: "UNSC" },
  { id: "c4", country: "Nigeria", flagCode: "ng", flagEmoji: "🇳🇬", region: "Africa", status: "assigned", committeeId: "au-psc", committeeAcronym: "AU-PSC" },
  { id: "c5", country: "Ghana", flagCode: "gh", flagEmoji: "🇬🇭", region: "Africa", status: "assigned", committeeId: "ecowas", committeeAcronym: "ECOWAS" },
  { id: "c6", country: "Senegal", flagCode: "sn", flagEmoji: "🇸🇳", region: "Africa", status: "available", committeeId: "ecowas", committeeAcronym: "ECOWAS" },
  { id: "c7", country: "South Africa", flagCode: "za", flagEmoji: "🇿🇦", region: "Africa", status: "available", committeeId: "au-psc", committeeAcronym: "AU-PSC" },
  { id: "c8", country: "Kenya", flagCode: "ke", flagEmoji: "🇰🇪", region: "Africa", status: "available", committeeId: "au-psc", committeeAcronym: "AU-PSC" },
  { id: "c9", country: "Egypt", flagCode: "eg", flagEmoji: "🇪🇬", region: "Middle East / Africa", status: "available", committeeId: "unsc", committeeAcronym: "UNSC" },
  { id: "c10", country: "Brazil", flagCode: "br", flagEmoji: "🇧🇷", region: "Americas", status: "available", committeeId: "ecosoc", committeeAcronym: "ECOSOC" },
  { id: "c11", country: "Germany", flagCode: "de", flagEmoji: "🇩🇪", region: "Europe", status: "available", committeeId: "disec", committeeAcronym: "GA1: DISEC" },
  { id: "c12", country: "India", flagCode: "in", flagEmoji: "🇮🇳", region: "Asia-Pacific", status: "reserved", committeeId: "disec", committeeAcronym: "GA1: DISEC" },
  { id: "c13", country: "Canada", flagCode: "ca", flagEmoji: "🇨🇦", region: "Americas", status: "available", committeeId: "unhcr", committeeAcronym: "UNHCR" },
  { id: "c14", country: "Japan", flagCode: "jp", flagEmoji: "🇯🇵", region: "Asia-Pacific", status: "available", committeeId: "who", committeeAcronym: "WHO" },
  { id: "c15", country: "Rwanda", flagCode: "rw", flagEmoji: "🇷🇼", region: "Africa", status: "available", committeeId: "au-psc", committeeAcronym: "AU-PSC" },
  { id: "c16", country: "Côte d'Ivoire", flagCode: "ci", flagEmoji: "🇨🇮", region: "Africa", status: "available", committeeId: "ecowas", committeeAcronym: "ECOWAS" }
];

export const SCHEDULE: DaySchedule[] = [
  {
    dayNumber: 1,
    date: "Day One",
    dayName: "Arrival — Accreditation, Opening Ceremony & Simulation Commencement",
    items: [
      { time: "09:00 - 11:30", title: "Delegate Accreditation & Conference Pack Collection", location: "Main Auditorium Foyer", description: "Accreditation, credentials validation, TiMUN delegate folders, handbook, and badge collection.", type: "ceremony" },
      { time: "11:30 - 13:00", title: "Inaugural Opening Ceremony & Diplomatic Keynotes", location: "Main Auditorium Stage", description: "Addresses by the Founders & Executive Directorate, Trinity University leadership, and Distinguished Guest Diplomats.", type: "ceremony", dressCode: "Western Business / Official National Attire" },
      { time: "13:00 - 14:15", title: "Executive Welcome Luncheon & Networking", location: "University Banquet Hall", description: "Catered networking lunch connecting delegates, faculty advisors, and institutional partners.", type: "meal" },
      { time: "14:30 - 16:00", title: "First-Time Delegate Workshop & Rules of Procedure (ROP) Masterclass", location: "Lecture Theatre 2", description: "Interactive session on parliamentary procedure, caucus navigation, points & motions, and resolution formulation.", type: "workshop" },
      { time: "16:15 - 19:30", title: "Committee Session I — Setting the Agenda, Roll Call & Opening Statements", location: "Respective Committee Rooms", description: "Formal opening speeches, establishing speakers' lists, setting agenda priority, and initial moderated debate.", type: "session", dressCode: "Western Business Attire" },
      { time: "19:45 - 21:30", title: "Diplomatic Icebreaker & Youth Leadership Mixer", location: "Campus Courtyard Terrace", description: "Informal networking, music, light refreshments, and inter-delegation cultural exchange.", type: "social" }
    ]
  },
  {
    dayNumber: 2,
    date: "Day Two",
    dayName: "Debate — Practical Workshops, Blocs & Resolution Drafting",
    items: [
      { time: "08:30 - 09:00", title: "Morning Tea & Chair Strategy Briefings", location: "Campus Atrium", description: "Morning refreshments and committee dais briefings.", type: "meal" },
      { time: "09:00 - 12:30", title: "Committee Session II — Working Papers, Unmoderated Caucuses & Blocs", location: "Respective Committee Rooms", description: "Coalition building, working paper drafting, and substantive debate on core agenda items.", type: "session", dressCode: "Western Business Attire" },
      { time: "12:30 - 14:00", title: "Practical Professional Development & Policy Workshop", location: "Science Innovation Auditorium", description: "Interactive masterclass on Career Readiness, Public Policy Formulation, and Multilateral Negotiation.", type: "workshop" },
      { time: "14:00 - 17:30", title: "Committee Session III — Review of Draft Resolutions & Amendments", location: "Respective Committee Rooms", description: "Formal review of draft resolutions, introducing amendments, and crisis developments.", type: "session", dressCode: "Western Business Attire" },
      { time: "19:30 - 22:30", title: "TiMUN Annual Diplomatic Gala Dinner & Cultural Night", location: "Grand Ballroom", description: "Celebratory formal dinner, cultural performances, faculty recognitions, and keynote address.", type: "social", dressCode: "Formal Western / National Traditional Attire" }
    ]
  },
  {
    dayNumber: 3,
    date: "Day Three",
    dayName: "Verdict — Voting Procedure, Plenary Action & Awards Ceremony",
    items: [
      { time: "09:00 - 11:30", title: "Committee Session IV — Final Voting Procedure on Resolutions", location: "Respective Committee Rooms", description: "Roll call votes, division of question, clause-by-clause voting, and committee concluding statements.", type: "session", dressCode: "Western Business Attire" },
      { time: "11:45 - 13:00", title: "General Assembly Plenary Session", location: "Main Auditorium", description: "Plenary ratification of committee outcomes and presentation of adopted resolutions.", type: "session" },
      { time: "13:30 - 15:30", title: "Grand Closing & Awards Ceremony", location: "Main Auditorium Stage", description: "Presentation of Best Delegate, Outstanding Delegate, Best Delegation, Leadership Honors, and certificate distribution.", type: "ceremony" }
    ]
  }
];

export const SECRETARIAT_TEAM: SecretariatMember[] = [
  {
    id: "sg",
    name: "Catherine DeWitt",
    role: "Secretary-General",
    department: "Executive",
    bio: "Passionate about international diplomacy, institutional governance, and youth empowerment. Leads the strategic vision and inter-institutional execution of TiMUN.",
    email: "sg@timun.org",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "dsg",
    name: "Julian Thorne",
    role: "Deputy Secretary-General",
    department: "Executive",
    bio: "Coordinates conference administration, partnership engagement, and inter-collegiate delegation relations.",
    email: "dsg@timun.org",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "usg-academics",
    name: "Maya Lin-Vazquez",
    role: "USG for Academics & Study Guides",
    department: "Academics",
    bio: "Supervises research rigor, study guide publications, chair training, and parliamentary procedure standards across all committees.",
    email: "academics@timun.org",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "usg-logistics",
    name: "Marcus Sterling",
    role: "USG for Logistics & Operations",
    department: "Logistics",
    bio: "Oversees venue management, catering, audio-visual infrastructure, and on-site conference operations.",
    email: "logistics@timun.org",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "usg-delegates",
    name: "Amina Al-Mansoor",
    role: "USG for Delegate Affairs & Youth Outreach",
    department: "Delegate Affairs",
    bio: "Coordinates applications for students, NYSC corps members, and young professionals, managing country assignments and delegate support.",
    email: "delegates@timun.org",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "usg-media",
    name: "Liam O'Connor",
    role: "USG for Communications & Media",
    department: "Communications",
    bio: "Leads visual identity, digital communications, press relations, and media documentation.",
    email: "media@timun.org",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
  }
];

export const FAQS: FAQItem[] = [
  {
    id: "faq-about",
    category: "General",
    question: "What is Trinity International Model United Nations (TiMUN)?",
    answer: "Trinity International Model United Nations (TiMUN) is a hybrid diplomatic simulation, youth development, leadership, and professional empowerment organization established to provide young people with practical platforms for learning, engagement, leadership development, and societal impact. Beyond traditional MUNs, TiMUN combines simulations with policy dialogues, practical workshops, networking, mentorship, and real-world opportunity creation."
  },
  {
    id: "faq-governance",
    category: "General",
    question: "What is the relationship between TiMUN and Trinity University?",
    answer: "TiMUN is independently owned and founded by its founders, with its strategic direction, programmes, partnerships, administration, and day-to-day operations managed by its Executive Team. Trinity University serves as an Associate Institution to TiMUN, providing institutional association and support within the scope of their relationship. TiMUN operates as an independent organization while maintaining a strong institutional relationship with Trinity University."
  },
  {
    id: "faq-audience",
    category: "Registration",
    question: "Who is TiMUN designed for?",
    answer: "TiMUN is designed for: 1) Students (high school & tertiary institutions seeking to develop practical skills and global awareness), 2) Young Professionals (seeking to strengthen competencies, expand networks, and engage in governance), and 3) NYSC Corps Members (young graduates seeking professional development, leadership, networking, and civic contribution). We welcome participants from all academic and professional backgrounds."
  },
  {
    id: "faq-pillars",
    category: "General",
    question: "What are TiMUN's Three Pillars of Youth Empowerment?",
    answer: "TiMUN's approach is built upon three interconnected principles: KNOWLEDGE (giving youth an understanding of the world), EXPOSURE (showing how that knowledge operates in real institutions, workplaces, and diplomacy), and OPPORTUNITY (providing the platform to apply learning, build relationships, demonstrate abilities, and lead)."
  },
  {
    id: "faq-simulations",
    category: "Academics & Rules",
    question: "What institutions and bodies are simulated at TiMUN?",
    answer: "TiMUN simulations span international, regional, and national bodies including the United Nations (UNSC, ECOSOC, DISEC, UNHCR, WHO), African Union (AU-PSC), Economic Community of West African States (ECOWAS), and the National Assembly (Joint Committee on Foreign Affairs & Youth Development)."
  },
  {
    id: "faq-partners",
    category: "Partnerships",
    question: "How can organizations and institutions partner with TiMUN?",
    answer: "TiMUN actively collaborates with universities, government institutions, diplomatic missions, international bodies, private sector companies, civil society, and media organizations. Partners contribute through professional workshops, mentorship, sponsorship, internships, and technical support on a model of mutual value."
  },
  {
    id: "faq-fees",
    category: "Registration",
    question: "What is included in the delegate registration?",
    answer: "The delegate registration covers full access to all committee sessions, delegate credentials & official conference folder, workshops, catered buffet lunch and coffee breaks, entrance to the Diplomatic Icebreaker and Annual Gala Dinner, certificates of participation, and eligibility for prestigious diplomatic awards."
  }
];

export const ROP_CHEAT_SHEET = [
  { motion: "Point of Personal Privilege", description: "Used when a delegate experiences physical discomfort (e.g., cannot hear speaker, room temperature, microphone issue).", interruption: "Yes" },
  { motion: "Point of Order", description: "Used when parliamentary procedure or a committee rule has been violated by the Chair or a fellow delegate.", interruption: "Yes (only on rule violation)" },
  { motion: "Point of Parliamentary Inquiry", description: "Used to ask the Chair a clarifying question regarding proper parliamentary procedure or schedule.", interruption: "No" },
  { motion: "Motion for Moderated Caucus", description: "Proposes formal timed debate on a specific sub-topic with set speaker time limits (e.g., 10 mins total, 45s per speaker).", interruption: "No" },
  { motion: "Motion for Unmoderated Caucus", description: "Proposes informal caucus time for delegates to freely mingle, form blocs, negotiate, and draft resolution clauses.", interruption: "No" },
  { motion: "Motion to Introduce Working Paper / Draft Resolution", description: "Brings an approved working paper to the floor once approved by the dais and supported by required sponsors.", interruption: "No" },
  { motion: "Right of Reply", description: "Requested if a delegate feels their nation's national honor or dignity has been directly insulted in formal speech.", interruption: "Written note to Chair" }
];

export const PREAMBULAR_STARTERS = [
  "Affirming", "Alarmed by", "Bearing in mind", "Cognizant of", "Convinced that",
  "Deeply concerned", "Emphasizing", "Expecting", "Fulfilling", "Guided by",
  "Having considered", "Mindful of", "Noting with satisfaction", "Reaffirming",
  "Taking note of", "Welcoming"
];

export const OPERATIVE_STARTERS = [
  "Accepts", "Affirms", "Authorizes", "Calls upon", "Condemns",
  "Confirms", "Designates", "Encourages", "Endorses", "Expresses its appreciation",
  "Invites", "Proclaims", "Recommends", "Regrets", "Requests",
  "Solemnly affirms", "Strongly urges", "Suggests", "Supports", "Transmits"
];


