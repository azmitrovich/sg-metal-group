import { useI18n } from "../i18n";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Button009 } from "./Button009";

type Props = {
  onNavigate: (id: string) => void;
};

export function SideRail({ onNavigate }: Props) {
  const { t } = useI18n();

  return (
    <aside className="side-rail" data-rail="dark">
      <Logo large />
      <nav className="rail-nav" aria-label="Primary">
        <span className="rail-marker" aria-hidden="true" />
        {t.nav.map((item) => {
          const [idx, ...rest] = item.label.split("_");
          return (
            <a
              key={item.id}
              className="nav-link"
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(item.id);
              }}
            >
              <span className="roll">
                <span className="idx">{idx}_</span>
                <span data-button-animate-chars>{rest.join("_").trim()}</span>
              </span>
            </a>
          );
        })}
      </nav>
      <div className="rail-foot">
        <LanguageSwitcher />
        <span className="rail-foot__rule" />
        <a className="btn-link" href="#contact" onClick={(e) => { e.preventDefault(); onNavigate("contact"); }}>
          <span data-button-animate-chars>{t.cta}</span>
          <svg className="arrow" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </a>
      </div>
    </aside>
  );
}

export function TopCta({ onNavigate }: Props) {
  const { t } = useI18n();
  return (
    <div className="top-cta" data-rail="dark">
      <Button009 href="#contact" onClick={() => onNavigate("contact")}>
        {t.cta}
      </Button009>
    </div>
  );
}
