import { describe, expect, it } from "vitest";
import { GIFTS } from "@/lib/birthday-config";
import { eligibleGifts, shuffle } from "@/lib/lottery";

describe("gift lottery", () => {
  it("catalogue shows all nine gifts", () => {
    expect(GIFTS).toHaveLength(9);
  });

  it("pool contains exactly the four eligible gifts", () => {
    expect(eligibleGifts().map((g) => g.id).sort()).toEqual(
      ["date", "massage", "mystery_0120_a", "mystery_0120_b"].sort(),
    );
  });

  it("display-only gifts can never be drawn", () => {
    const ids = eligibleGifts().map((g) => g.id);
    for (const id of ["phone", "dance_video", "makeup_set", "book_set", "custom_gift"]) expect(ids).not.toContain(id);
  });

  it("shuffle keeps the same five entries", () => {
    const s = shuffle(eligibleGifts());
    expect(s.map((g) => g.id).sort()).toEqual(eligibleGifts().map((g) => g.id).sort());
  });

  it("each eligible gift lands first roughly equally often", () => {
    const counts: Record<string, number> = {};
    const N = 50000;
    for (let i = 0; i < N; i++) {
      const id = shuffle(eligibleGifts())[0]!.id;
      counts[id] = (counts[id] ?? 0) + 1;
    }
    for (const c of Object.values(counts)) expect(Math.abs(c / N - 0.25)).toBeLessThan(0.015);
  });
});
