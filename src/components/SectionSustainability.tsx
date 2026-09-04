import { useI18n } from "../i18n";

export function SectionSustainability() {
  const { t } = useI18n();

  return (
    <section className="section" id="sustainability">
      <div className="wrap">
        <p className="section__eyebrow">{t.nav[3].label}</p>
        <h2 className="section__title">{t.sustainTitle}</h2>
        <p className="section__lead">{t.sustainLead}</p>
        <ul className="bullet-list">
          {t.sustainItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
