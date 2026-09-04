import { useI18n } from "../i18n";

export function SectionFinance() {
  const { t } = useI18n();
  return (
    <section className="on-dark" id="finance" data-theme="dark" data-reveal>
      <div className="container">
        <div className="sec-head">
          <p className="small-caps-label">{t.nav[1].label}</p>
          <h2>{t.financeTitle}</h2>
          <p className="soft">{t.financeLead}</p>
        </div>
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
