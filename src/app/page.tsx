'use client';

import React, { useState, useTransition } from 'react';
import Header from '@/components/header';
import Hero from '@/components/hero';
import About from '@/components/about';
import Skills from '@/components/skills';
import Projects from '@/components/projects';
import Contact from '@/components/contact';
import Footer from '@/components/footer';
import { portfolioData } from '@/lib/data';
import { tailorContent, TailorContentOutput } from '@/ai/flows/tailor-content';

export default function Home() {
  const [tailoredContent, setTailoredContent] = useState<TailorContentOutput | null>(null);
  const [isTailoring, startTailoring] = useTransition();

  const handleProfileChange = (profile: string) => {
    if (profile === 'Default') {
      setTailoredContent(null);
      return;
    }

    startTailoring(async () => {
      const originalProjectDescriptions = portfolioData.projects.reduce((acc, project) => {
        acc[project.title] = project.description;
        return acc;
      }, {} as Record<string, string>);

      const tailored = await tailorContent({
        visitorProfile: profile,
        aboutMeSection: portfolioData.summary,
        projectDescriptions: originalProjectDescriptions,
      });
      setTailoredContent(tailored);
    });
  };

  const tailoredProjectData = tailoredContent
    ? portfolioData.projects.map(p => ({
        ...p,
        description: tailoredContent.tailoredProjectDescriptions[p.title] || p.description,
      }))
    : portfolioData.projects;


  return (
    <div className="flex min-h-screen flex-col">
      <Header onProfileChange={handleProfileChange} isTailoring={isTailoring} />
      <div className="flex-grow">
        <Hero data={portfolioData.hero} />
        <About
          summary={tailoredContent ? tailoredContent.tailoredAboutMe : portfolioData.summary}
          education={portfolioData.education}
          internships={portfolioData.internships}
          certifications={portfolioData.certifications}
          achievements={portfolioData.achievements}
          isTailoring={isTailoring}
        />
        <Skills skills={portfolioData.skills} />
        <Projects projects={tailoredProjectData} isTailoring={isTailoring}/>
        <Contact contact={portfolioData.contact} />
      </div>
      <Footer />
    </div>
  );
}
