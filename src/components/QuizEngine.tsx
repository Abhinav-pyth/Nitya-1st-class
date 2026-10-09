// Shared "quiz engine" — powers all question-based educational games.
// Start screen with instructions, difficulty levels, big touch buttons,
// immediate encouraging feedback, progress bar, no timers by default,
// results screen with stars + learning tip, replay & home buttons.
import { useEffect, useMemo, useState } from 'react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/sounds';
import { recordGameResult } from '../utils/rewards';

export interface QuizItem {
  prompt: string;            // question text
  display?: React.ReactNode; // optional visual (emoji grid, picture, etc.)
  options: { label: string; value: string; emoji?: string }[];
  answer: string;            // matching option value
  explain?: string;          // shown after answering (learning moment)
}

export type Difficulty = 'easy' | 'medium' | 'hard';

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function pickQuestions(all: QuizItem[], count: number): QuizItem[] {
  return shuffle(all).slice(0, count);
}

interface QuizEngineProps {
  gameId: string;
  title: string;
  emoji: string;
  gradient: string; // tailwind e.g. from-green-400 to-emerald-600
  instructions: string;
  questions: QuizItem[];              // full pool
  perRound?: number;                  // questions per round (default 8)
  onBack: () => void;
  encouragement?: string[];           // rotating praise words
}

const PRAISE = ['Great job! 🎉', 'Wonderful! ⭐', 'Awesome! 🌟', 'You got it! 👏', 'Superbrain! 🧠', 'Well done! 🥳'];

