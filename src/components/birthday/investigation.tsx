import { useState } from "react";
import catDetective from "@/assets/cat-detective.png";
import catGift from "@/assets/cat-gift.png";
import { CONFIG } from "@/lib/birthday-config";
import { Heart, PillButton, ScrapPage, SceneTitle } from "./decor";
import { play } from "@/lib/sfx";
import { cn } from "@/lib/utils";

const TILTS = ["-rotate-2", "rotate-2", "-rotate-1", "rotate-1", "-rotate-3"];

export function Investigation({ onNext }: { onNext: () => void }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <ScrapPage tag="scene 3 ✦ the multiverse files">
      <img src={catDetective} alt="" width={816} height={816} loading="lazy" className="sticker absolute -left-5 -top-12 h-24 w-24 -rotate-12 sm:h-28 sm:w-28" />
      <SceneTitle sub="tap each universe to peek inside 🔍">Us, In Other Universes</SceneTitle>

      <div className="grid gap-6 sm:grid-cols-2">
        {CONFIG.evidence.map((ev, i) => {
          const isOpen = open === i;
          return (
            <article key={ev.title} className={cn("polaroid relative transition-transform", TILTS[i % TILTS.length], isOpen && "sm:col-span-2 rotate-0")}>
              <span className="tape -top-3 left-1/2 -translate-x-1/2 rotate-2" aria-hidden />
              <div className="aspect-[4/3] overflow-hidden rounded-sm bg-muted paper grid place-items-center">
                {ev.photo ? (
                  <img src={ev.photo} alt={ev.title} className="h-full w-full object-cover" loading="lazy" />
                ) : (
                  <div className="text-center">
                    <img src={catGift} alt="" width={816} height={816} loading="lazy" className="sticker mx-auto h-20 w-20 opacity-80" />
                    <p className="font-hand text-lg text-muted-foreground">photo loading... (developer is choosing the cutest one)</p>
                  </div>
                )}
              </div>
              <h3 className="mt-3 text-2xl text-cherry">{ev.title}</h3>
              <p className="text-sm">{ev.caption}</p>
              {isOpen && (
                <p className="animate-pop font-hand mt-3 rounded-xl bg-secondary/60 p-3 text-xl">
                  <Heart className="mr-1 inline h-5 w-5" />
                  {ev.reveal}
                </p>
              )}
              <button
                className="font-hand absolute bottom-2 right-3 text-lg text-primary underline decoration-wavy underline-offset-4"
                onClick={() => { setOpen(isOpen ? null : i); play("flip"); }}
                aria-expanded={isOpen}
              >
                {isOpen ? "close file ✕" : "inspect 🔍"}
              </button>
            </article>
          );
        })}
      </div>

      <p className="font-hand mt-8 text-center text-2xl">Verdict: in every universe, I'd still find you. Sentence: one gift. 🎁</p>
      <div className="mt-4 text-center">
        <PillButton onClick={onNext}>Take me to the gifts 🎁</PillButton>
      </div>
    </ScrapPage>
  );
}
