import { expect, test } from '@playwright/test';

const localizedRoutes = [
  {
    heading: 'Lisichkinx',
    path: '/',
  },
  {
    heading: 'Кредитный калькулятор',
    path: '/calculator',
  },
  {
    heading: 'Lisichkinx',
    path: '/en',
  },
  {
    heading: 'Credit calculator',
    path: '/en/calculator',
  },
] as const;

test.describe('localized routes', () => {
  for (const route of localizedRoutes) {
    test(`renders ${route.path}`, async ({ page }) => {
      await page.goto(route.path);

      await expect(page.getByRole('heading', { level: 1, name: route.heading })).toBeVisible();
    });
  }

  test('renders English metadata on English routes', async ({ page }) => {
    await page.goto('/en');

    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      'A catalog of useful digital projects and tools.',
    );
  });
});
