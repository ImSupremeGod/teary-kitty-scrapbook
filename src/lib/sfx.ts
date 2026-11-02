/**
 * Tiny sound manager. Plays creator-provided meme sounds from /audio/
 * (public/audio/birthday-meme-1..3.mp3). If a file is missing, falls back to
 * a soft synthesized chirp. The birthday song tries autoplay and retries on interaction.
 */
import birthdaySong from "@/assets/birthday-song.mp3.asset.json";
import birthdaySong2 from "@/assets/birthday-song-2.mp3.asset.json";

type Sfx = "pop" | "yay" | "sad" | "flip" | "blow" | "song";

/** Birthday playlist: song 2 starts automatically when song 1 ends. */
const SONGS = [birthdaySong.url, birthdaySong2.url].filter(Boolean);

const FILES: Partial<Record<Sfx, string>> = {
  song: birthdaySong.url,
};

let muted = false;
let volume = 0.6;
let current: HTMLAudioElement | null = null;
let ctx: AudioContext | null = null;
let songSession = false; // playlist chaining armed; cleared by stopSong
const missing = new Set<string>();

function makeSong(index: number): HTMLAudioElement {
  const a = new Audio(SONGS[index]);
  a.volume = volume;
  a.onended = () => {
    if (!songSession || index + 1 >= SONGS.length) return;
    const next = makeSong(index + 1);
    next.muted = muted;
    current = next;
    next.play().catch(() => {});
  };
  return a;
}

export const sfxState = {
  get muted() { return muted; },
  get volume() { return volume; },
  setMuted(m: boolean) {
    muted = m;
    if (current) {
      current.muted = m;
      if (!m && current.paused && !current.ended) void current.play().catch(() => {});
    }
  },
  setVolume(v: number) { volume = Math.max(0, Math.min(1, v)); if (current) current.volume = volume; },
  stopSong() { songSession = false; if (current) current.pause(); current = null; },
};

function chirp(kind: Sfx) {
  try {
    ctx ??= new AudioContext();
    const audioContext = ctx;
    if (audioContext.state === "suspended") void audioContext.resume().catch(() => {});
    const notes: Record<Sfx, number[]> = {
      pop: [880], flip: [660, 990], yay: [523, 659, 784, 1046], sad: [440, 370, 311], blow: [300, 200], song: [523, 659, 784],
    };
    notes[kind].forEach((f, i) => {
      const o = audioContext.createOscillator();
      const g = audioContext.createGain();
      o.type = "triangle";
      o.frequency.value = f;
      const t = audioContext.currentTime + i * 0.09;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(Math.max(0.0001, 0.12 * volume), t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);
      o.connect(g).connect(audioContext.destination);
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
  if (current && !current.paused && !current.ended) return Promise.resolve(true);
  songSession = true;
  const a = current && !current.ended ? current : makeSong(0);
  a.volume = volume;
  current = a;
  return a.play().then(() => true, () => false);
}
