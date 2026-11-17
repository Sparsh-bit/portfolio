/* Content extracted from the old portfolio (github.com/Sparsh-bit/portfolio) */

export const profile = {
  name: "Sparsh Sharma",
  roles: ["UI/UX Designer", "Frontend Developer", "ERP & CRM Builder", "Prompt Engineer"],
  tagline: "Design that moves. Code that holds.",
  bio: [
    "I'm Sparsh Sharma — a UI/UX designer and frontend developer who builds the software businesses actually run on: multi-tenant ERPs, CRMs, POS & billing platforms, booking systems and websites that convert.",
    "From a GST-ready POS SaaS and a school ERP to an AI mock-interview platform, I turn messy business workflows into clean, type-safe systems — and I engineer the prompts that make the AI inside them reliable.",
  ],
  email: "sparsh42005@gmail.com",
  location: "Worldwide (based in India)",
  socials: [
    { name: "GitHub", handle: "@Sparsh-bit", url: "https://github.com/Sparsh-bit" },
    { name: "LinkedIn", handle: "Sparsh Sharma", url: "https://www.linkedin.com/in/sparsh-sharma-356761289/" },
  ],
};

export const stats = [
  { value: 12, suffix: "+", label: "Projects shipped" },
  { value: 3, suffix: "", label: "Years designing & building" },
  { value: 3.8, suffix: "", decimals: 1, label: "GPA — B.Tech Computer Science" },
  { value: 3, suffix: "", label: "SaaS platforms live — ERP · POS · AI" },
];

export type Project = {
  title: string;
  description: string;
  tags: string[];
  link: string;
  github?: string;
  year: string;
  accent: string;
  kind?: "client" | "lab";
  image?: string;
};

export const projects: Project[] = [
  {
    title: "Arab Divers",
    description: "PADI 5 Star dive resort on the Red Sea, Aqaba — live booking flow, interactive dive-site map, journal and rooms, with WhatsApp-first enquiries.",
    tags: ["Website Design", "Booking Flow", "Tourism"],
    link: "https://arab-divers.pages.dev/",
    year: "2026",
    accent: "#0E8A6D",
    kind: "client",
    image: "/projects/arab-divers.jpg",
  },
  {
    title: "Dharniya",
    description: "Heritage clothing house from Vrindavan — full e-commerce experience with collections, worldwide delivery, size guides and 56M-view social proof.",
    tags: ["E-commerce", "Shopify", "Brand"],
    link: "https://dharniya.com/",
    year: "2026",
    accent: "#E0612A",
    kind: "client",
    image: "/projects/dharniya.jpg",
  },
  {
    title: "CosmicMuse",
    description: "Premium perfume e-commerce told as a scroll story — 3D bottle interactions, cart and checkout, built on React, anime.js and Lightswind UI.",
    tags: ["React", "E-commerce", "anime.js"],
    link: "https://cosmicmuse.concilio.solutions/",
    year: "2026",
    accent: "#5A46E0",
    kind: "client",
    image: "/projects/cosmicmuse.jpg",
  },
  {
    title: "Concilio Solutions",
    description: "The studio site behind this portfolio's design language — slate-and-teal system, Bricolage display type, anime.js motion and Lightswind components.",
    tags: ["Design System", "Motion", "Brand"],
    link: "https://concilio.solutions/",
    year: "2025",
    accent: "#20736E",
    kind: "client",
    image: "/projects/concilio.jpg",
  },
  {
    title: "Galla",
    description: "Point-of-sale and inventory SaaS for Indian shops — offline-first billing, GST e-invoice with IRN, khata, serial/IMEI tracking and 18 modules in one app. Next.js, MongoDB, Better Auth.",
    tags: ["SaaS Product", "Next.js", "POS · GST"],
    link: "https://galla.concilio.solutions/",
    year: "2026",
    accent: "#1F6F5C",
    kind: "client",
    image: "/projects/galla.jpg",
  },
  {
    title: "InterviewOS",
    description: "AI mock-interview platform — a cross-questioning interviewer, group discussions against AI panelists, compiled coding rounds and a 100-point hire report. 24 tracks across 12 campus recruiters. Next.js + FastAPI.",
    tags: ["AI Product", "Next.js", "FastAPI"],
    link: "https://interviewos.net.in/",
    year: "2026",
    accent: "#8C6A1F",
    kind: "client",
    image: "/projects/interviewos.jpg",
  },
  {
    title: "Concilio Campus ERP",
    description: "Multi-tenant school management ERP for Indian schools (CBSE/ICSE) — Razorpay fee collection with triple verification, attendance, exams, staff HR, parent portal and a SaaS provider dashboard.",
    tags: ["ERP", "Razorpay", "Multi-tenant"],
    link: "https://campus.concilio.solutions/",
    year: "2026",
    accent: "#0E8A6D",
    kind: "client",
    image: "/projects/campus-erp.jpg",
  },
  {
    title: "Magh Mela Website",
    description: "Public-facing frontend for the Magh Mela festival — responsive layouts, structured content and UI/UX best practices at pilgrim scale.",
    tags: ["React", "UI/UX", "Public Sector"],
    link: "https://magh-mela.pages.dev/",
    github: "https://github.com/Sparsh-bit/Magh-Mela",
    year: "2024",
    accent: "#5A46E0",
    kind: "lab",
  },
  {
    title: "New Defence Public School",
    description: "Complete frontend website for an educational institution, focused on structured content and cross-device compatibility.",
    tags: ["Next.js", "Education", "Frontend"],
    link: "https://newdefencepublicschool.com",
    github: "https://github.com/Sparsh-bit/NDPS",
    year: "2024",
    accent: "#0E8A6D",
    kind: "lab",
  },
];

