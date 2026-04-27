import { getTranslations, setRequestLocale } from 'next-intl/server';

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

  const [home, creditCalculator] = await Promise.all([
    getTranslations({ locale, namespace: 'shared.home' }),
    getTranslations({ locale, namespace: 'shared.projects.creditCalculator' }),
  ]);

  return (
    <HomeView
      locale={locale}
      messages={{
        eyebrow: home('eyebrow'),
        heroDescription: home('heroDescription'),
        heroTitle: home('heroTitle'),
        projectList: {
          creditCalculator: {
            cta: creditCalculator('cta'),
            description: creditCalculator('description'),
            title: creditCalculator('title'),
          },
          title: home('projectsTitle'),
        },
      }}
    />
  );
};

export default LocalizedHomePage;
