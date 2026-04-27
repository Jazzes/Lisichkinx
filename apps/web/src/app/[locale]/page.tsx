import { notFound } from 'next/navigation';

import { isAppLocale } from '@/shared/config/i18n';
import { HomeView } from '@/views/home';

interface LocalizedHomePageProps {
  params: Promise<{
    locale: string;
  }>;
}

const LocalizedHomePage = async ({ params }: LocalizedHomePageProps) => {
  const { locale } = await params;

  if (!isAppLocale(locale)) {
    notFound();
  }

  return <HomeView locale={locale} />;
};

export default LocalizedHomePage;
