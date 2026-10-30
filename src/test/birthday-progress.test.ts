import { describe, expect, it } from "vitest";
import { GIFTS } from "@/lib/birthday-config";
import { freshProgress, restoreProgress } from "@/lib/birthday-progress";

const blankDeck = (id: string) => Array.from({ length: GIFTS.length }, (_, i) => (i === 0 ? id : ""));

describe("saved birthday progress", () => {
  it("recovers from invalid or out-of-range scenes", () => {
    for (const raw of ["bad json", "null", JSON.stringify({ scene: 99, lottery: null }), JSON.stringify({ ...freshProgress(), scene: -1 })]) {
      expect(restoreProgress(raw)).toEqual(freshProgress());
    }
  });
  it("rejects forbidden prizes in saved lottery results", () => {
    for (const id of ["dance_video", "makeup_set", "phone", "custom_gift", "book_set"]) {
      const deck = blankDeck(id);
      expect(restoreProgress(JSON.stringify({ scene: 4, lottery: { wish: "", deck, pickedIndex: 0 }, envelope: null }))).toEqual(freshProgress());
    }
  });
  it("retains a scratched mystery prize across reloads", () => {
    const state = { scene: 4, lottery: { wish: "", deck: blankDeck("mystery_0120_b"), pickedIndex: 0, scratched: true }, envelope: null };
    expect(restoreProgress(JSON.stringify(state))).toEqual(state);
  });
  it("accepts an older valid mystery result without a scratch flag", () => {
    const state = { scene: 4, lottery: { wish: "", deck: blankDeck("mystery_0120_a"), pickedIndex: 0 }, envelope: null };
    expect(restoreProgress(JSON.stringify(state))).toEqual({ ...state, lottery: { ...state.lottery, scratched: false } });
  });
  it("rejects an invalid envelope rather than locking the scene", () => {
    expect(restoreProgress(JSON.stringify({ ...freshProgress(), envelope: "missing" }))).toEqual(freshProgress());
  });
});