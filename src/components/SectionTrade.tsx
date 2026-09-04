import { useI18n } from "../i18n";

export function SectionTrade() {
  const { t } = useI18n();
  return (
    <section className="section" id="trade" data-theme="light" data-reveal>
      <div className="guides" aria-hidden="true">
        <div className="guides__inner">
          <span /><span /><span /><span />
        </div>
      </div>
      <div className="container">
        <div className="sec-head">
          <p className="small-caps-label">{t.nav[0].label}</p>
          <h2>{t.tradeTitle}</h2>
          <p className="soft">{t.tradeLead}</p>
        </div>
        <ul className="bullet-list">
          {t.tradeItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
