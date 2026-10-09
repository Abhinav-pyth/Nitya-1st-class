// Maze Adventure — procedurally generated kid-friendly maze.
// Tap adjacent cells OR swipe OR arrow keys to move 🐰 to the 🥕.
import { useEffect, useMemo, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/sounds';
import { recordGameResult } from '../utils/rewards';

const SIZES = { easy: 7, medium: 11, hard: 15 };
type Diff = keyof typeof SIZES;

// Generate maze with DFS on an odd grid (cells at odd coords, walls even)
function genMaze(n: number): boolean[][] {
  const g: boolean[][] = Array.from({ length: n }, () => Array(n).fill(true)); // true = wall
  const stack: [number, number][] = [[1, 1]];
  g[1][1] = false;
  const dirs = [[0, 2], [0, -2], [2, 0], [-2, 0]];
  while (stack.length) {
    const [r, c] = stack[stack.length - 1];
    const shuffled = [...dirs].sort(() => Math.random() - 0.5);
    let moved = false;
    for (const [dr, dc] of shuffled) {
      const nr = r + dr, nc = c + dc;
      if (nr > 0 && nr < n - 1 && nc > 0 && nc < n - 1 && g[nr][nc]) {
        g[nr][nc] = false; g[r + dr / 2][c + dc / 2] = false;
        stack.push([nr, nc]); moved = true; break;
      }
    }
    if (!moved) stack.pop();
  }
  g[n - 2][n - 2] = false;
  return g;
}

export default function MazeGame({ onBack }: { onBack: () => void }) {
  const [started, setStarted] = useState(false);
  const [diff, setDiff] = useState<Diff>('easy');
  const n = SIZES[diff];
  const [maze, setMaze] = useState<boolean[][]>(() => genMaze(SIZES.easy));
  const [pos, setPos] = useState<[number, number]>([1, 1]);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const start = (d: Diff) => {
    setDiff(d); setMaze(genMaze(SIZES[d])); setPos([1, 1]); setMoves(0); setWon(false);
    soundManager.click();
  };

  const tryMove = (dr: number, dc: number) => {
    if (won) return;
    const [r, c] = pos;
    const nr = r + dr, nc = c + dc;
    if (nr < 0 || nc < 0 || nr >= n || nc >= n || maze[nr][nc]) return;
    setPos([nr, nc]); setMoves(m => m + 1);
    soundManager.click();
    if (nr === n - 2 && nc === n - 2) {
      setWon(true); soundManager.celebrate();
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      recordGameResult('maze', Math.max(1, 20 - Math.floor(moves / 5)));
    }
  };

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      const map: Record<string, [number, number]> = { ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1] };
      if (map[e.key]) { e.preventDefault(); tryMove(...map[e.key]); }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  });

  const cell = useMemo(() => Math.min(Math.floor((typeof window !== 'undefined' ? Math.min(window.innerWidth - 48, 480) : 300) / n), 44), [n]);

  if (!started) {
    return (
      <div className="max-w-xl mx-auto space-y-4">
        <TopBar onBack={onBack} />
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl text-center space-y-5">
          <div className="text-7xl">🌀</div>
          <h3 className="text-2xl font-black text-gray-800">Maze Adventure</h3>
          <p className="text-gray-600">Help 🐰 Bunny reach the 🥕 carrot! Tap a square next to bunny, swipe, or use arrow keys.</p>
          <div className="grid grid-cols-3 gap-3">
            {(['easy', 'medium', 'hard'] as Diff[]).map(d => (
              <button key={d} onClick={() => { setStarted(true); start(d); }}
                className={`py-4 rounded-2xl font-black text-white shadow active:scale-95 transition-transform cursor-pointer ${d === 'easy' ? 'bg-green-500' : d === 'medium' ? 'bg-orange-500' : 'bg-red-500'}`}>
                {d === 'easy' ? '😊 Easy' : d === 'medium' ? '🙂 Medium' : '🧠 Hard'}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-4">
      <TopBar onBack={onBack} />
      <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between text-sm font-black text-gray-600">
          <span>Moves: {moves}</span>
          <div className="flex gap-2">
            {(['easy', 'medium', 'hard'] as Diff[]).map(d => (
              <button key={d} onClick={() => start(d)} className={`px-3 py-1 rounded-full cursor-pointer active:scale-95 ${d === diff ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600'}`}>{d}</button>
            ))}
          </div>
        </div>

        <div
          className="mx-auto select-none touch-none"
          style={{ width: cell * n, height: cell * n }}
          onTouchStart={(e) => { touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; }}
          onTouchEnd={(e) => {
            if (!touchStart.current) return;
            const dx = e.changedTouches[0].clientX - touchStart.current.x;
            const dy = e.changedTouches[0].clientY - touchStart.current.y;
            if (Math.abs(dx) < 20 && Math.abs(dy) < 20) return;
            if (Math.abs(dx) > Math.abs(dy)) tryMove(0, dx > 0 ? 1 : -1); else tryMove(dy > 0 ? 1 : -1, 0);
            touchStart.current = null;
          }}
        >
          {maze.map((row, r) => (
            <div key={r} className="flex">
              {row.map((wall, c) => {
                const isPlayer = pos[0] === r && pos[1] === c;
                const isGoal = r === n - 2 && c === n - 2;
                const adj = Math.abs(pos[0] - r) + Math.abs(pos[1] - c) === 1;
                return (
                  <button key={c} aria-label={isPlayer ? 'You are here' : isGoal ? 'Goal' : wall ? 'wall' : 'path'}
                    onClick={() => { if (adj && !wall) tryMove(r - pos[0], c - pos[1]); }}
                    style={{ width: cell, height: cell }}
                    className={`${wall ? 'bg-indigo-900' : 'bg-amber-50'} flex items-center justify-center ${adj && !wall ? 'ring-2 ring-inset ring-purple-300 cursor-pointer' : ''}`}
                  >
                    {isPlayer && <span style={{ fontSize: cell * 0.7 }}>🐰</span>}
                    {!isPlayer && isGoal && <span style={{ fontSize: cell * 0.7 }}>🥕</span>}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* D-pad for phones */}
        <div className="grid grid-cols-3 gap-2 w-44 mx-auto">
          <div /><Dbtn label="⬆️" onTap={() => tryMove(-1, 0)} />
          <div />
          <Dbtn label="⬅️" onTap={() => tryMove(0, -1)} />
          <Dbtn label="🔄" onTap={() => start(diff)} />
          <Dbtn label="➡️" onTap={() => tryMove(0, 1)} />
          <div /><Dbtn label="⬇️" onTap={() => tryMove(1, 0)} />
          <div />
        </div>

        {won && (
          <div className="rounded-2xl bg-green-50 p-5 text-center space-y-3">
            <div className="text-5xl">🎉</div>
            <p className="text-xl font-black text-gray-800">You escaped in {moves} moves!</p>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => start(diff)} className="py-3 rounded-2xl bg-gradient-to-r from-green-400 to-emerald-600 text-white font-black cursor-pointer active:scale-95">🔄 New Maze</button>
              <button onClick={onBack} className="py-3 rounded-2xl bg-gray-100 font-black text-gray-700 cursor-pointer active:scale-95">🏠 Games</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Dbtn({ label, onTap }: { label: string; onTap: () => void }) {
  return <button onClick={onTap} className="h-14 rounded-2xl bg-purple-100 text-2xl active:scale-90 active:bg-purple-200 transition-transform cursor-pointer touch-manipulation">{label}</button>;
}

function TopBar({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex items-center gap-3">
      <button onClick={onBack} aria-label="Back to games" className="w-11 h-11 bg-white rounded-full shadow flex items-center justify-center text-lg font-black active:scale-95 transition-transform cursor-pointer">←</button>
      <div className="flex-1 bg-gradient-to-r from-teal-400 to-cyan-600 rounded-2xl px-4 py-3 text-white shadow flex items-center justify-between">
        <span className="font-black text-lg">🌀 Maze Adventure</span>
      </div>
    </div>
  );
}
