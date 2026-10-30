import { useEffect, useRef, useState, type ReactNode } from "react";
import { CONFIG, GIFTS } from "@/lib/birthday-config";
import { eligibleGifts, shuffle } from "@/lib/lottery";
import { Bow, PillButton, ScrapPage, SceneTitle } from "./decor";
import { play } from "@/lib/sfx";
import { cn } from "@/lib/utils";
import type { LotteryState } from "@/lib/birthday-progress";

export type { LotteryState } from "@/lib/birthday-progress";

export function Lottery({
  state,
  setState,
  onConfetti,
  onNext,
}: {
  state: LotteryState;
  setState: (s: LotteryState) => void;
  onConfetti: () => void;
  onNext: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const scratched = state.scratched === true;
  const picking = useRef(false);
  const confettiTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (confettiTimer.current) clearTimeout(confettiTimer.current); }, []);
  const { wish, deck, pickedIndex } = state;
  const locked = pickedIndex !== null;
  const picked = deck && pickedIndex !== null ? GIFTS.find((g) => g.id === deck[pickedIndex]) : null;

  const startDraw = () => {
    setError("");
    play("flip");
    // All nine cards look identical; contents are decided only when she taps.
    setState({ ...state, deck: GIFTS.map(() => "") });
  };

  const pick = (i: number) => {
    if (locked || picking.current || !deck) return; // no double picks
    const gift = shuffle(eligibleGifts())[0];
    if (!gift) return;
    picking.current = true;
    const id = gift.id;
    const d = [...(deck ?? [])];
    d[i] = id;
    setState({ ...state, deck: d, pickedIndex: i });
    play("yay");
    confettiTimer.current = setTimeout(onConfetti, 500);
  };

  const resultText = picked
    ? `🎁 My birthday lottery result: ${picked.name}${picked.customField ? ` — "${wish.trim()}"` : ""}`
    : "";

  return (
    <ScrapPage tag="scene 4 ✦ gift lottery">
      <SceneTitle sub="First, inspect the goodies. Then let destiny do its silly little thing.">
        Pick Your Birthday Destiny, Princess 🎀
      </SceneTitle>

      {/* Catalogue: all gifts */}
      <div className="grid gap-3 sm:grid-cols-2">
        {GIFTS.map((g, i) => (
          <div
            key={g.id}
            className={cn(
              "relative rounded-2xl border-[2.5px] border-ink p-3",
              "bg-card",
              i % 2 ? "rotate-[0.6deg]" : "-rotate-[0.6deg]",
              g.customField && "sm:col-span-2",
            )}
          >
            <span
              className={cn(
                "absolute -top-3 right-3 rounded-full border-2 border-ink px-2 text-xs font-bold",
                "bg-primary text-primary-foreground",
              )}
            >
              🎟 in the lottery
            </span>
            <h3 className="text-2xl">{g.mysteryLabel ?? g.name}</h3>
            <p className="text-sm text-muted-foreground">{g.description}</p>
            {g.customField && (
              <label className="mt-2 block">
                <span className="font-hand text-xl">Tell me your dream gift, birthday girl 🎁</span>
                <textarea
                  value={wish}
                  disabled={!!deck}
                  onChange={(e) => setState({ ...state, wish: e.target.value })}
                  placeholder="Anything you want... be as specific or as chaotic as you like."
                  rows={2}
                  className="mt-1 w-full rounded-xl border-2 border-ink bg-card p-3 text-base outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-70"
                />
              </label>
            )}
          </div>
        ))}
      </div>

      {!deck && (
        <div className="mt-6 text-center">
          <p className="text-sm">All 7 gifts are in the draw. Pick one blind card. No take-backs. 😌</p>
          {error && <p className="mt-2 font-bold text-destructive" role="alert">{error}</p>}
          <PillButton className="mt-4 text-lg" onClick={startDraw}>SHUFFLE MY DESTINY 💗</PillButton>
        </div>
      )}

      {deck && (
        <div className="mt-8">
          <p className="font-hand mb-4 text-center text-2xl">{locked ? "Destiny has spoken ✨" : "Tap ONE card. Choose wisely, princess."}</p>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
            {deck.map((id, i) => {
              const g = GIFTS.find((x) => x.id === id);
              const isPicked = pickedIndex === i;
              return (
                <button
                  key={i}
                  disabled={locked}
                  onClick={() => pick(i)}
                  aria-label={isPicked && g ? `Your gift: ${g.mysteryLabel ?? g.name}` : `Mystery card ${i + 1}`}
                  className={cn("flip-scene aspect-[3/4] w-full rounded-2xl focus-visible:outline-dashed focus-visible:outline-3 focus-visible:outline-cherry", locked && !isPicked && "opacity-40")}
                >
                  <div className={cn("flip-inner h-full w-full", isPicked && "flipped")}>
                    <div className="face bg-candy grid place-items-center rounded-2xl border-[2.5px] border-ink">
                      <Bow className="absolute -top-2 h-7 w-10" />
                      <span className="font-hand text-5xl text-primary-foreground">?</span>
                      <span className="absolute bottom-2 text-sm">💗✨💗</span>
                    </div>
                    {/* Only the picked card ever renders its real contents */}
                    <div className="face face-back grid place-items-center rounded-2xl border-[2.5px] border-ink bg-card p-1 text-center">
                      {isPicked && g && <span className="font-hand text-base leading-tight sm:text-lg">{g.mysteryLabel ?? g.name}</span>}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {picked && (
            <div className="animate-pop mt-6 rounded-2xl border-[2.5px] border-ink bg-secondary/70 p-5 text-center">
              {picked.mysteryLabel && !scratched ? (
                <>
                  <h3 className="text-3xl text-cherry">{picked.mysteryLabel}</h3>
                  <p className="font-hand mt-1 text-xl">Scratch it with your finger, princess 👇</p>
                  <ScratchCard onDone={() => { setState({ ...state, scratched: true }); play("yay"); onConfetti(); }}>
                    <span className="font-hand text-3xl text-cherry">{picked.name}</span>
                  </ScratchCard>
                </>
              ) : (
                <>
                  <h3 className="text-3xl text-cherry">{picked.name}</h3>
                  <p className="mt-2">{picked.message}</p>
                </>
              )}
              {(!picked.mysteryLabel || scratched) && <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-center">
                {CONFIG.whatsappNumber ? (
                  <a
                    className="pill bg-accent px-5 py-3 text-accent-foreground"
                    href={`https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(resultText)}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Send it on WhatsApp 💬
                  </a>
                ) : (
                  <PillButton
                    variant="peach"
                    onClick={async () => {
                      setError("");
                      try {
                        if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
                        await navigator.clipboard.writeText(resultText);
                        setCopied(true);
                      } catch {
                        setCopied(false);
                        setError("Couldn't copy this time. You can select your result below. 💌");
                      }
                    }}
                  >
                    {copied ? "Copied! 💕" : "Copy my result 📋"}
                  </PillButton>
                )}
                <PillButton onClick={onNext}>Next: cake time 🎂</PillButton>
              </div>}
              {error && <div className="mt-3" role="alert"><p>{error}</p><p className="mt-2 select-all rounded-md bg-card p-3">{resultText}</p></div>}
            </div>
          )}
        </div>
      )}
    </ScrapPage>
  );
}

function ScratchCard({ children, onDone }: { children: ReactNode; onDone: () => void }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const finished = useRef(false);
  const complete = () => {
    if (finished.current) return;
    finished.current = true;
    onDone();
  };
  useEffect(() => {
    const c = ref.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    c.width = c.offsetWidth; c.height = c.offsetHeight;
    const tokens = getComputedStyle(c);
    const g = ctx.createLinearGradient(0, 0, c.width, c.height);
    g.addColorStop(0, tokens.getPropertyValue("--blush").trim()); g.addColorStop(1, tokens.getPropertyValue("--lavender").trim());
    ctx.fillStyle = g; ctx.fillRect(0, 0, c.width, c.height);
    ctx.fillStyle = tokens.getPropertyValue("--ink").trim(); ctx.font = "bold 20px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("✨ SCRATCH ME ✨", c.width / 2, c.height / 2 + 7);
  }, []);
  const scratch = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current || finished.current) return;
    const c = ref.current; const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    const r = c.getBoundingClientRect();
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath(); ctx.arc((e.clientX - r.left) * c.width / r.width, (e.clientY - r.top) * c.height / r.height, 22, 0, Math.PI * 2); ctx.fill();
    const d = ctx.getImageData(0, 0, c.width, c.height).data;
    let clear = 0; for (let i = 3; i < d.length; i += 32) if (d[i] === 0) clear++;
    if (clear / (d.length / 32) > 0.5) complete();
  };
  return (
    <>
    <div className="relative mx-auto mt-3 grid h-28 w-full max-w-xs place-items-center rounded-2xl border-[2.5px] border-ink bg-card">
      <div aria-hidden="true">{children}</div>
      <canvas
        ref={ref}
        aria-label="Scratch card"
        className="absolute inset-0 h-full w-full touch-none rounded-2xl transition-opacity duration-500"
        onPointerDown={(e) => { drawing.current = true; e.currentTarget.setPointerCapture(e.pointerId); scratch(e); }}
        onPointerMove={scratch}
        onPointerUp={() => { drawing.current = false; }}
        onPointerCancel={() => { drawing.current = false; }}
        onLostPointerCapture={() => { drawing.current = false; }}
      />
    </div>
    <PillButton variant="cream" className="mt-3" onClick={complete}>Reveal my surprise ✨</PillButton>
    </>
  );
}
