# -*- coding: utf-8 -*-
from pathlib import Path
import re

root = Path(r"C:\Users\victo\Desktop\git\temp\sg-metal-group")

CONTACT = {
  "en": '''  contactPage: {
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
  },
''',
  "ru": '''  contactPage: {
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
  },
''',
  "cs": '''  contactPage: {
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
  },
''',
}

for loc, block in CONTACT.items():
    path = root / f"src/i18n/{loc}.ts"
    text = path.read_text(encoding="utf-8")
    # fix literal \n bug
    text = text.replace("},\\n  footerTitle:", "},\n  footerTitle:")
    # remove form block
    text = re.sub(r"\n  form: \{.*?\n  \},\n", "\n", text, count=1, flags=re.S)
    # remove existing broken/good contactPage
    text = re.sub(r"\n  contactPage: \{.*?\n  \},\n", "\n", text, count=1, flags=re.S)
    if "footerTitle:" not in text:
        raise SystemExit(f"no footerTitle in {loc}")
    text = text.replace("  footerTitle:", block + "  footerTitle:", 1)
    path.write_text(text, encoding="utf-8", newline="\n")
    print(loc, "form" in path.read_text(encoding="utf-8"), "contactPage" in path.read_text(encoding="utf-8"))
    # show snippet around contactPage end
    t = path.read_text(encoding="utf-8")
    i = t.find("contactPage:")
    print(t[i:i+200].replace("\n"," | "))