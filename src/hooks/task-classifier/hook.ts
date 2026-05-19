import type { ChatMessageInput, ChatMessageHandlerOutput } from "../../plugin/chat-message"
import { isRealUserTextPart, isSyntheticOrInternalOnlyTextParts, log } from "../../shared"
import { SessionCategoryRegistry } from "../../shared/session-category-registry"
import { classifyTask } from "./classifier"

export function extractPromptText(
  parts: Array<{ type: string; text?: string; synthetic?: boolean }>,
): string {
  return parts.filter(isRealUserTextPart).map((p) => p.text || "").join(" ")
}

export function createTaskClassifierHook() {
  return {
    "chat.message": async (
      input: ChatMessageInput,
      output: ChatMessageHandlerOutput,
    ): Promise<void> => {
      if (isSyntheticOrInternalOnlyTextParts(output.parts)) {
        return
      }

      const promptText = extractPromptText(output.parts)
      if (!promptText.trim()) {
        return
      }

      const result = classifyTask(promptText)

      log("[task-classifier] Classified", {
        sessionID: input.sessionID,
        tier: result.tier,
        matched: result.matched,
        providerID: result.model.providerID,
        modelID: result.model.modelID,
        fallbacks: result.fallbackModels.length,
        scores: result.scores.map((s) => ({
          tier: s.tier,
          score: s.score,
          hits: s.hits.map((h) => h.signal.text),
        })),
      })

      output.message["model"] = {
        providerID: result.model.providerID,
        modelID: result.model.modelID,
      }
      if (result.model.variant) {
        output.message["variant"] = result.model.variant
      }

      if (input.sessionID) {
        SessionCategoryRegistry.register(input.sessionID, result.tier)
      }
    },
  }
}
