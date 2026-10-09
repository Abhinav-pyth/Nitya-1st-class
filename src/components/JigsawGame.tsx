// Jigsaw Puzzle — tap-to-place picture tiles (mobile friendly, no drag needed).
// A big emoji "picture" is cut into a grid; pieces are shuffled below.
// Tap a piece, then tap its correct slot (only the right slot accepts it → kid-friendly).
import { useState } from 'react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/sounds';
import { recordGameResult } from '../utils/rewards';
import { shuffle } from './QuizEngine';

const PICTURES = [
  { name: 'Sun & smile', big: '🌞' }, { name: 'Happy dog', big: '🐶' }, { name: 'Red car', big: '🚗' },
  { name: 'Butterfly', big: '🦋' }, { name: 'Rocket', big: '🚀' }, { name: 'Ice cream', big: '🍦' },
  { name: 'Ladybird', big: '🐞' }, { name: 'Whale', big: '🐳' }, { name: 'Balloon', big: '🎈' },
];
const LEVELS = { easy: 3, medium: 4, hard: 5 } as const; // grid NxN
type Diff = keyof typeof LEVELS;

export default function JigsawGame({ onBack }: { onBack: () => void }) {
  const [diff, setDiff] = useState<Diff>('easy');
  const n = LEVELS[diff];
  const total = n * n;
  const [picIdx, setPicIdx] = useState(() => Math.floor(Math.random() * PICTURES.length));
  const pic = PICTURES[picIdx];
  const [placed, setPlaced] = useState<(boolean)[]>(Array(total).fill(false));
  const [tray, setTray] = useState<number[]>(() => shuffle(Array.from({ length: total }, (_, i) => i)));
  const [selected, setSelected] = useState<number | null>(null);
  const [tries, setTries] = useState(0);
  const done = placed.every(Boolean);

  const restart = (d: Diff) => {
    setDiff(d);
    setPicIdx(Math.floor(Math.random() * PICTURES.length));
    setPlaced(Array(LEVELS[d] * LEVELS[d]).fill(false));
    setTray(shuffle(Array.from({ length: LEVELS[d] * LEVELS[d] }, (_, i) => i)));
    setSelected(null); setTries(0);
    soundManager.click();
  };

  // On mount when diff changes we need fresh tray/pic — handled by restart buttons; initial state uses easy.
  const pickPiece = (idx: number) => { if (!done) { setSelected(idx === selected ? null : idx); soundManager.click(); } };

  const placeAt = (slot: number) => {
    if (done || selected === null || placed[slot]) return;
    setTries(t => t + 1);
    if (selected === slot) {
      const np = [...placed]; np[slot] = true; setPlaced(np);
      setTray(tray.filter(i => i !== selected));
      setSelected(null);
      soundManager.correct();
      if (np.every(Boolean)) {
        soundManager.celebrate();
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
        recordGameResult('jigsaw', Math.max(1, total - tries));
      }
    } else {
      soundManager.wrong();
    }
  };

  const cellSize = `${100 / n}%`;

  return (
    <div className="max-w-xl mx-auto space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={onBack} aria-label="Back to games" className="w-11 h-11 bg-white rounded-full shadow flex items-center justify-center text-lg font-black active:scale-95 transition-transform cursor-pointer">←</button>
        <div className="flex-1 bg-gradient-to-r from-fuchsia-500 to-purple-600 rounded-2xl px-4 py-3 text-white shadow flex items-center justify-between">
          <span className="font-black text-lg">🧩 Jigsaw Puzzle</span>
          <span className="text-xs font-bold bg-white/20 rounded-full px-3 py-1">{pic.name}</span>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between text-sm font-black text-gray-600">
          <div className="flex gap-2">
            {(Object.keys(LEVELS) as Diff[]).map(d => (
              <button key={d} onClick={() => restart(d)} className={`px-3 py-1 rounded-full cursor-pointer active:scale-95 ${d === diff ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600'}`}>{d}</button>
            ))}
          </div>
          <span>Moves: {tries}</span>
        </div>

        <p className="text-center text-sm text-gray-600">Tap a piece below 👇 then tap the glowing box where it belongs!</p>

        {/* Ghost preview of full picture */}
        <div className="relative mx-auto aspect-square w-full max-w-[340px] rounded-2xl overflow-hidden border-4 border-purple-200 bg-purple-50">
          {placed.map((isFilled, i) => {
            const r = Math.floor(i / n), c = i % n;
            return (
              <button key={i} onClick={() => placeAt(i)} aria-label={`slot ${i + 1}`}
                className={`absolute flex items-center justify-center border border-purple-200 ${isFilled ? '' : 'cursor-pointer'} ${selected !== null && !isFilled ? 'ring-2 ring-inset ring-amber-400 bg-amber-50/40' : ''}`}
                style={{ left: `${c * 100 / n}%`, top: `${r * 100 / n}%`, width: cellSize, height: cellSize }}>
                {isFilled ? (
                  <span style={{ fontSize: `min(9vw, ${72 / n}px)` }} className="select-none leading-none"
                    // each tile shows the whole emoji clipped to its region via negative offsets
                  >
                    <span className="inline-block relative" style={{ width: `${n * 100}%`, height: `${n * 100}%`, transform: `translate(${-c * 100}%, ${-r * 100}%)` }}>
                      <span className="absolute inset-0 flex items-center justify-center text-7xl sm:text-8xl">{pic.big}</span>
                    </span>
                  </span>
                ) : (
                  <span className="text-purple-300 font-black text-lg">{i + 1}</span>
                )}
              </button>
            );
          })}
          {done && (
            <div className="absolute inset-0 bg-green-500/10 flex items-center justify-center">
              <div className="bg-white rounded-2xl shadow-xl p-5 text-center space-y-2">
                <div className="text-4xl">🏆</div>
                <p className="font-black text-gray-800">Puzzle solved in {tries} moves!</p>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => restart(diff)} className="py-2 rounded-xl bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white font-black cursor-pointer active:scale-95">🔄 New</button>
                  <button onClick={onBack} className="py-2 rounded-xl bg-gray-100 font-black text-gray-700 cursor-pointer active:scale-95">🏠 Games</button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Reference image */}
        <div className="flex items-center justify-center gap-2 text-xs text-gray-500 font-bold">Reference: <span className="text-2xl">{pic.big}</span></div>

        {/* Tray */}
        {!done && (
          <div className="flex flex-wrap gap-2 justify-center min-h-[72px] bg-purple-50 rounded-2xl p-3">
            {tray.map(idx => {
              const r = Math.floor(idx / n), c = idx % n;
              const isSel = selected === idx;
              return (
                <button key={idx} onClick={() => pickPiece(idx)} aria-label={`piece ${idx + 1}`}
                  className={`relative overflow-hidden rounded-xl border-2 bg-white shadow-sm cursor-pointer active:scale-95 transition-all touch-manipulation ${isSel ? 'border-amber-400 ring-2 ring-amber-300 scale-110 z-10' : 'border-purple-200'}`}
                  style={{ width: `${Math.min(64, 320 / n)}px`, height: `${Math.min(64, 320 / n)}px` }}>
                  <span className="absolute" style={{
                    width: `${n * 100}%`, height: `${n * 100}%`, left: `${-c * 100}%`, top: `${-r * 100}%`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: `${Math.min(64, 320 / n) * n * 0.8}px`, lineHeight: 1,
                  }}>{pic.big}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
