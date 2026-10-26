import { useEffect, useState } from "react";
import { Heart, PillButton, ScrapPage, SceneTitle, Star } from "./decor";
import { play } from "@/lib/sfx";

const LINES = [
  "INITIALIZING BIRTHDAY CUTENESS PROTOCOL... 🎀",
  "Scanning birthday girl... COMPLETE 💗",
  "Checking cuteness level... ERROR: TOO MUCH.",
  "Calculating how adorable you are... Calculator has resigned.",
  "Mission status: MAKE HER SMILE.",
];

export function Mission({ onNext }: { onNext: () => void }) {
  const [lineIdx, setLineIdx] = useState(0);
  const [chars, setChars] = useState(0);
  const [progress, setProgress] = useState(0);
  const done = lineIdx >= LINES.length;

  // Typewriter
  useEffect(() => {
    if (done) return;
    const line = LINES[lineIdx];
    if (chars < line.length) {
      const t = setTimeout(() => setChars((c) => c + 1), 28);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => { setLineIdx((i) => i + 1); setChars(0); }, 380);
    return () => clearTimeout(t);
  }, [chars, lineIdx, done]);

  // Fake progress bar that stalls at 99%
  useEffect(() => {
    if (progress >= 100) return;
    const delay = progress === 99 ? 1400 : 45;
    const t = setTimeout(() => setProgress((p) => (p === 99 ? 100 : Math.min(99, p + 3))), delay);
    return () => clearTimeout(t);
  }, [progress]);

  const skip = () => { setLineIdx(LINES.length); setProgress(100); };

  return (
    <ScrapPage tag="scene 1 ✦ top secret">
      <SceneTitle sub="pastel mission control, est. today">The Cutest Classified Mission</SceneTitle>
      <div className="relative rounded-2xl border-[2.5px] border-ink bg-secondary/60 p-4 text-left font-mono text-sm leading-relaxed sm:text-base">
        <Heart className="absolute -right-3 -top-3 h-8 w-8 rotate-12" />
        {LINES.slice(0, lineIdx).map((l) => <p key={l}>&gt; {l}</p>)}
        {!done && <p>&gt; {LINES[lineIdx].slice(0, chars)}<span className="caret">▌</span></p>}
      </div>

      <div className="mt-5">
        <div className="mb-1 flex justify-between text-sm font-bold">
          <span>loading cuteness</span>
          <span>{progress}%{progress === 99 && " 🫠 hold on..."}</span>
        </div>
        <div className="h-5 overflow-hidden rounded-full border-[2.5px] border-ink bg-card" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
          <div className="bg-candy h-full transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {done && progress >= 100 ? (
        <div className="animate-pop mt-6 text-center">
          <p className="font-hand text-2xl">
            Congratulations! You've hacked into the birthday website. Unfortunately, the website has developed a crush on your face. <Star className="inline h-6 w-6" />
          </p>
          <PillButton className="mt-5 text-lg" onClick={() => { play("yay"); onNext(); }}>START MY BIRTHDAY CHAOS 💖</PillButton>
        </div>
      ) : (
        <div className="mt-5 text-center">
          <button className="font-hand text-lg text-muted-foreground underline decoration-wavy underline-offset-4" onClick={skip}>
            skip intro (impatient queen) ⏭
          </button>
        </div>
      )}
    </ScrapPage>
  );
}
