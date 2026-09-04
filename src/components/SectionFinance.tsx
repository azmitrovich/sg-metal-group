import { useI18n } from "../i18n";

export function SectionFinance() {
  const { t } = useI18n();

  return (
    <section className="section section--dark" id="finance">
      <div className="wrap">
        <p className="section__eyebrow">{t.nav[1].label}</p>
        <h2 className="section__title">{t.financeTitle}</h2>
        <p className="section__lead">{t.financeLead}</p>
        <div className="feature-grid">
          {t.financeItems.map((item) => (
            <article className="feature" key={item.title}>
              <h3 className="feature__title">{item.title}</h3>
              <p className="feature__text">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
