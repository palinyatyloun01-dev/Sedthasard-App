
'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, Translation } from '@/lib/translations';

type Language = 'lo' | 'en' | 'zh' | 'vi' | 'th';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  translations: Translation;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('lo');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['lo', 'en', 'zh', 'vi', 'th'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
    setIsMounted(true);
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const value = {
    language,
    setLanguage: handleSetLanguage,
    translations: translations[language],
  };

  if (!isMounted) {
    return null; // or a loading spinner
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
