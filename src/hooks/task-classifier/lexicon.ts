import type { TaskTier } from "./constants"

export type SignalCategory = "verb" | "topic" | "marker" | "phrase"

export type Lang = "en" | "ru" | "any"

export interface Signal {
  text: string
  category: SignalCategory
  lang: Lang
  weight: number
  note?: string
}

export interface TierLexicon {
  tier: TaskTier
  signals: Signal[]
}

export const LEXICON: TierLexicon[] = [
  {
    tier: "quick",
    signals: [
      { text: "typo", category: "topic", lang: "en", weight: 6 },
      { text: "опечатк", category: "topic", lang: "ru", weight: 6, note: "stem: опечатка/опечатки" },
      { text: "rename", category: "verb", lang: "en", weight: 4 },
      { text: "переименуй", category: "verb", lang: "ru", weight: 4 },
      { text: "format", category: "verb", lang: "en", weight: 3 },
      { text: "отформатируй", category: "verb", lang: "ru", weight: 4 },
      { text: "grep", category: "verb", lang: "en", weight: 3 },
      { text: "one-liner", category: "marker", lang: "en", weight: 5 },
      { text: "quick fix", category: "phrase", lang: "en", weight: 6 },
      { text: "поправь", category: "verb", lang: "ru", weight: 4 },
      { text: "замени", category: "verb", lang: "ru", weight: 3 },
      { text: "переделай", category: "verb", lang: "ru", weight: 2 },
      { text: "поменяй", category: "verb", lang: "ru", weight: 3 },
      { text: "убери", category: "verb", lang: "ru", weight: 3 },
      { text: "добавь импорт", category: "phrase", lang: "ru", weight: 4 },
      { text: "удали строку", category: "phrase", lang: "ru", weight: 4 },
    ],
  },
  {
    tier: "deep",
    signals: [
      { text: "analyze", category: "verb", lang: "en", weight: 5 },
      { text: "analyse", category: "verb", lang: "en", weight: 5 },
      { text: "проанализируй", category: "verb", lang: "ru", weight: 5 },
      { text: "анализ", category: "topic", lang: "ru", weight: 4 },
      { text: "explore", category: "verb", lang: "en", weight: 4 },
      { text: "research", category: "verb", lang: "en", weight: 4 },
      { text: "исследуй", category: "verb", lang: "ru", weight: 4 },
      { text: "исследование", category: "topic", lang: "ru", weight: 4 },
      { text: "debug", category: "verb", lang: "en", weight: 5 },
      { text: "дебаг", category: "verb", lang: "ru", weight: 5 },
      { text: "отладь", category: "verb", lang: "ru", weight: 5 },
      { text: "explain", category: "verb", lang: "en", weight: 4 },
      { text: "объясни", category: "verb", lang: "ru", weight: 4 },
      { text: "расскажи", category: "verb", lang: "ru", weight: 3 },
      { text: "почему", category: "marker", lang: "ru", weight: 4 },
      { text: "зачем", category: "marker", lang: "ru", weight: 4 },
      { text: "why", category: "marker", lang: "en", weight: 4 },
      { text: "how does", category: "phrase", lang: "en", weight: 4 },
      { text: "how to", category: "phrase", lang: "en", weight: 3 },
      { text: "как работает", category: "phrase", lang: "ru", weight: 5 },
      { text: "не работает", category: "phrase", lang: "ru", weight: 5 },
      { text: "проверь", category: "verb", lang: "ru", weight: 3 },
      { text: "найди", category: "verb", lang: "ru", weight: 3 },
      { text: "where is", category: "phrase", lang: "en", weight: 3 },
      { text: "compare", category: "verb", lang: "en", weight: 4 },
      { text: "diff between", category: "phrase", lang: "en", weight: 4 },
      { text: "в чём разница", category: "phrase", lang: "ru", weight: 4 },
      { text: "в чем разница", category: "phrase", lang: "ru", weight: 4 },
      { text: "баг", category: "topic", lang: "ru", weight: 4 },
      { text: "bug", category: "topic", lang: "en", weight: 4 },
      { text: "ошибк", category: "topic", lang: "ru", weight: 4, note: "stem: ошибка/ошибки" },
      { text: "error", category: "topic", lang: "en", weight: 3 },
      { text: "stack trace", category: "phrase", lang: "any", weight: 6 },
      { text: "traceback", category: "topic", lang: "any", weight: 6 },
      { text: "падает", category: "verb", lang: "ru", weight: 4 },
      { text: "вылетает", category: "verb", lang: "ru", weight: 4 },
    ],
  },
  {
    tier: "ultrabrain",
    signals: [
      { text: "архитектур", category: "topic", lang: "ru", weight: 8, note: "stem: архитектура/архитектуру" },
      { text: "architecture", category: "topic", lang: "en", weight: 8 },
      { text: "architect", category: "verb", lang: "en", weight: 7 },
      { text: "design system", category: "phrase", lang: "en", weight: 8 },
      { text: "спроектируй", category: "verb", lang: "ru", weight: 8 },
      { text: "перепроектируй", category: "verb", lang: "ru", weight: 8 },
      { text: "rearchitect", category: "verb", lang: "en", weight: 8 },
      { text: "security audit", category: "phrase", lang: "en", weight: 10 },
      { text: "аудит безопасности", category: "phrase", lang: "ru", weight: 10 },
      { text: "threat model", category: "phrase", lang: "en", weight: 8 },
      { text: "модель угроз", category: "phrase", lang: "ru", weight: 8 },
      { text: "formal proof", category: "phrase", lang: "en", weight: 10 },
      { text: "prove that", category: "phrase", lang: "en", weight: 7 },
      { text: "докажи", category: "verb", lang: "ru", weight: 6 },
      { text: "формально", category: "marker", lang: "ru", weight: 5 },
      { text: "теорема", category: "topic", lang: "ru", weight: 6 },
      { text: "лемма", category: "topic", lang: "ru", weight: 6 },
      { text: "доказательство", category: "topic", lang: "ru", weight: 6 },
      { text: "оптимизируй", category: "verb", lang: "ru", weight: 5 },
      { text: "optimize", category: "verb", lang: "en", weight: 5 },
      { text: "optimise", category: "verb", lang: "en", weight: 5 },
      { text: "performance", category: "topic", lang: "en", weight: 4 },
      { text: "benchmark", category: "topic", lang: "en", weight: 4 },
      { text: "race condition", category: "phrase", lang: "any", weight: 9 },
      { text: "deadlock", category: "topic", lang: "any", weight: 9 },
      { text: "memory leak", category: "phrase", lang: "any", weight: 8 },
      { text: "утечка памяти", category: "phrase", lang: "ru", weight: 8 },
      { text: "алгоритм", category: "topic", lang: "ru", weight: 5 },
      { text: "algorithm", category: "topic", lang: "en", weight: 4 },
      { text: "сложность o(", category: "phrase", lang: "ru", weight: 7 },
      { text: "complexity o(", category: "phrase", lang: "en", weight: 7 },
      { text: "distributed system", category: "phrase", lang: "en", weight: 7 },
      { text: "распределённ", category: "topic", lang: "ru", weight: 6, note: "stem: распределённая/ой/ых" },
      { text: "распределенн", category: "topic", lang: "ru", weight: 6, note: "stem: без ё" },
    ],
  },
]
