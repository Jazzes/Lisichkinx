import { getRequestConfig } from 'next-intl/server';

import { type Locale, defaultLocale, isLocale } from '@/shared/config/i18n';

const messagesLoaders = {
  en: {
    calculator: () => import('../lang/en/calculator.json'),
    shared: () => import('../lang/en/shared.json'),
  },
  ru: {
    calculator: () => import('../lang/ru/calculator.json'),
    shared: () => import('../lang/ru/shared.json'),
  },
} satisfies Record<Locale, Record<'calculator' | 'shared', () => Promise<{ default: unknown }>>>;

const loadMessages = async (locale: Locale) => {
  const [sharedMessages, calculatorMessages] = await Promise.all([
    messagesLoaders[locale].shared(),
    messagesLoaders[locale].calculator(),
  ]);

  return {
    calculator: calculatorMessages.default,
    shared: sharedMessages.default,
  };
};

export default getRequestConfig(async ({ requestLocale }) => {
  const requestedLocale = await requestLocale;
  const locale = requestedLocale && isLocale(requestedLocale) ? requestedLocale : defaultLocale;

  return {
    locale,
    messages: await loadMessages(locale),
  };
});
