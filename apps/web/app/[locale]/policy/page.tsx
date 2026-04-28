import { setRequestLocale } from 'next-intl/server';

import { notFound } from 'next/navigation';

import { type Locale, isLocale } from '@/shared/config/i18n';
import { LegalView } from '@/views/legal';

interface LocalizedPolicyPageProps {
  params: Promise<{
    locale: string;
  }>;
}

const LocalizedPolicyPage = async ({ params }: LocalizedPolicyPageProps) => {
  const { locale: requestedLocale } = await params;

  if (!isLocale(requestedLocale)) {
    notFound();
  }

  const locale: Locale = requestedLocale;

  setRequestLocale(locale);

  return <LegalView document="policy" />;
};

export default LocalizedPolicyPage;
