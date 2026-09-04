import { useI18n } from "../i18n";

export function SectionTrade() {
  const { t } = useI18n();

  return (
    <section className="section" id="trade">
      <div className="wrap">
        <p className="section__eyebrow">{t.nav[0].label}</p>
        <h2 className="section__title">{t.tradeTitle}</h2>
        <p className="section__lead">{t.tradeLead}</p>
        <ul className="bullet-list">
          {t.tradeItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
