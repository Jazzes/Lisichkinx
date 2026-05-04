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
      <Container as="section" className="relative pb-20 pt-5 md:pt-10">
        <div className="pointer-events-none absolute right-6 top-24 size-72 bg-accent opacity-30 blur-3xl" />
        <div className="pointer-events-none absolute left-10 top-80 size-56 bg-foreground opacity-10 blur-3xl" />
        <div className="relative grid gap-10">
          <div>
            <h1 className="max-w-5xl font-accent text-[4rem] font-semibold leading-[0.84] tracking-[-0.07em] text-foreground sm:text-[6.5rem]">
              {page('title')}
            </h1>
            <p className="mt-7 max-w-3xl text-xl text-muted">{page('description')}</p>
          </div>

          <CreditCalculator locale={locale} />
        </div>
      </Container>
    </main>
  );
};
