export type Language = 'en' | 'sk';

export const translations: Record<Language, Record<string, string>> = {
  en: {
    "app.name": "KEmunITa",
    "app.title": "KEmunITa - Košice IT community",
  },
  sk: {
    "app.name": "KEmunITa",
    "app.title": "KEmunITa - Košická IT komunita",
    "Events": "Udalosti",
    "Previous": "Predchádzajúcie",
    "Next": "Ďalšie",
    "Read More": "Čítať viac",
    "Read Less": "Čítať menej",
    "No events": "Žiadne udalosti",
    "Updated": "Aktualizované",
  },
};
