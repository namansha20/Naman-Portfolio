'use client';

import GitHubCalendar from 'react-github-calendar';
import { useTheme } from 'next-themes';

type GithubActivityProps = {
  username: string;
};

export default function GithubActivity({ username }: GithubActivityProps) {
  const { theme } = useTheme();

  const colorScheme = theme === 'dark' ? 'dark' : 'light';

  const lightTheme = {
    level0: '#F0F0F0', // bg-muted
    level1: '#C6E48B',
    level2: '#7BC96F',
    level3: '#239A3B',
    level4: '#196127',
  };
  
  const darkTheme = {
    level0: 'hsl(212 45% 15%)', // card
    level1: '#0e4429',
    level2: '#006d32',
    level3: '#26a641',
    level4: '#39d353',
  };

  return (
    <section id="github-activity" className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary">GitHub Activity</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            My contribution graph, a visual testament to my coding journey.
          </p>
        </div>
        <div className="flex justify-center">
            <GitHubCalendar 
                username={username}
                blockSize={15}
                blockMargin={5}
                fontSize={16}
                theme={theme === 'dark' ? darkTheme : lightTheme}
            />
        </div>
      </div>
    </section>
  );
}
