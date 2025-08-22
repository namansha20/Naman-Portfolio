import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Education, Internship, Certification, Achievement } from "@/lib/data";
import { GraduationCap, Briefcase, Award, Trophy, Star } from "lucide-react";

type AboutProps = {
  summary: string;
  education: Education[];
  internships: Internship[];
  certifications: Certification[];
  achievements: Achievement[];
  isTailoring: boolean;
};

const SectionCard = ({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) => (
  <Card>
    <AccordionItem value={title}>
      <AccordionTrigger className="p-6">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-primary/10 rounded-md text-primary">{icon}</div>
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-6">
        {children}
      </AccordionContent>
    </AccordionItem>
  </Card>
);

export default function About({ summary, education, internships, certifications, achievements, isTailoring }: AboutProps) {
  return (
    <section id="about" className="py-16 bg-muted">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary">About Me</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            My journey, qualifications, and professional achievements.
          </p>
        </div>
        
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle>Professional Summary</CardTitle>
          </CardHeader>
          <CardContent>
            {isTailoring ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ) : (
              <p className="text-muted-foreground whitespace-pre-line">{summary}</p>
            )}
          </CardContent>
        </Card>

        <Accordion type="multiple" className="w-full space-y-4">
          <SectionCard title="Education" icon={<GraduationCap />}>
            <ul className="space-y-4">
              {education.map((edu, i) => (
                <li key={i} className="pl-4 border-l-2 border-primary">
                  <p className="font-semibold">{edu.degree} &bull; {edu.university}</p>
                  <p className="text-sm text-muted-foreground">{edu.period}</p>
                  <p className="text-sm">{edu.grade}</p>
                </li>
              ))}
            </ul>
          </SectionCard>

          <SectionCard title="Internships" icon={<Briefcase />}>
            <ul className="space-y-4">
              {internships.map((intern, i) => (
                <li key={i} className="pl-4 border-l-2 border-primary">
                  <p className="font-semibold">{intern.role}, {intern.company}</p>
                  <p className="text-sm text-muted-foreground">{intern.period}</p>
                  <p className="text-sm mt-1">{intern.description}</p>
                </li>
              ))}
            </ul>
          </SectionCard>
          
          <SectionCard title="Certifications" icon={<Award />}>
            <ul className="list-disc list-inside space-y-2">
              {certifications.map((cert, i) => (
                <li key={i}>
                  <span className="font-semibold">{cert.name}</span>
                  <span className="text-muted-foreground"> - {cert.issuer}</span>
                </li>
              ))}
            </ul>
          </SectionCard>

          <SectionCard title="Achievements" icon={<Trophy />}>
            <ul className="space-y-3">
              {achievements.map((ach, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Star className="text-accent h-5 w-5 mt-0.5 shrink-0" fill="currentColor" />
                  <div>
                    <span className="font-semibold">{ach.title}:</span>
                    <span className="text-muted-foreground"> {ach.description}</span>
                  </div>
                </li>
              ))}
            </ul>
          </SectionCard>
        </Accordion>
      </div>
    </section>
  );
}
