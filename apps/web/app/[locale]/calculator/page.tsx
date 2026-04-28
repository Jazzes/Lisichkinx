import { setRequestLocale } from 'next-intl/server';

import { notFound } from 'next/navigation';

import { type Locale, isLocale } from '@/shared/config/i18n';
import { CalculatorView } from '@/views/calculator';

interface LocalizedCalculatorPageProps {
  params: Promise<{
    locale: string;
  }>;
}

const LocalizedCalculatorPage = async ({ params }: LocalizedCalculatorPageProps) => {
  const { locale: requestedLocale } = await params;

  if (!isLocale(requestedLocale)) {
    notFound();
  }

  const locale: Locale = requestedLocale;

  setRequestLocale(locale);

  return <CalculatorView locale={locale} />;
};

export default LocalizedCalculatorPage;
