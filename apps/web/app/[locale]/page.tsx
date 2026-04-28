import { setRequestLocale } from 'next-intl/server';

import { notFound } from 'next/navigation';

import { type Locale, isLocale } from '@/shared/config/i18n';
import { HomeView } from '@/views/home';

interface LocalizedHomePageProps {
  params: Promise<{
    locale: string;
  }>;
}

const LocalizedHomePage = async ({ params }: LocalizedHomePageProps) => {
  const { locale: requestedLocale } = await params;

  if (!isLocale(requestedLocale)) {
    notFound();
  }

  const locale: Locale = requestedLocale;

  setRequestLocale(locale);

  return <HomeView locale={locale} />;
};

export default LocalizedHomePage;
