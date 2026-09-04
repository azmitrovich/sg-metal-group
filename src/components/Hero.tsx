import { useI18n } from "../i18n";

export function Hero() {
  const { t } = useI18n();

  return (
    <section className="hero" id="top" aria-label={t.brand}>
      <div className="hero__bg" aria-hidden="true" />
      <div className="hero__content">
        <p className="section__eyebrow">{t.heroEyebrow}</p>
        <h1 className="hero__title">{t.heroTitle}</h1>
        <p className="hero__text">{t.heroText}</p>
        <div className="link-row">
          <a className="btn" href="#contact">
            {t.cta} →
          </a>
          <a className="btn btn--ghost" href="#trade">
            {t.ctaSecondary}
          </a>
        </div>
      </div>
      <span className="hero__scroll">{t.scroll}</span>
    </section>
  );
}
