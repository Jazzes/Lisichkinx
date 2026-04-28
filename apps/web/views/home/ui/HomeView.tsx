import { getTranslations } from 'next-intl/server';

import type { Locale } from '@/shared/config/i18n';
import { Container } from '@/shared/ui';
import { ProjectList } from '@/widgets/project-list';

export interface HomeViewProps {
  locale: Locale;
}

export const HomeView = async ({ locale }: HomeViewProps) => {
  const home = await getTranslations('shared.home');

  return (
    <main>
      <Container as="section" className="pb-12 pt-10 sm:pt-14">
        <div className="home-hero-rise relative overflow-hidden border border-foreground/15 bg-surface/70 p-6 shadow-l sm:p-10 lg:p-12">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgb(255_255_255/5%)_1px,transparent_1px),linear-gradient(180deg,rgb(255_255_255/4%)_1px,transparent_1px)] bg-size-[4rem_4rem]" />
          <div className="pointer-events-none absolute -right-24 -top-24 size-96 bg-accent opacity-30 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-linear-to-r from-transparent via-accent to-transparent" />

          <div className="relative grid min-h-104 content-end gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
            <div>
              <p className="inline-flex border border-accent bg-accent px-3 py-2 text-xs font-black uppercase tracking-[0.28em] text-accent-foreground shadow-s-hover">
                {home('eyebrow')}
              </p>
              <h1 className="mt-8 max-w-5xl font-accent text-[4rem] font-semibold leading-[0.84] tracking-[-0.07em] sm:text-[7rem]">
                {home('heroTitle')}
              </h1>
              <p className="mt-7 max-w-2xl text-xl text-muted">{home('heroDescription')}</p>
            </div>

            <aside
              aria-hidden="true"
              className="hidden border border-foreground/15 bg-background/80 p-4 lg:block"
            >
              <div className="h-2 w-20 bg-accent shadow-s-accent" />
              <div className="mt-16 grid gap-3">
                <span className="h-3 w-full bg-foreground/70" />
                <span className="h-3 w-2/3 bg-foreground/30" />
                <span className="h-3 w-5/6 bg-accent/75" />
              </div>
            </aside>
          </div>
        </div>
      </Container>

      <ProjectList locale={locale} />
    </main>
  );
};
