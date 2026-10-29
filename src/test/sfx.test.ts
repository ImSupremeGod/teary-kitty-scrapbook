import { afterEach, describe, expect, it, vi } from "vitest";
import { playSong, sfxState } from "@/lib/sfx";

afterEach(() => { sfxState.stopSong(); sfxState.setMuted(false); vi.unstubAllGlobals(); });
describe("birthday audio", () => {
  it("unmutes the existing song without stopping playback", async () => {
    const audio = { paused: false, ended: false, volume: 0, muted: false, play: vi.fn().mockResolvedValue(undefined), pause: vi.fn() };
    vi.stubGlobal("Audio", function () { return audio; });
    await playSong();
    sfxState.setMuted(true);
    expect(audio.muted).toBe(true);
    expect(audio.pause).not.toHaveBeenCalled();
    sfxState.setMuted(false);
    expect(audio.muted).toBe(false);
  });
  it("reuses the song when retrying a blocked autoplay", async () => {
    const audio = { paused: true, ended: false, volume: 0, muted: false, play: vi.fn().mockRejectedValueOnce(new Error("blocked")).mockResolvedValue(undefined), pause: vi.fn() };
    const constructor = vi.fn(function () { return audio; });
    vi.stubGlobal("Audio", constructor);
    expect(await playSong()).toBe(false);
    expect(await playSong()).toBe(true);
    expect(constructor).toHaveBeenCalledTimes(1);
  });
});