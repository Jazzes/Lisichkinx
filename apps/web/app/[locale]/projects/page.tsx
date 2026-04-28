import { setRequestLocale } from 'next-intl/server';

import { notFound } from 'next/navigation';

import { type Locale, isLocale } from '@/shared/config/i18n';
import { ProjectsView } from '@/views/projects';

interface LocalizedProjectsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

const LocalizedProjectsPage = async ({ params }: LocalizedProjectsPageProps) => {
  const { locale: requestedLocale } = await params;

  if (!isLocale(requestedLocale)) {
    notFound();
  }

  const locale: Locale = requestedLocale;

  setRequestLocale(locale);

  return <ProjectsView locale={locale} />;
};

export default LocalizedProjectsPage;
