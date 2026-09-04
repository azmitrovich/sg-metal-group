import { useI18n } from "../i18n";

export function SectionLogistics() {
  const { t } = useI18n();

  return (
    <section className="section section--alt" id="logistics">
      <div className="wrap">
        <p className="section__eyebrow">{t.nav[2].label}</p>
        <h2 className="section__title">{t.logisticsTitle}</h2>
        <p className="section__lead">{t.logisticsLead}</p>
        <div className="feature-grid">
          {t.logisticsItems.map((item) => (
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
