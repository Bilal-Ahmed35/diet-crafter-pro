// Utility functions for handling translation in the app

import translationService from '@/hooks/useLibreTranslate';

/**
 * Batch translate an array of objects with specific fields
 */
export async function translateObjectArray<T extends Record<string, any>>(
  objects: T[],
  fieldsToTranslate: string[],
  targetLang: string,
  sourceLang: string = 'en'
): Promise<T[]> {
  if (sourceLang === targetLang || !objects.length) {
    return objects;
  }

  // Extract all texts to translate
  const textsToTranslate: string[] = [];
  const textMap: { objIndex: number; field: string; textIndex: number }[] = [];

  objects.forEach((obj, objIndex) => {
    fieldsToTranslate.forEach(field => {
      const value = getNestedProperty(obj, field);
      if (typeof value === 'string' && value.trim()) {
        textMap.push({ objIndex, field, textIndex: textsToTranslate.length });
        textsToTranslate.push(value);
      } else if (Array.isArray(value)) {
        value.forEach((item, arrayIndex) => {
          if (typeof item === 'string' && item.trim()) {
            textMap.push({
              objIndex,
              field: `${field}[${arrayIndex}]`,
              textIndex: textsToTranslate.length
            });
            textsToTranslate.push(item);
          }
        });
      }
    });
  });

  // Translate all texts
  const translatedTexts = await translationService.translateBatch(
    textsToTranslate,
    sourceLang,
    targetLang
  );

  // Create new objects with translated content
  const translatedObjects = JSON.parse(JSON.stringify(objects)); // Deep clone

  textMap.forEach(({ objIndex, field, textIndex }) => {
    if (field.includes('[')) {
      // Handle array fields
      const [baseField, indexStr] = field.split('[');
      const arrayIndex = parseInt(indexStr.replace(']', ''));
      const currentArray = getNestedProperty(translatedObjects[objIndex], baseField) || [];
      currentArray[arrayIndex] = translatedTexts[textIndex];
      setNestedProperty(translatedObjects[objIndex], baseField, currentArray);
    } else {
      // Handle regular fields
      setNestedProperty(translatedObjects[objIndex], field, translatedTexts[textIndex]);
    }
  });

  return translatedObjects;
}

/**
 * Translate a single object with specific fields
 */
export async function translateObject<T extends Record<string, any>>(
  obj: T,
  fieldsToTranslate: string[],
  targetLang: string,
  sourceLang: string = 'en'
): Promise<T> {
  const result = await translateObjectArray([obj], fieldsToTranslate, targetLang, sourceLang);
  return result[0];
}

/**
 * Get nested property from object using dot notation
 */
function getNestedProperty(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}

/**
 * Set nested property in object using dot notation
 */
function setNestedProperty(obj: any, path: string, value: any): void {
  const keys = path.split('.');
  const lastKey = keys.pop()!;
  const target = keys.reduce((current, key) => {
    if (!current[key]) current[key] = {};
    return current[key];
  }, obj);
  target[lastKey] = value;
}

/**
 * Check if translation is needed
 */
export function isTranslationNeeded(sourceLang: string, targetLang: string): boolean {
  return sourceLang !== targetLang;
}

/**
 * Extract translatable text from complex objects
 */
export function extractTranslatableText(
  obj: any,
  fieldsToExtract: string[] = []
): { text: string; path: string }[] {
  const texts: { text: string; path: string }[] = [];

  function extractFromObject(current: any, currentPath: string = '') {
    if (typeof current === 'string' && current.trim()) {
      if (fieldsToExtract.length === 0 || fieldsToExtract.some(field => currentPath.includes(field))) {
        texts.push({ text: current, path: currentPath });
      }
    } else if (Array.isArray(current)) {
      current.forEach((item, index) => {
        extractFromObject(item, `${currentPath}[${index}]`);
      });
    } else if (current && typeof current === 'object') {
      Object.entries(current).forEach(([key, value]) => {
        const newPath = currentPath ? `${currentPath}.${key}` : key;
        extractFromObject(value, newPath);
      });
    }
  }

  extractFromObject(obj);
  return texts;
}

/**
 * Create a translation cache key
 */
export function createTranslationCacheKey(
  text: string,
  sourceLang: string,
  targetLang: string
): string {
  return `${sourceLang}:${targetLang}:${text}`;
}

/**
 * Debounce function for translation requests
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Format translation error messages
 */
export function formatTranslationError(error: any): string {
  if (error?.response?.status === 429) {
    return 'Translation rate limit exceeded. Please try again later.';
  }
  if (error?.response?.status === 503) {
    return 'Translation service temporarily unavailable.';
  }
  if (error?.message?.includes('network')) {
    return 'Network error. Please check your connection.';
  }
  return 'Translation failed. Using original text.';
}