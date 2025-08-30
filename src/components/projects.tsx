import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Github, ExternalLink } from 'lucide-react';
import type { Project } from '@/lib/data';

type ProjectsProps = {
  projects: Project[];
  isTailoring: boolean;
};

export default function Projects({ projects, isTailoring }: ProjectsProps) {
  return (
    <section id="projects" className="py-16 bg-muted">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary">Projects</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            A selection of my work, showcasing my skills in action.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="aspect-video relative mb-4">
                  {project.image && (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="rounded-t-lg object-cover"
                      data-ai-hint={project.aiHint}
                    />
                  )}
                </div>
                <CardTitle>{project.title}</CardTitle>
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.technologies.map(tech => (
                    <Badge key={tech} variant="outline">{tech}</Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                {isTailoring ? (
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                ) : (
                  <CardDescription>{project.description}</CardDescription>
                )}
              </CardContent>
              <CardFooter className="flex justify-start gap-4">
                {project.links.github && (
                  <Button variant="outline" asChild>
                    <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      GitHub
                    </a>
                  </Button>
                )}
                {project.links.live && (
                  <Button asChild>
                    <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live Demo
                    </a>
  
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
