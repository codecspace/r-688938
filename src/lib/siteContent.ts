import { projectsData, type ProjectDataType } from "@/data/projectsData";

export interface TeamMember {
  name: string;
  role: string;
  image: string | null;
  phoneNumber?: string;
  email?: string;
  bio: string;
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

export interface Trait {
  n: string;
  label: string;
  desc: string;
}

export interface SiteContent {
  hero: {
    eyebrow: string;
    headlineLine1: string;
    headlineLine2: string;
    intro: string;
    primaryCta: string;
    secondaryCta: string;
    image: string;
    /** Optional looping background video; empty = the built-in cinematic clip. */
    video?: string;
  };
  about: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
    traits: Trait[];
    closing: string;
    image: string;
  };
  stats: StatItem[];
  projectsSection: { eyebrow: string; heading: string; intro: string };
  portfolioSection: { eyebrow: string; heading: string; intro: string };
  teamSection: { eyebrow: string; heading: string };
  team: TeamMember[];
  contact: {
    eyebrow: string;
    heading: string;
    intro: string;
    phoneDisplay: string;
    phoneTel: string;
    whatsapp: string;
    email: string;
    address: string;
    officeHours: string;
  };
  projects: ProjectDataType[];
}

/** Everything the site shows today. The database only ever overrides these. */
export const defaultContent: SiteContent = {
  hero: {
    eyebrow: "Delhi · Noida · Gurugram",
    headlineLine1: "The right home for",
    headlineLine2: "every ambition",
    intro:
      "A boutique advisory for residential and commercial property across Delhi NCR — from the first viewing to the day the keys change hands.",
    primaryCta: "Explore Properties",
    secondaryCta: "Speak to us",
    image: "/hero-villa.webp",
    video: "",
  },
  about: {
    eyebrow: "About the firm",
    heading: "A property advisory built on judgement, not volume.",
    paragraphs: [
      "Lionvest Realty Pvt. Ltd. provides seamless, expert guidance for residential and commercial buyers across Delhi, Noida, and Gurugram — simplifying transactions with strategic advice and support at every step.",
      "Our name is more than a brand. Lionvest stands for the strength, confidence, and reliability we bring to the market.",
    ],
    traits: [
      { n: "01", label: "Strength and power", desc: "Leadership and conviction in every Delhi NCR market we operate in." },
      { n: "02", label: "Courage and belief", desc: "Bold, well-informed investment options — never guesswork." },
      { n: "03", label: "Authority and reputation", desc: "Faith built through reliability, expertise, and excellence." },
      { n: "04", label: "Protection and reliability", desc: "Safe, transparent property transactions, start to finish." },
    ],
    closing:
      "With a client-first approach, we back every recommendation with deep market insight and unwavering integrity — whether you are searching for a home or a strategic commercial investment.",
    image: "/about-advisory.webp",
  },
  stats: [
    { value: 12, suffix: "+", label: "Years in Delhi NCR real estate" },
    { value: 3, suffix: "", label: "Cities — Delhi, Noida, Gurugram" },
    { value: 5, suffix: "+", label: "Premium developer partnerships" },
    { value: 100, suffix: "%", label: "RERA-verified listings" },
  ],
  projectsSection: {
    eyebrow: "Developer partners",
    heading: "Projects we know inside out.",
    intro:
      "A curated shortlist across Gurugram, Noida and Delhi — every address vetted for build quality, location, and long-term value.",
  },
  portfolioSection: {
    eyebrow: "More listings",
    heading: "Browse the full portfolio.",
    intro: "Every address we currently represent across Delhi NCR — open for enquiry.",
  },
  teamSection: {
    eyebrow: "Leadership",
    heading: "The people you'll actually be working with.",
  },
  team: [
    {
      name: "Vaibhav Gupta",
      role: "Director",
      image: null,
      bio: "With more than 12 years of experience in B2B and B2C sales, Vaibhav Gupta brings a strong strategic and out-operated approach to Lionvest Realty Private. An MBA graduate in Limited Sales and Marketing, he has created an impressive career in real estate and allied industries, holding major sales positions in famous multinational corporations such as Berger Paints, UltraTech Cement, and AkzoNobel India.\n\nHis expertise lies in sales strategy, market expansion, and business growth, making him a valuable leader in driving high-impact real estate transactions. With a deep understanding of consumer behavior, market trends, and investment dynamics, Vaibhav plays a crucial role in delivering tailored property solutions that align with client aspirations and long-term investment goals.",
    },
    {
      name: "Jazbi Fatema",
      role: "Marketing Head",
      image: null,
      bio: "Expert Senior Digital marketing Management Professional with 12+ years of insightful & broad experience in; Marketing Strategy, Branding, Digital Marketing, Ecommerce end to end Marketing, Marketing Communications, Google Analytics, Retail, Corporate Communication, Media Planning, Budgeting, Advertising, Social Media Marketing, Channel Marketing, Campaigns, Strategic Marketing, liaising with external and internal stakeholders to promote business product. Passionate about nurturing talent and building high performance teams that are built on a culture of trust and transparency, respect for individual.",
    },
  ],
  contact: {
    eyebrow: "Get in touch",
    heading: "Let's talk property.",
    intro:
      "Tell us what you're looking for and we'll come back with a shortlist worth your time — usually within a day.",
    phoneDisplay: "+91 97735 52334",
    phoneTel: "+919773552334",
    whatsapp: "919773552334",
    email: "sales@lionvestrealty.com",
    address: "Plus Offices, 1st Floor, Landmark Cyber Park, Sector 67, Gurugram, HR 122101",
    officeHours: "Mon–Sat, 10am–7pm",
  },
  projects: projectsData,
};

const isPlainObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null && !Array.isArray(v);

/**
 * Deep-merges saved content over the defaults so a missing or half-filled key
 * in the database can never blank out the live site.
 */
export function mergeContent<T>(base: T, override: unknown): T {
  if (override === undefined || override === null) return base;
  if (Array.isArray(base) || Array.isArray(override)) return override as T;
  if (isPlainObject(base) && isPlainObject(override)) {
    const out: Record<string, unknown> = { ...base };
    for (const key of Object.keys(override)) {
      out[key] = mergeContent((base as Record<string, unknown>)[key], override[key]);
    }
    return out as T;
  }
  return override as T;
}

export type { ProjectDataType };
