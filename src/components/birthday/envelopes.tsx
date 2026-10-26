import { CONFIG } from "@/lib/birthday-config";
import { Heart, PillButton, ScrapPage, SceneTitle } from "./decor";
import { play } from "@/lib/sfx";
import { cn } from "@/lib/utils";

const STYLES = ["bg-blush", "bg-secondary", "bg-accent"];
const TILT = ["-rotate-3", "rotate-1", "rotate-3"];

export function Envelopes({ chosen, setChosen, onNext }: { chosen: string | null; setChosen: (id: string) => void; onNext: () => void }) {
  const msg = CONFIG.messages.find((m) => m.id === chosen);
  return (
    <ScrapPage tag="scene 6 ✦ feelings (ew)">
      <SceneTitle sub="Choose carefully, birthday girl. You get one tiny envelope.">Okay, ewwww, feelings time. 🙄💗</SceneTitle>

      <div className="grid gap-4 sm:grid-cols-3">
        {CONFIG.messages.map((m, i) => {
          const isChosen = chosen === m.id;
          return (
            <button
              key={m.id}
              disabled={!!chosen}
              onClick={() => { setChosen(m.id); play("flip"); }}
              className={cn(
                "relative rounded-2xl border-[2.5px] border-ink p-5 pt-10 text-center transition-all focus-visible:outline-dashed focus-visible:outline-3 focus-visible:outline-cherry",
                STYLES[i], TILT[i],
                chosen && !isChosen && "opacity-40 grayscale",
                isChosen && "scale-105 rotate-0",
                !chosen && "hover:-translate-y-1",
              )}
            >
              {/* envelope flap */}
              <span className="absolute inset-x-0 top-0 h-8 rounded-t-2xl border-b-[2.5px] border-dashed border-ink bg-card/60" aria-hidden />
              <Heart className="absolute left-1/2 top-4 h-7 w-7 -translate-x-1/2" />
              <span className="font-hand mt-3 block text-2xl">{m.title}</span>
              <span className="text-xs">{isChosen ? "opened 💌" : chosen ? "locked 🔒" : "tap to open"}</span>
            </button>
          );
        })}
      </div>

      {msg && (
        <div className="animate-pop polaroid mx-auto mt-8 max-w-md rotate-[-1deg] text-center">
          <h3 className="text-3xl text-cherry">{msg.title}</h3>
          <p className="font-hand mt-3 whitespace-pre-line text-2xl">{msg.body}</p>
          <p className="mt-4 text-sm">— {CONFIG.creatorName} 💗</p>
          <PillButton className="mt-5" onClick={onNext}>One final secret 🎀</PillButton>
        </div>
      )}
    </ScrapPage>
  );
}
