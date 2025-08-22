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
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl lg:text-7xl">
          {data.name}
        </h1>
        <h2 className="mt-4 text-2xl font-medium tracking-tight sm:text-3xl md:text-4xl">
          {data.title}
        </h2>
        <p className="mt-6 text-lg text-muted-foreground">
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
