
export type HeroData = {
  name: string;
  title: string;
  subtitle: string;
  social: {
    linkedin: string;
    github: string;
  };
};

export type Education = {
  university: string;
  degree: string;
  period: string;
  grade: string;
};

export type Internship = {
  company: string;
  role: string;
  period: string;
  description: string;
};

export type Certification = {
  name: string;
  issuer: string;
};

export type Achievement = {
  title: string;
  description: string;
};

export type SkillsData = {
  [category: string]: string[];
};

export type Project = {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  aiHint: string;
  links: {
    github?: string;
    live?: string;
  };
};

export type ContactData = {
  email: string;
  phone: string;
  location: string;
};

type PortfolioData = {
  hero: HeroData;
  summary: string;
  education: Education[];
  internships: Internship[];
  skills: SkillsData;
  projects: Project[];
  certifications: Certification[];
  achievements: Achievement[];
  contact: ContactData;
};

export const portfolioData: PortfolioData = {
  hero: {
    name: 'Naman Sharma',
    title: 'SAP Enthusiast & BTP CAPM Developer',
    subtitle: 'Passionate about bridging technology and business, aiming to grow into SAP Development & Consulting roles while contributing to impactful digital transformation initiatives.',
    social: {
      linkedin: 'https://www.linkedin.com/in/namans20/',
      github: 'https://github.com/namansha20',
    },
  },
  summary: `SAP Enthusiast & BTP CAPM Developer with hands-on experience in building scalable applications and solving real-world problems using SAP BTP, CAPM, UI5/Fiori, and cloud technologies. Skilled in applying Design Thinking to craft innovative and user-focused solutions, with a growing focus on Python and Generative AI learning in SAP. Strong foundation in Python, Node.js, complemented by academic projects and hackathon leadership. Passionate about bridging technology and business, aiming to grow into SAP Development & Consulting roles while contributing to impactful digital transformation initiatives.`,
  education: [
    {
      university: 'Poornima University',
      degree: 'B.Tech in Computer Science',
      period: '2023 – 2027',
      grade: 'CGPA: 7.41',
    },
    {
      university: 'Emmanuel Mission Sr. Sec. School',
      degree: '12th CBSE Board',
      period: '2022 – 2023',
      grade: 'Percentage: 74%',
    },
  ],
  internships: [
    {
      company: 'Anubhav Trainings',
      role: 'SAP UI5 Fiori',
      period: 'May 2024 – June 2024',
      description: 'Completed hands-on training in SAP UI5/Fiori app development and OData integration using Business Application Studio and VS Code, including end-to-end project experience and best practices. Skilled in connecting SAP ERP backend to responsive Fiori applications for modern UX delivery.',
    },
    {
      company: 'Anubhav Trainings',
      role: 'SAP BTP CAPM Backend',
      period: 'June 2025',
      description: 'Completed professional training in SAP Business Technology Platform (BTP), focusing on end-to-end cloud application development with CAPM, Fiori Elements, and HANA integration. Gained hands-on experience in deploying secure apps using BTP services, Cloud Foundry, and modern DevOps practices.',
    },
  ],
  skills: {
    'Programming Languages': ['Python', 'JavaScript', 'SQL'],
    'SAP Technologies': ['SAP BTP', 'CAP (Cloud Application Programming)', 'SAP Fiori', 'SAP UI5', 'CDS Annotations', 'HANA'],
    'Web Development': ['HTML5', 'CSS'],
    'Cloud & Platforms': ['Amazon Web Services (AWS)', 'SAP BTP'],
    'Version Control & Collaboration': ['Git', 'GitHub'],
    'Frameworks & Tools': ['Node.js'],
    'Development Methodologies': ['Agile', 'Sprint'],
  },
  projects: [
    {
      title: 'SAP Copilot– Conversational SAP Expert Assistant',
      description: 'Exposed a FastAPI REST API backed by Mistral AI (mistral-small) for multi-turn SAP Q&A, with per-session chat history stored in a session id-keyed in-memory store. Organized the codebase into a modular routes/services/utils/rag layout and seeded the rag/data/ directory with SAP Generative AI certification docs for a future retrieval pipeline. Scaffolded SAP BTP deployment via mta.yaml with planned OAuth 2.0 auth, persistent storage, and live SAP system integration hooks.',
      technologies: ['FastAPI', 'Mistral AI', 'SAP BTP', 'Python'],
      image: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
      aiHint: 'SAP assistant',
      links: {
        github: '#',
      },
    },
    {
      title: 'PU-Chatbot– University Query Assistant',
      description: 'Deployed a dual-component student query system on SAP BTP Cloud Foundry with a FastAPI backend and Streamlit frontend as separate CF app instances. Matched student questions against a 92-pair Excel knowledge base using TF-IDF vectorization and cosine similarity. Delivered a branded, glassmorphism-styled UI with graceful error handling, 30-second API timeout, and environment-based backend URL configuration.',
      technologies: ['SAP BTP', 'FastAPI', 'Streamlit', 'Python', 'TF-IDF'],
      image: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
      aiHint: 'university chatbot',
      links: {
        github: '#',
      },
    },
    {
      title: 'ORION-EYE– Autonomous Asteroid Detection & Evasion System',
      description: 'Tracked space debris in real time using YOLOv8 and OpenCV at 30+ FPS, predicting object trajectories across X, Y, and Z axes via physics-based velocity modeling. Classified collision threats across three severity levels (CRITICAL / HIGH / LOW) and auto-generated Delta-V evasion commands from live object motion vectors. Served live AR-overlaid video through a Flask + SQLite web dashboard with MJPEG streaming and a REST telemetry API for browser-based monitoring.',
      technologies: ['YOLOv8', 'OpenCV', 'Flask', 'SQLite', 'Python'],
      image: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
      aiHint: 'asteroid detection',
      links: {
        github: '#',
      },
    },
    {
      title: 'Naman Portfolio– AI-Personalized Developer Portfolio',
      description: 'Built a Next.js 15 single-page portfolio with TypeScript and Tailwind CSS, featuring dark/light theming, responsive grid layout, and live GitHub contribution heatmap. Wired Google Gemini 2.0 Flash via Genkit Server Actions. Centralized all content in a single portfolioData object so AI overrides apply at runtime without touching source data, then shipped to Firebase App Hosting with Zod-validated contact forms.',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Genkit', 'Firebase'],
      image: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
      aiHint: 'developer portfolio',
      links: {
        github: '#',
      },
    },
    {
      title: 'Management system for a bookshop',
      description: 'Built a cloud-native bookshop management system on SAP BTP with Node.js CAP model. Designed Fiori Elements UI for inventory, powered by OData services and SAP HANA Cloud.',
      technologies: ['SAP BTP', 'Node.js', 'CAP', 'HANA', 'Fiori'],
      image: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
      aiHint: 'bookshop management',
      links: {
        github: 'https://github.com/namansha20/library-bookshop',
      },
    },
  ],
  certifications: [
    { name: 'SAP Cloud Application Programming Model', issuer: 'SAP' },
    { name: 'SAP BTP CAPM (Cloud Application Programming Model)', issuer: 'Anubhav Trainings' },
    { name: 'UI5 & Fiori training with O-Data on BAS', issuer: 'Anubhav Trainings' },
    { name: 'Creating Applications and Extensions using SAP Build Code', issuer: 'SAP' },
    { name: 'Design Thinking', issuer: 'SAP' },
    { name: 'Generative AI', issuer: 'Google' },
  ],
  achievements: [
    {
      title: 'Team Leader – Smart India Hackathon (SIH)',
      description: 'Led a team of developers to design and implement an innovative tech solution under national-level competitive constraints.',
    },
    {
      title: 'Team Leader – SAP HACKFEST 2025',
      description: 'Led my team at SAP Hackfest 2025, clearing Round 2 and advancing to Round 3.',
    },
  ],
  contact: {
    email: '2023csnaman16279@poornima.edu.in',
    phone: '+91 94613 61338',
    location: 'Jaipur, Rajasthan',
  },
};
