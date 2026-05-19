import {
  DEFAULT_FALLBACK_MODELS,
  DEFAULT_MODEL,
  DEFAULT_TIER,
  TASK_CLASSIFIERS,
} from "./constants"
import type { ModelRef, TaskTier } from "./constants"
import { scoreText, type TierScore } from "./matcher"

export interface ClassifyResult {
  tier: TaskTier
  model: ModelRef
  fallbackModels: ModelRef[]
  scores: TierScore[]
  matched: boolean
}

function stripCodeFences(text: string): string {
  return text
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]+`/g, " ")
    .trim()
}

function classifierFor(tier: TaskTier) {
  const found = TASK_CLASSIFIERS.find((c) => c.tier === tier)
  if (!found) {
    return { model: DEFAULT_MODEL, fallbackModels: DEFAULT_FALLBACK_MODELS }
  }
  return { model: found.model, fallbackModels: found.fallbackModels }
}

export function classifyTask(text: string): ClassifyResult {
  const cleaned = stripCodeFences(text)
  const { winner, scores } = scoreText(cleaned)
  const tier: TaskTier = winner ?? DEFAULT_TIER
  const { model, fallbackModels } = classifierFor(tier)
  return {
    tier,
    model,
    fallbackModels,
    scores,
    matched: winner !== null,
  }
}
