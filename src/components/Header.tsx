import { useEffect, useState } from "react";
import { useI18n } from "../i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Logo";

type HeaderProps = {
  open: boolean;
  onToggle: () => void;
  onNavigate: (id: string) => void;
};

export function Header({ open, onToggle, onNavigate }: HeaderProps) {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`site-header${scrolled || open ? " is-scrolled" : ""}${open ? " is-open" : ""}`}
      >
        <div className="site-header__inner">
          <Logo />
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <LanguageSwitcher />
            <button
              type="button"
              className="menu-toggle"
              aria-expanded={open}
              aria-label={open ? t.menuClose : t.menuOpen}
              onClick={onToggle}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>
      <nav className={`nav-panel${open ? " is-open" : ""}`} aria-hidden={!open}>
        <ol>
          {t.nav.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(item.id);
                }}
              >
                <span className="nav-panel__index">{item.label.slice(0, 3)}</span>
                <span>{item.label.slice(4)}</span>
              </a>
            </li>
          ))}
        </ol>
        <a
          className="btn"
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            onNavigate("contact");
          }}
        >
          {t.cta} →
        </a>
      </nav>
    </>
  );
}
