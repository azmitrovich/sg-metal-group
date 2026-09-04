import { createContext, useContext } from "react";
import type { Locale, Messages } from "./types";
import { en } from "./en";
import { ru } from "./ru";
import { cs } from "./cs";

export const catalogs: Record<Locale, Messages> = { en, ru, cs };

export const LocaleContext = createContext<{
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Messages;
}>({
  locale: "en",
  setLocale: () => undefined,
  t: en,
});

export function useI18n() {
  return useContext(LocaleContext);
}

export type { Locale, Messages };
