import { Link } from "react-router-dom";
import { useI18n } from "../i18n";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Footer } from "./Footer";

export function ContactPage() {
  const { t } = useI18n();
  const cp = t.contactPage;
  const mapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(cp.mapQuery)}`;
  const mapsEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(cp.mapQuery)}&z=12&output=embed`;
  const phoneHref = `tel:${cp.phone.replace(/\s+/g, "")}`;

  return (
    <div className="contact-page" data-theme="dark">
      <header className="contact-page__bar">
        <div className="container contact-page__bar-inner">
          <Logo />
          <nav className="contact-page__nav" aria-label="Primary">
            {t.nav.map((item) =>
              item.id === "contact" ? (
                <span key={item.id} className="is-active">
                  {item.label.split("_").slice(1).join("_").trim() || item.label}
                </span>
              ) : (
                <Link key={item.id} to={{ pathname: "/", hash: item.id }}>
                  {item.label.split("_").slice(1).join("_").trim() || item.label}
                </Link>
              ),
            )}
          </nav>
          <LanguageSwitcher />
        </div>
      </header>

      <main className="contact-page__main">
        <div className="container">
          <p className="contact-page__eyebrow">
            <span />
            {cp.eyebrow}
          </p>
          <h1>{cp.title}</h1>
          <p className="contact-page__subtitle">{cp.subtitle}</p>

          <div className="contact-page__grid">
            <div className="contact-page__cards">
              <article className="contact-card">
                <h2>{cp.addressLabel}</h2>
                <p className="contact-card__kind">{cp.addressKind}</p>
                {cp.addressLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </article>

              <article className="contact-card">
                <h2>{cp.contactLabel}</h2>
                {cp.phone ? (
                  <p>
                    <a href={phoneHref}>{cp.phone}</a>
                  </p>
                ) : null}
                <p>
                  <a href={`mailto:${cp.email}`}>{cp.email}</a>
                </p>
              </article>

              <article className="contact-card">
                <h2>{cp.legalLabel}</h2>
                {cp.legalLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </article>

              <article className="contact-card">
                <h2>{cp.bankLabel}</h2>
                {cp.bankLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </article>
            </div>

            <div className="contact-page__map">
              <a className="contact-page__map-open" href={mapsUrl} target="_blank" rel="noreferrer">
                {cp.mapOpen}
              </a>
              <iframe
                title={cp.mapQuery}
                src={mapsEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </main>

      <Footer showCta={false} />
    </div>
  );
}