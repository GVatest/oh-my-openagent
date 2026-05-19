import type { TaskTier } from "./constants"
import { LEXICON, type Signal } from "./lexicon"

export interface SignalHit {
  signal: Signal
  index: number
}

export interface TierScore {
  tier: TaskTier
  score: number
  hits: SignalHit[]
}

export interface MatchResult {
  winner: TaskTier | null
  scores: TierScore[]
}

const TIER_PRIORITY: Record<TaskTier, number> = {
  ultrabrain: 3,
  deep: 2,
  quick: 1,
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

const signalRegexCache = new WeakMap<Signal, RegExp>()

function regexForSignal(signal: Signal): RegExp {
  const cached = signalRegexCache.get(signal)
  if (cached) return cached
  const body = escapeRegex(signal.text)
  const compiled = new RegExp(String.raw`(?:^|\P{L})${body}(?:$|\P{L})`, "iu")
  signalRegexCache.set(signal, compiled)
  return compiled
}

function findSignal(text: string, signal: Signal): number {
  const match = regexForSignal(signal).exec(text)
  if (!match) return -1
  return match.index
}

export function scoreText(rawText: string): MatchResult {
  const text = rawText.toLowerCase()

  const scores: TierScore[] = LEXICON.map(({ tier, signals }) => {
    const hits: SignalHit[] = []
    let total = 0
    for (const signal of signals) {
      const idx = findSignal(text, signal)
      if (idx >= 0) {
        hits.push({ signal, index: idx })
        total += signal.weight
      }
    }
    return { tier, score: total, hits }
  })

  const ranked = [...scores].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score
    return TIER_PRIORITY[b.tier] - TIER_PRIORITY[a.tier]
  })

  const top = ranked[0]
  const winner = top && top.score > 0 ? top.tier : null

  return { winner, scores }
}
