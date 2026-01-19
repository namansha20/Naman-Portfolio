'use client';

import GitHubCalendar from 'react-github-calendar';

type GithubActivityProps = {
  username: string;
};

const MINECRAFT_THEME = {
  light: ['#c6c6c6', '#A1D385', '#74B456', '#4E8732', '#30591D'],
  dark: ['#c6c6c6', '#A1D385', '#74B456', '#4E8732', '#30591D'],
};

export default function GithubActivity({ username }: GithubActivityProps) {

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
                theme={MINECRAFT_THEME}
            />
        </div>
      </div>
    </section>
  );
}
