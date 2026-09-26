// Sound utilities using Web Audio API
class SoundManager {
  private audioContext: AudioContext | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  private playTone(frequency: number, duration: number, type: OscillatorType = 'sine') {
    if (!this.audioContext) return;
    
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = type;
    
    gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
    
    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
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
    const notes = [523.25, 659.25, 783.99, 1046.50];
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
