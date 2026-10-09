import { useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/sounds';

// ---------- Types ----------
type Cell = number; // -1 = empty, 0..6 = color index
type Piece = { shape: number[][]; color: number };

// ---------- Colors (block faces) ----------
const COLORS = [
  { bg: '#ef4444', light: '#fca5a5', dark: '#b91c1c' }, // red
  { bg: '#3b82f6', light: '#93c5fd', dark: '#1d4ed8' }, // blue
  { bg: '#22c55e', light: '#86efac', dark: '#15803d' }, // green
  { bg: '#eab308', light: '#fde047', dark: '#a16207' }, // yellow
  { bg: '#a855f7', light: '#d8b4fe', dark: '#7e22ce' }, // purple
  { bg: '#f97316', light: '#fdba74', dark: '#c2410c' }, // orange
  { bg: '#06b6d4', light: '#67e8f9', dark: '#0e7490' }, // cyan
];

// ---------- All block shapes (classic 1010!/Block Blast style) ----------
const SHAPES: number[][][] = [
  [[1]],                       // dot
  [[1, 1]],                    // 1x2
  [[1], [1]],                  // 2x1
  [[1, 1, 1]],                 // 1x3
  [[1], [1], [1]],             // 3x1
  [[1, 1, 1, 1]],              // 1x4
  [[1], [1], [1], [1]],        // 4x1
  [[1, 1, 1, 1, 1]],           // 1x5
  [[1], [1], [1], [1], [1]],   // 5x1
  [[1, 1], [1, 1]],            // 2x2 square
  [[1, 1, 1], [1, 1, 1], [1, 1, 1]], // 3x3 square
  [[1, 1], [1, 0]],            // small L
  [[1, 1], [0, 1]],
  [[1, 0], [1, 1]],
  [[0, 1], [1, 1]],
  [[1, 0, 0], [1, 0, 0], [1, 1, 1]], // big L
  [[0, 0, 1], [0, 0, 1], [1, 1, 1]],
  [[1, 1, 1], [1, 0, 0], [1, 0, 0]],
  [[1, 1, 1], [0, 0, 1], [0, 0, 1]],
  [[1, 1, 0], [0, 1, 1]],      // S / Z
  [[0, 1, 1], [1, 1, 0]],
  [[1, 0], [1, 1], [0, 1]],    // S / Z vertical
  [[0, 1], [1, 1], [1, 0]],
  [[1, 1, 1], [0, 1, 0]],      // T
  [[0, 1, 0], [1, 1, 1]],
  [[1, 0], [1, 1], [1, 0]],
  [[0, 1], [1, 1], [0, 1]],
  [[1, 0, 0], [0, 1, 0], [0, 0, 1]], // diagonal
  [[0, 0, 1], [0, 1, 0], [1, 0, 0]],
  [[1, 1, 0], [1, 0, 0], [0, 1, 1]], // 2x3 U-ish
  [[0, 1, 1], [0, 1, 0], [1, 1, 0]],
];

const BOARD_SIZE = 8;
const makeEmptyBoard = (): Cell[][] =>
  Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(-1));

const randomPieces = (): Piece[] =>
  Array.from({ length: 3 }, () => ({
    shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
    color: Math.floor(Math.random() * COLORS.length),
  }));

// ---------- Helpers ----------
function canPlace(board: Cell[][], piece: Piece, row: number, col: number): boolean {
  for (let r = 0; r < piece.shape.length; r++) {
    for (let c = 0; c < piece.shape[r].length; c++) {
      if (!piece.shape[r][c]) continue;
      const br = row + r, bc = col + c;
      if (br < 0 || br >= BOARD_SIZE || bc < 0 || bc >= BOARD_SIZE) return false;
      if (board[br][bc] !== -1) return false;
    }
  }
  return true;
}

function anyValidPlacement(board: Cell[][], piece: Piece): boolean {
  for (let r = 0; r <= BOARD_SIZE - piece.shape.length; r++)
    for (let c = 0; c <= BOARD_SIZE - piece.shape[0].length; c++)
      if (canPlace(board, piece, r, c)) return true;
  return false;
}

function findFullLines(board: Cell[][]): { rows: number[]; cols: number[] } {
  const rows: number[] = [], cols: number[] = [];
  for (let r = 0; r < BOARD_SIZE; r++) if (board[r].every((v) => v !== -1)) rows.push(r);
  for (let c = 0; c < BOARD_SIZE; c++) {
    let full = true;
    for (let r = 0; r < BOARD_SIZE; r++) if (board[r][c] === -1) { full = false; break; }
    if (full) cols.push(c);
  }
  return { rows, cols };
}

