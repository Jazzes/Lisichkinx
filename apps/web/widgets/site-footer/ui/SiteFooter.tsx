import { getTranslations } from 'next-intl/server';

import Link from 'next/link';

import type { Locale } from '@/shared/config/i18n';
import { AppRoute, buildLocalizedPath } from '@/shared/lib/i18n';
import { Container } from '@/shared/ui';

export interface SiteFooterProps {
  locale: Locale;
}

export const SiteFooter = async ({ locale }: SiteFooterProps) => {
  const footer = await getTranslations('shared.shell.footer');

  return (
    <footer className="border-t border-foreground/10 bg-background py-12">
      <Container className="grid gap-10 md:grid-cols-[minmax(0,1fr)_16rem_16rem]">
        <div>
          <p className="font-accent text-accent-m tracking-[-0.04em]">Lisichkinx</p>
          <p className="mt-4 text-s text-muted">{footer('copyright')}</p>
        </div>

        <nav aria-labelledby="footer-sitemap-title">
          <h2
            className="text-xs font-black uppercase tracking-[0.2em] text-foreground"
            id="footer-sitemap-title"
          >
            {footer('sitemap')}
          </h2>
          <ul className="mt-4 grid gap-3 text-m text-muted">
            <li>
              <Link
                className="transition hover:text-accent focus-visible:outline-accent"
                href={{ pathname: buildLocalizedPath(locale, AppRoute.Home) }}
              >
                {footer('home')}
              </Link>
            </li>
            <li>
              <Link
                className="transition hover:text-accent focus-visible:outline-accent"
                href={{ pathname: buildLocalizedPath(locale, AppRoute.Projects) }}
              >
                {footer('projects')}
              </Link>
            </li>
            <li>
              <Link
                className="transition hover:text-accent focus-visible:outline-accent"
                href={{ pathname: buildLocalizedPath(locale, AppRoute.Calculator) }}
              >
                {footer('calculator')}
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-labelledby="footer-legal-title">
          <h2
            className="text-xs font-black uppercase tracking-[0.2em] text-foreground"
            id="footer-legal-title"
          >
            {footer('legal')}
          </h2>
          <ul className="mt-4 grid gap-3 text-m text-muted">
            <li>
              <Link
                className="transition hover:text-accent focus-visible:outline-accent"
                href={{ pathname: buildLocalizedPath(locale, AppRoute.Policy) }}
              >
                {footer('policy')}
              </Link>
            </li>
            <li>
              <Link
                className="transition hover:text-accent focus-visible:outline-accent"
                href={{ pathname: buildLocalizedPath(locale, AppRoute.Privacy) }}
              >
                {footer('privacy')}
              </Link>
            </li>
          </ul>
        </nav>
      </Container>
    </footer>
  );
};
