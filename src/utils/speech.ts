// Lightweight text-to-speech helper — does NOT import store.ts (avoids pulling
// all lesson data into components that only need audio). Respects the global
// mute switch so every game/lesson can be silenced from one place.
export function tts(text: string, lang: string = 'en-IN'): void {
  try {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (localStorage.getItem('kb_muted') === '1') return; // muted globally
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang;
    u.rate = 0.85;
    u.pitch = 1.1;
    window.speechSynthesis.speak(u);
  } catch {}
}

export const ttsHindi = (text: string) => tts(text, 'hi-IN');

export const speechSupported = (): boolean =>
  typeof window !== 'undefined' && 'speechSynthesis' in window;
