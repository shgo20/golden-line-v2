import { createContext, useContext, useState } from 'react';

function applyLang(lang) {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
}

const LangCtx = createContext({ lang: 'en', switchLang: () => {} });

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem('gl-lang') || 'en';
    applyLang(saved);
    return saved;
  });

  const switchLang = (next) => {
    localStorage.setItem('gl-lang', next);
    applyLang(next);
    setLang(next);
  };

  return (
    <LangCtx.Provider value={{ lang, switchLang }}>
      {children}
    </LangCtx.Provider>
  );
}

export const useLang = () => useContext(LangCtx);
