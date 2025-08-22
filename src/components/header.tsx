import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Download, Bot } from 'lucide-react';
import DynamicContentToggle from './dynamic-content-toggle';

type HeaderProps = {
  onProfileChange: (profile: string) => void;
  isTailoring: boolean;
};

export default function Header({ onProfileChange, isTailoring }: HeaderProps) {
  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Bot className="h-6 w-6 text-primary" />
          <span className="font-bold">Naman Sharma</span>
        </Link>
        <nav className="hidden flex-1 items-center space-x-6 text-sm font-medium md:flex">
          {navLinks.map(link => (
            <Link
              key={link.name}
              href={link.href}
              className="transition-colors hover:text-accent"
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
           <div className="hidden md:block">
            <DynamicContentToggle onProfileChange={onProfileChange} isLoading={isTailoring} />
          </div>
          <Button asChild>
            <a href="/resume.pdf" download="Naman_Sharma_Resume.pdf">
              <Download className="mr-2 h-4 w-4" />
              Resume
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
