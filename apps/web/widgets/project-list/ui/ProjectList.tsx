import { getTranslations } from 'next-intl/server';

import type { Locale } from '@/shared/config/i18n';
import { AppRoute, buildLocalizedPath } from '@/shared/lib/i18n';
import { Container, LinkButton } from '@/shared/ui';

export interface ProjectListProps {
  locale: Locale;
}

export const ProjectList = async ({ locale }: ProjectListProps) => {
  const [home, creditCalculator] = await Promise.all([
    getTranslations('shared.home'),
    getTranslations('shared.projects.creditCalculator'),
  ]);

  return (
    <Container as="section" className="pb-20 pt-6" id="projects">
      <div className="flex items-end justify-between gap-6">
        <h2 className="font-accent text-accent-l text-foreground sm:text-accent-xl">
          {home('projectsTitle')}
        </h2>
        <span className="hidden h-px flex-1 bg-linear-to-r from-accent via-foreground/18 to-transparent sm:block" />
      </div>

      <div className="group relative mt-7">
        <div className="relative isolate transition-transform duration-200 ease-out will-change-transform group-hover:-translate-y-1 group-hover:translate-x-1">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 rounded-card bg-accent/95 transition-[transform,background-color] duration-200 ease-out translate-2.5 group-hover:translate-x-1.5 group-hover:translate-y-4 group-hover:bg-accent"
          />
          <article className="relative z-10 overflow-hidden rounded-card border border-foreground bg-surface shadow-[0_28px_80px_rgb(0_0_0/36%)]">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgb(255_255_255/8%)_0_1px,transparent_1px_3rem)]" />
            <div className="absolute -right-20 -top-20 size-64 bg-accent opacity-35 blur-3xl transition-opacity duration-200 ease-out group-hover:opacity-55" />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-linear-to-l from-accent/30 to-transparent opacity-70 transition-opacity duration-200 ease-out group-hover:opacity-100"
            />

            <div className="relative grid gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
              <div className="max-w-2xl">
                <p className="inline-flex border border-accent bg-accent px-3 py-2 text-xs font-black uppercase tracking-[0.24em] text-accent-foreground shadow-s-hover">
                  01
                </p>
                <h3 className="mt-7 font-accent text-accent-l text-foreground sm:text-accent-xl">
                  {creditCalculator('title')}
                </h3>
                <p className="mt-4 max-w-xl text-xl text-muted">
                  {creditCalculator('description')}
                </p>

                <LinkButton
                  className="mt-8"
                  href={{ pathname: buildLocalizedPath(locale, AppRoute.Calculator) }}
                >
                  {creditCalculator('cta')}
                </LinkButton>
              </div>

              <div
                aria-hidden="true"
                className="relative border border-foreground/60 bg-background/90 p-4 shadow-s-hover"
              >
                <div className="flex items-center justify-between border-b border-foreground/20 pb-3">
                  <span className="h-3 w-24 bg-foreground" />
                  <span className="size-3 bg-accent" />
                </div>
                <div className="mt-5 grid gap-3">
                  <span className="h-14 border border-foreground/25 bg-surface" />
                  <span className="h-14 border border-accent bg-accent/20" />
                  <span className="h-14 border border-foreground/25 bg-surface" />
                </div>
                <div className="mt-5 grid grid-cols-3 gap-2">
                  <span className="h-16 bg-foreground" />
                  <span className="h-16 bg-accent" />
                  <span className="h-16 border border-foreground bg-background" />
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </Container>
  );
};
