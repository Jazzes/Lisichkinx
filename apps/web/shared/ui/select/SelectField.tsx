'use client';

import type { FC, ReactNode } from 'react';

import { Select } from '@base-ui/react/select';
import { CheckIcon, ChevronDownIcon } from 'lucide-react';

export interface SelectOption {
  label: ReactNode;
  value: string;
  trailing?: ReactNode;
}

export interface SelectFieldProps {
  label: string;
  onValueChange: (value: string | null) => void;
  options: readonly SelectOption[];
  value: string;
}

export const SelectField: FC<SelectFieldProps> = ({ label, onValueChange, options, value }) => {
  const renderValue = (selectedValue: string | null) => {
    if (selectedValue == null) {
      return null;
    }

    const option = options.find((item) => item.value === selectedValue);

    if (!option) {
      return selectedValue;
    }

    return (
      <span className="inline-flex min-w-0 items-center gap-2">
        <span className="min-w-0">{option.label}</span>
        {option.trailing}
      </span>
    );
  };

  return (
    <Select.Root onValueChange={onValueChange} value={value}>
      <Select.Label className="sr-only">{label}</Select.Label>
      <Select.Trigger className="flex min-h-10 min-w-24 items-center justify-between gap-3 border border-foreground/20 bg-surface px-3 py-2 text-s font-black uppercase tracking-[0.16em] text-foreground shadow-s transition hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent data-popup-open:border-accent data-popup-open:text-accent">
        <Select.Value>{renderValue}</Select.Value>
        <Select.Icon aria-hidden="true" className="shrink-0 text-accent">
          <ChevronDownIcon aria-hidden="true" size={14} strokeWidth={3} />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner className="z-50 outline-none" sideOffset={8}>
          <Select.Popup className="min-w-(--anchor-width) border border-foreground/20 bg-surface p-1 text-foreground shadow-s-accent">
            <Select.List>
              {options.map((option) => (
                <Select.Item
                  className="group flex w-full cursor-default items-center justify-between gap-3 p-2 text-s font-black uppercase tracking-[0.16em] outline-none transition data-highlighted:bg-accent data-highlighted:text-accent-foreground"
                  key={option.value}
                  value={option.value}
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <Select.ItemText className="min-w-0">{option.label}</Select.ItemText>
                    {option.trailing}
                  </span>
                  <span
                    aria-hidden
                    className="flex size-4 shrink-0 items-center justify-center text-accent group-data-highlighted:text-white"
                  >
                    <Select.ItemIndicator>
                      <CheckIcon aria-hidden="true" size={14} strokeWidth={3} />
                    </Select.ItemIndicator>
                  </span>
                </Select.Item>
              ))}
            </Select.List>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
};
