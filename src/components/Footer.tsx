import { useNavigate } from "react-router-dom";
import { useI18n } from "../i18n";
import { Button009 } from "./Button009";
import { Logo } from "./Logo";

type FooterProps = {
  showCta?: boolean;
};

export function Footer({ showCta = true }: FooterProps) {
  const { t } = useI18n();
  const navigate = useNavigate();
  return (
    <footer className="site-footer" data-theme="dark">
      <div className="container site-footer__grid">
        <div>
          <Logo className="site-footer__logo" />
          <h2>{t.footerTitle}</h2>
          <p>{t.footerText}</p>
        </div>
        {showCta ? (
          <div>
            <Button009 onClick={() => navigate("/contact")}>{t.cta}</Button009>
          </div>
        ) : null}
      </div>
      <div className="container site-footer__meta">{t.footerMeta}</div>
    </footer>
  );
}

export function MobileCta() {
  const { t } = useI18n();
  const navigate = useNavigate();
  return (
    <div className="mobile-cta">
      <p className="mobile-cta__from">
        {t.stickyLabel}
        <b>{t.brand}</b>
      </p>
      <Button009 onClick={() => navigate("/contact")}>{t.cta}</Button009>
    </div>
  );
}