import { getTranslations } from 'next-intl/server';

import { Container } from '@/shared/ui';

type LegalDocument = 'policy' | 'privacy';

export interface LegalViewProps {
  document: LegalDocument;
}

export const LegalView = async ({ document }: LegalViewProps) => {
  const legal = await getTranslations(`shared.legal.${document}`);

  return (
    <main>
      <Container as="section" className="flex min-h-[64vh] items-center py-20">
        <article className="relative overflow-hidden border border-foreground/15 bg-surface p-6 shadow-l sm:p-10">
          <div className="pointer-events-none absolute -right-16 -top-20 size-60 bg-accent opacity-25 blur-3xl" />
          <div className="relative max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-accent">
              {legal('eyebrow')}
            </p>
            <h1 className="mt-6 font-accent text-accent-xl text-foreground sm:text-[5rem] sm:leading-[0.9]">
              {legal('title')}
            </h1>
            <p className="mt-6 text-xl text-muted">{legal('description')}</p>
            <p className="mt-8 border-l-4 border-accent pl-5 text-l text-foreground/82">
              {legal('body')}
            </p>
          </div>
        </article>
      </Container>
    </main>
  );
};
