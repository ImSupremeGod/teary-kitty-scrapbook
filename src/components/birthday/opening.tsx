import { useRef, useState } from "react";
import catGift from "@/assets/cat-gift.png";
import cryingCat from "@/assets/crying-cat.gif.asset.json";
import { Bow, Heart, PillButton, Star } from "./decor";
import { play } from "@/lib/sfx";

const MAX_DODGES = 4;

export function Opening({ onYes }: { onYes: () => void }) {
  const [sad, setSad] = useState(false);
  const [dodges, setDodges] = useState(0);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [maybeMsg, setMaybeMsg] = useState("");
  const btnRef = useRef<HTMLButtonElement>(null);

  const dodge = () => {
    if (dodges >= MAX_DODGES || !btnRef.current) return false;
    const r = btnRef.current.getBoundingClientRect();
    const baseX = r.left - offset.x;
    const baseY = r.top - offset.y;
    let x = (Math.random() - 0.5) * 180;
    let y = (Math.random() - 0.5) * 100;
    // keep inside the viewport
    x = Math.max(8 - baseX, Math.min(window.innerWidth - r.width - 8 - baseX, x));
    y = Math.max(8 - baseY, Math.min(window.innerHeight - r.height - 8 - baseY, y));
    setOffset({ x, y });
    setDodges((d) => d + 1);
    play("pop");
    return true;
  };

  if (sad) {
    return (
      <div className="bg-drama animate-pop mx-auto flex w-full max-w-md flex-col items-center rounded-[2rem] border-[3px] border-ink px-5 py-8 text-center text-primary-foreground">
        <div className="polaroid rotate-[-3deg]">
          <img src={cryingCat.url} alt="A crying cat meme with dramatic tears" className="h-56 w-56 rounded-sm object-cover" width={224} height={224} />
          <p className="font-hand mt-2 text-xl text-foreground">me rn 😭</p>
        </div>
        <h1 className="mt-6 text-4xl">HOW DARE YOU CHOOSE NO?! 😭</h1>
        <p className="mt-3 text-base opacity-90">
          I made all this cuteness and you said NO?! The cat is crying. I am crying. Even the HTML is crying. 😭💔
        </p>
        <div className="mt-6 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
          <PillButton onClick={() => { play("yay"); onYes(); }}>OKAY FINE, SHOW ME 💗</PillButton>
          <PillButton variant="cream" onClick={() => setSad(false)}>GO BACK</PillButton>
        </div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto w-full max-w-md text-center">
      <Bow className="absolute -left-2 -top-6 h-12 w-16 rotate-[-15deg]" />
      <Star className="absolute -right-1 top-2 h-9 w-9 animate-wiggle" />
      <Heart className="absolute -bottom-4 right-6 h-8 w-8 animate-bob" />
      <div className="scrap-card animate-pop px-5 py-8">
        <img src={catGift} alt="Cute cat sticker holding a birthday gift" width={816} height={816} className="sticker mx-auto h-44 w-44 animate-bob" />
        <h1 className="mt-2 text-5xl text-cherry">Pssst... Birthday Girl 🎀</h1>
        <p className="mt-3 text-lg">Do you want to see your birthday surprises? 🥺👉👈</p>
        <div className="mt-7 flex flex-col items-center gap-3">
          <PillButton className="w-full text-lg" onClick={() => { play("yay"); onYes(); }}>YESSS, SHOW ME!! 💗</PillButton>
          <div className="grid w-full grid-cols-2 gap-3">
            <PillButton variant="cream" onClick={() => { play("sad"); setSad(true); }}>NO 🙄</PillButton>
            <PillButton
              ref={btnRef}
              variant="lavender"
              style={{ transform: `translate(${offset.x}px, ${offset.y}px)`, transition: "transform .25s cubic-bezier(.3,1.5,.5,1)" }}
              onPointerEnter={(e) => { if (e.pointerType === "mouse") dodge(); }}
              onPointerDown={(e) => { if (e.pointerType !== "mouse" && dodge()) e.preventDefault(); }}
              onClick={(e) => {
                // keyboard (detail === 0) is never blocked
                if (e.detail !== 0 && dodges < MAX_DODGES) { dodge(); return; }
                setMaybeMsg("Maybe = yes in girlie language. Let's go! 💅");
                play("yay");
                setTimeout(onYes, 900);
              }}
            >
              MAYBEEE 🤔
            </PillButton>
          </div>
          <p className="font-hand min-h-6 text-lg text-muted-foreground" aria-live="polite">
            {maybeMsg || (dodges > 0 && dodges < MAX_DODGES ? `hehe nope (${MAX_DODGES - dodges} more tries) 🏃‍♀️` : dodges >= MAX_DODGES ? "fine, you can click me now 😤" : "")}
          </p>
        </div>
      </div>
    </div>
  );
}
