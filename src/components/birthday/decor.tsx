import { useEffect, useMemo, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Hand-drawn bow */
export function Bow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 40" className={cn("sticker", className)} aria-hidden>
      <path d="M32 20 C18 2 4 6 6 20 C4 34 18 38 32 20Z" className="fill-primary stroke-ink" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M32 20 C46 2 60 6 58 20 C60 34 46 38 32 20Z" className="fill-primary stroke-ink" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M28 22 L22 38 M36 22 L42 38" className="stroke-ink" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="32" cy="20" r="6" className="fill-blush stroke-ink" strokeWidth="2.5" />
    </svg>
  );
}

export function Heart({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 30" className={cn("sticker", className)} aria-hidden>
      <path d="M16 28 C2 18 2 6 9 4 C13 3 15 6 16 8 C17 6 19 3 23 4 C30 6 30 18 16 28Z" className="fill-cherry stroke-ink" strokeWidth="2" strokeLinejoin="round" />
      <path d="M9 9 C8 11 8 12 9 14" className="stroke-card" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function Star({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 30" className={cn("sticker", className)} aria-hidden>
      <path d="M15 2 L18.5 11 L28 11.5 L20.5 17.5 L23 27 L15 21.5 L7 27 L9.5 17.5 L2 11.5 L11.5 11Z" className="fill-butter stroke-ink" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

/** Squiggle doodle line */
export function Squiggle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 16" className={className} aria-hidden fill="none">
      <path d="M2 8 Q12 0 22 8 T42 8 T62 8 T82 8 T102 8 T118 8" className="stroke-primary" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

/** Ambient floating hearts in the background */
export function FloatingHearts({ count = 12 }: { count?: number }) {
  const [items, setItems] = useState<{ left: number; delay: number; dur: number; size: number; kind: string }[]>([]);
  useEffect(() => {
    const kinds = ["💗", "🎀", "✨", "💕", "⭐"];
    setItems(
      Array.from({ length: count }, (_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 12,
        dur: 10 + Math.random() * 10,
        size: 14 + Math.random() * 16,
        kind: kinds[i % kinds.length]!,
      })),
    );
  }, [count]);
  return (
    <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden" aria-hidden>
      {items.map((h, i) => (
        <span
          key={i}
          className="animate-float-heart absolute -bottom-10"
          style={{ left: `${h.left}%`, animationDelay: `${h.delay}s`, animationDuration: `${h.dur}s`, fontSize: h.size }}
        >
          {h.kind}
        </span>
      ))}
    </div>
  );
}

/** Confetti burst; change `fire` to trigger again */
export function Confetti({ fire }: { fire: number }) {
  const pieces = useMemo(() => {
    if (!fire) return [];
    const kinds = ["💗", "🎀", "✨", "💖", "🌸", "⭐", "🧁"];
    return Array.from({ length: 36 }, (_, i) => ({
      left: Math.random() * 100,
      dx: `${(Math.random() - 0.5) * 40}vw`,
      delay: Math.random() * 0.4,
      size: 16 + Math.random() * 18,
      kind: kinds[i % kinds.length]!,
    }));
  }, [fire]);
  if (!fire) return null;
  return (
    <div key={fire} className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden>
      {pieces.map((p, i) => (
        <span
          key={i}
          className="animate-confetti absolute top-0"
          style={{ left: `${p.left}%`, animationDelay: `${p.delay}s`, fontSize: p.size, ["--dx" as string]: p.dx }}
        >
          {p.kind}
        </span>
      ))}
    </div>
  );
}

/** Taped scrapbook page wrapper for a scene */
export function ScrapPage({ children, className, tag }: { children: ReactNode; className?: string; tag?: string }) {
  return (
    <section className={cn("scrap-card animate-pop relative mx-auto w-full max-w-2xl px-5 pb-8 pt-10 sm:px-8", className)}>
      <span className="tape -top-3 left-6 -rotate-6" aria-hidden />
      <span className="tape -top-3 right-6 rotate-6" aria-hidden />
      {tag && (
        <span className="font-hand absolute -top-4 left-1/2 -translate-x-1/2 rotate-[-2deg] rounded-full border-2 border-ink bg-secondary px-3 py-0.5 text-lg text-secondary-foreground">
          {tag}
        </span>
      )}
      {children}
    </section>
  );
}

export function SceneTitle({ children, sub }: { children: ReactNode; sub?: ReactNode }) {
  return (
    <header className="mb-6 text-center">
      <h2 className="text-4xl text-cherry sm:text-5xl">{children}</h2>
      <Squiggle className="mx-auto mt-1 h-3 w-32" />
      {sub && <p className="mt-3 text-base text-muted-foreground">{sub}</p>}
    </header>
  );
}

const btnVariants = {
  primary: "bg-candy text-primary-foreground",
  lavender: "bg-secondary text-secondary-foreground",
  peach: "bg-accent text-accent-foreground",
  cream: "bg-card text-foreground",
};
export function PillButton({
  variant = "primary",
  className,
  ...props
}: React.ComponentProps<"button"> & { variant?: keyof typeof btnVariants }) {
  return <button {...props} className={cn("pill px-5 py-3 text-base", btnVariants[variant], className)} />;
}
