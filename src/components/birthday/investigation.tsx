import { useState } from "react";
import catDetective from "@/assets/cat-detective.png";
import catGift from "@/assets/cat-gift.png";
import journeyArt from "@/assets/multiverse-journey.jpg";
import { CONFIG } from "@/lib/birthday-config";
import { Heart, PillButton, SceneTitle, Star } from "./decor";
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
  const [travelling, setTravelling] = useState<number | null>(null);
  const current = open === null ? undefined : CONFIG.evidence[open];

  /** Warp-travel interstitial, then reveal the destination universe. */
  const explore = (i: number) => {
    if (travelling !== null) return;
    setTravelling(i);
    play("flip");
    window.setTimeout(() => {
      setOpen(i);
      setTravelling(null);
      window.scrollTo({ top: 0 });
    }, 1500);
  };

  return (
    <section className="relative mx-auto w-full max-w-4xl">
      <div className="relative mx-auto max-w-2xl px-3">
        <img src={catDetective} alt="" width={816} height={816} loading="lazy" className="sticker absolute -left-3 -top-7 h-16 w-16 -rotate-12 sm:h-24 sm:w-24" />
        <SceneTitle sub="one little spaceship. every universe. always us. ♡">Us, In Other Universes</SceneTitle>
      </div>

      {travelling !== null && (
        <div className="travel-overlay" role="status" aria-label="Travelling through the multiverse">
          <div className="travel-stars" aria-hidden />
          <div className="relative flex flex-col items-center">
            <span className="travel-rocket" aria-hidden>🚀</span>
            <p className="font-hand travel-text">
              travelling to {splitTitle(CONFIG.evidence[travelling]?.title ?? "").label.replace(/^UNIVERSE:\s*/, "")}...
            </p>
          </div>
        </div>
      )}

      {current ? (
        <article className="universe-arrival mx-auto max-w-2xl">
          <div className="mb-4 flex items-center justify-between gap-3">
            <PillButton variant="lavender" className="px-3 py-2 text-sm" onClick={() => { setOpen(null); play("flip"); }}>← multiverse</PillButton>
            <p className="font-hand text-right text-xl text-muted-foreground">🚀 destination reached</p>
          </div>
          <div className="polaroid relative">
          <div className="relative overflow-hidden rounded-sm">
            {current.photo ? (
              <img src={current.photo} alt={current.title} className="block h-auto w-full" />
            ) : (
              <div className="cosmos grid h-full w-full place-items-center">
                <div className="text-center">
                  <img src={catGift} alt="" width={816} height={816} loading="lazy" className="sticker mx-auto h-20 w-20 opacity-90" />
                  <p className="font-hand mt-1 text-lg text-space-foreground">photo loading... (developer is choosing the cutest one)</p>
                </div>
              </div>
            )}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent px-4 pb-3 pt-12 text-center">
              <h3 className="font-hand text-2xl text-space-foreground sm:text-4xl">{current.title}</h3>
            </div>
          </div>
          <span className="tape -top-3 left-1/2 -translate-x-1/2 rotate-3" aria-hidden />
          <p className="font-hand absolute inset-x-0 bottom-1 text-center text-lg text-muted-foreground">a little postcard from another lifetime ♡</p>
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
        <div className="journey-map relative isolate overflow-hidden rounded-lg border-2 border-ink px-3 pb-12 pt-8 sm:px-10">
          <img src={journeyArt} alt="" width={1536} height={1024} className="pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover" />
          <div className="journey-shade pointer-events-none absolute inset-0 -z-10" />
          <div className="relative text-center text-space-foreground">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-space-accent">Shanu & Anusha · cosmic departures</p>
            <h3 className="font-hand text-4xl sm:text-5xl">Our little multiverse</h3>
            <p className="font-hand mt-2 text-xl">next stop: another version of us ♡</p>
          </div>
          <div className="flight-path relative mx-auto mb-5 mt-5 h-16 max-w-md" aria-hidden>
            <span className="journey-rocket absolute left-0 top-0 text-4xl">🚀</span>
            <Star className="absolute right-0 top-3 h-6 w-6" />
          </div>
          <div className="destination-grid relative grid grid-cols-2 gap-x-3 gap-y-10 sm:grid-cols-3 sm:gap-x-8">
            {CONFIG.evidence.map((ev, i) => {
              const { label, emoji } = splitTitle(ev.title);
              return (
                <div key={ev.title} className="destination-stop relative flex min-w-0 flex-col items-center gap-2">
                  <p className="font-hand text-sm text-space-accent">✦ stop {String(i + 1).padStart(2, "0")}</p>
                  <span
                    aria-hidden
                    className={cn("planet destination-planet relative grid h-24 w-24 animate-bob place-items-center sm:h-28 sm:w-28", `planet-${(i % 4) + 1}`)}
                  >
                    {ev.photo && <img src={ev.photo} alt="" loading="lazy" className="h-full w-full rounded-full object-cover" />}
                    <span className="absolute -bottom-1 -right-1 rounded-full border-2 border-ink bg-card p-1 text-xl">{emoji}</span>
                  </span>
                  <p className="font-hand flex min-h-12 items-center justify-center text-center text-lg leading-tight text-space-foreground">{label.replace(/^UNIVERSE:\s*/, "")}</p>
                  <PillButton aria-label={`Explore ${label}`} className="px-4 py-2 text-sm" onClick={() => explore(i)}>
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
    </section>
  );
}
