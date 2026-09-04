import type { Locale } from "../i18n";
import { useI18n } from "../i18n";

const locales: Locale[] = ["en", "cs"];

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n();

  return (
    <div className="lang-switch" role="group" aria-label={t.langLabel}>
      {locales.map((code) => (
        <button
          key={code}
          type="button"
          className={locale === code ? "is-active" : undefined}
          onClick={() => setLocale(code)}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
