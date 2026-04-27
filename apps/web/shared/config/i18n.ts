export const locales = ['ru', 'en'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale = 'ru' satisfies Locale;

export const prefixedLocales = locales.filter((locale) => locale !== defaultLocale);

export const isLocale = (value: string): value is Locale => {
  return locales.includes(value as Locale);
};

export const shouldPrefixLocale = (locale: Locale): boolean => {
  return locale !== defaultLocale;
};
