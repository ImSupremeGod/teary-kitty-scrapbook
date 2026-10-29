import { CONFIG, GIFTS } from "./birthday-config";
import { eligibleGifts } from "./lottery";

export type LotteryState = { wish: string; deck: string[] | null; pickedIndex: number | null; scratched?: boolean };
export type SavedProgress = { scene: number; lottery: LotteryState; envelope: string | null };
export const freshProgress = (): SavedProgress => ({ scene: 0, lottery: { wish: "", deck: null, pickedIndex: null }, envelope: null });

/** Accept only complete, valid progress; stale or damaged sessions restart safely. */
export function restoreProgress(raw: string | null): SavedProgress {
  if (!raw) return freshProgress();
  try {
    const value = JSON.parse(raw);
    if (!value || !Number.isInteger(value.scene) || value.scene < 0 || value.scene > 7) return freshProgress();
    const lottery = value.lottery;
    if (!lottery || typeof lottery.wish !== "string") return freshProgress();
    const allowed = eligibleGifts().map((gift) => gift.id);
    const { deck, pickedIndex } = lottery;
    if (deck !== null && (!Array.isArray(deck) || deck.length !== GIFTS.length || deck.some((id: unknown) => typeof id !== "string"))) return freshProgress();
    if (pickedIndex !== null && (!deck || !Number.isInteger(pickedIndex) || pickedIndex < 0 || pickedIndex >= deck.length || !allowed.includes(deck[pickedIndex]))) return freshProgress();
    if (deck && deck.some((id: string, i: number) => i !== pickedIndex && id !== "")) return freshProgress();
    if (value.scene > 4 && pickedIndex === null) return freshProgress();
    if (value.envelope !== null && !CONFIG.messages.some((message) => message.id === value.envelope)) return freshProgress();
    if (value.scene === 7 && value.envelope === null) return freshProgress();
    return { scene: value.scene, lottery: { wish: lottery.wish, deck, pickedIndex, scratched: lottery.scratched === true }, envelope: value.envelope };
  } catch {
    return freshProgress();
  }
}