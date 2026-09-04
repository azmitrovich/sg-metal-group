import { useI18n } from "../i18n";
import { Button009 } from "./Button009";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="site-footer" data-theme="dark">
      <div className="container site-footer__grid">
        <div>
          <h2>{t.footerTitle}</h2>
          <p>{t.footerText}</p>
        </div>
        <div>
          <Button009 href="#contact">{t.cta}</Button009>
        </div>
      </div>
      <div className="container site-footer__meta">{t.footerMeta}</div>
    </footer>
  );
}

export function MobileCta() {
  const { t } = useI18n();
  return (
    <div className="mobile-cta">
      <p className="mobile-cta__from">
        {t.stickyLabel}
        <b>{t.brand}</b>
      </p>
      <Button009 href="#contact">{t.cta}</Button009>
    </div>
  );
}
