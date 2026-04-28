'use client';

import type { FC } from 'react';

import { useTranslations } from 'next-intl';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { type Locale, isLocale, localeFlagEmoji, locales } from '@/shared/config/i18n';
import { AppRoute, buildLocalizedPath, getRouteFromLocalizedPath } from '@/shared/lib/i18n';
import { Container, LinkButton, SelectField } from '@/shared/ui';

export interface SiteHeaderProps {
  locale: Locale;
}

const navItems: {
  route: AppRoute;
  messageKey: 'home' | 'projects';
}[] = [
  { messageKey: 'home', route: AppRoute.Home },
  { messageKey: 'projects', route: AppRoute.Projects },
];

export const SiteHeader: FC<SiteHeaderProps> = ({ locale }) => {
  const t = useTranslations('shared.shell.header');
  const pathname = usePathname();
  const router = useRouter();
  const currentRoute = getRouteFromLocalizedPath(pathname);

  const handleLocaleChange = (nextLocale: string | null) => {
    if (!nextLocale || !isLocale(nextLocale) || nextLocale === locale) {
      return;
    }

    router.push(buildLocalizedPath(nextLocale, currentRoute) as Parameters<typeof router.push>[0]);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-foreground/10 bg-background/82 backdrop-blur-xl">
      <Container className="flex items-center justify-between gap-4 py-4">
        <Link
          className="font-accent text-accent-s tracking-[-0.04em] text-foreground transition hover:text-accent focus-visible:outline-accent"
          href={{ pathname: buildLocalizedPath(locale, AppRoute.Home) }}
        >
          Lisichkinx
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => {
            const isActive = currentRoute === item.route;

            return (
              <LinkButton
                active={isActive}
                href={{ pathname: buildLocalizedPath(locale, item.route) }}
                key={item.route}
                variant="inline"
              >
                {t(item.messageKey)}
              </LinkButton>
            );
          })}
        </nav>

        <SelectField
          label={t('language')}
          onValueChange={handleLocaleChange}
          options={locales.map((code) => ({
            label: code,
            value: code,
            trailing: (
              <span aria-hidden className="text-base leading-none">
                {localeFlagEmoji[code]}
              </span>
            ),
          }))}
          value={locale}
        />
      </Container>
    </header>
  );
};
