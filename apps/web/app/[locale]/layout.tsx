import type { ReactNode } from 'react';

import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';

import { Commissioner, Onest } from 'next/font/google';
import { notFound } from 'next/navigation';

import { type Locale, isLocale, locales } from '@/shared/config/i18n';
import { CookieConsent } from '@/widgets/cookie-consent';
import { SiteFooter } from '@/widgets/site-footer';
import { SiteHeader } from '@/widgets/site-header';

import type { Metadata } from 'next';

import '@/shared/styles/tailwind.css';
import '@/shared/styles/globals.scss';

const onest = Onest({
  display: 'swap',
  subsets: ['cyrillic', 'latin'],
  variable: '--font-onest',
});

const commissioner = Commissioner({
  display: 'swap',
  subsets: ['cyrillic', 'latin'],
  variable: '--font-commissioner',
});

export const generateStaticParams = () => {
  return locales.map((locale) => ({ locale }));
};

interface LocaleMetadataProps {
  params: Promise<{
    locale: string;
  }>;
}

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export const generateMetadata = async ({ params }: LocaleMetadataProps): Promise<Metadata> => {
  const { locale: requestedLocale } = await params;

  if (!isLocale(requestedLocale)) {
    notFound();
  }

  const site = await getTranslations({ locale: requestedLocale, namespace: 'shared.site' });

  return {
    description: site('description'),
    title: site('title'),
  };
};

const LocaleLayout = async ({ children, params }: LocaleLayoutProps) => {
  const { locale: requestedLocale } = await params;

  if (!isLocale(requestedLocale)) {
    notFound();
  }

  const locale: Locale = requestedLocale;

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html className={`${onest.variable} ${commissioner.variable}`} lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <div className="flex min-h-dvh flex-col">
            <SiteHeader locale={locale} />
            <div className="flex min-h-0 flex-auto flex-col">{children}</div>
            <SiteFooter locale={locale} />
          </div>
          <CookieConsent />
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
