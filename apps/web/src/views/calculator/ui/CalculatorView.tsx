import type { FC } from 'react';

import type { AppLocale } from '@/shared/config/i18n';
import { calculatorMessages } from '@/shared/config/messages';

export interface CalculatorViewProps {
  locale: AppLocale;
}

export const CalculatorView: FC<CalculatorViewProps> = ({ locale }) => {
  const messages = calculatorMessages[locale];

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center px-6 py-20">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-neutral-500">
        lisichkinx tool
      </p>
      <h1 className="mt-5 max-w-3xl text-5xl font-semibold tracking-tight text-neutral-950 sm:text-6xl">
        {messages.title}
      </h1>
      <p className="mt-6 max-w-2xl text-lg/8  text-neutral-600">{messages.description}</p>
      <div className="mt-10 rounded-3xl border border-dashed border-neutral-300 bg-white p-6 text-neutral-700">
        {messages.status}
      </div>
    </main>
  );
};
