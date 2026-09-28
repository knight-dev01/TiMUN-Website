import React, { useState } from 'react';
import { TextReveal } from './gallery/TextReveal';
import { LogoBadge } from './LogoBadge';
import { 
  Quote, 
  CheckCircle2, 
  Award, 
  Globe, 
  BookOpen, 
  Sparkles, 
  Building2, 
  ChevronRight, 
  Layers, 
  Compass, 
  Users2, 
  Briefcase, 
  GraduationCap, 
  Target, 
  Handshake, 
  Landmark, 
  TrendingUp, 
  Lightbulb, 
  FileText,
  ShieldCheck
} from 'lucide-react';
import { useConferenceData } from '../context/ConferenceContext';

interface WelcomeSectionProps {
  onJoinBulletin: () => void;
}

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({ onJoinBulletin }) => {
  const { conferenceInfo, secretariatTeam, committees } = useConferenceData();
  const sg = secretariatTeam.find(m => m.role.toLowerCase().includes('secretary-general') || m.department === 'Executive') || secretariatTeam[0] || {
    name: 'Catherine DeWitt',
    role: 'Secretary-General',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
  };

  const [activeTab, setActiveTab] = useState<'about' | 'pillars' | 'programmes' | 'audience' | 'partners' | 'letter'>('about');

  // The 3 Pillars
  const threePillars = [
    {
      title: "Knowledge",
      subtitle: "Understanding the World",
      description: "Giving young people a profound, multidisciplinary understanding of international systems, geopolitics, economic frameworks, and societal dynamics.",
      icon: BookOpen,
      color: "bg-[#eef4fa] text-[#00387d] border-[#bcd3ea]"
    },
    {
      title: "Exposure",
      subtitle: "Witnessing Systems in Action",
      description: "Allowing participants to see how theoretical knowledge operates within real diplomatic institutions, governmental bodies, corporate workplaces, and multilateral assemblies.",
      icon: Globe,
      color: "bg-[#fef6e7] text-[#5f3a00] border-[#fbdda1]"
    },
    {
      title: "Opportunity",
      subtitle: "Practising & Leading",
      description: "Providing the tangible platform to apply what they have learned, negotiate policy, build high-value networks, demonstrate leadership, and create societal impact.",
      icon: Target,
      color: "bg-emerald-50 text-[#1f4a32] border-emerald-200"
    }
  ];

  // The 6 Flagship Programmes
  const flagshipProgrammes = [
    {
      number: "01",
      title: "Diplomatic Simulations",
      category: "Multilateral Governance",
      description: "Realistic, immersive simulations of international, regional, and national decision-making bodies including the United Nations (UNSC, ECOSOC, GA), African Union (AU-PSC), ECOWAS, and the National Assembly. Participants assume roles of diplomats, legislators, and policymakers.",
      skills: ["Negotiation & Caucus Strategy", "Drafting Resolutions & Bills", "Public Speaking", "Conflict Resolution"],
      icon: Landmark
    },
    {
      number: "02",
      title: "Conferences & Youth Dialogues",
      category: "Thought Leadership",
      description: "Structured high-level dialogues and symposiums centered on contemporary national, regional, and international issues. Engaging experts, seasoned diplomats, policymakers, and civic leaders in candid policy discourse.",
      skills: ["Geopolitical Analysis", "Intergenerational Dialogue", "Evidence-Based Advocacy", "Consensus Building"],
      icon: Users2
    },
    {
      number: "03",
      title: "Practical Workshops",
      category: "Skills Mastery",
      description: "Interactive masterclasses moving beyond theory to equip participants with tangible competencies: workplace expectations, professional communication, policy formulation, entrepreneurship, and organizational management.",
      skills: ["Professional Communication", "Policy Brief Drafting", "Workplace Readiness", "Project Management"],
      icon: Briefcase
    },
    {
      number: "04",
      title: "Leadership Development",
      category: "Empowerment",
      description: "Intensive training designed to build leadership capacity—encouraging young people to take initiative, lead collaborative teams, navigate crises, and exercise ethical decision-making in public and private spheres.",
      skills: ["Strategic Thinking", "Team Mobilization", "Crisis Management", "Ethical Governance"],
      icon: Sparkles
    },
    {
      number: "05",
      title: "Policy & Governance Engagement",
      category: "Civic Impact",
      description: "Transforming young people from passive observers into active, informed contributors to governance conversations, national development strategies, and multilateral reform.",
      skills: ["Legislative Oversight", "Citizen Diplomacy", "Public Policy Analysis", "Civic Accountability"],
      icon: FileText
    },
    {
      number: "06",
      title: "Networking & Opportunity Exposure",
      category: "Career Pathways",
      description: "Curated bridge-building connecting youth directly to diplomatic missions, international development bodies, corporate partners, policy think tanks, and structured mentorship programs.",
      skills: ["Mentorship Access", "Career Fast-Tracking", "Global Fellowships", "Professional Connections"],
      icon: Handshake
    }
  ];

  // Beyond the Classroom Dimensions
  const beyondClassroom = [
    { title: "Professional Development", desc: "Workplace etiquette, project delivery, and cross-cultural communication." },
    { title: "Diplomacy & International Affairs", desc: "Treaty interpretation, multilateral negotiations, and foreign policy strategy." },
    { title: "Governance & Public Policy", desc: "Understanding constitutional law, legislative drafting, and public administration." },
    { title: "Leadership & Civic Responsibility", desc: "Ethical leadership, community mobilization, and democratic accountability." },
    { title: "Entrepreneurship & Innovation", desc: "Venture ideation, resource mobilization, and solving systemic challenges." },
    { title: "Career Readiness & Opportunity Creation", desc: "Internship pathways, networking with hiring executives, and mentorship." }
  ];

  // Target Audiences
  const targetAudiences = [
    {
      title: "Students",
      badge: "High School & Tertiary",
      desc: "For undergraduate, postgraduate, and secondary school students seeking to bridge academic theory with practical leadership, diplomatic negotiation, and global awareness.",
      icon: GraduationCap,
      highlights: ["University & High School Delegations", "Academic Distinction Awards", "ROP & Speech Coaching"]
    },
    {
      title: "NYSC Corps Members",
      badge: "National Service",
      desc: "For young graduates undertaking national service who seek high-impact professional development, leadership platforms, networking with industry leaders, and civic contribution.",
      icon: Award,
      highlights: ["Career Transition Masterclasses", "Civic Engagement Initiatives", "Alumni Mentorship Network"]
    },
    {
      title: "Young Professionals",
      badge: "Early & Mid-Career",
      desc: "For early-career practitioners across Law, International Relations, Business, Public Policy, Technology, and Media looking to sharpen negotiation and strategic governance skills.",
      icon: Briefcase,
      highlights: ["Executive Policy Dialogues", "Cross-Industry Networking", "Diplomatic Exposure"]
    }
  ];

  return (
    <section id="overview" className="py-12 sm:py-20 vx-paper text-slate-900 border-b border-[#fdeecd] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#dce8f5] border border-[#8fb0d8] text-[#00387d] text-[11px] font-bold uppercase tracking-widest mb-3">
            <Landmark className="w-3.5 h-3.5 text-[#294a70]" />
            <span>Charter & Institutional Profile</span>
          </div>
          <TextReveal
            text="About Trinity International Model United Nations"
            className="text-3xl sm:text-4xl font-serif font-bold text-[#00387d] tracking-tight"
          />
          <p className="text-slate-600 mt-2 text-sm sm:text-base leading-relaxed">
            A hybrid diplomatic simulation, youth development, leadership, and professional empowerment organization.
          </p>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex justify-center mb-10 overflow-x-auto pb-2 scrollbar-none">
          <div className="inline-flex p-1 bg-slate-200/80 rounded-lg border border-slate-300 gap-1 shrink-0">
            {[
              { id: 'about', label: 'About TiMUN' },
              { id: 'pillars', label: 'Three Pillars' },
              { id: 'programmes', label: '6 Flagship Programmes' },
              { id: 'audience', label: 'Who TiMUN Is For' },
              { id: 'partners', label: 'Partners & Association' },
              { id: 'letter', label: "Secretary-General's Address" },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 sm:px-5 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-[#00387d] text-white shadow-xs'
                    : 'bg-white/80 text-slate-700 hover:text-[#00387d] hover:bg-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab 1: About TiMUN */}
        {activeTab === 'about' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Top Overview Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-xs">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#8a5200]">
                  <Sparkles className="w-4 h-4 text-[#b56a00]" />
                  <span>Our Foundational Charter</span>
                </div>
                <h3 className="font-serif font-bold text-2xl text-[#00387d] leading-tight">
                  Empowering Youth to Shape the Future of Diplomacy & Governance
                </h3>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  <strong>Trinity International Model United Nations (TiMUN)</strong> is a hybrid diplomatic simulation, youth development, leadership, and professional empowerment organization established to provide young people with practical platforms for learning, engagement, leadership development, and societal impact.
                </p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  The organization was established on the understanding that young people require more than academic knowledge to successfully navigate an increasingly complex world. While universities and schools provide essential theoretical foundations, young people must be equipped with practical skills, exposure to real-world systems, and platforms where they can develop confidence, leadership, and professional capabilities.
                </p>
                <div className="p-4 bg-slate-50 rounded-lg border-l-4 border-[#e08c0a] border border-slate-200">
                  <p className="text-xs text-slate-700 font-medium italic">
                    "Young people should not merely be prepared for the future; they should be equipped to participate in shaping it. Young people need more than opportunities to learn; they need opportunities to practise, connect, contribute, and lead."
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="w-full bg-white p-6 rounded-[20px] border-2 border-slate-200 shadow-sm relative overflow-hidden">
                  <div className="flex items-center gap-3 mb-4">
                    <LogoBadge size="md" />
                    <div>
                      <div className="text-xs font-bold text-[#dd0000] uppercase tracking-wider">Organizational Profile</div>
                      <div className="font-serif font-bold text-sm text-[#00387d]">TiMUN Executive Directorate</div>
                    </div>
                  </div>
                  <div className="space-y-2.5 text-xs text-[#4b4b4b] border-t-2 border-slate-100 pt-3">
                    <div className="flex justify-between">
                      <span className="text-[#777777]">Governance:</span>
                      <span className="font-semibold text-[#00387d]">Independent Organization</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#777777]">Associate Institution:</span>
                      <span className="font-semibold text-[#b56a00]">Trinity University</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#777777]">Scope:</span>
                      <span className="font-semibold text-[#00387d]">National & International</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#777777]">Target Group:</span>
                      <span className="font-semibold text-[#00387d]">Students, NYSC, Young Pros</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t-2 border-slate-100 flex justify-between items-center">
                    <span className="text-[11px] text-[#777777]">Ready to join our next session?</span>
                    <button
                      onClick={onJoinBulletin}
                      className="duo-btn duo-btn-red !py-1.5 !px-3 !text-[11px]"
                    >
                      Get Updates
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Beyond the Classroom: 6 Dimensions */}
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-xs">
              <div className="max-w-2xl mb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-[#00387d]">Holistic Youth Development</span>
                <h4 className="font-serif font-bold text-xl text-[#00387d] mt-0.5">
                  Beyond the Classroom: Theory Meets Practice
                </h4>
                <p className="text-slate-600 text-xs sm:text-sm mt-1">
                  TiMUN serves as a bridge between classroom learning and real-world application across six critical dimensions:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {beyondClassroom.map((item, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 hover:bg-[#eef4fa]/50 rounded-lg border border-slate-200 transition-colors">
                    <div className="flex items-center gap-2 mb-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#b56a00] shrink-0" />
                      <h5 className="font-bold text-xs uppercase tracking-tight text-[#00387d]">
                        {item.title}
                      </h5>
                    </div>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: The Three Pillars */}
        {activeTab === 'pillars' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="text-center max-w-2xl mx-auto">
              <h3 className="font-serif font-bold text-2xl text-[#00387d]">
                The Three Pillars of TiMUN's Approach
              </h3>
              <p className="text-slate-600 text-sm mt-1">
                At the core of TiMUN's methodology is a three-pronged framework designed to transform youth into capable, proactive leaders.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {threePillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between relative overflow-hidden">
                    <div className="space-y-4">
                      <div className={`w-12 h-12 rounded-lg border flex items-center justify-center ${pillar.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Pillar 0{idx + 1}</span>
                        <h4 className="font-serif font-bold text-xl text-[#00387d] mt-0.5">
                          {pillar.title}
                        </h4>
                        <div className="text-xs font-semibold text-[#8a5200] mt-0.5 mb-2">
                          {pillar.subtitle}
                        </div>
                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                          {pillar.description}
                        </p>
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-[#00387d]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Empowerment Focus</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quote Card */}
            <div className="p-6 bg-white rounded-[20px] border-2 border-[#00387d] flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <Quote className="w-10 h-10 text-[#f4a024] shrink-0" />
                <div>
                  <p className="font-serif italic text-base sm:text-lg text-[#00387d] leading-relaxed">
                    "Knowledge gives youth an understanding of the world; Exposure shows how it operates in reality; Opportunity gives them the stage to lead."
                  </p>
                  <span className="text-xs text-[#b56a00] font-semibold tracking-wider uppercase mt-1 block">
                    TiMUN Educational Philosophy
                  </span>
                </div>
              </div>
              <button
                onClick={onJoinBulletin}
                className="duo-btn duo-btn-gold shrink-0"
              >
                Experience the Pillars
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: 6 Flagship Programmes */}
        {activeTab === 'programmes' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center max-w-2xl mx-auto mb-6">
              <h3 className="font-serif font-bold text-2xl text-[#00387d]">
                Our 6 Flagship Programmes
              </h3>
              <p className="text-slate-600 text-sm mt-1">
                TiMUN drives high-impact learning through six integrated programme tracks.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {flagshipProgrammes.map((prog, idx) => {
                const Icon = prog.icon;
                return (
                  <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between hover:border-[#00387d]/30 transition-all">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded bg-[#fef6e7] border border-[#fbdda1] flex items-center justify-center text-[#8a5200]">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-mono font-bold text-slate-400">
                          {prog.number}
                        </span>
                      </div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-[#8a5200] mb-0.5">
                        {prog.category}
                      </div>
                      <h4 className="font-serif font-bold text-lg text-[#00387d] mb-2">
                        {prog.title}
                      </h4>
                      <p className="text-slate-600 text-xs leading-relaxed mb-4">
                        {prog.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                        Core Competencies:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {prog.skills.map((skill, sIdx) => (
                          <span key={sIdx} className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-700 rounded font-medium">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 4: Who TiMUN Is For */}
        {activeTab === 'audience' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="text-center max-w-2xl mx-auto">
              <h3 className="font-serif font-bold text-2xl text-[#00387d]">
                Who TiMUN Is For
              </h3>
              <p className="text-slate-600 text-sm mt-1">
                TiMUN welcomes participants from diverse academic, professional, and civic backgrounds.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {targetAudiences.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="w-12 h-12 rounded-lg bg-[#eef4fa] border border-[#bcd3ea] flex items-center justify-center text-[#00387d] mb-4">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#8a5200] px-2 py-0.5 bg-[#fef6e7] rounded border border-[#fbdda1]">
                        {item.badge}
                      </span>
                      <h4 className="font-serif font-bold text-xl text-[#00387d] mt-2 mb-2">
                        {item.title}
                      </h4>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                        {item.desc}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 space-y-1.5">
                      {item.highlights.map((h, hIdx) => (
                        <div key={hIdx} className="flex items-center gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Interdisciplinary note */}
            <div className="p-6 bg-slate-100 rounded-xl border border-slate-200 text-center max-w-3xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-wider text-[#00387d] block mb-1">
                Open to All Academic & Professional Disciplines
              </span>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Whether your discipline is <strong>Law, International Relations, Political Science, Economics, Business, Computer Science, Health Sciences, Communications, or Engineering</strong> — TiMUN provides a tailored track to develop your negotiation and public leadership acumen.
              </p>
            </div>
          </div>
        )}

        {/* Tab 5: Partners & Association */}
        {activeTab === 'partners' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Institutional Association Details */}
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-xs">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#00387d]">
                    <Building2 className="w-4 h-4 text-[#b56a00]" />
                    <span>Governance & Institutional Structure</span>
                  </div>
                  <h3 className="font-serif font-bold text-2xl text-[#00387d]">
                    Independence & Institutional Association
                  </h3>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    <strong>TiMUN is independently owned and founded by its founders</strong>, with its strategic direction, programmes, partnerships, administration, and day-to-day operations managed by its Executive Team.
                  </p>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    <strong>Trinity University serves as an Associate Institution to TiMUN</strong>, providing institutional association and support within the scope of their relationship. TiMUN therefore operates as an independent organization while maintaining an institutional relationship with Trinity University.
                  </p>
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded text-xs font-semibold">
                      Independent Executive Governance
                    </span>
                    <span className="px-3 py-1 bg-[#fef6e7] text-[#5f3a00] border border-[#fbdda1] rounded text-xs font-semibold">
                      Trinity University Associate Institution
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-slate-50 p-5 rounded-lg border border-slate-200 space-y-3">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#00387d]">
                    Partnership Value Model
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    TiMUN actively collaborates with diverse stakeholder organizations on a model of mutual value:
                  </p>
                  <ul className="text-xs text-slate-700 space-y-2">
                    <li className="flex items-start gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#00387d] shrink-0 mt-0.5" />
                      <span><strong>Universities & Schools:</strong> Co-hosting sessions, academic certification, and student delegation participation.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#00387d] shrink-0 mt-0.5" />
                      <span><strong>Diplomatic Missions & Governments:</strong> Keynotes, policy review, and mentoring delegates.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#00387d] shrink-0 mt-0.5" />
                      <span><strong>Private Sector & NGOs:</strong> Sponsorships, youth fellowships, internship talent pipeline.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Tab 6: Secretary-General's Letter */}
        {activeTab === 'letter' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-6 sm:p-10 rounded-xl border border-slate-200 shadow-xs animate-fadeIn">
            <div className="lg:col-span-4 flex flex-col items-center text-center">
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-xl overflow-hidden border-2 border-[#f4a024] shadow-md mb-4">
                <img
                  src={sg.image}
                  alt={sg.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#00387d]">{sg.name}</h3>
              <p className="text-xs font-bold text-[#8a5200] uppercase tracking-wider">{sg.role}</p>
              <p className="text-xs text-slate-500 font-medium mt-0.5">TiMUN Executive Directorate</p>
            </div>

            <div className="lg:col-span-8 space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
              <div className="flex items-center gap-2 text-[#b56a00]">
                <Quote className="w-8 h-8 opacity-70 shrink-0" />
                <span className="font-serif font-semibold text-[#00387d] text-lg">
                  Distinguished Delegates, Advisors, and Esteemed Guests,
                </span>
              </div>

              <p>
                On behalf of the Founders, the Executive Secretariat, and in association with Trinity University, it is my profound honor to welcome you to the <strong>{conferenceInfo.title} ({conferenceInfo.acronym})</strong>.
              </p>

              <p>
                In a world navigating complex multilateral challenges, economic transformations, and governance dynamics, youth cannot remain passive observers. At TiMUN, our mission is grounded in the conviction that young people should not merely be prepared for the future; they must be equipped with the knowledge, exposure, and practical platforms to participate actively in shaping it.
              </p>

              <p>
                Whether you are stepping into the United Nations Security Council, navigating the African Union Peace & Security Council, or debating national youth policy in the National Assembly Joint Committee, TiMUN offers an unparalleled environment for substantive growth, ethical leadership, and high-value networking.
              </p>

              <p>
                We look forward to hosting you for an unforgettable diplomatic experience.
              </p>

              <div className="pt-4 flex items-center justify-between border-t border-slate-200">
                <div>
                  <p className="font-serif font-bold text-[#00387d]">{sg.name}</p>
                  <p className="text-xs text-slate-500 font-medium">{sg.role}, {conferenceInfo.acronym}</p>
                </div>
                <button
                  onClick={onJoinBulletin}
                  className="px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest text-white bg-[#00387d] hover:bg-[#294a70] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>Register Delegate</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#f4a024]" />
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
