import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { SkillsData } from '@/lib/data';
import { Code, Library, Cog, Cloud, Bot, Hammer } from 'lucide-react';

const iconMap: { [key: string]: React.ReactElement } = {
  'Languages': <Code className="h-6 w-6" />,
  'Frameworks & Libraries': <Library className="h-6 w-6" />,
  'SAP Specialized': <Cog className="h-6 w-6" />,
  'Platform': <Cloud className="h-6 w-6" />,
  'AIML': <Bot className="h-6 w-6" />,
  'Tools': <Hammer className="h-6 w-6" />,
};

type SkillsProps = {
  skills: SkillsData;
};

export default function Skills({ skills }: SkillsProps) {
  return (
    <section id="skills" className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary">Technical Skills</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            A showcase of my technical expertise and the tools I use.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(skills).map(([category, skillList]) => (
            <Card key={category} className="shadow-lg card-lift-on-hover">
              <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                <div className="p-2 bg-primary/10 rounded-md text-primary">
                  {iconMap[category] || <Code className="h-6 w-6" />}
                </div>
                <CardTitle>{category}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skillList.map(skill => (
                    <Badge key={skill} variant="secondary" className="text-sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
