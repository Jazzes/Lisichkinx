'use client';

import { type FC, useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';

import { Button, Container } from '@/shared/ui';

const COOKIE_CONSENT_STORAGE_KEY = 'lisichkinx-cookie-consent';

export const CookieConsent: FC = () => {
  const t = useTranslations('shared.shell.cookie');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY) === null);
  }, []);

  const saveConsent = (value: 'accepted' | 'declined') => {
    localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, value);
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-4 z-50">
      <Container className="flex justify-end">
        <section
          aria-label={t('title')}
          className="w-full max-w-xl border border-foreground bg-surface p-5 shadow-l sm:w-auto"
        >
          <h2 className="font-accent text-accent-s text-foreground">{t('title')}</h2>
          <p className="mt-3 text-m text-muted">{t('description')}</p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Button onClick={() => saveConsent('accepted')}>{t('accept')}</Button>
            <Button onClick={() => saveConsent('declined')} variant="secondary">
              {t('decline')}
            </Button>
          </div>
        </section>
      </Container>
    </div>
  );
};
