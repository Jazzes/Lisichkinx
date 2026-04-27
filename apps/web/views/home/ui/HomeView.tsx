import type { FC } from 'react';

import type { Locale } from '@/shared/config/i18n';
import { ProjectList, type ProjectListMessages } from '@/widgets/project-list';

export interface HomeViewMessages {
  eyebrow: string;
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
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted">
          {messages.eyebrow}
        </p>
        <h1 className="mt-5 max-w-3xl text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
          {messages.heroTitle}
        </h1>
        <p className="mt-6 max-w-2xl text-lg/8 text-muted">{messages.heroDescription}</p>
      </section>

      <ProjectList locale={locale} messages={messages.projectList} />
    </main>
  );
};
