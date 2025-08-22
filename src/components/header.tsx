import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import DynamicContentToggle from './dynamic-content-toggle';

type HeaderProps = {
  onProfileChange: (profile: string) => void;
  isTailoring: boolean;
};

const Logo = () => (
  <svg
    className="h-7 w-7"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="logo-gradient" x1="0" y1="0" x2="100" y2="100">
        <stop offset="0%" stopColor="#00AEEF" />
        <stop offset="100%" stopColor="#0072B5" />
      </linearGradient>
    </defs>
    <path
      d="M85,10H15C9.477,10,5,14.477,5,20V80C5,85.523,9.477,90,15,90H85c5.523,0,10-4.477,10-10V20C95,14.477,90.523,10,85,10z M62.2,75H37.8L60,45.5V25h2.2L40,54.5V75H37.8z"
      fill="url(#logo-gradient)"
    />
    <path
      d="M62.2,25L40,54.5V75h22.2V54.5L40,25H62.2z"
      fill="#29ABE2"
      style={{ mixBlendMode: 'screen' }}
    />
  </svg>
);


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
          <Logo />
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
            <a href="https://drive.google.com/file/d/1RKZVw46XR55GCp-H6G1wX3VCguQqbWp6/view?usp=sharing" download="Naman_Sharma_Resume.pdf">
              <Download className="mr-2 h-4 w-4" />
              Resume
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
