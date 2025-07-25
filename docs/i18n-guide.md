# Multi-Language Support (i18n) System

This project uses **next-intl** for comprehensive internationalization support with Arabic and English languages. The system is designed to be scalable and developer-friendly.

## 🌍 Supported Languages

- **English (en)** - Left-to-right (LTR)
- **Arabic (ar)** - Right-to-left (RTL)

## 📁 File Structure

```
src/
├── i18n/
│   └── request.ts          # Next-intl configuration
├── lib/
│   └── i18n.ts            # i18n utilities and types
├── services/
│   └── locale.ts          # Locale management
├── hooks/
│   ├── use-i18n.ts        # Enhanced i18n hook
│   └── use-language-navigation.ts  # Language switching
├── stores/
│   └── language-store.ts   # Zustand language state
├── types/
│   └── global.d.ts        # Type declarations
└── messages/
    ├── en.json            # English translations
    └── ar.json            # Arabic translations
```

## 🚀 Basic Usage

### Using Translations

```tsx
import { useTranslations } from 'next-intl';

function MyComponent() {
  const t = useTranslations();
  
  return (
    <div>
      <h1>{t('navigation.dashboard')}</h1>
      <p>{t('common.loading')}</p>
    </div>
  );
}
```

### Using Enhanced i18n Hook

```tsx
import { useI18n } from '@/hooks/use-i18n';

function MyComponent() {
  const { t, locale, isRTL, formatDate, tCommon } = useI18n();
  
  return (
    <div className={isRTL ? 'text-right' : 'text-left'}>
      <h1>{t('navigation.dashboard')}</h1>
      <p>{tCommon('loading')}</p>
      <span>{formatDate(new Date())}</span>
    </div>
  );
}
```

### Language Switching

```tsx
import { useLanguageNavigation } from '@/hooks/use-language-navigation';

function LanguageSwitcher() {
  const { locale, changeLanguage, isPending } = useLanguageNavigation();
  
  return (
    <button 
      onClick={() => changeLanguage(locale === 'en' ? 'ar' : 'en')}
      disabled={isPending}
    >
      Switch to {locale === 'en' ? 'Arabic' : 'English'}
    </button>
  );
}
```

## 🎨 RTL Support

The system automatically handles RTL layout for Arabic:

### Automatic RTL Classes

```tsx
import { useI18n } from '@/hooks/use-i18n';

function MyComponent() {
  const { isRTL, rtlClass } = useI18n();
  
  return (
    <div className={rtlClass('flex items-center', 'flex-row-reverse')}>
      <span className={isRTL ? 'ml-2' : 'mr-2'}>Icon</span>
      Text content
    </div>
  );
}
```

### Direction-Aware Spacing

```tsx
import { useI18n } from '@/hooks/use-i18n';

function MyComponent() {
  const { ml, mr } = useI18n();
  
  return (
    <div className={`${ml('4')} ${mr('2')}`}>
      Content with proper margins
    </div>
  );
}
```

## 📝 Adding New Translations

### 1. Update Message Files

Add new keys to both `messages/en.json` and `messages/ar.json`:

```json
// messages/en.json
{
  "newSection": {
    "title": "New Section",
    "description": "This is a new section"
  }
}

// messages/ar.json
{
  "newSection": {
    "title": "قسم جديد",
    "description": "هذا قسم جديد"
  }
}
```

### 2. Update Type Definitions

Add the new keys to `TranslationStructure` in `src/lib/i18n.ts`:

```typescript
export interface TranslationStructure {
  // ... existing types
  newSection: {
    title: string;
    description: string;
  };
}
```

### 3. Use in Components

```tsx
const t = useTranslations('newSection');

return (
  <div>
    <h1>{t('title')}</h1>
    <p>{t('description')}</p>
  </div>
);
```

## 🔧 Adding New Languages

### 1. Update Locale Configuration

Add the new locale to `src/services/locale.ts`:

```typescript
export const SUPPORTED_LOCALES = ['en', 'ar', 'fr'] as const; // Add 'fr'

export const LOCALE_CONFIG = {
  // ... existing configs
  fr: {
    name: 'French',
    nativeName: 'Français',
    direction: 'ltr' as const,
    flag: '🇫🇷',
    dateFormat: 'dd/MM/yyyy',
    timeFormat: '24h' as const,
  },
} as const;
```

### 2. Create Message File

Create `messages/fr.json` with all translation keys.

### 3. Update Language Toggle

The language toggle will automatically pick up new languages from the configuration.

## 📊 Formatting Utilities

### Date and Time

```tsx
import { useI18n } from '@/hooks/use-i18n';

function DateDisplay() {
  const { formatDate, formatTime } = useI18n();
  const now = new Date();
  
  return (
    <div>
      <p>Date: {formatDate(now)}</p>
      <p>Time: {formatTime(now)}</p>
    </div>
  );
}
```

### Numbers and Currency

```tsx
import { useI18n } from '@/hooks/use-i18n';

function PriceDisplay({ amount }: { amount: number }) {
  const { formatCurrency, formatNumber } = useI18n();
  
  return (
    <div>
      <p>Price: {formatCurrency(amount, 'USD')}</p>
      <p>Quantity: {formatNumber(amount)}</p>
    </div>
  );
}
```

## 🎯 Best Practices

### 1. Namespace Your Translations

Use namespaces for better organization:

```tsx
const tCommon = useTranslations('common');
const tNavigation = useTranslations('navigation');
```

### 2. Use Type-Safe Keys

The system provides full TypeScript support for translation keys:

```tsx
// ✅ Type-safe - will show autocomplete
t('common.loading')

// ❌ Type error - will be caught at compile time
t('common.nonExistentKey')
```

### 3. Handle Pluralization

For pluralization, use next-intl's built-in support:

```json
{
  "items": {
    "zero": "No items",
    "one": "One item",
    "other": "{count} items"
  }
}
```

```tsx
t('items', { count: itemCount })
```

### 4. Use Rich Text When Needed

```json
{
  "welcome": "Welcome <bold>{name}</bold>!"
}
```

```tsx
t.rich('welcome', { 
  name: user.name,
  bold: (chunks) => <strong>{chunks}</strong>
})
```

## 🐛 Troubleshooting

### Missing Translation Warnings

The system will log warnings for missing translations and provide fallbacks:

```
Warning: Missing translation: navigation.newPage for locale: ar
```

### RTL Layout Issues

If you encounter RTL layout issues:

1. Use the provided RTL utilities (`isRTL`, `rtlClass`)
2. Check for hardcoded directional classes
3. Use logical properties when possible (`margin-inline-start` vs `margin-left`)

### Type Errors

If you encounter TypeScript errors:

1. Ensure all translation keys exist in both language files
2. Update the `TranslationStructure` interface
3. Restart the TypeScript server