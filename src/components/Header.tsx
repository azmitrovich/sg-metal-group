import { useI18n } from "../i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Logo";
import { Button009 } from "./Button009";

type Props = {
  open: boolean;
  onToggle: () => void;
  onNavigate: (id: string) => void;
};

export function Header({ open, onToggle, onNavigate }: Props) {
  const { t } = useI18n();

  return (
    <>
      <header className={`site-header${open ? " is-scrolled" : ""}`} data-header>
        <div className="container">
          <Logo />
          <div className="header-tools">
            <LanguageSwitcher />
            <button
              type="button"
              className="burger"
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
      <div className="menu-overlay">
        <nav>
          <ol>
            {t.nav.map((item) => {
              const [idx, ...rest] = item.label.split("_");
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(item.id);
                    }}
                  >
                    <span className="idx">{idx}_</span>
                    <span data-button-animate-chars>{rest.join("_").trim()}</span>
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>
        <div className="menu-cta">
          <Button009
            href="#contact"
            onClick={() => onNavigate("contact")}
          >
            {t.cta}
          </Button009>
        </div>
        <p className="menu-strap">{t.footerTitle}</p>
      </div>
    </>
  );
}
