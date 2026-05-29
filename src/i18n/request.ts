import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';
import {translations} from '@/data/translations';

export default getRequestConfig(async ({requestLocale}) => {
  let locale = await requestLocale;
  
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }
  
  return {
    locale,
    messages: translations[locale as 'pt' | 'en'] as any
  };
});
