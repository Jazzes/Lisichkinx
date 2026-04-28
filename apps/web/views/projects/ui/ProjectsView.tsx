import { getTranslations } from 'next-intl/server';

import type { Locale } from '@/shared/config/i18n';
import { Container } from '@/shared/ui';
import { ProjectList } from '@/widgets/project-list';

export interface ProjectsViewProps {
  locale: Locale;
}

export const ProjectsView = async ({ locale }: ProjectsViewProps) => {
  const page = await getTranslations('shared.projectsPage');

  return (
    <main>
      <Container as="section" className="pb-10 pt-20">
        <div className="relative overflow-hidden border border-foreground/15 bg-surface/70 p-6 shadow-m sm:p-10">
          <div className="pointer-events-none absolute -right-20 -top-24 size-72 bg-accent opacity-30 blur-3xl" />
          <div className="relative">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-accent">
              {page('eyebrow')}
            </p>
            <h1 className="mt-6 max-w-4xl font-accent text-accent-xl text-foreground sm:text-[5.75rem] sm:leading-[0.9]">
              {page('title')}
            </h1>
            <p className="mt-6 max-w-2xl text-xl text-muted">{page('description')}</p>
          </div>
        </div>
      </Container>

      <ProjectList locale={locale} />
    </main>
  );
};
