import { useState } from "react";
import catParty from "@/assets/cat-party.png";
import finaleVideo from "@/assets/finale-birthday-message.mp4.asset.json";
import { CONFIG } from "@/lib/birthday-config";
import { Bow, PillButton, ScrapPage, SceneTitle, Star } from "./decor";
import { play } from "@/lib/sfx";

export function Finale({ onReplay, onConfetti }: { onReplay: () => void; onConfetti: () => void }) {
  const [shown, setShown] = useState<"joke" | "secret" | "risky" | null>(null);
  const [devSecret, setDevSecret] = useState(false);
  const text = shown ? CONFIG.finale[shown] : "";

  return (
    <ScrapPage tag="scene 7 ✦ the end (for now)">
      <SceneTitle>The Final Secret 🎀</SceneTitle>

      <div className="grid gap-3 sm:grid-cols-3">
        <PillButton variant="peach" onClick={() => { setShown("joke"); play("pop"); }}>ONE LAST JOKE 🤡</PillButton>
        <PillButton variant="lavender" onClick={() => { setShown("secret"); play("flip"); }}>A SECRET MESSAGE 💌</PillButton>
        <PillButton onClick={() => { setShown("risky"); play("yay"); onConfetti(); }}>PRESS AT YOUR OWN RISK 😏</PillButton>
      </div>
      {shown === "secret" ? (
        <div key={shown} className="animate-pop mt-5 rounded-2xl border-[2.5px] border-dashed border-primary bg-muted p-4" aria-live="polite">
          <p className="font-hand text-center text-3xl text-primary">{CONFIG.finale.secretTitle}</p>
          <div className="mt-3 max-h-80 space-y-4 overflow-y-auto pr-2 text-left font-hand text-xl leading-relaxed sm:text-2xl">
            {CONFIG.finale.secret.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
          <p className="mt-4 text-center text-lg text-muted-foreground">— Shanu 🎀</p>
        </div>
      ) : shown ? (
        <p key={shown} className="animate-pop font-hand mt-5 rounded-2xl border-[2.5px] border-dashed border-primary bg-muted p-4 text-center text-2xl" aria-live="polite">
          {text}
        </p>
      ) : null}

      {/* Special video message */}
      <div className="mt-8 rounded-2xl border-[2.5px] border-dashed border-primary bg-muted p-4 text-center">
        <p className="font-hand text-3xl text-primary">🎬 a special message for you</p>
        <video src={finaleVideo.url} controls playsInline preload="metadata" className="mx-auto mt-3 max-h-96 w-auto max-w-full rounded-xl border-[2.5px] border-ink shadow-[var(--shadow-sticker)]" aria-label="Special birthday video message" />
        <p className="font-hand mt-2 text-lg text-muted-foreground">watch till the end 😁🥰</p>
      </div>

      <div className="relative mt-8 rounded-3xl border-[2.5px] border-ink bg-candy p-6 text-center text-primary-foreground">
        <Bow className="absolute -top-5 left-1/2 h-10 w-14 -translate-x-1/2" />
        <img src={catParty} alt="Party cat with cake" width={816} height={816} loading="lazy" className="sticker mx-auto h-32 w-32 animate-bob" />
        <h3 className="text-4xl">Happy Birthday, {CONFIG.recipientName} 🎂💗</h3>
        <p className="mt-3">
          Stay cute, stay chaotic, and keep being your ridiculously lovable self. This entire website was made with affection,
          cringe, and an unreasonable quantity of JavaScript.
        </p>
      </div>

      <div className="mt-6 flex flex-col items-center gap-4">
        <PillButton variant="cream" onClick={onReplay}>Replay the chaos 🔁</PillButton>
        {/* Hidden-ish developer's secret sticker */}
        <button
          onClick={() => { setDevSecret((v) => !v); play("pop"); }}
          className="font-hand flex items-center gap-1 rounded-full border-2 border-dashed border-ink/40 bg-butter/70 px-3 py-1 text-sm opacity-70 hover:opacity-100"
          aria-expanded={devSecret}
        >
          <Star className="h-4 w-4" /> developer's secret
        </button>
        {devSecret && <p className="animate-pop font-hand text-center text-xl">{CONFIG.finale.developerSecret}</p>}
      </div>
    </ScrapPage>
  );
}
