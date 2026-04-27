import type { FC } from 'react';

import type { Locale } from '@/shared/config/i18n';
import { buildLocalizedPath } from '@/shared/lib/i18n';
import { LinkButton } from '@/shared/ui';

export interface ProjectListMessages {
  creditCalculator: {
    cta: string;
    description: string;
    title: string;
  };
  title: string;
}

export interface ProjectListProps {
  locale: Locale;
  messages: ProjectListMessages;
}

export const ProjectList: FC<ProjectListProps> = ({ locale, messages }) => {
  return (
    <section className="mx-auto w-full max-w-page px-6 py-12">
      <h2 className="text-2xl font-semibold tracking-tight text-foreground">{messages.title}</h2>

      <article className="mt-6 rounded-card border border-border-subtle bg-surface p-6 shadow-card">
        <div className="max-w-2xl">
          <h3 className="text-xl font-semibold text-foreground">
            {messages.creditCalculator.title}
          </h3>
          <p className="mt-3 text-base/7 text-muted">{messages.creditCalculator.description}</p>
        </div>

        <LinkButton className="mt-6" href={{ pathname: buildLocalizedPath(locale, '/calculator') }}>
          {messages.creditCalculator.cta}
        </LinkButton>
      </article>
    </section>
  );
};
