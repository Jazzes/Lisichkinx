import type { Locale } from '@/shared/config/i18n';

type AppBasePath = '/' | '/calculator';
type AppRoutePath = '/' | '/calculator' | '/en' | '/en/calculator';

const localizedPaths: Record<Locale, Record<AppBasePath, AppRoutePath>> = {
  en: {
    '/': '/en',
    '/calculator': '/en/calculator',
  },
  ru: {
    '/': '/',
    '/calculator': '/calculator',
  },
};

export const buildLocalizedPath = (locale: Locale, path: AppBasePath = '/'): AppRoutePath => {
  return localizedPaths[locale][path];
};
