import { useState } from "react";
import { PillButton, ScrapPage, SceneTitle } from "./decor";
import { play } from "@/lib/sfx";
import { cn } from "@/lib/utils";

const TEXT = ["Wish registered, princess. 🎀", "Processing your wish...", "The universe says: we'll see, babe. 😭✨"];

export function Cake({ onConfetti, onNext }: { onConfetti: () => void; onNext: () => void }) {
  const [wishing, setWishing] = useState(false);
  const [lit, setLit] = useState([true, true, true, true, true]);
  const [step, setStep] = useState(0);
  const allOut = lit.every((l) => !l);

  const blow = (i: number) => {
    if (!wishing || !lit[i]) return;
    const next = lit.map((l, j) => (j === i ? false : l));
    setLit(next);
    play("pop");
    if (next.every((l) => !l)) {
      play("blow");
      onConfetti();
      TEXT.forEach((_, k) => setTimeout(() => setStep(k + 1), 600 * (k + 1)));
    }
  };

  return (
    <ScrapPage tag="scene 5 ✦ cake o'clock">
      <SceneTitle sub={wishing ? "Tap each candle to blow it out 🌬️" : "Close your eyes. Okay, open them, you need to see the button."}>
        The Birthday Cake Mini-Game 🎂
      </SceneTitle>

      {/* Cake */}
      <div className="mx-auto mt-4 w-64 max-w-full">
        <div className="flex justify-around px-6">
          {lit.map((on, i) => (
            <button
              key={i}
              onClick={() => blow(i)}
              disabled={!wishing || !on}
              aria-label={on ? `Blow out candle ${i + 1}` : `Candle ${i + 1} is out`}
              className="flex flex-col items-center rounded-md p-1 focus-visible:outline-dashed focus-visible:outline-2 focus-visible:outline-cherry"
            >
              <span className={cn("h-5 text-xl", on ? "animate-flicker" : "opacity-60")}>{on ? "🔥" : "💨"}</span>
              <span className={cn("h-10 w-3 rounded-sm border-2 border-ink", i % 2 ? "bg-secondary" : "bg-butter")} />
            </button>
          ))}
        </div>
        <div className="h-16 rounded-t-3xl border-[2.5px] border-ink bg-blush" />
        <div className="-mt-1 h-4 border-x-[2.5px] border-ink bg-card" />
        <div className="h-20 rounded-b-2xl border-[2.5px] border-t-0 border-ink bg-primary/80 text-center text-2xl leading-[5rem]">🍓 🍓 🍓</div>
        <div className="mx-auto -mt-1 h-3 w-[110%] -translate-x-[4.5%] rounded-full border-[2.5px] border-ink bg-secondary" />
      </div>

      <div className="mt-6 text-center" aria-live="polite">
        {!wishing && <PillButton className="text-lg" onClick={() => { setWishing(true); play("pop"); }}>MAKE A WISH ✨</PillButton>}
        {wishing && !allOut && <p className="font-hand text-2xl">{lit.filter(Boolean).length} candles left. Blow harder, birthday girl 😤</p>}
        {TEXT.slice(0, step).map((t) => <p key={t} className="animate-pop font-hand text-2xl">{t}</p>)}
        {step >= TEXT.length && (
          <div className="animate-pop mt-4">
            <p className="text-sm text-muted-foreground">psst... there's one tiny envelope waiting for you 💌</p>
            <PillButton className="mt-3" variant="lavender" onClick={onNext}>Okay, show me the secret 💌</PillButton>
          </div>
        )}
      </div>
    </ScrapPage>
  );
}
