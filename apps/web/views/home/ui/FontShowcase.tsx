import type { FC } from 'react';

const previewWeights = ['100', '300', '400', '600', '700'] as const;

const bodyFonts = [
  {
    className: 'font-sans',
    key: 'onest',
    name: 'Onest',
    weights: previewWeights,
  },
] as const;

const accentFonts = [
  {
    className: 'font-accent',
    key: 'commissioner',
    name: 'Commissioner',
    weights: previewWeights,
  },
] as const;

type BodyFontKey = (typeof bodyFonts)[number]['key'];
type AccentFontKey = (typeof accentFonts)[number]['key'];
type FontKey = BodyFontKey | AccentFontKey;

export interface FontShowcaseMessages {
  accentSample: string;
  accentTitle: string;
  bodySample: string;
  bodyTitle: string;
  description: string;
  eyebrow: string;
  reasons: Record<FontKey, string>;
  title: string;
}

interface FontShowcaseProps {
  messages: FontShowcaseMessages;
}

interface FontCardProps {
  className: string;
  name: string;
  reason: string;
  sample: string;
  weights: readonly string[];
}

const FontCard: FC<FontCardProps> = ({ className, name, reason, sample, weights }) => {
  return (
    <article className="rounded-card border border-border-subtle bg-surface p-6 shadow-card">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="font-accent text-accent-s text-foreground">{name}</h3>
          <p className="mt-2 max-w-xl text-m text-muted">{reason}</p>
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
          {weights.join(' / ')}
        </p>
      </div>

      <div className={`${className} mt-6 space-y-4`}>
        {weights.map((weight) => (
          <p
            className="text-accent-l text-foreground sm:text-accent-xl"
            key={weight}
            style={{ fontWeight: Number(weight) }}
          >
            <span className="mr-4 inline-block min-w-14 text-m tracking-normal text-muted">
              {weight}
            </span>
            {sample}
          </p>
        ))}
      </div>
    </article>
  );
};

export const FontShowcase: FC<FontShowcaseProps> = ({ messages }) => {
  return (
    <section className="mx-auto w-full max-w-page px-6 py-12">
      <p className="text-m font-semibold uppercase tracking-[0.3em] text-muted">
        {messages.eyebrow}
      </p>
      <h2 className="mt-4 max-w-3xl font-accent text-accent-l text-foreground sm:text-accent-xl">
        {messages.title}
      </h2>
      <p className="mt-5 max-w-2xl text-l text-muted">{messages.description}</p>

      <div className="mt-10 space-y-10">
        <div>
          <h3 className="font-accent text-accent-m text-foreground">{messages.bodyTitle}</h3>
          <div className="mt-5 grid gap-5">
            {bodyFonts.map((font) => (
              <FontCard
                className={font.className}
                key={font.key}
                name={font.name}
                reason={messages.reasons[font.key]}
                sample={messages.bodySample}
                weights={font.weights}
              />
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-accent text-accent-m text-foreground">{messages.accentTitle}</h3>
          <div className="mt-5 grid gap-5">
            {accentFonts.map((font) => (
              <FontCard
                className={font.className}
                key={font.key}
                name={font.name}
                reason={messages.reasons[font.key]}
                sample={messages.accentSample}
                weights={font.weights}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
