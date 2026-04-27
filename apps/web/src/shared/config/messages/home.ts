import type { AppLocale } from '@/shared/config/i18n';

export interface HomeMessages {
  heroTitle: string;
  heroDescription: string;
  projectsTitle: string;
  creditCalculatorTitle: string;
  creditCalculatorDescription: string;
  creditCalculatorCta: string;
}

export const homeMessages: Record<AppLocale, HomeMessages> = {
  ru: {
    heroTitle: 'Lisichkinx',
    heroDescription: 'Личный каталог полезных цифровых проектов и инструментов.',
    projectsTitle: 'Проекты',
    creditCalculatorTitle: 'Кредитный калькулятор',
    creditCalculatorDescription:
      'Первый инструмент проекта: расчет платежей и сценариев по кредиту.',
    creditCalculatorCta: 'Открыть калькулятор',
  },
  en: {
    heroTitle: 'Lisichkinx',
    heroDescription: 'A personal catalog of useful digital projects and tools.',
    projectsTitle: 'Projects',
    creditCalculatorTitle: 'Credit calculator',
    creditCalculatorDescription:
      'The first project tool: payment and credit scenario calculations.',
    creditCalculatorCta: 'Open calculator',
  },
};
