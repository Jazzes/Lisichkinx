import type { ReactNode } from 'react';

import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';

import { notFound } from 'next/navigation';

import { type Locale, isLocale, locales } from '@/shared/config/i18n';

import type { Metadata } from 'next';

import '@/shared/styles/tailwind.css';
import '@/shared/styles/globals.scss';

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
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
