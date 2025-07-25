import { getRequestConfig } from 'next-intl/server';
import { getUserLocale } from '@/services/locale';
import { type Locale } from '@/lib/locale-config';

export default getRequestConfig(async () => {
  const locale = await getUserLocale();

  try {
    // Dynamic import with better error handling
    const messages = (await import(`../../messages/${locale}.json`)).default;
    
    return {
      locale,
      messages,
      // Enable strict mode for better development experience
      onError: (error) => {
        console.error('Translation error:', error);
      },
      // Provide fallback behavior
      getMessageFallback: ({ namespace, key, error }) => {
        const path = [namespace, key].filter((part) => part != null).join('.');
        console.warn(`Missing translation: ${path} for locale: ${locale}`);
        return key;
      },
    };
  } catch (error) {
    console.error(`Failed to load messages for locale: ${locale}`, error);
    
    // Fallback to English if locale messages fail to load
    const fallbackMessages = (await import(`../../messages/en.json`)).default;
    
    return {
      locale: 'en' as Locale,
      messages: fallbackMessages,
    };
  }
});
