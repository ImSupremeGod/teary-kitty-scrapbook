/**
 * Tiny sound manager. Plays creator-provided meme sounds from /audio/
 * (public/audio/birthday-meme-1..3.mp3). If a file is missing, falls back to
 * a soft synthesized chirp. Never autoplays; only call from user interactions.
 */
import birthdaySong from "@/assets/birthday-song.mp3.asset.json";

type Sfx = "pop" | "yay" | "sad" | "flip" | "blow" | "song";

const FILES: Partial<Record<Sfx, string>> = {
  song: birthdaySong.url,
};

let muted = false;
let volume = 0.6;
let current: HTMLAudioElement | null = null;
let ctx: AudioContext | null = null;
const missing = new Set<string>();

export const sfxState = {
  get muted() { return muted; },
  get volume() { return volume; },
  setMuted(m: boolean) { muted = m; if (m && current) current.pause(); },
  setVolume(v: number) { volume = v; if (current) current.volume = v; },
};

function chirp(kind: Sfx) {
  try {
    ctx ??= new AudioContext();
    const notes: Record<Sfx, number[]> = {
      pop: [880], flip: [660, 990], yay: [523, 659, 784, 1046], sad: [440, 370, 311], blow: [300, 200], song: [523, 659, 784],
    };
    notes[kind].forEach((f, i) => {
      const o = ctx!.createOscillator();
      const g = ctx!.createGain();
      o.type = "triangle";
      o.frequency.value = f;
      const t = ctx!.currentTime + i * 0.09;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.12 * volume, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);
      o.connect(g).connect(ctx!.destination);
      o.start(t);
      o.stop(t + 0.2);
    });
  } catch {
    /* audio is optional */
  }
}

export function play(kind: Sfx) {
  if (muted || typeof window === "undefined") return;
  const file = FILES[kind];
  if (!file || missing.has(file)) return chirp(kind);
  if (current) { current.pause(); current = null; } // no overlapping
  const a = new Audio(file);
  a.volume = volume;
  current = a;
  a.play().catch(() => { missing.add(file); chirp(kind); });
  a.onerror = () => { missing.add(file); };
}

/** Try to start the birthday song; resolves false if the browser blocked autoplay. */
export function playSong(): Promise<boolean> {
  if (muted || typeof window === "undefined") return Promise.resolve(false);
  if (current && !current.paused) return Promise.resolve(true);
  const a = new Audio(birthdaySong.url);
  a.volume = volume;
  current = a;
  return a.play().then(() => true, () => false);
}
