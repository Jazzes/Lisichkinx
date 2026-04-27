import type { AppLocale } from '@/shared/config/i18n';

export interface CalculatorMessages {
  title: string;
  description: string;
  status: string;
}

export const calculatorMessages: Record<AppLocale, CalculatorMessages> = {
  ru: {
    title: 'Кредитный калькулятор',
    description:
      'Здесь появится расчет ежемесячного платежа, переплаты и сценариев досрочного погашения.',
    status: 'Маршрут и архитектурная база готовы. Бизнес-логику добавим следующим шагом.',
  },
  en: {
    title: 'Credit calculator',
    description:
      'Monthly payments, overpayment and early repayment scenarios will be calculated here.',
    status: 'The route and architecture base are ready. Business logic will come next.',
  },
};
