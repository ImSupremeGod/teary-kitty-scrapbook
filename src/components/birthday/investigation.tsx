import { useState } from "react";
import catDetective from "@/assets/cat-detective.png";
import catGift from "@/assets/cat-gift.png";
import { CONFIG } from "@/lib/birthday-config";
import { Heart, PillButton, ScrapPage, SceneTitle } from "./decor";
import { play } from "@/lib/sfx";
import { cn } from "@/lib/utils";

/** Split "UNIVERSE: ASGARD ⚡🔨" into a label + emoji for the planet badge. */
function splitTitle(title: string): { label: string; emoji: string } {
  const match = title.match(/([\p{Extended_Pictographic}\uFE0F\u200D]+)\s*$/u);
  if (match && match.index !== undefined) {
    return { label: title.slice(0, match.index).trim(), emoji: match[1] ?? "🪐" };
  }
  return { label: title, emoji: "🪐" };
}

export function Investigation({ onNext }: { onNext: () => void }) {
  const [open, setOpen] = useState<number | null>(null);
  const current = open === null ? undefined : CONFIG.evidence[open];

  return (
    <ScrapPage tag="scene 3 ✦ the multiverse files">
      <img src={catDetective} alt="" width={816} height={816} loading="lazy" className="sticker absolute -left-5 -top-12 h-24 w-24 -rotate-12 sm:h-28 sm:w-28" />
      <SceneTitle sub="travelling the multiverse — explore a universe to peek inside 🔍">Us, In Other Universes</SceneTitle>

      {current ? (
        <article className="animate-pop">
          <p className="font-hand mb-2 text-center text-xl text-muted-foreground">🚀 now travelling to…</p>
          <div className="relative aspect-[16/9] overflow-hidden rounded-[2rem] border-[2.5px] border-ink shadow-[var(--shadow-soft)]">
            {current.photo ? (
              <img src={current.photo} alt={current.title} className="h-full w-full object-cover" />
            ) : (
              <div className="cosmos grid h-full w-full place-items-center">
                <div className="text-center">
                  <img src={catGift} alt="" width={816} height={816} loading="lazy" className="sticker mx-auto h-20 w-20 opacity-90" />
                  <p className="font-hand mt-1 text-lg text-white/90">photo loading... (developer is choosing the cutest one)</p>
                </div>
              </div>
            )}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent px-4 pb-3 pt-12 text-center">
              <h3 className="font-hand text-2xl text-white sm:text-4xl">{current.title}</h3>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            {current.caption && <p className="font-hand rounded-xl bg-card p-3 text-lg">{current.caption}</p>}
            {current.chat?.map((line, j) =>
              line.me ? (
                <p key={j} className="font-hand ml-auto w-fit max-w-[90%] rounded-2xl rounded-br-sm bg-candy px-4 py-2 text-xl text-primary-foreground">
                  Me: {line.me}
                </p>
              ) : (
                <p key={j} className="font-hand w-fit max-w-[90%] rounded-2xl rounded-bl-sm bg-secondary px-4 py-2 text-xl text-secondary-foreground">
                  You: {line.you}
                </p>
              ),
            )}
            <p className="font-hand rounded-xl bg-secondary/60 p-3 text-xl">
              <Heart className="mr-1 inline h-5 w-5" />
              {current.reveal}
            </p>
          </div>

          <div className="mt-4 text-center">
            <PillButton variant="lavender" onClick={() => { setOpen(null); play("flip"); }}>
              ⬅ back to the multiverse
            </PillButton>
          </div>
        </article>
      ) : (
        <div className="cosmos relative rounded-[2rem] border-[2.5px] border-ink px-4 py-6 shadow-[var(--shadow-soft)]">
          <p className="font-hand text-center text-xl text-white/90 sm:text-2xl">🚀 pick a universe to explore</p>
          <div className="mt-5 flex flex-wrap justify-center gap-x-4 gap-y-6">
            {CONFIG.evidence.map((ev, i) => {
              const { label, emoji } = splitTitle(ev.title);
              return (
                <div key={ev.title} className="flex w-32 flex-col items-center gap-1.5">
                  <span
                    aria-hidden
                    className={cn("planet relative grid h-24 w-24 animate-bob place-items-center text-3xl sm:h-28 sm:w-28 sm:text-4xl", `planet-${(i % 4) + 1}`)}
                    style={{ animationDelay: `${(i % 3) * 0.5}s` }}
                  >
                    {emoji}
                  </span>
                  <p className="font-hand text-center text-lg leading-tight text-white">{label}</p>
                  <PillButton className="px-3 py-1.5 text-sm" onClick={() => { setOpen(i); play("flip"); }}>
                    explore 🚀
                  </PillButton>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <p className="font-hand mt-8 text-center text-2xl">Verdict: in every universe, I'd still find you. Sentence: one gift. 🎁</p>
      <div className="mt-4 text-center">
        <PillButton onClick={onNext}>Take me to the gifts 🎁</PillButton>
      </div>
    </ScrapPage>
  );
}
