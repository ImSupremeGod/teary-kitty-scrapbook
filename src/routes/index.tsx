import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Confetti, FloatingHearts } from "@/components/birthday/decor";
import { Opening } from "@/components/birthday/opening";
import { Mission } from "@/components/birthday/mission";
import { Quiz } from "@/components/birthday/quiz";
import { Investigation } from "@/components/birthday/investigation";
import { Lottery } from "@/components/birthday/lottery";
import { Cake } from "@/components/birthday/cake";
import { Envelopes } from "@/components/birthday/envelopes";
import { Finale } from "@/components/birthday/finale";
import { sfxState } from "@/lib/sfx";
import { freshProgress, restoreProgress, type SavedProgress } from "@/lib/birthday-progress";
import { PillButton } from "@/components/birthday/decor";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Operation: Birthday Chaos 💗" },
      { name: "description", content: "A cute, cringey, handmade birthday scrapbook full of surprises." },
      { property: "og:title", content: "Operation: Birthday Chaos 💗" },
      { property: "og:description", content: "A cute, cringey, handmade birthday scrapbook full of surprises." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const KEY = "birthday-chaos-v1";
function Index() {
  const [s, setS] = useState<SavedProgress>(freshProgress);
  const [loaded, setLoaded] = useState(false);
  const [fire, setFire] = useState(0);
  const [muted, setMuted] = useState(false);
  const [vol, setVol] = useState(0.6);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(KEY);
      setS(restoreProgress(raw));
    } catch { /* ignore */ }
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (loaded) {
      try { sessionStorage.setItem(KEY, JSON.stringify(s)); } catch { /* Continue if browser storage is unavailable. */ }
    }
  }, [s, loaded]);

  const go = (scene: number) => { setS((p) => ({ ...p, scene: Math.min(7, Math.max(0, scene)) })); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const boom = () => setFire((f) => f + 1);
  const next = () => { boom(); go(s.scene + 1); };

  return (
    <main className="paper relative min-h-screen overflow-x-hidden px-4 pb-24 pt-12">
      <FloatingHearts />
      <Confetti fire={fire} />

      {/* Sound controls */}
      <div className="fixed right-3 top-3 z-40 flex items-center gap-2 rounded-full border-2 border-ink bg-card px-3 py-1 shadow-[var(--shadow-sticker)]">
        <PillButton aria-label={muted ? "Unmute sounds" : "Mute sounds"} aria-pressed={muted} onClick={() => { sfxState.setMuted(!muted); setMuted(!muted); }} className="border-0 bg-card p-0 text-lg text-foreground shadow-none">
          {muted ? "🔇" : "🔊"}
        </PillButton>
        <input aria-label="Volume" type="range" min={0} max={1} step={0.1} value={vol}
          onChange={(e) => { const v = +e.target.value; setVol(v); sfxState.setVolume(v); }}
          className="w-16 accent-primary sm:w-20" />
      </div>

      {s.scene > 0 && (
        <p className="font-hand relative mb-8 text-center text-xl text-muted-foreground">scene {s.scene} of 7 · cringe level: illegal 💗</p>
      )}

      <div className="relative">
        {loaded && s.scene === 0 && <Opening onYes={next} />}
        {s.scene === 1 && <Mission onNext={next} />}
        {s.scene === 2 && <Quiz onNext={next} />}
        {s.scene === 3 && <Investigation onNext={next} />}
        {s.scene === 4 && (
          <Lottery state={s.lottery} setState={(lottery) => setS((p) => ({ ...p, lottery }))} onConfetti={boom} onNext={() => go(5)} />
        )}
        {s.scene === 5 && <Cake onConfetti={boom} onNext={() => go(6)} />}
        {s.scene === 6 && <Envelopes chosen={s.envelope} setChosen={(envelope) => setS((p) => ({ ...p, envelope }))} onNext={next} />}
        {s.scene === 7 && <Finale onConfetti={boom} onReplay={() => { sfxState.stopSong(); setS(freshProgress()); setFire(0); window.scrollTo({ top: 0 }); }} />}
      </div>

      <p className="font-hand relative mt-12 text-center text-lg text-muted-foreground">
        made with 70% love, 20% nonsense & 10% questionable decisions 🎀
      </p>
    </main>
  );
}
