import { useState, useCallback, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface TranslationCache {
  [key: string]: {
    [targetLang: string]: {
      text: string;
      timestamp: number;
    };
  };
}

interface LibreTranslateResponse {
  translatedText: string;
}

class TranslationService {
  private cache: TranslationCache = {};
  private pendingRequests: Map<string, Promise<string>> = new Map();
  private readonly CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours
  private readonly API_ENDPOINT = 'https://libretranslate.de/translate';

  private getCacheKey(text: string, sourceLang: string, targetLang: string): string {
    return `${sourceLang}:${targetLang}:${text}`;
  }

  private isValidCachedTranslation(cached: any): boolean {
    return cached && 
           typeof cached.text === 'string' && 
           Date.now() - cached.timestamp < this.CACHE_EXPIRY;
  }

  async translateText(
    text: string, 
    sourceLang: string = 'en', 
    targetLang: string = 'en'
  ): Promise<string> {
    // Return original text if same language or empty
    if (!text || !text.trim() || sourceLang === targetLang) {
      return text;
    }

    const cacheKey = this.getCacheKey(text, sourceLang, targetLang);

    // Check cache first
    if (this.cache[text]?.[targetLang] && 
        this.isValidCachedTranslation(this.cache[text][targetLang])) {
      return this.cache[text][targetLang].text;
    }

    // Check if request is already pending
    if (this.pendingRequests.has(cacheKey)) {
      return this.pendingRequests.get(cacheKey)!;
    }

    // Create new translation request
    const translationPromise = this.performTranslation(text, sourceLang, targetLang);
    this.pendingRequests.set(cacheKey, translationPromise);

    try {
      const result = await translationPromise;
      
      // Cache the result
      if (!this.cache[text]) {
        this.cache[text] = {};
      }
      this.cache[text][targetLang] = {
        text: result,
        timestamp: Date.now()
      };

      return result;
    } catch (error) {
      console.error('Translation failed:', error);
      return text; // Return original text on error
    } finally {
      this.pendingRequests.delete(cacheKey);
    }
  }

  private async performTranslation(
    text: string, 
    sourceLang: string, 
    targetLang: string
  ): Promise<string> {
    const response = await fetch(this.API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text,
        source: sourceLang,
        target: targetLang,
        format: 'text'
      }),
    });

    if (!response.ok) {
      throw new Error(`Translation API error: ${response.status}`);
    }

    const data: LibreTranslateResponse = await response.json();
    return data.translatedText || text;
  }

  async translateBatch(
    texts: string[], 
    sourceLang: string = 'en', 
    targetLang: string = 'en'
  ): Promise<string[]> {
    const promises = texts.map(text => this.translateText(text, sourceLang, targetLang));
    return Promise.all(promises);
  }

  clearCache(): void {
    this.cache = {};
    this.pendingRequests.clear();
  }

  getCacheSize(): number {
    return Object.keys(this.cache).length;
  }
}

// Singleton instance
const translationService = new TranslationService();

export function useLibreTranslate() {
  const { language } = useLanguage();
  const [isTranslating, setIsTranslating] = useState(false);
  const translationQueue = useRef<Map<string, { resolve: Function; reject: Function }>>(new Map());

  const translateText = useCallback(async (
    text: string, 
    sourceLang: string = 'en'
  ): Promise<string> => {
    if (!text || !text.trim()) return text;

    setIsTranslating(true);
    try {
      const result = await translationService.translateText(text, sourceLang, language);
      return result;
    } finally {
      setIsTranslating(false);
    }
  }, [language]);

  const translateBatch = useCallback(async (
    texts: string[], 
    sourceLang: string = 'en'
  ): Promise<string[]> => {
    if (!texts.length) return texts;

    setIsTranslating(true);
    try {
      const results = await translationService.translateBatch(texts, sourceLang, language);
      return results;
    } finally {
      setIsTranslating(false);
    }
  }, [language]);

  const clearTranslationCache = useCallback(() => {
    translationService.clearCache();
  }, []);

  const getCacheInfo = useCallback(() => {
    return {
      size: translationService.getCacheSize(),
      currentLanguage: language
    };
  }, [language]);

  return {
    translateText,
    translateBatch,
    isTranslating,
    clearTranslationCache,
    getCacheInfo,
    currentLanguage: language
  };
}

export default translationService;