export const skills = [
  { name: "ERP & CRM Systems", desc: "Multi-tenant platforms — roles & permissions, fee workflows, inventory, reporting.", color: "#20736E" },
  { name: "Frontend Development", desc: "React 19, Next.js 16 App Router, TypeScript, Tailwind CSS 4.", color: "#5A46E0" },
  { name: "Prompt Engineering", desc: "Structured prompt libraries, validated LLM output, provider-agnostic AI layers.", color: "#8C6A1F" },
  { name: "Backend & Data", desc: "FastAPI, Express, MongoDB, PostgreSQL, Redis, Knex & Alembic migrations.", color: "#0E8A6D" },
  { name: "UI/UX & Prototyping", desc: "Figma design systems, motion-first UX with anime.js & Framer Motion.", color: "#E0612A" },
  { name: "Cloud & Deployment", desc: "Cloudflare Pages, Neon serverless Postgres, Docker, edge functions.", color: "#20736E" },
];

export const experience = [
  {
    kind: "work" as const,
    role: "IoT Engineer Intern",
    org: "509 Army Base Workshop (Indian Army)",
    period: "June 2025 – July 2025",
    summary: "Designed and developed an IoT-based prototype for paratroopers, focused on real-time monitoring and operational safety. Worked with defense-grade sensors and microcontrollers.",
    tags: ["IoT", "Embedded Systems", "Defense Tech"],
  },
  {
    kind: "education" as const,
    role: "B.Tech in Computer Science",
    org: "GLA University, Mathura",
    period: "2023 – 2027",
    summary: "Specializing in AI/ML & IIoT — advanced computing paradigms and the industrial internet of things.",
    tags: ["AI/ML", "IIoT", "3.8 GPA"],
  },
];

