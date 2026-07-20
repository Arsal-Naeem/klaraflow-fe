import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async () => {
  const messages = {
    askKlara: (await import('../../messages/en/askKlara.json')).default,
    authentication: (await import('../../messages/en/authentication.json')).default,
    breadcrumbs: (await import('../../messages/en/breadcrumbs.json')).default,
    common: (await import('../../messages/en/common.json')).default,
    dashboard: (await import('../../messages/en/dashboard.json')).default,
    errors: (await import('../../messages/en/errors.json')).default,
    forms: (await import('../../messages/en/forms.json')).default,
    navigation: (await import('../../messages/en/navigation.json')).default,
    onboarding: (await import('../../messages/en/onboarding.json')).default,
    settings: (await import('../../messages/en/settings.json')).default,
    sidebar: (await import('../../messages/en/sidebar.json')).default,
    user: (await import('../../messages/en/user.json')).default,
  };

  return {
    locale: 'en',
    messages
  };
});