import { useState, type FormEvent } from "react";
import { useI18n } from "../i18n";

export function SectionContact() {
  const { t } = useI18n();
  const [sent, setSent] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <section className="section section--alt" id="contact">
      <div className="wrap">
        <p className="section__eyebrow">{t.nav[5].label}</p>
        <h2 className="section__title">{t.contactTitle}</h2>
        <p className="section__lead">{t.contactLead}</p>
        {sent ? (
          <p className="section__lead" style={{ marginTop: "2rem" }}>
            {t.form.success}
          </p>
        ) : (
          <form className="contact-form" onSubmit={onSubmit}>
            <label>
              {t.form.name} *
              <input name="name" required autoComplete="name" />
            </label>
            <label>
              {t.form.company} *
              <input name="company" required autoComplete="organization" />
            </label>
            <label>
              {t.form.email} *
              <input name="email" type="email" required autoComplete="email" />
            </label>
            <label>
              {t.form.message} *
              <textarea name="message" required />
            </label>
            <button className="btn" type="submit">
              {t.form.submit} →
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
