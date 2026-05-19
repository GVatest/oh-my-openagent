export type TaskTier = "quick" | "deep" | "ultrabrain"

export interface ModelRef {
  providerID: string
  modelID: string
  variant?: string
}

export interface TaskClassifier {
  tier: TaskTier
  model: ModelRef
  fallbackModels: ModelRef[]
  description: string
}

const QUICK_MODELS: { primary: ModelRef; fallbacks: ModelRef[] } = {
  primary: { providerID: "openrouter", modelID: "openai/gpt-5.4-mini" },
  fallbacks: [
    { providerID: "openrouter", modelID: "anthropic/claude-haiku-4.5" },
    { providerID: "github-copilot", modelID: "claude-haiku-4.5" },
    { providerID: "github-copilot", modelID: "gpt-4o" },
  ],
}

const DEEP_MODELS: { primary: ModelRef; fallbacks: ModelRef[] } = {
  primary: { providerID: "openrouter", modelID: "anthropic/claude-sonnet-4.6" },
  fallbacks: [
    { providerID: "openrouter", modelID: "openai/gpt-5.5", variant: "medium" },
    { providerID: "github-copilot", modelID: "claude-sonnet-4.6" },
    { providerID: "github-copilot", modelID: "gpt-5.4" },
  ],
}

const ULTRABRAIN_MODELS: { primary: ModelRef; fallbacks: ModelRef[] } = {
  primary: { providerID: "openrouter", modelID: "anthropic/claude-opus-4.7", variant: "max" },
  fallbacks: [
    { providerID: "openrouter", modelID: "anthropic/claude-opus-4.6" },
    { providerID: "openrouter", modelID: "openai/gpt-5.5-pro" },
    { providerID: "github-copilot", modelID: "claude-opus-4.6" },
    { providerID: "github-copilot", modelID: "claude-opus-4.5" },
  ],
}

export const TASK_CLASSIFIERS: TaskClassifier[] = [
  {
    tier: "quick",
    model: QUICK_MODELS.primary,
    fallbackModels: QUICK_MODELS.fallbacks,
    description: "Trivial tasks: typo, rename, single-file edit, format, grep",
  },
  {
    tier: "deep",
    model: DEEP_MODELS.primary,
    fallbackModels: DEEP_MODELS.fallbacks,
    description: "Standard tasks: analysis, debugging, multi-file refactor, new component",
  },
  {
    tier: "ultrabrain",
    model: ULTRABRAIN_MODELS.primary,
    fallbackModels: ULTRABRAIN_MODELS.fallbacks,
    description: "Critical tasks: architecture, security, math proof, novel algorithm",
  },
]

export const DEFAULT_TIER: TaskTier = "deep"

export const DEFAULT_MODEL: ModelRef = DEEP_MODELS.primary

export const DEFAULT_FALLBACK_MODELS: ModelRef[] = DEEP_MODELS.fallbacks
