import { useI18n } from "../i18n";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="site-footer">
      <div className="wrap site-footer__grid">
        <div>
          <h2>{t.footerTitle}</h2>
          <p>{t.footerText}</p>
        </div>
        <div>
          <a className="btn" href="#contact">
            {t.cta} →
          </a>
        </div>
      </div>
      <div className="wrap site-footer__meta">{t.footerMeta}</div>
    </footer>
  );
}
