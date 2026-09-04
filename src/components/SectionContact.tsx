import { useState, type FormEvent } from "react";
import { useI18n } from "../i18n";
import { Button009 } from "./Button009";

export function SectionContact() {
  const { t } = useI18n();
  const [sent, setSent] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <section className="on-putty" id="contact" data-theme="light" data-reveal>
      <div className="container">
        <div className="sec-head">
          <p className="small-caps-label">{t.nav[5].label}</p>
          <h2>{t.contactTitle}</h2>
          <p className="soft">{t.contactLead}</p>
        </div>
        {sent ? (
          <p className="soft">{t.form.success}</p>
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
            <Button009 type="submit">{t.form.submit}</Button009>
          </form>
        )}
      </div>
    </section>
  );
}
