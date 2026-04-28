import { type Locale, defaultLocale, isLocale, shouldPrefixLocale } from '@/shared/config/i18n';

export enum AppRoute {
  Calculator = 'calculator',
  Home = 'home',
  Policy = 'policy',
  Privacy = 'privacy',
  Projects = 'projects',
}

export const appRoutes = {
  [AppRoute.Calculator]: '/calculator',
  [AppRoute.Home]: '/',
  [AppRoute.Policy]: '/policy',
  [AppRoute.Privacy]: '/privacy',
  [AppRoute.Projects]: '/projects',
} as const satisfies Record<AppRoute, string>;

export type AppBasePath = (typeof appRoutes)[AppRoute];
type PrefixedLocale = Exclude<Locale, typeof defaultLocale>;
type NestedBasePath = Exclude<AppBasePath, '/'>;
export type AppRoutePath =
  | AppBasePath
  | `/${PrefixedLocale}`
  | `/${PrefixedLocale}${NestedBasePath}`;

export const buildLocalizedPath = (
  locale: Locale,
  route: AppRoute = AppRoute.Home,
): AppRoutePath => {
  const path = appRoutes[route];

  if (!shouldPrefixLocale(locale)) {
    return path;
  }

  return (path === '/' ? `/${locale}` : `/${locale}${path}`) as AppRoutePath;
};

export const getRouteFromLocalizedPath = (pathname: string): AppRoute => {
  const [, maybeLocale, ...segments] = pathname.split('/');
  const pathWithoutLocale = getPathWithoutLocale(maybeLocale, segments);

  return getRouteByPath(pathWithoutLocale) ?? AppRoute.Home;
};

const getPathWithoutLocale = (maybeLocale = '', segments: string[]): string => {
  if (isLocale(maybeLocale) && shouldPrefixLocale(maybeLocale)) {
    return segments[0] ? `/${segments[0]}` : '/';
  }

  return maybeLocale ? `/${maybeLocale}` : '/';
};

const getRouteByPath = (path: string): AppRoute | null => {
  const route = Object.values(AppRoute).find((item) => appRoutes[item] === path);

  return route ?? null;
};
