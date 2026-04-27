import { notFound } from 'next/navigation';

import { isAppLocale } from '@/shared/config/i18n';
import { CalculatorView } from '@/views/calculator';

interface LocalizedCalculatorPageProps {
  params: Promise<{
    locale: string;
  }>;
}

const LocalizedCalculatorPage = async ({ params }: LocalizedCalculatorPageProps) => {
  const { locale } = await params;

  if (!isAppLocale(locale)) {
    notFound();
  }

  return <CalculatorView locale={locale} />;
};

export default LocalizedCalculatorPage;
