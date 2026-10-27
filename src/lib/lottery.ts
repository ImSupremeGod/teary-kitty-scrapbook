import { GIFTS, type Gift } from "./birthday-config";

/** Only lottery-eligible gifts may enter the draw. */
export function eligibleGifts(catalogue: Gift[] = GIFTS): Gift[] {
  return catalogue.filter((g) => g.lotteryEligible === true);
}

/** Unbiased Fisher–Yates shuffle (returns a new array). */
export function shuffle<T>(items: T[], rand: () => number = Math.random): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}
