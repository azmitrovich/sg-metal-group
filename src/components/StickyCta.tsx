import { useI18n } from "../i18n";

export function StickyCta() {
  const { t } = useI18n();

  return (
    <a className="sticky-cta" href="#contact">
      <strong>{t.stickyLabel}</strong>
      <span className="btn" style={{ padding: "0.55rem 0.95rem" }}>
        {t.cta} →
      </span>
    </a>
  );
}
