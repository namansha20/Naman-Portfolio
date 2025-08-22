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
      linkedin: 'https://www.linkedin.com/',
      github: 'https://github.com/',
    },
  },
  summary: `SAP Enthusiast & BTP CAPM Developer with hands-on experience in building scalable applications and solving real-world problems using SAP BTP, CAPM, UI5/Fiori, and cloud technologies. Skilled in applying Design Thinking to craft innovative and user-focused solutions. Strong foundation in Java, Node.js, complemented by academic projects and hackathon leadership. Passionate about bridging technology and business, aiming to grow into SAP Development & Consulting roles while contributing to impactful digital transformation initiatives.`,
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
    'Programming Languages': ['Java', 'JavaScript', 'SQL'],
    'SAP Technologies': ['SAP BTP', 'CAP (Cloud Application Programming)', 'SAP Fiori', 'SAP UI5', 'CDS Annotations', 'HANA'],
    'Web Development': ['HTML5', 'CSS', 'JAVA'],
    'Cloud & Platforms': ['Amazon Web Services (AWS)', 'SAP BTP'],
    'Version Control & Collaboration': ['Git', 'GitHub'],
    'Frameworks & Tools': ['Spring', 'Node.js', 'Power BI'],
    'Development Methodologies': ['Agile', 'Sprint'],
  },
  projects: [
    {
      title: 'FEM S.H.I.E.L.D',
      description: "Engineered a web application to enhance women's safety, featuring real-time alerts and a resource locator. Utilized PHP for backend user management and JavaScript for a dynamic, responsive user interface.",
      technologies: ['Html', 'CSS', 'JS', 'PHP'],
      image: 'https://placehold.co/600x400.png',
      aiHint: 'safety app',
      links: {
        github: 'https://github.com/',
        live: '#',
      },
    },
    {
      title: 'WaterTrack',
      description: 'Developed a full-stack cloud application on SAP BTP to monitor and manage water usage for industrial factories. Built the backend with Node.js and the Cloud Application Programming Model (CAP) to expose OData services, using SAP HANA Cloud for data persistence.',
      technologies: ['SAP BTP', 'Node.js', 'CAP', 'HANA', 'Ui5 Fiori'],
      image: 'https://placehold.co/600x400.png',
      aiHint: 'industrial analytics',
      links: {
        github: 'https://github.com/',
        live: '#',
      },
    },
    {
      title: 'Library Bookshop',
      description: 'Engineered a cloud-native bookshop management system on SAP BTP using the Cloud Application Programming Model with Node.js. The application features a Fiori Elements UI for intuitive inventory management, supported by OData services and an SAP HANA Cloud database.',
      technologies: ['SAP BTP', 'Node.js', 'CAP', 'HANA'],
      image: 'https://placehold.co/600x400.png',
      aiHint: 'bookshop inventory',
      links: {
        github: 'https://github.com/',
        live: '#',
      },
    },
    {
      title: 'Performance Tracker For Institutions',
      description: 'Architected a secure performance tracking portal for educational institutions on SAP BTP, enabling detailed record management for students and staff. Utilized Node.js and CAP for the service layer and implemented role-based access control with XSUAA to ensure data privacy within the HANA Cloud database.',
      technologies: ['SAP BTP', 'Node.js', 'CAP', 'HANA', 'Fiori'],
      image: 'https://placehold.co/600x400.png',
      aiHint: 'education portal',
      links: {
        github: 'https://github.com/',
        live: '#',
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