export const bookingServices = [
  {
    id: "website-build" as const,
    title: "Build my website",
    desc: "A designed, deployed, responsive website for your business, institution or portfolio — from brief to live URL.",
    deliverables: ["Design in Figma", "Responsive build & deploy", "Domain + analytics setup"],
    weeks: "1–3 weeks",
    accent: "#20736E",
  },
  {
    id: "booking-system" as const,
    title: "Add a booking system to my website",
    desc: "An integrated appointment/booking flow wired into your existing website — calendar, availability, confirmations and a database.",
    deliverables: ["Calendar & slot availability", "Confirmation + records database", "Admin view of all bookings"],
    weeks: "1–2 weeks",
    accent: "#5A46E0",
  },
];

/* ── Backstory page content (from the old portfolio + current product codebases) ── */

export const backstory = {
  headline: "ERP & CRM Platforms · Business Websites · Prompt Engineering",
  summary:
    "Solution-oriented product engineer building the systems businesses run on — multi-tenant ERPs, CRMs, POS & billing SaaS and high-conversion websites. Proven track record of shipping end-to-end platforms in production, plus a defense-grade internship in mission-critical IoT environments.",
  work: [
    {
      role: "IoT Engineer Intern",
      org: "509 Army Base Workshop (Indian Army)",
      period: "June 2025 – July 2025",
      bullets: [
        "Designed and developed an IoT-based prototype for paratroopers, focused on real-time monitoring and operational safety.",
        "Worked with sensors, microcontrollers, and embedded systems in a defense-grade technical environment.",
        "Assisted officers and engineers in testing, calibration, and performance validation of IoT hardware systems.",
        "Gained hands-on exposure to mission-critical systems, documentation standards, and disciplined engineering workflows.",
        "Successfully completed training and evaluation, certified by 509 Army Base Workshop.",
      ],
    },
    {
      role: "Magh Mela Website",
      org: "Contract & Project-Based",
      period: "2024",
      bullets: [
        "Designed and delivered a public-facing frontend website for Magh Mela with responsive layouts, intuitive navigation, and UI/UX best practices to support high user engagement and accessibility.",
      ],
    },
    {
      role: "New Defence Public School Website",
      org: "Educational Institution",
      period: "2024",
      bullets: [
        "Developed a complete frontend website for an educational institution, focusing on clean design, structured content presentation, and cross-device compatibility for students, parents, and staff.",
      ],
    },
    {
      role: "Personal Portfolio",
      org: "Portfolio Website",
      period: "2024",
      bullets: [
        "Designed and built a personal portfolio website to professionally showcase projects, skills, and experience using modern UI/UX principles, performance optimization, and cloud deployment.",
      ],
    },
  ],
  education: {
    degree: "Bachelor of Technology (B.Tech)",
    field: "Computer Science & Engineering (AI/ML & IIoT)",
    org: "GLA University, Mathura",
    period: "2023 – 2027",
  },
  capabilities: [
    "ERP / CRM / POS Platform Development",
    "Multi-tenant Architecture, RBAC & Audit Trails",
    "Next.js 16 · React 19 · TypeScript · Tailwind 4",
    "FastAPI · Express · MongoDB · PostgreSQL · Redis",
    "Prompt Engineering & Production LLM Integrations",
    "Figma · anime.js · Cloudflare Pages · Neon Postgres",
  ],
  prompts: {
    intro:
      "I treat prompts as engineering artefacts — versioned, structured and validated — not strings pasted into a chat box. It's what keeps the AI inside my products dependable.",
    points: [
      {
        title: "Structured prompt libraries",
        desc: "Versioned Markdown prompt templates per role — interviewer, coding evaluator, report generator, HR screener — loaded at runtime, edited outside service code.",
      },
      {
        title: "Reliable model output",
        desc: "Responses shaped and validated against schemas with automatic retries on malformed output, behind a provider-agnostic AI layer — swap models without touching product code.",
      },
      {
        title: "Applied in production",
        desc: "Powers InterviewOS end-to-end: adaptive cross-questioning, multi-vector answer scoring, confident-but-wrong ('bluff') detection and 100-point hire reports.",
      },
    ],
  },
};
