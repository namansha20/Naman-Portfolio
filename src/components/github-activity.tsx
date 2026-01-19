'use client';

import GitHubCalendar from 'react-github-calendar';

type GithubActivityProps = {
  username: string;
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
            />
        </div>
      </div>
    </section>
  );
}
