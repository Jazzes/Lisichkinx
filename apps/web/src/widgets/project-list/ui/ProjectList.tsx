import type { FC } from 'react';

import type { AppLocale } from '@/shared/config/i18n';
import type { HomeMessages } from '@/shared/config/messages';
import { buildLocalizedPath } from '@/shared/lib/i18n';
import { LinkButton } from '@/shared/ui';

export interface ProjectListProps {
  locale: AppLocale;
  messages: HomeMessages;
}

export const ProjectList: FC<ProjectListProps> = ({ locale, messages }) => {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-12">
      <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
        {messages.projectsTitle}
      </h2>

      <article className="mt-6 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="max-w-2xl">
          <h3 className="text-xl font-semibold text-neutral-950">
            {messages.creditCalculatorTitle}
          </h3>
          <p className="mt-3 text-base/7  text-neutral-600">
            {messages.creditCalculatorDescription}
          </p>
        </div>

        <LinkButton className="mt-6" href={{ pathname: buildLocalizedPath(locale, '/calculator') }}>
          {messages.creditCalculatorCta}
        </LinkButton>
      </article>
    </section>
  );
};
