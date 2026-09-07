import { useNavigate } from "react-router-dom";
import { useI18n } from "../i18n";
import { Button009 } from "./Button009";

export function SectionContact() {
  const { t } = useI18n();
  const navigate = useNavigate();

  return (
    <section className="on-putty" id="contact" data-theme="light" data-reveal>
      <div className="container">
        <div className="sec-head">
          <p className="small-caps-label">{t.nav[5].label}</p>
          <h2>{t.contactTitle}</h2>
          <p className="soft">{t.contactLead}</p>
        </div>
        <Button009 onClick={() => navigate("/contact")}>{t.contactPage.teaserCta}</Button009>
      </div>
    </section>
  );
}