# -*- coding: utf-8 -*-
from pathlib import Path
import re

root = Path(r"C:\Users\victo\Desktop\git\temp\sg-metal-group")

# --- types.ts ---
(root / "src/i18n/types.ts").write_text("""export type Locale = \"en\" | \"ru\" | \"cs\";

export type Messages = {
  brand: string;
  nav: { id: string; label: string }[];
  cta: string;
  ctaSecondary: string;
  heroEyebrow: string;
  heroTitle: string;
  heroText: string;
  scroll: string;
  bands: { label: string; claim: string; body: string }[];
  tradeTitle: string;
  tradeLead: string;
  tradeItems: string[];
  financeTitle: string;
  financeLead: string;
  financeItems: { title: string; text: string }[];
  logisticsTitle: string;
  logisticsLead: string;
  logisticsItems: { title: string; text: string }[];
  sustainTitle: string;
  sustainLead: string;
  sustainItems: string[];
  aboutTitle: string;
  aboutLead: string;
  aboutPoints: { label: string; value: string }[];
  processTitle: string;
  processLead: string;
  steps: { title: string; text: string }[];
  faqTitle: string;
  faqs: { q: string; a: string }[];
  contactTitle: string;
  contactLead: string;
  contactPage: {
    eyebrow: string;
    title: string;
    subtitle: string;
    addressLabel: string;
    addressKind: string;
    addressLines: string[];
    contactLabel: string;
    phone: string;
    email: string;
    emailNote: string;
    legalLabel: string;
    legalLines: string[];
    bankLabel: string;
    bankLines: string[];
    mapOpen: string;
    mapQuery: string;
    teaserCta: string;
  };
  footerTitle: string;
  footerText: string;
  footerMeta: string;
  stickyLabel: string;
  menuOpen: string;
  menuClose: string;
  langLabel: string;
};
""", encoding="utf-8", newline="\n")
print("types ok")

def patch_locale(path: Path, contact_page_block: str, contact_title: str | None = None, contact_lead: str | None = None):
    text = path.read_text(encoding="utf-8")
    # Remove form block
    text = re.sub(r"\n  form: \\{.*?\\},\\n", "\\n", text, count=1, flags=re.S)
    # Insert contactPage before footerTitle
    if "contactPage:" not in text:
        text = text.replace(
            "  footerTitle:",
            contact_page_block + "\\n  footerTitle:",
            1,
        )
    if contact_title:
        text = re.sub(r"contactTitle: \".*?\",", f'contactTitle: "{contact_title}",', text, count=1)
    if contact_lead:
        text = re.sub(
            r"contactLead:\\n    \".*?\",",
            f'contactLead:\\n    "{contact_lead}",',
            text,
            count=1,
            flags=re.S,
        )
    path.write_text(text, encoding="utf-8", newline="\n")
    print("patched", path.name)

en_block = '''  contactPage: {
    eyebrow: "Contact",
    title: "SG Metal Group",
    subtitle: "Registered office, contact details and map.",
    addressLabel: "Address",
    addressKind: "Registered office / Postal",
    addressLines: [
      "SG Metal Group",
      "European Union desk",
      "Czech Republic",
    ],
    contactLabel: "Contact",
    phone: "+420 000 000 000",
    email: "trade@sgmetalgroup.com",
    emailNote: "Trade desk",
    legalLabel: "Legal",
    legalLines: [
      "SG Metal Group",
      "Company details on request",
    ],
    bankLabel: "Bank details",
    bankLines: [
      "Shared on confirmed enquiry",
    ],
    mapOpen: "Open in Maps",
    mapQuery: "Prague, Czech Republic",
    teaserCta: "Open contact page",
  },'''

ru_block = '''  contactPage: {
    eyebrow: "Контакты",
    title: "SG Metal Group",
    subtitle: "Юридический адрес, контакты и карта.",
    addressLabel: "Адрес",
    addressKind: "Юридический / почтовый",
    addressLines: [
      "SG Metal Group",
      "European Union desk",
      "Чехия",
    ],
    contactLabel: "Связь",
    phone: "+420 000 000 000",
    email: "trade@sgmetalgroup.com",
    emailNote: "Trade desk",
    legalLabel: "Реквизиты",
    legalLines: [
      "SG Metal Group",
      "Полные реквизиты по запросу",
    ],
    bankLabel: "Банковские реквизиты",
    bankLines: [
      "Предоставляем после подтверждения запроса",
    ],
    mapOpen: "Открыть в Maps",
    mapQuery: "Prague, Czech Republic",
    teaserCta: "Открыть страницу контактов",
  },'''

cs_block = '''  contactPage: {
    eyebrow: "Kontakt",
    title: "SG Metal Group",
    subtitle: "Sídlo, kontaktní údaje a mapa.",
    addressLabel: "Adresa",
    addressKind: "Sídlo / korespondenční",
    addressLines: [
      "SG Metal Group",
      "European Union desk",
      "Česká republika",
    ],
    contactLabel: "Kontakt",
    phone: "+420 000 000 000",
    email: "trade@sgmetalgroup.com",
    emailNote: "Obchodní desk",
    legalLabel: "Právní údaje",
    legalLines: [
      "SG Metal Group",
      "Údaje na vyžádání",
    ],
    bankLabel: "Bankovní spojení",
    bankLines: [
      "Pošleme po potvrzení poptávky",
    ],
    mapOpen: "Otevřít v Maps",
    mapQuery: "Prague, Czech Republic",
    teaserCta: "Otevřít kontaktní stránku",
  },'''

patch_locale(root / "src/i18n/en.ts", en_block)
patch_locale(root / "src/i18n/ru.ts", ru_block)
patch_locale(root / "src/i18n/cs.ts", cs_block)
print("locales done")