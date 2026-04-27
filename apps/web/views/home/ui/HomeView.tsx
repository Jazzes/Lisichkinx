import type { FC } from 'react';

import type { Locale } from '@/shared/config/i18n';
import { ProjectList, type ProjectListMessages } from '@/widgets/project-list';

import { FontShowcase, type FontShowcaseMessages } from './FontShowcase';

export interface HomeViewMessages {
  eyebrow: string;
  fontShowcase: FontShowcaseMessages;
  heroDescription: string;
  heroTitle: string;
  projectList: ProjectListMessages;
}

export interface HomeViewProps {
  locale: Locale;
  messages: HomeViewMessages;
}

export const HomeView: FC<HomeViewProps> = ({ locale, messages }) => {
  return (
    <main>
      <section className="mx-auto flex min-h-[48vh] w-full max-w-page flex-col justify-center px-6 py-20">
        <p className="text-m font-semibold uppercase tracking-[0.3em] text-muted">
          {messages.eyebrow}
        </p>
        <h1 className="mt-5 max-w-3xl font-accent text-accent-xl text-foreground sm:text-accent-2xl">
          {messages.heroTitle}
        </h1>
        <p className="mt-6 max-w-2xl text-xl text-muted">{messages.heroDescription}</p>
      </section>

      <ProjectList locale={locale} messages={messages.projectList} />

      <FontShowcase messages={messages.fontShowcase} />
    </main>
  );
};
