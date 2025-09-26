import { getRequestConfig } from 'next-intl/server';
import { getUserLocale } from '@/services/locale';
import { type Locale } from '@/lib/locale-config';
import fs from 'fs';
import path from 'path';

export default getRequestConfig(async () => {
  const locale = await getUserLocale();

  try {
    // Server-side: prefer reading namespaced JSON files from the messages/<locale>/ folder
    try {
      const messagesDir = path.resolve(process.cwd(), 'messages', locale);
      let messages: Record<string, any> = {};

      if (fs.existsSync(messagesDir) && fs.statSync(messagesDir).isDirectory()) {
        const files = fs.readdirSync(messagesDir).filter((f) => f.endsWith('.json'));

        for (const file of files) {
          try {
            const namespace = path.basename(file, '.json');
            const filePath = path.join(messagesDir, file);
            const raw = fs.readFileSync(filePath, 'utf8');
            const parsed = JSON.parse(raw);
            // Assign under namespace key so consumers can access t('dashboard.welcome')
            messages[namespace] = parsed;
          } catch (err) {
            console.warn(`Failed to parse messages file: ${file} for locale ${locale}`, err);
          }
        }
      }

      // If we found any namespace files, return the merged namespaced messages
      if (Object.keys(messages).length > 0) {
        return {
          locale,
          messages,
          onError: (error) => {
            console.error('Translation error:', error);
          },
          getMessageFallback: ({ namespace, key, error }) => {
            const pathStr = [namespace, key].filter((part) => part != null).join('.');
            console.warn(`Missing translation: ${pathStr} for locale: ${locale}`);
            return key;
          },
        };
      }

      // Otherwise fall back to single-file import (legacy format)
      const fallbackPath = path.resolve(process.cwd(), 'messages', `${locale}.json`);
      let fallbackMessages: Record<string, any> = {};

      try {
        if (fs.existsSync(fallbackPath)) {
          const raw = fs.readFileSync(fallbackPath, 'utf8');
          fallbackMessages = JSON.parse(raw);
        } else {
          console.warn(`Fallback messages file not found: ${fallbackPath}`);
        }
      } catch (err) {
        console.error(`Failed to read fallback messages for locale ${locale} at ${fallbackPath}`, err);
      }

      return {
        locale,
        messages: fallbackMessages,
        onError: (error) => {
          console.error('Translation error:', error);
        },
        getMessageFallback: ({ namespace, key, error }) => {
          const pathStr = [namespace, key].filter((part) => part != null).join('.');
          console.warn(`Missing translation: ${pathStr} for locale: ${locale}`);
          return key;
        },
      };
    } catch (e) {
      console.error('Failed to load namespaced messages', e);
      // If everything fails, fall through to outer catch which returns English fallback
      throw e;
    }
  } catch (error) {
    console.error(`Failed to load messages for locale: ${locale}`, error);
    
    // Fallback to English if locale messages fail to load
    const engPath = path.resolve(process.cwd(), 'messages', 'en.json');
    let fallbackMessages: Record<string, any> = {};

    try {
      if (fs.existsSync(engPath)) {
        const raw = fs.readFileSync(engPath, 'utf8');
        fallbackMessages = JSON.parse(raw);
      } else {
        console.error(`English fallback messages not found at ${engPath}`);
      }
    } catch (err) {
      console.error(`Failed to read English fallback messages at ${engPath}`, err);
    }

    return {
      locale: 'en' as Locale,
      messages: fallbackMessages,
    };
  }
});
