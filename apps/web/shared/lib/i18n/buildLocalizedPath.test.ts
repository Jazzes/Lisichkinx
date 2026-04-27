import { describe, expect, it } from 'vitest';

import { buildLocalizedPath } from './buildLocalizedPath';

describe('buildLocalizedPath', () => {
  it('keeps default locale routes unprefixed', () => {
    expect(buildLocalizedPath('ru')).toBe('/');
    expect(buildLocalizedPath('ru', '/calculator')).toBe('/calculator');
  });

  it('prefixes English routes', () => {
    expect(buildLocalizedPath('en')).toBe('/en');
    expect(buildLocalizedPath('en', '/calculator')).toBe('/en/calculator');
  });
});
