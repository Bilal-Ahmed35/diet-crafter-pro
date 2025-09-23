import React, { createContext, useContext, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLibreTranslate } from '@/hooks/useLibreTranslate';

interface TranslationContextType {
  translateText: (text: string, sourceLang?: string) => Promise<string>;
  translateBatch: (texts: string[], sourceLang?: string) => Promise<string[]>;
  isTranslating: boolean;
  currentLanguage: string;
  clearCache: () => void;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}

export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const { language } = useLanguage();
  const { 
    translateText, 
    translateBatch, 
    isTranslating, 
    clearTranslationCache, 
    currentLanguage 
  } = useLibreTranslate();

  const translate = useCallback(async (text: string, sourceLang: string = 'en') => {
    return translateText(text, sourceLang);
  }, [translateText]);

  const translateMultiple = useCallback(async (texts: string[], sourceLang: string = 'en') => {
    return translateBatch(texts, sourceLang);
  }, [translateBatch]);

  const value = {
    translateText: translate,
    translateBatch: translateMultiple,
    isTranslating,
    currentLanguage,
    clearCache: clearTranslationCache
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
}

// Hook for components that need to translate content manually
export function useManualTranslation() {
  const { translateText, currentLanguage } = useTranslation();
  
  const translateIfNeeded = useCallback(async (
    text: string, 
    sourceLang: string = 'en'
  ): Promise<string> => {
    if (sourceLang === currentLanguage || !text?.trim()) {
      return text;
    }
    return translateText(text, sourceLang);
  }, [translateText, currentLanguage]);

  return {
    translateIfNeeded,
    currentLanguage,
    isTranslationNeeded: (sourceLang: string = 'en') => sourceLang !== currentLanguage
  };
}