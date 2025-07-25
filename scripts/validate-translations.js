#!/usr/bin/env node

/**
 * Translation validation script
 * Ensures all translation files have the same keys and structure
 */

const fs = require('fs');
const path = require('path');

const MESSAGES_DIR = path.join(__dirname, '..', 'messages');
const SUPPORTED_LOCALES = ['en', 'ar'];

function loadTranslations(locale) {
  const filePath = path.join(MESSAGES_DIR, `${locale}.json`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Translation file not found: ${filePath}`);
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function getAllKeys(obj, prefix = '') {
  const keys = [];
  
  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      keys.push(...getAllKeys(obj[key], fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  
  return keys;
}

function validateTranslations() {
  console.log('🔍 Validating translations...\n');
  
  const translations = {};
  const allKeys = {};
  
  // Load all translations
  for (const locale of SUPPORTED_LOCALES) {
    try {
      translations[locale] = loadTranslations(locale);
      allKeys[locale] = new Set(getAllKeys(translations[locale]));
      console.log(`✅ Loaded ${locale}.json (${allKeys[locale].size} keys)`);
    } catch (error) {
      console.error(`❌ Error loading ${locale}.json:`, error.message);
      process.exit(1);
    }
  }
  
  console.log('');
  
  // Find missing keys
  let hasErrors = false;
  const baseLocale = 'en';
  const baseKeys = allKeys[baseLocale];
  
  for (const locale of SUPPORTED_LOCALES) {
    if (locale === baseLocale) continue;
    
    const currentKeys = allKeys[locale];
    const missingKeys = [...baseKeys].filter(key => !currentKeys.has(key));
    const extraKeys = [...currentKeys].filter(key => !baseKeys.has(key));
    
    if (missingKeys.length > 0) {
      console.error(`❌ Missing keys in ${locale}.json:`);
      missingKeys.forEach(key => console.error(`   - ${key}`));
      console.log('');
      hasErrors = true;
    }
    
    if (extraKeys.length > 0) {
      console.warn(`⚠️  Extra keys in ${locale}.json:`);
      extraKeys.forEach(key => console.warn(`   - ${key}`));
      console.log('');
    }
    
    if (missingKeys.length === 0 && extraKeys.length === 0) {
      console.log(`✅ ${locale}.json is in sync with ${baseLocale}.json`);
    }
  }
  
  if (hasErrors) {
    console.error('❌ Translation validation failed!');
    process.exit(1);
  } else {
    console.log('🎉 All translations are valid!');
  }
}

function generateMissingKeys() {
  console.log('🔧 Generating missing keys...\n');
  
  const translations = {};
  
  // Load all translations
  for (const locale of SUPPORTED_LOCALES) {
    translations[locale] = loadTranslations(locale);
  }
  
  const baseKeys = getAllKeys(translations.en);
  
  for (const locale of SUPPORTED_LOCALES) {
    if (locale === 'en') continue;
    
    const currentKeys = getAllKeys(translations[locale]);
    const missingKeys = baseKeys.filter(key => !currentKeys.includes(key));
    
    if (missingKeys.length > 0) {
      console.log(`Missing keys for ${locale}:`);
      console.log('Add these to your translation file:\n');
      
      const missingObj = {};
      missingKeys.forEach(key => {
        const parts = key.split('.');
        let current = missingObj;
        
        for (let i = 0; i < parts.length - 1; i++) {
          if (!current[parts[i]]) {
            current[parts[i]] = {};
          }
          current = current[parts[i]];
        }
        
        current[parts[parts.length - 1]] = `[TRANSLATE] ${getNestedValue(translations.en, key)}`;
      });
      
      console.log(JSON.stringify(missingObj, null, 2));
      console.log('\n');
    }
  }
}

function getNestedValue(obj, path) {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}

// CLI interface
const command = process.argv[2];

switch (command) {
  case 'validate':
    validateTranslations();
    break;
  case 'generate':
    generateMissingKeys();
    break;
  default:
    console.log('Usage:');
    console.log('  node scripts/validate-translations.js validate   # Validate translations');
    console.log('  node scripts/validate-translations.js generate   # Generate missing keys');
    break;
}
