import type { FC } from 'react';

export interface CalculatorViewMessages {
  description: string;
  eyebrow: string;
  status: string;
  title: string;
}

export interface CalculatorViewProps {
  messages: CalculatorViewMessages;
}

export const CalculatorView: FC<CalculatorViewProps> = ({ messages }) => {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-page flex-col justify-center px-6 py-20">
      <p className="text-m font-semibold uppercase tracking-[0.3em] text-muted">
        {messages.eyebrow}
      </p>
      <h1 className="mt-5 max-w-3xl font-accent text-accent-xl text-foreground sm:text-accent-2xl">
        {messages.title}
      </h1>
      <p className="mt-6 max-w-2xl text-xl text-muted">{messages.description}</p>
      <div className="mt-10 rounded-card border border-dashed border-border-subtle bg-surface p-6 text-l text-muted">
        {messages.status}
      </div>
    </main>
  );
};
