import { useI18n } from "../i18n";

export function SectionLogistics() {
  const { t } = useI18n();
  return (
    <section className="on-putty" id="logistics" data-theme="light" data-reveal>
      <div className="container">
        <div className="sec-head">
          <p className="small-caps-label">{t.nav[2].label}</p>
          <h2>{t.logisticsTitle}</h2>
          <p className="soft">{t.logisticsLead}</p>
        </div>
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
