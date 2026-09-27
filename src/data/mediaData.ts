import { MediaPost } from '../types';

/**
 * Curated photography: Nigerian cities + delegate life.
 * Every <SafeImage> has an onError gradient fallback, so the layout never
 * breaks even if a remote photo is unavailable.
 */
export const NIGERIAN_PHOTOS = {
  lagos: {
    src: 'https://images.unsplash.com/photo-1618828665011-0abd973f7bb8?auto=format&fit=crop&w=1200&q=80',
    caption: 'Lagos, Nigeria — commercial capital',
  },
  abuja: {
    src: 'https://images.unsplash.com/photo-1577948000111-9c970dfe3743?auto=format&fit=crop&w=1200&q=80',
    caption: 'Abuja, Nigeria — the capital city',
  },
  delegates: {
    src: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
    caption: 'Celebrating young graduates — the TiMUN generation',
  },
  conference: {
    src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
    caption: 'Plenary sessions — diplomacy in action',
  },
  workshop: {
    src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
    caption: 'Leadership workshops & caucus training',
  },
  campus: {
    src: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
    caption: 'Campus life — where it all happens',
  },
};

const now = Date.now();
const day = 86_400_000;

export const MEDIA_POSTS: MediaPost[] = [
  {
    id: 'post-earlybird',
    kind: 'update',
    title: 'Early-bird registration is open for TiMUN 2027',
    excerpt:
      'Secure your committee and country assignment before September 20, 2027. Individual and delegation passes include all sessions, workshops, the icebreaker and the gala dinner.',
    body: 'Early-bird registration for the inaugural Trinity International Model United Nations is officially open.\n\nDelegates who register before September 20, 2027 get priority country allocation across all eight committees — UNSC, AU-PSC, ECOWAS, NASS Joint Committee, DISEC, ECOSOC, UNHCR and WHO.\n\nYour pass covers all four committee sessions, the plenary, ROP masterclasses, leadership workshops, the diplomatic icebreaker and the Saturday gala buffet dinner. Pay online in Naira or Dollars via Paystack, or by bank transfer.',
    coverImage: NIGERIAN_PHOTOS.conference.src,
    videoUrl: '',
    gallery: [],
    author: 'TiMUN Secretariat',
    authorRole: 'Delegate Affairs',
    date: 'Sep 20, 2026',
    createdAt: now - 7 * day,
    tags: ['Registration', 'Announcement'],
    featured: true,
  },
  {
    id: 'post-what-is-mun',
    kind: 'article',
    title: 'New to MUN? How TiMUN turns students into diplomats',
    excerpt:
      'From roll call to resolution voting — a plain-language guide to committees, caucuses, position papers and awards, built for first-time Nigerian delegates.',
    body: 'Model United Nations is a simulation of how the world is actually governed — and TiMUN is built so a first-timer from any school can walk in and thrive.\n\nYou are assigned a country and a committee, for example Nigeria in the AU Peace & Security Council. You research your country\'s real position, deliver opening speeches, negotiate in moderated and unmoderated caucuses, then write and vote on draft resolutions.\n\nThree habits separate award-winners from the crowd: read your study guide twice, speak early and often, and build a bloc before lunch on day two. Our Rules of Procedure masterclass on Friday covers every motion you will need.\n\nNo experience is required. The NASS Joint Committee and UNHCR tracks are designed to be beginner-friendly, and chairs mentor first-time delegates throughout the weekend.',
    coverImage: NIGERIAN_PHOTOS.delegates.src,
    videoUrl: '',
    gallery: [],
    author: 'Maya Lin-Vazquez',
    authorRole: 'USG for Academics',
    date: 'Sep 12, 2026',
    createdAt: now - 15 * day,
    tags: ['Guide', 'First-timers'],
    featured: false,
  },
  {
    id: 'post-lagos-abuja',
    kind: 'photo',
    title: 'From Lagos to Abuja: Nigeria in focus',
    excerpt:
      'A short photo story — the cities, campuses and young leaders that inspire our theme: equipping youth to lead in diplomacy, governance and global affairs.',
    body: 'TiMUN 2027 draws delegates from across Nigeria and beyond. This gallery follows the journey: the energy of Lagos, the institutions of Abuja, and the campuses where our delegates study, debate and lead.',
    coverImage: NIGERIAN_PHOTOS.lagos.src,
    videoUrl: '',
    gallery: [
      NIGERIAN_PHOTOS.lagos.src,
      NIGERIAN_PHOTOS.abuja.src,
      NIGERIAN_PHOTOS.campus.src,
      NIGERIAN_PHOTOS.workshop.src,
    ],
    author: 'Liam O\u2019Connor',
    authorRole: 'USG for Communications',
    date: 'Sep 5, 2026',
    createdAt: now - 22 * day,
    tags: ['Nigeria', 'Gallery'],
    featured: false,
  },
  {
    id: 'post-resolution-video',
    kind: 'video',
    title: 'Watch: how to write a winning draft resolution',
    excerpt:
      'Preambular vs operative clauses, sub-clauses and amendments — a five-minute briefing from the Academics directorate before you open the Resolution Builder.',
    body: 'This briefing walks through the anatomy of a UN-style draft resolution: sponsors and signatories, preambular clauses that frame the problem, and operative clauses that propose action.\n\nWatch it, then open the Resolution Builder in the Delegate Toolkit to draft your own — and bring a printed copy to committee session II.',
    coverImage: NIGERIAN_PHOTOS.workshop.src,
    // Paste a YouTube watch/embed URL here (or via the executive portal)
    // to premiere the video. Empty = "premieres soon" card.
    videoUrl: '',
    gallery: [],
    author: 'TiMUN Academics',
    authorRole: 'Study Guides Desk',
    date: 'Aug 28, 2026',
    createdAt: now - 30 * day,
    tags: ['Video', 'Resolutions'],
    featured: false,
  },
];
