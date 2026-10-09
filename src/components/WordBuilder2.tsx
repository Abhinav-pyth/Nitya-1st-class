// Word Builder (Game 4) — arrange letter tiles to spell the picture word.
import { useState } from 'react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/sounds';
import { recordGameResult } from '../utils/rewards';
import { shuffle } from './QuizEngine';
import { speak } from '../utils/store';

const WORDS = [
  { w: 'CAT', emoji: '🐱' }, { w: 'BAT', emoji: '🦇' }, { w: 'SUN', emoji: '☀️' }, { w: 'PEN', emoji: '🖊️' },
  { w: 'DOG', emoji: '🐕' }, { w: 'CUP', emoji: '☕' }, { w: 'BED', emoji: '🛏️' }, { w: 'BOX', emoji: '📦' },
  { w: 'FISH', emoji: '🐟' }, { w: 'STAR', emoji: '⭐' }, { w: 'CAKE', emoji: '🎂' }, { w: 'BALL', emoji: '⚽' },
  { w: 'BOOK', emoji: '📖' }, { w: 'TREE', emoji: '🌳' }, { w: 'MOON', emoji: '🌙' }, { w: 'FROG', emoji: '🐸' },
];
const ROUND = 6;

export default function WordBuilder2({ onBack }: { onBack: () => void }) {
  const [phase, setPhase] = useState<'start' | 'play' | 'done'>('start');
  const [round, setRound] = useState(() => shuffle(WORDS).slice(0, ROUND));
  const [qi, setQi] = useState(0);
  const [slots, setSlots] = useState<(string | null)[]>([]);
  const [tiles, setTiles] = useState<{ ch: string; used: boolean }[]>([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [status, setStatus] = useState<'idle' | 'right' | 'wrong'>('idle');

  const cur = round[qi];

  const start = () => {
    const r = shuffle(WORDS).slice(0, ROUND);
    setRound(r); setQi(0); setCorrectCount(0); setPhase('play');
    setupFor(r[0]);
    soundManager.click();
  };

  const setupFor = (item: typeof WORDS[number]) => {
    const letters = item.w.split('');
    setSlots(Array(letters.length).fill(null));
    // tiles: correct letters + one decoy for challenge
    const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const decoy = alpha[Math.floor(Math.random() * 26)];
    setTiles(shuffle([...letters, decoy]).map(ch => ({ ch, used: false })));
    setStatus('idle');
  };

  const placeTile = (idx: number) => {
    if (status === 'right') return;
    const t = tiles[idx];
    if (!t || t.used) return;
    const emptySlot = slots.findIndex(s => s === null);
    if (emptySlot === -1) return;
    const ns = [...slots]; ns[emptySlot] = t.ch;
    setSlots(ns);
    setTiles(ts => ts.map((x, i) => i === idx ? { ...x, used: true } : x));
    soundManager.click();
    if (ns.every(s => s !== null)) check(ns.join(''));
  };

  const removeFromSlot = (idx: number) => {
    if (status === 'right') return;
    const ch = slots[idx]; if (!ch) return;
    const ns = [...slots]; ns[idx] = null; setSlots(ns);
    setTiles(ts => { const i = ts.findIndex(t => t.used && t.ch === ch); return ts.map((t, j) => j === i ? { ...t, used: false } : t); });
    setStatus('idle');
    soundManager.click();
  };

  const check = (word: string) => {
    if (word === cur.w) {
      setStatus('right'); setCorrectCount(c => c + 1);
      soundManager.correct(); speak(cur.w);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } else {
      setStatus('wrong'); soundManager.wrong();
    }
  };

  const next = () => {
    if (qi + 1 < round.length) { const nq = qi + 1; setQi(nq); setupFor(round[nq]); }
    else {
      setPhase('done'); soundManager.celebrate();
      recordGameResult('word-builder-2', correctCount);
    }
  };

  const retry = () => { if (cur) setupFor(cur); };

  if (phase === 'start') {
    return (
      <div className="max-w-xl mx-auto space-y-4">
        <Header onBack={onBack} />
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl text-center space-y-5">
          <div className="text-7xl">🔤</div>
          <h3 className="text-2xl font-black text-gray-800">Word Builder</h3>
          <p className="text-gray-600">Look at the picture and tap the letter tiles in the right order to build the word!</p>
          <div className="bg-purple-50 rounded-2xl p-4 text-sm text-gray-700">✅ {ROUND} words • 🌈 No time limit • ⭐ Earn stars</div>
          <button onClick={start} className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-400 to-red-500 text-white text-xl font-black shadow-lg active:scale-95 transition-transform cursor-pointer">▶️ Start Playing!</button>
        </div>
      </div>
    );
  }

  if (phase === 'done') {
    return (
      <div className="max-w-xl mx-auto space-y-4">
        <Header onBack={onBack} />
        <div className="bg-white rounded-3xl p-8 shadow-xl text-center space-y-5">
          <div className="text-6xl">🏆</div>
          <h3 className="text-2xl font-black text-gray-800">You built {correctCount} of {round.length} words!</h3>
          <div className="text-4xl">{'⭐'.repeat(correctCount >= 4 ? 3 : correctCount >= 2 ? 2 : 1)}</div>
          <p className="text-sm text-gray-500 bg-blue-50 rounded-2xl p-3">💡 Say each word aloud while spelling — it helps your brain remember!</p>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={start} className="py-4 rounded-2xl bg-gradient-to-r from-orange-400 to-red-500 text-white font-black cursor-pointer active:scale-95">🔄 Play Again</button>
            <button onClick={onBack} className="py-4 rounded-2xl bg-gray-100 text-gray-700 font-black cursor-pointer active:scale-95">🏠 Games Menu</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-4">
      <Header onBack={onBack} />
      <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-xl space-y-5">
        <div className="flex items-center justify-between text-xs font-black text-gray-500">
          <span>Word {qi + 1}/{round.length}</span><span className="text-amber-500">⭐ {correctCount}</span>
        </div>
        <div className="text-center space-y-2">
          <div className="text-8xl">{cur.emoji}</div>
          <button onClick={() => speak(cur.w)} className="px-4 py-1 rounded-full bg-cyan-100 text-cyan-700 font-bold text-sm cursor-pointer active:scale-95" aria-label="Hear the word">🔊 Hear word</button>
          <p className="text-sm text-gray-500">Tap tiles to fill the boxes in order!</p>
        </div>

        {/* Slots */}
        <div className="flex justify-center gap-2">
          {slots.map((s, i) => (
            <button key={i} onClick={() => removeFromSlot(i)}
              className={`w-14 h-14 rounded-2xl border-4 font-black text-2xl flex items-center justify-center cursor-pointer transition-all ${status === 'right' ? 'border-green-400 bg-green-50 text-green-700' : status === 'wrong' && s ? 'border-red-300 bg-red-50 text-red-600' : 'border-dashed border-purple-300 bg-purple-50 text-purple-700'}`}>
              {s ?? ''}
            </button>
          ))}
        </div>

        {status === 'wrong' && (
          <div className="rounded-2xl bg-amber-50 p-4 text-center space-y-3">
            <p className="font-black text-gray-800">Almost! Try again! 💪 That's not quite right.</p>
            <button onClick={retry} className="px-6 py-2 rounded-2xl bg-gradient-to-r from-orange-400 to-red-500 text-white font-black cursor-pointer active:scale-95">🔄 Clear & Retry</button>
          </div>
        )}
        {status === 'right' && (
          <div className="rounded-2xl bg-green-50 p-4 text-center space-y-3">
            <p className="font-black text-gray-800 text-xl">Great job! {cur.w} {cur.emoji} is correct! 🎉</p>
            <button onClick={next} className="px-8 py-3 rounded-2xl bg-gradient-to-r from-green-400 to-emerald-600 text-white font-black text-lg cursor-pointer active:scale-95">{qi + 1 < round.length ? 'Next Word ➡️' : 'See Results 🏁'}</button>
          </div>
        )}

        {/* Tiles */}
        {status !== 'right' && (
          <div className="flex flex-wrap justify-center gap-2 bg-purple-50 rounded-2xl p-3 min-h-[68px]">
            {tiles.map((t, i) => (
              <button key={i} disabled={t.used} onClick={() => placeTile(i)}
                className={`w-13 h-13 min-w-[52px] min-h-[52px] rounded-xl text-2xl font-black shadow cursor-pointer active:scale-90 transition-all ${t.used ? 'opacity-20 bg-gray-200 text-gray-400' : 'bg-white text-gray-800 border-2 border-purple-200 hover:border-purple-400'}`}>
                {t.ch}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Header({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex items-center gap-3">
      <button onClick={onBack} aria-label="Back to games" className="w-11 h-11 bg-white rounded-full shadow flex items-center justify-center text-lg font-black active:scale-95 transition-transform cursor-pointer">←</button>
      <div className="flex-1 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl px-4 py-3 text-white shadow flex items-center justify-between">
        <span className="font-black text-lg">🔤 Word Builder</span>
      </div>
    </div>
  );
}
