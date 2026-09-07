import { useEffect, useMemo, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
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
import { ContactPage } from "./components/ContactPage";
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

function HomePage({
  menuOpen,
  setMenuOpen,
  navigateSection,
}: {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  navigateSection: (id: string) => void;
}) {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.replace(/^#/, "");
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 80);
  }, [location.hash]);

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
  }, []);

  useEffect(() => {
    const header = document.querySelector("[data-header]");
    const onScroll = () => {
      header?.classList.toggle("is-scrolled", window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <Loader />
      <Header
        open={menuOpen}
        onToggle={() => setMenuOpen(!menuOpen)}
        onNavigate={navigateSection}
      />
      <SideRail onNavigate={navigateSection} />
      <TopCta onNavigate={navigateSection} />
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
    </>
  );
}

export default function App() {
  const [locale, setLocaleState] = useState<Locale>(() => readLocale());
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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
    const pageTitle =
      location.pathname.replace(/\/$/, "").endsWith("/contact")
        ? catalogs[locale].contactPage.eyebrow
        : catalogs[locale].heroTitle;
    document.title = `${catalogs[locale].brand} | ${pageTitle}`;
  }, [locale, location.pathname]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  function navigateSection(id: string) {
    setMenuOpen(false);
    if (id === "contact") {
      navigate("/contact");
      return;
    }
    if (location.pathname.replace(/\/$/, "").endsWith("/contact")) {
      navigate("/");
      window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 50);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  const routedLocation =
    location.pathname.length > 1 && location.pathname.endsWith("/")
      ? { ...location, pathname: location.pathname.replace(/\/+$/, "") }
      : location;

  return (
    <LocaleContext.Provider value={value}>
      <Routes location={routedLocation}>
        <Route
          path="/"
          element={
            <HomePage
              menuOpen={menuOpen}
              setMenuOpen={setMenuOpen}
              navigateSection={navigateSection}
            />
          }
        />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </LocaleContext.Provider>
  );
}