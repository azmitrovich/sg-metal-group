import { useEffect, useMemo, useState } from "react";
import { catalogs, LocaleContext, type Locale } from "./i18n";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { SectionTrade } from "./components/SectionTrade";
import { SectionFinance } from "./components/SectionFinance";
import { SectionLogistics } from "./components/SectionLogistics";
import { SectionSustainability } from "./components/SectionSustainability";
import { SectionAbout } from "./components/SectionAbout";
import { SectionContact } from "./components/SectionContact";
import { Footer } from "./components/Footer";
import { StickyCta } from "./components/StickyCta";

function readLocale(): Locale {
  const saved = localStorage.getItem("sg-locale");
  if (saved === "en" || saved === "ru" || saved === "cs") return saved;
  const lang = navigator.language.slice(0, 2);
  if (lang === "ru" || lang === "cs") return lang;
  return "en";
}

export default function App() {
  const [locale, setLocaleState] = useState<Locale>(() => readLocale());
  const [menuOpen, setMenuOpen] = useState(false);

  const value = useMemo(
    () => ({
      locale,
      setLocale: (next: Locale) => {
        localStorage.setItem("sg-locale", next);
        setLocaleState(next);
        document.documentElement.lang = next;
      },
      t: catalogs[locale],
    }),
    [locale],
  );

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = `${catalogs[locale].brand} | ${catalogs[locale].heroTitle}`;
  }, [locale]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  function navigate(id: string) {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <LocaleContext.Provider value={value}>
      <Header
        open={menuOpen}
        onToggle={() => setMenuOpen((v) => !v)}
        onNavigate={navigate}
      />
      <main>
        <Hero />
        <SectionTrade />
        <SectionFinance />
        <SectionLogistics />
        <SectionSustainability />
        <SectionAbout />
        <SectionContact />
      </main>
      <Footer />
      <StickyCta />
    </LocaleContext.Provider>
  );
}
