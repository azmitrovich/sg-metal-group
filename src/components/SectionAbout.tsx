import { useI18n } from "../i18n";

export function SectionAbout() {
  const { t } = useI18n();

  return (
    <section className="section section--dark" id="about">
      <div className="wrap">
        <p className="section__eyebrow">{t.nav[4].label}</p>
        <h2 className="section__title">{t.aboutTitle}</h2>
        <p className="section__lead">{t.aboutLead}</p>
        <div className="about-stats">
          {t.aboutPoints.map((point) => (
            <article className="feature" key={point.label}>
              <p className="feature__text">{point.label}</p>
              <h3 className="feature__title">{point.value}</h3>
            </article>
          ))}
        </div>
        <div className="about-block">
          <h2 className="section__title">{t.processTitle}</h2>
          <p className="section__lead">{t.processLead}</p>
          <div className="steps">
            {t.steps.map((step) => (
              <article className="step" key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="about-block">
          <h2 className="section__title">{t.faqTitle}</h2>
          <div className="faq">
            {t.faqs.map((item, index) => (
              <details key={item.q}>
                <summary>
                  <span className="faq__n">{String(index + 1).padStart(2, "0")}</span>
                  {item.q}
                </summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
