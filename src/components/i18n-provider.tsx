"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Locale = "en" | "cs";
export type LocalizedText = Record<Locale, string>;

type I18nContextValue = {
  locale: Locale;
  numberLocale: "en-US" | "cs-CZ";
  setLocale: (locale: Locale) => void;
};

const STORAGE_KEY = "casta_locale";
const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const browserLocale = window.navigator.language.toLowerCase();
    const initial: Locale = stored === "cs" || stored === "en"
      ? stored
      : browserLocale.startsWith("cs")
        ? "cs"
        : "en";

    queueMicrotask(() => setLocaleState(initial));
    document.documentElement.lang = initial;
  }, []);

  const setLocale = useCallback((nextLocale: Locale) => {
    setLocaleState(nextLocale);
    window.localStorage.setItem(STORAGE_KEY, nextLocale);
    document.cookie = `casta_locale=${nextLocale}; path=/; max-age=31536000; samesite=lax`;
    document.documentElement.lang = nextLocale;
  }, []);

  const value = useMemo<I18nContextValue>(() => ({
    locale,
    numberLocale: locale === "cs" ? "cs-CZ" : "en-US",
    setLocale,
  }), [locale, setLocale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n must be used within I18nProvider");
  return context;
}

export function localize(text: LocalizedText, locale: Locale) {
  return text[locale];
}
