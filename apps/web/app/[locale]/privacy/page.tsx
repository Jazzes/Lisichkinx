import { setRequestLocale } from 'next-intl/server';

import { notFound } from 'next/navigation';

import { type Locale, isLocale } from '@/shared/config/i18n';
import { LegalView } from '@/views/legal';

interface LocalizedPrivacyPageProps {
  params: Promise<{
    locale: string;
  }>;
}

const LocalizedPrivacyPage = async ({ params }: LocalizedPrivacyPageProps) => {
  const { locale: requestedLocale } = await params;

  if (!isLocale(requestedLocale)) {
    notFound();
  }

  const locale: Locale = requestedLocale;

  setRequestLocale(locale);

  return <LegalView document="privacy" />;
};

export default LocalizedPrivacyPage;
