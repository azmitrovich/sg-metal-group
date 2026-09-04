import { useI18n } from "../i18n";
import { Hero } from "./Hero";

export function Opening() {
  const { t } = useI18n();

  return (
    <div className="opening">
      <div className="opening__media" aria-hidden="true">
        <img className="hero-still" src="/hero.jpg" alt="" />
      </div>
      <Hero />
      {t.bands.map((band) => (
        <section className="band" key={band.claim} data-theme="dark" aria-label={band.label}>
          <div className="container">
            <p className="small-caps-label">{band.label}</p>
            <p className="band__claim" data-scrub-lines>
              {band.claim}
            </p>
            <p className="band__body" data-scrub-lines-soft>
              {band.body}
            </p>
          </div>
        </section>
      ))}
    </div>
  );
}
