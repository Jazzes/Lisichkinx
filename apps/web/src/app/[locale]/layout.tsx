import type { ReactNode } from 'react';

import { notFound } from 'next/navigation';

import { isAppLocale, locales } from '@/shared/config/i18n';

import type { Metadata } from 'next';

import '@/shared/styles/tailwind.css';
import '@/shared/styles/globals.scss';

export const metadata: Metadata = {
  title: 'Lisichkinx',
  description: 'Каталог полезных цифровых проектов и инструментов.',
};

export const generateStaticParams = () => {
  return locales.map((locale) => ({ locale }));
};

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

const LocaleLayout = async ({ children, params }: LocaleLayoutProps) => {
  const { locale } = await params;

  if (!isAppLocale(locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
};

export default LocaleLayout;
