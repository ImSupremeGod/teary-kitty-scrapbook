import { useState } from "react";
import catParty from "@/assets/cat-party.png";
import { PillButton, ScrapPage, SceneTitle } from "./decor";
import { play } from "@/lib/sfx";
import { cn } from "@/lib/utils";

/** Editable quiz. Each answer has its own reaction; `response` is the verdict. */
const QUIZ = [
  {
    question: "Who is the cutest person here? 🎀",
    answers: [
      { text: "Me, obviously 💅", reaction: "Confidence: 1000%. Accuracy: also 1000%." },
      { text: "Also me, don't be silly 😌", reaction: "Silly? Never. Correct? Always." },
      { text: "Why are you asking something so obvious?", reaction: "Fair. The developer apologizes for wasting your time." },
    ],
    response: "Correct. Intelligence level: dangerously high.",
  },
  {
    question: "What happens when you get angry? 😭",
    answers: [
      { text: "Everyone panics", reaction: "Panic mode activated. Hiding behind the router." },
      { text: "The universe stops", reaction: "NASA has been notified. Gravity is on pause." },
      { text: "Even Google cannot find a solution", reaction: "Google: 'No results found. Try snacks?'" },
    ],
    response: "Alert: handling instructions not found. Send snacks immediately.",
  },
  {
    question: "Choose your birthday superpower ✨",
    answers: [
      { text: "Unlimited money", reaction: "Wallet is shaking. Bank is sweating." },
      { text: "Unlimited shopping", reaction: "Shopping carts across the city just trembled." },
      { text: "Being cute without even trying", reaction: "Bad news: you already had this one." },
    ],
    response: "Power unlocked! Responsibility: absolutely none.",
  },
];

export function Quiz({ onNext }: { onNext: () => void }) {
  const [q, setQ] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const item = QUIZ[q]!;
  const last = q === QUIZ.length - 1;

  return (
    <ScrapPage tag="scene 2 ✦ pop quiz">
      <img src={catParty} alt="" width={816} height={816} loading="lazy" className="sticker absolute -right-4 -top-10 h-24 w-24 rotate-12 sm:h-28 sm:w-28" />
      <SceneTitle sub="no wrong answers. only correct ones.">The Birthday Girlie Test</SceneTitle>

      <div className="mb-5 flex items-center justify-center gap-2" aria-label={`Question ${q + 1} of ${QUIZ.length}`}>
        {QUIZ.map((_, i) => (
          <span key={i} className={cn("text-2xl transition-transform", i <= q ? "scale-110" : "opacity-30 grayscale")}>💗</span>
        ))}
      </div>

      <h3 className="text-center text-3xl">{item.question}</h3>
      <div className="mt-5 grid gap-3">
        {item.answers.map((a, i) => (
          <PillButton
            key={a.text}
            variant={picked === i ? "primary" : "cream"}
            className={cn("text-left", picked !== null && picked !== i && "opacity-60")}
            onClick={() => { setPicked(i); play("pop"); }}
            aria-pressed={picked === i}
          >
            {a.text}
          </PillButton>
        ))}
      </div>

      {picked !== null && (
        <div className="animate-pop mt-5 rounded-2xl border-[2.5px] border-dashed border-primary bg-muted p-4 text-center" aria-live="polite">
          <p className="font-hand text-2xl">{item.answers[picked]?.reaction}</p>
          <p className="mt-1 text-sm font-bold text-cherry">✔ {item.response}</p>
          <PillButton
            className="mt-4"
            variant="lavender"
            onClick={() => {
              if (last) return onNext();
              setQ(q + 1);
              setPicked(null);
            }}
          >
            {last ? "Next: the investigation 🔍" : "Next question →"}
          </PillButton>
        </div>
      )}
    </ScrapPage>
  );
}
