"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import es from "./es";
import en from "./en";

export type Lang = "es" | "en";

type Translations = typeof es;

const translations: Record<Lang, any> = { es, en };

interface I18nContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextValue>({
  lang: "es",
  setLang: () => {},
  t: (key: string) => key,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");

  // Cargar preferencia desde localStorage al montar
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("procureai_lang") as Lang | null;
      if (saved && (saved === "es" || saved === "en")) {
        setLangState(saved);
      }
    }
  }, []);

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang);
    if (typeof window !== "undefined") {
      localStorage.setItem("procureai_lang", newLang);
    }
  }, []);

  // Función de traducción con soporte de claves anidadas (ej: "nav.dashboard")
  const t = useCallback(
    (key: string): string => {
      const dict = translations[lang] as Record<string, any>;
      const parts = key.split(".");
      let current: any = dict;

      for (const part of parts) {
        if (current === undefined || current === null) return key;
        current = current[part];
      }

      if (typeof current === "string") return current;
      return key; // Retorna la clave si no encuentra traducción
    },
    [lang]
  );

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

/** Hook principal para usar traducciones en cualquier componente */
export function useTranslation() {
  return useContext(I18nContext);
}

/** Componente toggle de idioma para el header */
export function LanguageToggle({ className = "" }: { className?: string }) {
  const { lang, setLang } = useTranslation();

  return (
    <button
      onClick={() => setLang(lang === "es" ? "en" : "es")}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 hover:bg-white/5 transition-all text-[10px] font-bold uppercase tracking-widest ${className}`}
      title={lang === "es" ? "Switch to English" : "Cambiar a Español"}
    >
      <span className="text-sm">{lang === "es" ? "🇦🇷" : "🇺🇸"}</span>
      <span className="text-foreground/60">{lang === "es" ? "ES" : "EN"}</span>
    </button>
  );
}
