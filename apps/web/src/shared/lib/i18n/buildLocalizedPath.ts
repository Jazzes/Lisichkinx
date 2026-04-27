import type { AppLocale } from '@/shared/config/i18n';

type AppBasePath = '/' | '/calculator';
type AppRoutePath = '/' | '/calculator' | '/en' | '/en/calculator';

const localizedPaths: Record<AppLocale, Record<AppBasePath, AppRoutePath>> = {
  en: {
    '/': '/en',
    '/calculator': '/en/calculator',
  },
  ru: {
    '/': '/',
    '/calculator': '/calculator',
  },
};

export const buildLocalizedPath = (locale: AppLocale, path: AppBasePath = '/'): AppRoutePath => {
  return localizedPaths[locale][path];
};
