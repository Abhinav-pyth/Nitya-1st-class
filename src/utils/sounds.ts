// Sound utilities using Web Audio API
class SoundManager {
  private audioContext: AudioContext | null = null;

  // Lazily create/resume the AudioContext. Browsers (especially mobile) block
  // audio until it is created or resumed from a user gesture — creating it in
  // the constructor left it permanently "suspended" on phones, so no game
  // sounds played at all.
  private ensureContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    try {
      if (!this.audioContext) {
        const Ctx = window.AudioContext || (window as any).webkitAudioContext;
        if (!Ctx) return null;
        this.audioContext = new Ctx();
      }
      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume().catch(() => {});
      }
      return this.audioContext;
    } catch {
      return null;
    }
  }

  // Call once from a user gesture (e.g. first tap/click) to unlock audio on mobile.
  unlock() {
    this.ensureContext();
  }

  private playTone(frequency: number, duration: number, type: OscillatorType = 'sine') {
    const ctx = this.ensureContext();
    if (!ctx) return;

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  }

  correct() {
    this.playTone(523.25, 0.1, 'sine');
    setTimeout(() => this.playTone(659.25, 0.1, 'sine'), 100);
    setTimeout(() => this.playTone(783.99, 0.2, 'sine'), 200);
  }

  wrong() {
    this.playTone(392, 0.15, 'sine');
    setTimeout(() => this.playTone(349.23, 0.2, 'sine'), 150);
  }

  click() {
    this.playTone(800, 0.05, 'square');
  }

  celebrate() {
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((note, i) => {
      setTimeout(() => this.playTone(note, 0.15, 'sine'), i * 100);
    });
  }

  startQuiz() {
    this.playTone(440, 0.1, 'sine');
    setTimeout(() => this.playTone(554.37, 0.1, 'sine'), 100);
    setTimeout(() => this.playTone(659.25, 0.15, 'sine'), 200);
  }

  levelUp() {
    const notes = [392, 440, 494, 523, 587, 659, 740, 784];
    notes.forEach((note, i) => {
      setTimeout(() => this.playTone(note, 0.1, 'triangle'), i * 80);
    });
  }
}

export const soundManager = new SoundManager();