export default function QuizEngine({ gameId, title, emoji, gradient, instructions, questions, perRound = 8, onBack, encouragement = PRAISE }: QuizEngineProps) {
  const [phase, setPhase] = useState<'start' | 'play' | 'done'>('start');
  const [round, setRound] = useState<QuizItem[]>([]);
  const [qi, setQi] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const msg = useMemo(() => encouragement[Math.floor(Math.random() * encouragement.length)], [encouragement, qi]);

  const start = () => {
    setRound(pickQuestions(questions, Math.min(perRound, questions.length)));
    setQi(0); setPicked(null); setCorrectCount(0); setStreak(0);
    setPhase('play');
    soundManager.click();
  };

  const q = round[qi];

  const choose = (value: string) => {
    if (picked !== null || !q) return;
    setPicked(value);
    if (value === q.answer) {
      soundManager.correct();
      setCorrectCount(c => c + 1);
      setStreak(s => s + 1);
      if (Math.random() < 0.3) confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
    } else {
      soundManager.wrong();
      setStreak(0);
    }
  };

  const next = () => {
    if (qi + 1 < round.length) {
      setQi(qi + 1); setPicked(null);
    } else {
      setPhase('done');
      soundManager.celebrate();
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });
      recordGameResult(gameId, correctCount);
    }
  };

  useEffect(() => { /* keyboard support: 1/2/3 to answer, Enter for next */
    const h = (e: KeyboardEvent) => {
      if (phase !== 'play' || !q) return;
      if (['1', '2', '3', '4'].includes(e.key)) {
        const idx = parseInt(e.key) - 1;
        if (q.options[idx]) choose(q.options[idx].value);
      } else if (e.key === 'Enter' && picked !== null) next();
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  });

  const pct = Math.round((qi / Math.max(round.length, 1)) * 100);
  const stars = phase === 'done' ? (correctCount === round.length ? 3 : correctCount >= round.length * 0.6 ? 2 : 1) : 0;

  return (
    <div className="max-w-xl mx-auto space-y-4">
      {/* Top bar */}
      <div className="flex items-center gap-3">
        <button onClick={onBack} aria-label="Back to games" className="w-11 h-11 bg-white rounded-full shadow flex items-center justify-center text-lg font-black active:scale-95 transition-transform cursor-pointer">←</button>
        <div className={`flex-1 bg-gradient-to-r ${gradient} rounded-2xl px-4 py-3 text-white shadow flex items-center justify-between`}>
          <span className="font-black text-lg">{emoji} {title}</span>
          <MuteBtn />
        </div>
      </div>

      {phase === 'start' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl text-center space-y-5">
          <div className="text-7xl">{emoji}</div>
          <h3 className="text-2xl font-black text-gray-800">How to play</h3>
          <p className="text-gray-600 text-base leading-relaxed">{instructions}</p>
          <div className="bg-purple-50 rounded-2xl p-4 text-sm text-gray-700">
            ✅ {perRound} fun questions • 🌈 No time limit • ⭐ Earn stars • 💪 Try again is always okay!
          </div>
          <button onClick={start} className={`w-full py-4 rounded-2xl bg-gradient-to-r ${gradient} text-white text-xl font-black shadow-lg active:scale-95 transition-transform cursor-pointer`}>
            ▶️ Start Playing!
          </button>
        </div>
      )}

      {phase === 'play' && q && (
        <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-xl space-y-4">
          {/* Progress */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
              <div className={`h-full bg-gradient-to-r ${gradient} transition-all duration-300`} style={{ width: `${pct}%` }} />
            </div>
            <span className="text-xs font-black text-gray-500 whitespace-nowrap">{qi + 1}/{round.length}</span>
            <span className="text-xs font-black text-amber-500 whitespace-nowrap">⭐ {correctCount}</span>
          </div>
          {streak >= 3 && <div className="text-center text-sm font-black text-orange-500 animate-pulse">🔥 {streak} in a row!</div>}

          {/* Prompt */}
          <div className="text-center">
            {q.display && <div className="mb-3 flex justify-center">{q.display}</div>}
            <p className="text-xl sm:text-2xl font-black text-gray-800 leading-snug">{q.prompt}</p>
          </div>

          {/* Options */}
          <div className={`grid gap-3 ${q.options.length > 3 ? 'grid-cols-2' : 'grid-cols-1'}`}>
            {q.options.map((opt, i) => {
              const isAnswer = opt.value === q.answer;
              const isPicked = picked === opt.value;
              let cls = 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-100 hover:border-purple-300';
              if (picked !== null) {
                if (isAnswer) cls = 'bg-green-100 border-green-400 ring-2 ring-green-300';
                else if (isPicked) cls = 'bg-red-100 border-red-300';
                else cls = 'bg-gray-50 border-gray-100 opacity-60';
              }
              return (
                <button key={opt.value} onClick={() => choose(opt.value)} disabled={picked !== null}
                  className={`${cls} border-2 rounded-2xl p-4 text-left font-bold text-gray-700 text-lg min-h-[64px] active:scale-[0.98] transition-all cursor-pointer flex items-center gap-3 touch-manipulation`}>
                  {opt.emoji && <span className="text-3xl">{opt.emoji}</span>}
                  <span className="flex-1">{opt.label}</span>
                  {picked !== null && isAnswer && <span className="text-2xl">✅</span>}
                  {picked !== null && isPicked && !isAnswer && <span className="text-2xl">❌</span>}
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          {picked !== null && (
            <div className={`rounded-2xl p-4 text-center space-y-3 ${picked === q.answer ? 'bg-green-50' : 'bg-amber-50'}`}>
              <p className="text-xl font-black text-gray-800">
                {picked === q.answer ? msg : 'Try again next time! You are learning every day! 💪'}
              </p>
              {q.explain && <p className="text-sm text-gray-600">{q.explain}</p>}
              <button onClick={next} className={`px-8 py-3 rounded-2xl bg-gradient-to-r ${gradient} text-white font-black text-lg shadow active:scale-95 transition-transform cursor-pointer`}>
                {qi + 1 < round.length ? 'Next ➡️' : 'See Results 🏁'}
              </button>
            </div>
          )}
        </div>
      )}

      {phase === 'done' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl text-center space-y-5">
          <div className="text-6xl">{stars === 3 ? '🏆' : stars === 2 ? '🌟' : '💪'}</div>
          <h3 className="text-2xl font-black text-gray-800">{stars === 3 ? 'Perfect! Amazing!' : 'Well played!'}</h3>
          <div className="text-4xl tracking-widest">{'⭐'.repeat(stars)}{'☆'.repeat(3 - stars)}</div>
          <p className="text-lg text-gray-700 font-bold">You got {correctCount} of {round.length} correct!</p>
          <p className="text-sm text-gray-500 bg-blue-50 rounded-2xl p-3">💡 Tip: {round.find(r => r.explain)?.explain || 'Practising a little every day makes you super smart!'}</p>
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button onClick={start} className={`py-4 rounded-2xl bg-gradient-to-r ${gradient} text-white font-black text-lg shadow active:scale-95 transition-transform cursor-pointer`}>🔄 Play Again</button>
            <button onClick={onBack} className="py-4 rounded-2xl bg-gray-100 text-gray-700 font-black text-lg active:scale-95 transition-transform cursor-pointer">🏠 Games Menu</button>
          </div>
        </div>
      )}
    </div>
  );
}

export function MuteBtn() {
  const [muted, setMuted] = useState(soundManager.isMuted());
  return (
    <button aria-label={muted ? 'Unmute sounds' : 'Mute sounds'}
      onClick={(e) => { e.stopPropagation(); const m = soundManager.toggleMuted(); setMuted(m); if (!m) soundManager.click(); }}
      className="w-10 h-10 rounded-full bg-white/25 text-lg flex items-center justify-center active:scale-90 transition-transform cursor-pointer shrink-0">
      {muted ? '🔇' : '🔊'}
    </button>
  );
}
