import { useState, useEffect, useCallback, useMemo } from 'react';
import { useLibreTranslate } from './useLibreTranslate';

interface TranslatedContentOptions {
  sourceLang?: string;
  enabled?: boolean;
  debounceMs?: number;
}

// Hook for translating single text content
export function useTranslatedText(
  text: string, 
  options: TranslatedContentOptions = {}
) {
  const { sourceLang = 'en', enabled = true, debounceMs = 300 } = options;
  const { translateText, currentLanguage, isTranslating } = useLibreTranslate();
  const [translatedText, setTranslatedText] = useState(text);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedTranslate = useCallback(
    debounce(async (textToTranslate: string) => {
      if (!enabled || !textToTranslate || sourceLang === currentLanguage) {
        setTranslatedText(textToTranslate);
        return;
      }

      setIsLoading(true);
      try {
        const result = await translateText(textToTranslate, sourceLang);
        setTranslatedText(result);
      } catch (error) {
        console.error('Translation error:', error);
        setTranslatedText(textToTranslate); // Fallback to original
      } finally {
        setIsLoading(false);
      }
    }, debounceMs),
    [translateText, sourceLang, currentLanguage, enabled, debounceMs]
  );

  useEffect(() => {
    if (text) {
      debouncedTranslate(text);
    }
  }, [text, debouncedTranslate]);

  return {
    translatedText,
    isLoading: isLoading || isTranslating,
    originalText: text
  };
}

// Hook for translating arrays of content
export function useTranslatedArray<T extends Record<string, any>>(
  items: T[],
  fieldsToTranslate: string[],
  options: TranslatedContentOptions = {}
) {
  const { sourceLang = 'en', enabled = true } = options;
  const { translateBatch, currentLanguage, isTranslating } = useLibreTranslate();
  const [translatedItems, setTranslatedItems] = useState<T[]>(items);
  const [isLoading, setIsLoading] = useState(false);

  const translateItems = useCallback(async () => {
    if (!enabled || !items.length || sourceLang === currentLanguage) {
      setTranslatedItems(items);
      return;
    }

    setIsLoading(true);
    try {
      // Extract all text to translate
      const textsToTranslate: string[] = [];
      const textMap: { itemIndex: number; field: string; textIndex: number }[] = [];

      const getNestedValue = (obj: any, path: string): any => {
        return path.split('.').reduce((current, key) => current?.[key], obj);
      };

      const setNestedValue = (obj: any, path: string, value: any): void => {
        const keys = path.split('.');
        const lastKey = keys.pop()!;
        const target = keys.reduce((current, key) => {
          if (!current[key]) current[key] = {};
          return current[key];
        }, obj);
        target[lastKey] = value;
      };

      items.forEach((item, itemIndex) => {
        fieldsToTranslate.forEach(field => {
          const value = getNestedValue(item, field);
          if (typeof value === 'string' && value.trim()) {
            textMap.push({ itemIndex, field, textIndex: textsToTranslate.length });
            textsToTranslate.push(value);
          } else if (Array.isArray(value)) {
            value.forEach((text, arrayIndex) => {
              if (typeof text === 'string' && text.trim()) {
                textMap.push({ 
                  itemIndex, 
                  field: `${field}[${arrayIndex}]`, 
                  textIndex: textsToTranslate.length 
                });
                textsToTranslate.push(text);
              }
            });
          }
        });
      });

      // Translate all texts in batch
      const translatedTexts = await translateBatch(textsToTranslate, sourceLang);

      // Map translated texts back to items
      const newItems = JSON.parse(JSON.stringify(items)); // Deep clone
      textMap.forEach(({ itemIndex, field, textIndex }) => {
        if (field.includes('[')) {
          // Handle array fields
          const [baseField, indexStr] = field.split('[');
          const arrayIndex = parseInt(indexStr.replace(']', ''));
          const baseValue = getNestedValue(newItems[itemIndex], baseField) || [];
          baseValue[arrayIndex] = translatedTexts[textIndex];
          setNestedValue(newItems[itemIndex], baseField, baseValue);
        } else {
          // Handle nested and simple fields
          setNestedValue(newItems[itemIndex], field, translatedTexts[textIndex]);
        }
      });

      setTranslatedItems(newItems);
    } catch (error) {
      console.error('Batch translation error:', error);
      setTranslatedItems(items); // Fallback to original
    } finally {
      setIsLoading(false);
    }
  }, [items, fieldsToTranslate, translateBatch, sourceLang, currentLanguage, enabled]);

  useEffect(() => {
    translateItems();
  }, [translateItems]);

  return {
    translatedItems,
    isLoading: isLoading || isTranslating,
    originalItems: items
  };
}

// Hook for translating object properties
export function useTranslatedObject<T extends Record<string, any>>(
  obj: T,
  fieldsToTranslate: string[],
  options: TranslatedContentOptions = {}
) {
  const { translatedItems, isLoading, originalItems } = useTranslatedArray(
    [obj],
    fieldsToTranslate,
    options
  );

  return {
    translatedObject: translatedItems[0] || obj,
    isLoading,
    originalObject: obj
  };
}

// Utility debounce function
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}