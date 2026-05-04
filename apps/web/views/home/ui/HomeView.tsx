import { getTranslations } from 'next-intl/server';

import type { Locale } from '@/shared/config/i18n';
import { ProjectList } from '@/widgets/project-list';

export interface HomeViewProps {
  locale: Locale;
}

export const HomeView = async ({ locale }: HomeViewProps) => {
  const home = await getTranslations('shared.home');

  return (
    <main>
      <section className="home-hero-rise relative isolate grid min-h-[calc(100svh-4.5rem)] w-full place-items-center overflow-hidden bg-background px-5 py-16 sm:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgb(180_92_255/38%),transparent_30rem),radial-gradient(circle_at_82%_22%,rgb(255_248_238/18%),transparent_26rem),radial-gradient(circle_at_50%_88%,rgb(180_92_255/26%),transparent_34rem)]"
        />
        <div
          aria-hidden="true"
          className="home-hero-grid pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgb(255_255_255/8%)_1px,transparent_1px),linear-gradient(180deg,rgb(255_255_255/7%)_1px,transparent_1px)] bg-size-[5rem_5rem] opacity-45"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_0_34%,rgb(255_255_255/13%)_34%_35%,transparent_35%_60%,rgb(180_92_255/18%)_60%_61%,transparent_61%)]"
        />
        <div
          aria-hidden="true"
          className="home-hero-glow pointer-events-none absolute left-1/2 top-1/2 size-152 rounded-full bg-accent/45 blur-3xl sm:size-192"
        />
        <div
          aria-hidden="true"
          className="home-hero-orbit pointer-events-none absolute left-1/2 top-1/2 size-96 rounded-[42%] border border-accent/55 sm:size-160"
        />
        <div
          aria-hidden="true"
          className="home-hero-orbit-reverse pointer-events-none absolute left-1/2 top-1/2 size-72 rounded-[48%] border border-foreground/20 sm:size-128"
        />
        <div
          aria-hidden="true"
          className="home-hero-shard pointer-events-none absolute left-[8vw] top-[18%] h-28 w-2 bg-accent shadow-s-accent sm:h-36"
        />
        <div
          aria-hidden="true"
          className="home-hero-shard home-hero-shard-b pointer-events-none absolute bottom-[18%] right-[9vw] h-2 w-36 bg-foreground/85 shadow-s-hover sm:w-56"
        />

        <div className="relative max-w-[min(92vw,90rem)]">
          <h1 className="text-center font-accent text-[clamp(5rem,18vw,18rem)] font-semibold leading-[0.72] -tracking-widest text-foreground">
            {home('heroTitle')}
          </h1>
        </div>
      </section>

      <ProjectList locale={locale} />
    </main>
  );
};
