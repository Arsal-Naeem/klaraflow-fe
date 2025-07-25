'use server';

import { cookies } from 'next/headers';
import { DEFAULT_LOCALE, isValidLocale, type Locale } from '@/lib/locale-config';

/**
 * Gets the user's locale from cookies with fallback
 */
export async function getUserLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const locale = cookieStore.get('locale')?.value;
  
  if (locale && isValidLocale(locale)) {
    return locale;
  }
  
  return DEFAULT_LOCALE;
}

/**
 * Sets the user's locale in cookies
 */
export async function setUserLocale(locale: Locale) {
  if (!isValidLocale(locale)) {
    throw new Error(`Invalid locale: ${locale}`);
  }
  
  const cookieStore = await cookies();
  cookieStore.set('locale', locale, {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 365 * 24 * 60 * 60, // 1 year
  });
}