export default function BlockPuzzleGame({ onBack }: { onBack: () => void }) {
  const [board, setBoard] = useState<Cell[][]>(makeEmptyBoard);
  const [pieces, setPieces] = useState<Piece[]>(randomPieces);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => Number(localStorage.getItem('blockPuzzleBest') || 0));
  const [combo, setCombo] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [clearing, setClearing] = useState<Set<string>>(new Set());
  const [message, setMessage] = useState('');

  const flash = (text: string) => {
    setMessage(text);
    setTimeout(() => setMessage(''), 1200);
  };

  const placePiece = useCallback((row: number, col: number, idx: number) => {
    const piece = pieces[idx];
    if (!piece || gameOver) return;
    if (!canPlace(board, piece, row, col)) { soundManager.wrong(); return; }

    // Place blocks
    const next = board.map((r) => [...r]);
    let placedCells = 0;
    for (let r = 0; r < piece.shape.length; r++)
      for (let c = 0; c < piece.shape[r].length; c++)
        if (piece.shape[r][c]) { next[r + row][c + col] = piece.color; placedCells++; }

    // Check lines
    const { rows, cols } = findFullLines(next);
    const lineCount = rows.length + cols.length;
    let gained = placedCells;

    if (lineCount > 0) {
      const clearSet = new Set<string>();
      rows.forEach((r) => { for (let c = 0; c < BOARD_SIZE; c++) clearSet.add(`${r},${c}`); });
      cols.forEach((c) => { for (let r = 0; r < BOARD_SIZE; r++) clearSet.add(`${r},${c}`); });
      clearSet.forEach((key) => { const [r, c] = key.split(',').map(Number); next[r][c] = -1; });
      const newCombo = combo + 1;
      setCombo(newCombo);
      gained += lineCount * BOARD_SIZE * 2 + (newCombo - 1) * 15;
      setClearing(clearSet);
      setTimeout(() => setClearing(new Set()), 350);
      soundManager.correct();
      if (lineCount >= 2 || newCombo >= 2) {
        flash(lineCount >= 2 ? `🔥 ${lineCount} LINES!` : `⚡ COMBO x${newCombo}!`);
        confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
      } else {
        flash('✨ Line cleared!');
      }
    } else {
      setCombo(0);
      soundManager.click();
    }

    const remaining = pieces.filter((_, i) => i !== idx);
    let nextPieces = remaining;
    let finalBoard = next;

    // Refill when all three used — but only if placement is still possible
    if (remaining.length === 0) {
      nextPieces = randomPieces();
    }
    const playable = nextPieces.some((p) => anyValidPlacement(finalBoard, p));
    if (!playable) {
      // try a fresh set before declaring game over
      const fresh = randomPieces();
      if (fresh.some((p) => anyValidPlacement(finalBoard, p))) {
        nextPieces = fresh;
      } else {
        setGameOver(true);
      }
    }

    setBoard(finalBoard);
    setPieces(nextPieces);
    setSelected(null);
    const newScore = score + gained;
    setScore(newScore);
    if (newScore > best) {
      setBest(newScore);
      localStorage.setItem('blockPuzzleBest', String(newScore));
    }
  }, [board, pieces, combo, score, best, gameOver]);

  const cellClick = (r: number, c: number) => {
    if (selected === null) {
      // Auto-select first placeable piece hint? No — just ignore.
      return;
    }
    const piece = pieces[selected];
    if (!piece) return;
    // Anchor so the tap lands near the middle of the piece
    const row = Math.max(0, Math.min(BOARD_SIZE - piece.shape.length, r - Math.floor(piece.shape.length / 2)));
    const col = Math.max(0, Math.min(BOARD_SIZE - piece.shape[0].length, c - Math.floor(piece.shape[0].length / 2)));
    placePiece(row, col, selected);
  };

  const restart = () => {
    setBoard(makeEmptyBoard());
    setPieces(randomPieces());
    setSelected(null);
    setScore(0);
    setCombo(0);
    setGameOver(false);
    setClearing(new Set());
    soundManager.click();
  };

  const renderMiniPiece = (piece: Piece, idx: number) => {
    const isSel = selected === idx;
    const placeable = anyValidPlacement(board, piece);
    const col = COLORS[piece.color];
    return (
      <button
        key={idx}
        onClick={() => { if (!placeable || gameOver) return; setSelected(isSel ? null : idx); soundManager.click(); }}
        disabled={!placeable || gameOver}
        className={`flex-1 flex items-center justify-center rounded-xl p-2 transition-all min-h-[84px] touch-manipulation
          ${isSel ? 'bg-white ring-4 scale-105 shadow-lg' : 'bg-white/60'}
          ${placeable && !gameOver ? 'active:scale-95' : 'opacity-30 grayscale cursor-not-allowed'}`}
        style={isSel ? { boxShadow: `0 0 0 4px ${col.light}` } : undefined}
      >
        <div className="grid gap-[3px]" style={{ gridTemplateColumns: `repeat(${piece.shape[0].length}, 1fr)` }}>
          {piece.shape.flatMap((rowArr, r) =>
            rowArr.map((v, c) => (
              <div
                key={`${r}-${c}`}
                className="w-5 h-5 sm:w-6 sm:h-6 rounded-[4px]"
                style={v ? {
                  background: `linear-gradient(145deg, ${col.light} 0%, ${col.bg} 45%, ${col.dark} 100%)`,
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,.5), 0 1px 2px rgba(0,0,0,.2)',
                } : undefined}
              />
            ))
          )}
        </div>
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 via-purple-50 to-pink-100 py-4 px-3">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <button onClick={onBack} className="w-11 h-11 bg-white rounded-2xl shadow flex items-center justify-center font-bold text-xl active:scale-95 transition-transform">←</button>
          <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">🧱 Block Puzzle</h1>
          <button onClick={restart} className="w-11 h-11 bg-white rounded-2xl shadow flex items-center justify-center text-xl active:scale-95 transition-transform" title="Restart">🔄</button>
        </div>

        {/* Score bar */}
        <div className="flex gap-2 mb-3">
          <div className="flex-1 bg-white rounded-2xl shadow px-4 py-2 text-center">
            <div className="text-[10px] font-bold text-gray-400 uppercase">Score</div>
            <div className="text-xl font-black text-indigo-600">{score}</div>
          </div>
          <div className="flex-1 bg-white rounded-2xl shadow px-4 py-2 text-center">
            <div className="text-[10px] font-bold text-gray-400 uppercase">Best</div>
            <div className="text-xl font-black text-amber-500">{best}</div>
          </div>
          <div className="flex-1 bg-white rounded-2xl shadow px-4 py-2 text-center">
            <div className="text-[10px] font-bold text-gray-400 uppercase">Combo</div>
            <div className="text-xl font-black text-pink-500">x{Math.max(combo, 1)}</div>
          </div>
        </div>

        {/* Message toast */}
        <div className="h-6 text-center mb-1">
          {message && <span className="font-black text-lg text-purple-600 animate-bounce inline-block">{message}</span>}
        </div>

        {/* Board */}
        <div className="bg-white rounded-3xl shadow-xl p-2 sm:p-3 mb-3 relative">
          <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)` }}>
            {board.map((rowArr, r) =>
              rowArr.map((cell, c) => {
                const isClearing = clearing.has(`${r},${c}`);
                const previewOk = selected !== null && (() => {
                  const p = pieces[selected];
                  if (!p) return false;
                  const pr = Math.max(0, Math.min(BOARD_SIZE - p.shape.length, r - Math.floor(p.shape.length / 2)));
                  const pc = Math.max(0, Math.min(BOARD_SIZE - p.shape[0].length, c - Math.floor(p.shape[0].length / 2)));
                  if (!canPlace(board, p, pr, pc)) return false;
                  const rr = r - pr, cc = c - pc;
                  return rr < p.shape.length && cc < p.shape[0].length && !!p.shape[rr][cc];
                })();
                const col = cell >= 0 ? COLORS[cell] : null;
                return (
                  <button
                    key={`${r}-${c}`}
                    onClick={() => cellClick(r, c)}
                    className="aspect-square rounded-md transition-all duration-150 touch-manipulation"
                    style={cell >= 0 ? {
                      background: `linear-gradient(145deg, ${col!.light} 0%, ${col!.bg} 45%, ${col!.dark} 100%)`,
                      boxShadow: 'inset 0 2px 0 rgba(255,255,255,.45), inset 0 -2px 0 rgba(0,0,0,.15), 0 1px 2px rgba(0,0,0,.15)',
                      transform: isClearing ? 'scale(0)' : undefined,
                      opacity: isClearing ? 0 : 1,
                    } : {
                      background: previewOk ? `${COLORS[pieces[selected].color].bg}55` : 'rgba(0,0,0,0.05)',
                      border: previewOk ? `2px dashed ${COLORS[pieces[selected].color].dark}` : '2px solid transparent',
                    }}
                  />
                );
              })
            )}
          </div>

          {/* Game over overlay */}
          {gameOver && (
            <div className="absolute inset-0 bg-black/50 rounded-3xl flex items-center justify-center z-10">
              <div className="bg-white rounded-3xl p-6 text-center mx-4 shadow-2xl">
                <div className="text-5xl mb-2">😵</div>
                <h2 className="text-2xl font-black text-gray-800 mb-1">No moves left!</h2>
                <p className="text-gray-600 mb-1">Score: <b className="text-indigo-600">{score}</b></p>
                <p className="text-gray-600 mb-4">Best: <b className="text-amber-500">{best}</b></p>
                <button onClick={restart} className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-black rounded-2xl shadow-lg active:scale-95 transition-transform">
                  🔄 Play Again
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Piece tray */}
        <div className="flex gap-2 bg-white/70 rounded-3xl shadow p-2">
          {pieces.map((p, i) => renderMiniPiece(p, i))}
          {pieces.length < 3 && Array.from({ length: 3 - pieces.length }).map((_, i) => (
            <div key={`empty-${i}`} className="flex-1 rounded-xl bg-white/30 min-h-[84px]" />
          ))}
        </div>

        {/* How to play */}
        <p className="text-center text-xs text-gray-500 mt-3 px-2">
          👆 Tap a block below, then tap the board to place it. Fill a full row or column to clear it. Clear lines fast for combos! 🔥
        </p>
      </div>
    </div>
  );
}
