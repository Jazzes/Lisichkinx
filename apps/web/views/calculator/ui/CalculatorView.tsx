import { getTranslations } from 'next-intl/server';

import type { Locale } from '@/shared/config/i18n';
import { Container } from '@/shared/ui';

import { CreditCalculator } from './CreditCalculator';

export interface CalculatorViewProps {
  locale: Locale;
}

export const CalculatorView = async ({ locale }: CalculatorViewProps) => {
  const page = await getTranslations('calculator.page');

  return (
    <main>
      <Container as="section" className="relative pb-20 pt-12 sm:pt-16">
        <div className="pointer-events-none absolute right-6 top-24 size-72 bg-accent opacity-30 blur-3xl" />
        <div className="pointer-events-none absolute left-10 top-80 size-56 bg-foreground opacity-10 blur-3xl" />
        <div className="relative grid gap-10">
          <div>
            <p className="inline-flex border border-accent bg-accent px-3 py-2 text-xs font-black uppercase tracking-[0.28em] text-accent-foreground shadow-s-hover">
              {page('eyebrow')}
            </p>
            <h1 className="mt-8 max-w-5xl font-accent text-[4rem] font-semibold leading-[0.84] tracking-[-0.07em] text-foreground sm:text-[6.5rem]">
              {page('title')}
            </h1>
            <p className="mt-7 max-w-3xl text-xl text-muted">{page('description')}</p>
          </div>

          <div className="rounded-card border border-foreground/15 bg-surface/70 p-5 shadow-l sm:p-6">
            <p className="max-w-4xl text-l text-foreground">{page('lead')}</p>
          </div>

          <CreditCalculator locale={locale} />
        </div>
      </Container>
    </main>
  );
};
