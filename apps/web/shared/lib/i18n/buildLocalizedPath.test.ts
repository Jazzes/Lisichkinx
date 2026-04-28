import { describe, expect, it } from 'vitest';

import { AppRoute, buildLocalizedPath, getRouteFromLocalizedPath } from './buildLocalizedPath';

describe('buildLocalizedPath', () => {
  it('keeps default locale routes unprefixed', () => {
    expect(buildLocalizedPath('ru')).toBe('/');
    expect(buildLocalizedPath('ru', AppRoute.Calculator)).toBe('/calculator');
    expect(buildLocalizedPath('ru', AppRoute.Policy)).toBe('/policy');
    expect(buildLocalizedPath('ru', AppRoute.Privacy)).toBe('/privacy');
    expect(buildLocalizedPath('ru', AppRoute.Projects)).toBe('/projects');
  });

  it('prefixes English routes', () => {
    expect(buildLocalizedPath('en')).toBe('/en');
    expect(buildLocalizedPath('en', AppRoute.Calculator)).toBe('/en/calculator');
    expect(buildLocalizedPath('en', AppRoute.Policy)).toBe('/en/policy');
    expect(buildLocalizedPath('en', AppRoute.Privacy)).toBe('/en/privacy');
    expect(buildLocalizedPath('en', AppRoute.Projects)).toBe('/en/projects');
  });
});

describe('getRouteFromLocalizedPath', () => {
  it('resolves route keys from localized routes', () => {
    expect(getRouteFromLocalizedPath('/')).toBe(AppRoute.Home);
    expect(getRouteFromLocalizedPath('/calculator')).toBe(AppRoute.Calculator);
    expect(getRouteFromLocalizedPath('/projects')).toBe(AppRoute.Projects);
    expect(getRouteFromLocalizedPath('/en')).toBe(AppRoute.Home);
    expect(getRouteFromLocalizedPath('/en/calculator')).toBe(AppRoute.Calculator);
    expect(getRouteFromLocalizedPath('/en/privacy')).toBe(AppRoute.Privacy);
  });

  it('falls back to home for unknown routes', () => {
    expect(getRouteFromLocalizedPath('/unknown')).toBe(AppRoute.Home);
    expect(getRouteFromLocalizedPath('/en/unknown')).toBe(AppRoute.Home);
  });
});
