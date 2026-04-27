import type { FC } from 'react';

import type { AppLocale } from '@/shared/config/i18n';
import { homeMessages } from '@/shared/config/messages';
import { ProjectList } from '@/widgets/project-list';

export interface HomeViewProps {
  locale: AppLocale;
}

export const HomeView: FC<HomeViewProps> = ({ locale }) => {
  const messages = homeMessages[locale];

  return (
    <main>
      <section className="mx-auto flex min-h-[48vh] w-full max-w-5xl flex-col justify-center px-6 py-20">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-neutral-500">
          lisichkinx
        </p>
        <h1 className="mt-5 max-w-3xl text-5xl font-semibold tracking-tight text-neutral-950 sm:text-6xl">
          {messages.heroTitle}
        </h1>
        <p className="mt-6 max-w-2xl text-lg/8  text-neutral-600">{messages.heroDescription}</p>
      </section>

      <ProjectList locale={locale} messages={messages} />
    </main>
  );
};
