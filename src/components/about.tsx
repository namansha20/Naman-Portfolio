import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Education, Training, Certification, Achievement, CertificationBadge } from "@/lib/data";
import { GraduationCap, Briefcase, Award, Trophy, Star, Badge } from "lucide-react";
import Image from "next/image";

type AboutProps = {
  summary: string;
  education: Education[];
  trainings: Training[];
  certifications: Certification[];
  certificationBadges: CertificationBadge[];
  achievements: Achievement[];
  isTailoring: boolean;
};

const SectionCard = ({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) => (
  <Card className="card-lift-on-hover">
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

export default function About({ summary, education, trainings, certifications, certificationBadges, achievements, isTailoring }: AboutProps) {
  return (
    <section id="about" className="py-16 bg-muted/50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary">About Me</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            My journey, qualifications, and professional achievements.
          </p>
        </div>
        
        <Card className="mb-8 shadow-lg card-lift-on-hover">
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

        <Accordion type="multiple" className="w-full space-y-4" defaultValue={["Education", "Trainings", "Certifications", "Certification Badges", "Achievements"]}>
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

          <SectionCard title="Trainings" icon={<Briefcase />}>
            <ul className="space-y-4">
              {trainings.map((training, i) => (
                <li key={i} className="pl-4 border-l-2 border-primary">
                  <p className="font-semibold">{training.role}, {training.company}</p>
                  <p className="text-sm text-muted-foreground">{training.period}</p>
                  <p className="text-sm mt-1">{training.description}</p>
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

          <SectionCard title="Certification Badges" icon={<Badge />}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-center pt-4">
              {certificationBadges.map((badge, i) => (
                <div key={i} className="flex flex-col items-center text-center gap-2">
                  <div className="relative w-32 h-32 bg-muted/50 rounded-lg flex items-center justify-center p-2">
                    <Image
                      src={badge.image}
                      alt={badge.name}
                      width={128}
                      height={128}
                      className="object-contain"
                      data-ai-hint={badge.aiHint}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">{badge.name}</p>
                </div>
              ))}
            </div>
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
