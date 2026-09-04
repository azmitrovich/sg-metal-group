import { useI18n } from "../i18n";

export function SectionSustainability() {
  const { t } = useI18n();
  return (
    <section id="sustainability" data-theme="light" data-reveal>
      <div className="container">
        <div className="sec-head">
          <p className="small-caps-label">{t.nav[3].label}</p>
          <h2>{t.sustainTitle}</h2>
          <p className="soft">{t.sustainLead}</p>
        </div>
        <ul className="bullet-list">
          {t.sustainItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
