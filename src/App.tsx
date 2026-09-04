import { useEffect, useMemo, useState } from "react";
import { catalogs, LocaleContext, type Locale } from "./i18n";
import { Header } from "./components/Header";
import { SideRail, TopCta } from "./components/SideRail";
import { Opening } from "./components/Opening";
import { SectionTrade } from "./components/SectionTrade";
import { SectionFinance } from "./components/SectionFinance";
import { SectionLogistics } from "./components/SectionLogistics";
import { SectionSustainability } from "./components/SectionSustainability";
import { SectionAbout } from "./components/SectionAbout";
import { SectionContact } from "./components/SectionContact";
import { Footer, MobileCta } from "./components/Footer";
import { Loader } from "./components/Loader";
import { initLenis, initAnimateChars, initReveals } from "./effects/scroll";
import { initScrubLines } from "./effects/scrub";
import {
  runLoader,
  initRailTheme,
  initRailMarker,
  initMobileCta,
} from "./effects/chrome";

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
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  useEffect(() => {
    const header = document.querySelector("[data-header]");
    const onScroll = () => {
      header?.classList.toggle("is-scrolled", window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let cleanups: Array<() => void> = [];
    let lenis: { destroy: () => void } | null = null;

    runLoader(() => {
      lenis = initLenis();
      initAnimateChars();
      initScrubLines();
      cleanups = [
        initReveals(),
        initRailTheme(),
        initRailMarker(),
        initMobileCta(),
      ];
    });

    return () => {
      cleanups.forEach((fn) => fn());
      lenis?.destroy();
    };
  }, [locale]);

  function navigate(id: string) {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <LocaleContext.Provider value={value}>
      <Loader />
      <Header
        open={menuOpen}
        onToggle={() => setMenuOpen((v) => !v)}
        onNavigate={navigate}
      />
      <SideRail onNavigate={navigate} />
      <TopCta onNavigate={navigate} />
      <main>
        <Opening />
        <SectionTrade />
        <SectionFinance />
        <SectionLogistics />
        <SectionSustainability />
        <SectionAbout />
        <SectionContact />
      </main>
      <Footer />
      <MobileCta />
    </LocaleContext.Provider>
  );
}
