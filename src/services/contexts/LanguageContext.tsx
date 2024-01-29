import { createContext, useContext, useEffect, useState } from "react";

import LanguageClass, { LanguageSet } from "../classes/LanguageClass";

type LanguageContextProps = {
  language: LanguageSet;
  changeLanguage: (val: LanguageSet) => void;
  getWord: (val: string) => string;
};
const languageContextInit: LanguageContextProps = {
  language: "en",
  changeLanguage: () => { },
  getWord: () => ""
}
const LanguageContext = createContext(languageContextInit);

interface LanguageProps {
  children: React.ReactNode;
  fallbackWord?: string;
}

export const LanguageProvider = ({ children, fallbackWord = "undefined" }: LanguageProps) => {

  // let languageClass: LanguageClass | null = null;

  const [language, setLanguage] = useState<LanguageSet>("en");
  const [languageClass, setLanguageClass] = useState<LanguageClass | null>(null)

  const changeLanguage = (val: LanguageSet) => {
    if (languageClass !== null)
      setLanguage(languageClass.setLanguage(val));
  };
  const getWord = (val: string): string => {
    if (languageClass !== null) {
      return languageClass.getLanguageWord(val) || fallbackWord;
    }
    return fallbackWord;
  }

  useEffect(() => {
    setLanguageClass(() => {
      const currentLanguageClass = new LanguageClass();
      setLanguage(currentLanguageClass.getLanguage())
      return currentLanguageClass;
    })
  }, [])

  return (
    <LanguageContext.Provider value={{
      language,
      changeLanguage,
      getWord
    }}>
      {children}
    </LanguageContext.Provider>
  );
};
export const useLanguageContext = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('languageContext error');
  }
  return context;
};