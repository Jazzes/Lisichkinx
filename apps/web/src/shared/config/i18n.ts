export const locales = ['ru', 'en'] as const;

export type AppLocale = (typeof locales)[number];

export const defaultLocale = 'ru' satisfies AppLocale;

export const prefixedLocales = locales.filter((locale) => locale !== defaultLocale);

export const isAppLocale = (value: string): value is AppLocale => {
  return locales.includes(value as AppLocale);
};

export const shouldPrefixLocale = (locale: AppLocale): boolean => {
  return locale !== defaultLocale;
};
