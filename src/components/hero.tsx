import { Button } from '@/components/ui/button';
import { Github, Linkedin } from 'lucide-react';
import type { HeroData } from '@/lib/data';

type HeroProps = {
  data: HeroData;
};

export default function Hero({ data }: HeroProps) {
  return (
    <section id="hero" className="py-20 text-center container">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold tracking-tighter text-primary sm:text-6xl md:text-7xl lg:text-8xl">
          {data.name}
        </h1>
        <h2 className="mt-4 text-3xl font-medium tracking-tight sm:text-4xl md:text-5xl">
          {data.title}
        </h2>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
          {data.subtitle}
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button variant="outline" size="lg" asChild>
            <a href={data.social.linkedin} target="_blank" rel="noopener noreferrer">
              <Linkedin className="mr-2" /> LinkedIn
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href={data.social.github} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2" /> GitHub
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
