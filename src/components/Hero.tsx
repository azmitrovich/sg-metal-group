import { useNavigate } from "react-router-dom";
import { useI18n } from "../i18n";
import { Button009 } from "./Button009";

export function Hero() {
  const { t } = useI18n();
  const navigate = useNavigate();

  return (
    <section className="hero" id="top" data-theme="dark">
      <div className="container">
        <p className="hero-eyebrow">
          <span className="hero-eyebrow__dot" aria-hidden="true" />
          <span className="hero-eyebrow__text">{t.heroEyebrow}</span>
        </p>
        <h1>{t.heroTitle}</h1>
        <p className="lede">{t.heroText}</p>
        <div className="hero-ctas">
          <Button009 onClick={() => navigate("/contact")}>{t.cta}</Button009>
          <a className="btn-link" href="#trade">
            <span data-button-animate-chars>{t.ctaSecondary}</span>
            <svg className="arrow" viewBox="0 0 16 16" aria-hidden="true">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </a>
        </div>
      </div>
      <div className="hero-scroll" aria-hidden="true">
        <span>{t.scroll}</span>
        <span className="bar" />
      </div>
    </section>
  );
}
