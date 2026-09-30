import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { soundManager } from '../utils/sounds';
import confetti from 'canvas-confetti';

interface LudoGameProps {
  onBack: () => void;
}

type PlayerColor = 'red' | 'green' | 'yellow' | 'blue';

const PLAYERS: PlayerColor[] = ['red', 'green', 'yellow', 'blue'];
const TRACK_LENGTH = 40; // shared circular track squares per player
const HOME_STRETCH = 6; // private home-column squares (5 + goal)
const FINISH_AT = TRACK_LENGTH + HOME_STRETCH; // pos === FINISH_AT - 1 == token home
const START_OFFSET: Record<PlayerColor, number> = { red: 0, green: 10, yellow: 20, blue: 30 };

// The 52 cells of the classic cross path, listed clockwise starting at red's start.
// Board is a 15x15 grid; arms occupy rows/cols 6-8, bases fill the corners.
const CROSS_CELLS: [number, number][] = (() => {
  const c: [number, number][] = [];
  // Clockwise loop of all 52 shared-track cells, starting at red's entry [6,6].
  for (let r = 6; r >= 0; r--) c.push([r, 6]);            // 7: up the left arm top edge
  for (let col = 7; col <= 8; col++) c.push([0, col]);    // 2: across the very top
  for (let r = 1; r <= 6; r++) c.push([r, 8]);            // 6: down into the top-arm center lane
  for (let row = 6; row <= 8; row++) c.push([row, 9]);    // 3: corner turn right
  for (let col = 10; col <= 14; col++) c.push([6, col]);  // 5: across the right arm top edge
  for (let r = 7; r <= 8; r++) c.push([r, 14]);           // 2: down the far-right edge
  for (let col = 13; col >= 10; col--) c.push([8, col]);  // 4: back left along the bottom edge
  for (let row = 6; row <= 8; row++) c.push([8, row]);    // 3: corner turn down (center lane)
  for (let r = 9; r <= 14; r++) c.push([r, 7]);           // 6: down the bottom arm center lane
  for (let col = 6; col >= 0; col--) c.push([14, col]);   // 7: across the very bottom to the left
  for (let r = 13; r >= 8; r--) c.push([r, 0]);           // 6: up the far-left edge back toward start
  return c; // length = 52
})();

// Per-color display order of the 40 playable shared-track cells.
const TRACK_DISPLAY: Record<PlayerColor, [number, number][]> = {
  red: CROSS_CELLS.slice(0, 40),
  green: [...CROSS_CELLS.slice(10, 40), ...CROSS_CELLS.slice(0, 10)],
  yellow: [...CROSS_CELLS.slice(20, 40), ...CROSS_CELLS.slice(0, 20)],
  blue: [...CROSS_CELLS.slice(30, 40), ...CROSS_CELLS.slice(0, 30)],
};

// Home column cells (5 squares + goal center cell) per color.
const HOME_COLUMN: Record<PlayerColor, [number, number][]> = {
  red: [[7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6]],
  green: [[1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7]],
  yellow: [[13, 7], [12, 7], [11, 7], [10, 7], [9, 7], [8, 7]],
  blue: [[7, 13], [7, 12], [7, 11], [7, 10], [7, 9], [7, 8]],
};

const YARD_CELLS: Record<PlayerColor, [number, number][]> = {
  red: [[1, 1], [1, 2], [2, 1], [2, 2]],
  green: [[1, 12], [1, 13], [2, 12], [2, 13]],
  yellow: [[12, 1], [12, 2], [13, 1], [13, 2]],
  blue: [[12, 12], [12, 13], [13, 12], [13, 13]],
};

interface Token {
  id: string; // `${color}-${index}`
  color: PlayerColor;
  index: number;
  pos: number; // -1 = in yard, 0..FINISH_AT-1 = on track/home, FINISH_AT = done
}

interface Move {
  token: Token;
  to: number;
  captures: Token[];
}

const makeTokens = (): Record<PlayerColor, Token[]> => ({
  red: [0, 1, 2, 3].map((i) => ({ id: `red-${i}`, color: 'red' as const, index: i, pos: -1 })),
  green: [0, 1, 2, 3].map((i) => ({ id: `green-${i}`, color: 'green' as const, index: i, pos: -1 })),
  yellow: [0, 1, 2, 3].map((i) => ({ id: `yellow-${i}`, color: 'yellow' as const, index: i, pos: -1 })),
  blue: [0, 1, 2, 3].map((i) => ({ id: `blue-${i}`, color: 'blue' as const, index: i, pos: -1 })),
});

export default function LudoGame({ onBack }: LudoGameProps) {
  const { themeConfig } = useTheme();
  const [tokensByColor, setTokensByColor] = useState<Record<PlayerColor, Token[]>>(makeTokens);
  const [currentPlayer, setCurrentPlayer] = useState<PlayerColor>('red');
  const [diceValue, setDiceValue] = useState(0);
  const [isRolling, setIsRolling] = useState(false);
  const [canPickToken, setCanPickToken] = useState(false);
  const [pendingMoves, setPendingMoves] = useState<Move[]>([]);
  const [message, setMessage] = useState('Red player, roll the dice! 🎲');
  const [winner, setWinner] = useState<PlayerColor | null>(null);

  const colorBg: Record<PlayerColor, string> = {
    red: 'bg-red-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-400',
    blue: 'bg-blue-500',
  };
  const colorSoft: Record<PlayerColor, string> = {
    red: 'bg-red-100 border-red-400',
    green: 'bg-green-100 border-green-400',
    yellow: 'bg-yellow-100 border-yellow-400',
    blue: 'bg-blue-100 border-blue-400',
  };
  const colorText: Record<PlayerColor, string> = {
    red: 'text-red-600',
    green: 'text-green-600',
    yellow: 'text-yellow-600',
    blue: 'text-blue-600',
  };
  const colorNames: Record<PlayerColor, string> = {
    red: 'Red',
    green: 'Green',
    yellow: 'Yellow',
    blue: 'Blue',
  };

  const allTokens = Object.values(tokensByColor).flat();

  const nextTurn = (from: PlayerColor) => {
    const next = PLAYERS[(PLAYERS.indexOf(from) + 1) % 4];
    setCurrentPlayer(next);
    setMessage(`${colorNames[next]} player, roll the dice! 🎲`);
  };

  const computeLegalMoves = (
    state: Record<PlayerColor, Token[]>,
    player: PlayerColor,
    die: number
  ): Move[] => {
    const result: Move[] = [];
    for (const t of state[player]) {
      if (t.pos === FINISH_AT - 1) continue; // already home
      let to: number;
      if (t.pos === -1) {
        if (die !== 6) continue; // need a six to leave the yard
        to = 0;
      } else {
        to = t.pos + die;
        if (to > FINISH_AT - 1) continue; // must not overshoot the goal
      }
      const captures: Token[] = [];
      if (to < TRACK_LENGTH) {
        const globalCell = (START_OFFSET[player] + to) % TRACK_LENGTH;
        for (const other of allTokens) {
          if (other.color === player || other.pos < 0 || other.pos >= TRACK_LENGTH) continue;
          if ((START_OFFSET[other.color] + other.pos) % TRACK_LENGTH === globalCell) {
            captures.push(other);
          }
        }
      }
      result.push({ token: t, to, captures });
    }
    return result;
  };

  const applyMove = (move: Move) => {
    const capturedIds = new Set(move.captures.map((c) => c.id));
    const updated: Record<PlayerColor, Token[]> = { ...tokensByColor };
    for (const color of PLAYERS) {
      updated[color] = updated[color].map((t) => {
        if (t.id === move.token.id) return { ...t, pos: move.to };
        if (capturedIds.has(t.id)) return { ...t, pos: -1 };
        return t;
      });
    }
    setTokensByColor(updated);
    setCanPickToken(false);
    setPendingMoves([]);

    let msg = `${colorNames[move.token.color]} moved!`;
    if (move.token.pos === -1 && move.to === 0) {
      msg = `${colorNames[move.token.color]} token entered the board! 🎉`;
      soundManager.correct();
    }
    if (capturedIds.size > 0) {
      msg = `🎯 Captured ${capturedIds.size} opponent token(s)!`;
      soundManager.correct();
    }
    if (move.to === FINISH_AT - 1) {
      msg = `🏠 A ${colorNames[move.token.color]} token reached home!`;
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
      soundManager.celebrate();
    }

    const finishedCount = updated[move.token.color].filter((t) => t.pos === FINISH_AT - 1).length;
    if (finishedCount === 4) {
      setWinner(move.token.color);
      setMessage(`🏆 ${colorNames[move.token.color]} wins the game!`);
      confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } });
      soundManager.celebrate();
      return;
    }

    const rollAgain =
      move.token.pos === -1 || // entered the board with a six
      move.captures.length > 0 ||
      move.to === FINISH_AT - 1 ||
      (move.token.pos >= 0 && diceValue === 6); // rolled a six while on the board

    if (rollAgain) {
      setMessage(`${msg} ${colorNames[move.token.color]} rolls again!`);
    } else {
      setMessage(msg);
      nextTurn(move.token.color);
    }
  };

  const handleTokenClick = (token: Token) => {
    if (!canPickToken || winner || token.color !== currentPlayer) return;
    const move = pendingMoves.find((m) => m.token.id === token.id);
    if (!move) return;
    soundManager.click();
    applyMove(move);
  };

  const rollDice = () => {
    if (isRolling || canPickToken || winner) return;

    setIsRolling(true);
    soundManager.click();

    let rollCount = 0;
    const rollInterval = setInterval(() => {
      setDiceValue(Math.floor(Math.random() * 6) + 1);
      rollCount++;

      if (rollCount >= 10) {
        clearInterval(rollInterval);
        const finalValue = Math.floor(Math.random() * 6) + 1;
        setDiceValue(finalValue);

        const moves = computeLegalMoves(tokensByColor, currentPlayer, finalValue);
        setIsRolling(false);

        if (moves.length === 0) {
          setMessage(`${colorNames[currentPlayer]} rolled ${finalValue} — no possible move.`);
          setTimeout(() => nextTurn(currentPlayer), 1200);
        } else if (moves.length === 1) {
          setTimeout(() => applyMove(moves[0]), 400);
        } else {
          setPendingMoves(moves);
          setCanPickToken(true);
          setMessage(`${colorNames[currentPlayer]} rolled ${finalValue} — tap a highlighted token to move!`);
        }
      }
    }, 100);
  };

  const resetGame = () => {
    setTokensByColor(makeTokens());
    setCurrentPlayer('red');
    setDiceValue(0);
    setIsRolling(false);
    setCanPickToken(false);
    setPendingMoves([]);
    setWinner(null);
    setMessage('Red player, roll the dice! 🎲');
    soundManager.click();
  };

  const movableIds = new Set(pendingMoves.map((m) => m.token.id));

  // ---- Board rendering (15x15 grid via absolute percentage positioning) ----
  const cells: React.ReactElement[] = [];
  const cellStyle = (row: number, col: number): React.CSSProperties => ({
    position: 'absolute',
    left: `${(col / 15) * 100}%`,
    top: `${(row / 15) * 100}%`,
    width: `${100 / 15}%`,
    height: `${100 / 15}%`,
  });

  const renderTokenDot = (t: Token, extraClass = '', style?: React.CSSProperties) => (
    <button
      key={t.id}
      onClick={() => handleTokenClick(t)}
      aria-label={`${t.color} token`}
      className={`rounded-full ${colorBg[t.color]} shadow transition-transform ${
        movableIds.has(t.id) && t.color === currentPlayer
          ? 'ring-2 sm:ring-4 ring-white animate-pulse cursor-pointer'
          : 'cursor-default'
      } ${extraClass}`}
      style={style}
    />
  );

  // Four corner bases (6x6 blocks) + yards.
  const BASE_ORIGIN: Record<PlayerColor, [number, number]> = {
    red: [0, 0],
    green: [0, 9],
    yellow: [9, 0],
    blue: [9, 9],
  };
  PLAYERS.forEach((color) => {
    const [br, bc] = BASE_ORIGIN[color];
    cells.push(
      <div
        key={`base-${color}`}
        className={`${colorSoft[color]} rounded-lg sm:rounded-xl border-2`}
        style={{
          position: 'absolute',
          left: `${(bc / 15) * 100}%`,
          top: `${(br / 15) * 100}%`,
          width: `${(6 / 15) * 100}%`,
          height: `${(6 / 15) * 100}%`,
        }}
      />
    );
    YARD_CELLS[color].forEach(([r, c], i) => {
      const t = tokensByColor[color][i];
      cells.push(
        <div key={`yardslot-${color}-${i}`} className="flex items-center justify-center" style={cellStyle(r, c)}>
          {t.pos === -1 && renderTokenDot(t, 'w-[80%] h-[80%]', t.pos === -1 && movableIds.has(t.id) ? { transform: 'scale(1.1)' } : undefined)}
        </div>
      );
    });
  });

  // Occupancy maps.
  const trackOccupancy = new Map<string, Token[]>();
  allTokens.forEach((t) => {
    if (t.pos >= 0 && t.pos < TRACK_LENGTH) {
      const [r, c] = TRACK_DISPLAY[t.color][t.pos];
      const key = `${r},${c}`;
      trackOccupancy.set(key, [...(trackOccupancy.get(key) || []), t]);
    }
  });
  const homeOccupancy = new Map<string, Token[]>();
  allTokens.forEach((t) => {
    if (t.pos >= TRACK_LENGTH && t.pos < FINISH_AT) {
      const [r, c] = HOME_COLUMN[t.color][t.pos - TRACK_LENGTH];
      const key = `${r},${c}`;
      homeOccupancy.set(key, [...(homeOccupancy.get(key) || []), t]);
    }
  });

  const startKeys = new Set(
    PLAYERS.map((p) => {
      const [r, c] = TRACK_DISPLAY[p][0];
      return `${r},${c}`;
    })
  );
  const startColorOf = new Map<string, PlayerColor>();
  PLAYERS.forEach((p) => {
    const [r, c] = TRACK_DISPLAY[p][0];
    startColorOf.set(`${r},${c}`, p);
  });

  // Shared track cells (draw each unique cell once).
  const renderedTrack = new Set<string>();
  PLAYERS.forEach((color) => {
    TRACK_DISPLAY[color].forEach(([r, c]) => {
      const key = `${r},${c}`;
      if (renderedTrack.has(key)) return;
      renderedTrack.add(key);
      const occ = trackOccupancy.get(key) || [];
      const highlight = occ.some((t) => t.color === currentPlayer && movableIds.has(t.id));
      const startColor = startColorOf.get(key);
      cells.push(
        <div
          key={`track-${key}`}
          className={`rounded-sm sm:rounded-md flex items-center justify-center gap-0.5 border ${
            highlight
              ? 'border-purple-400 bg-purple-100'
              : startColor
              ? `border-gray-200 ${colorSoft[startColor].split(' ')[0]}`
              : 'border-gray-200 bg-white'
          }`}
          style={cellStyle(r, c)}
        >
          {occ.slice(0, 2).map((t, i) =>
            renderTokenDot(
              t,
              'w-[40%] h-[40%]',
              occ.length > 1 ? { transform: `translateY(${i === 0 ? '-18%' : '18%'}) scale(0.85)` } : undefined
            )
          )}
        </div>
      );
    });
  });

  // Home columns (5 colored squares + goal cell) per color.
  PLAYERS.forEach((color) => {
    HOME_COLUMN[color].forEach(([r, c], stepIdx) => {
      const key = `${r},${c}`;
      const isGoal = stepIdx === 5;
      const occ = homeOccupancy.get(key) || [];
      const highlight = occ.some((t) => t.color === currentPlayer && movableIds.has(t.id));
      cells.push(
        <div
          key={`home-${color}-${stepIdx}`}
          className={`flex items-center justify-center ${
            isGoal
              ? `${colorBg[color]} rounded-md`
              : highlight
              ? 'bg-purple-100 rounded-sm'
              : `${colorSoft[color].split(' ')[0]} rounded-sm`
          }`}
          style={cellStyle(r, c)}
        >
          {occ.map((t) => renderTokenDot(t, isGoal ? 'w-[65%] h-[65%] !bg-white/90' : 'w-[65%] h-[65%]'))}
        </div>
      );
    });
  });

  // Center triangle finish area.
  cells.push(
    <div
      key="center"
      className="grid grid-cols-2 place-items-center overflow-hidden rounded-sm"
      style={{
        position: 'absolute',
        left: `${(6 / 15) * 100}%`,
        top: `${(6 / 15) * 100}%`,
        width: `${(3 / 15) * 100}%`,
        height: `${(3 / 15) * 100}%`,
      }}
    >
      <div className="w-full h-full bg-red-400/80" />
      <div className="w-full h-full bg-green-400/80" />
      <div className="w-full h-full bg-yellow-400/80" />
      <div className="w-full h-full bg-blue-400/80" />
    </div>
  );

  const progressOf = (color: PlayerColor) =>
    tokensByColor[color].filter((t) => t.pos === FINISH_AT - 1).length;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          onClick={onBack}
          className="w-11 h-11 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform text-xl"
          aria-label="Back to games"
        >
          ←
        </button>
        <div className={`flex-1 bg-gradient-to-r ${themeConfig.primaryGradient} rounded-2xl p-3 sm:p-4 text-white shadow-lg`}>
          <h2 className="text-xl sm:text-2xl font-black">🎲 Ludo Game</h2>
          <p className="text-white/90 text-xs sm:text-sm">Tap tokens to move — first to get all 4 home wins!</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Game Board */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-3 sm:p-6 shadow-xl">
          <div className="aspect-square w-full max-w-[min(92vw,540px)] mx-auto relative bg-gray-50 rounded-xl border-2 border-gray-200 select-none">
            {cells}
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-4">
          {/* Current Player */}
          <div className={`${colorBg[currentPlayer]} rounded-2xl p-4 sm:p-6 text-white shadow-xl`}>
            <h3 className="font-black text-lg sm:text-xl mb-1">Current Turn</h3>
            <div className="text-2xl sm:text-3xl font-black">{colorNames[currentPlayer]}</div>
          </div>

          {/* Dice */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-xl text-center">
            <div className="text-5xl sm:text-6xl mb-3 select-none">
              {diceValue > 0 ? ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'][diceValue - 1] : '🎲'}
            </div>
            <button
              onClick={rollDice}
              disabled={isRolling || canPickToken || !!winner}
              className={`w-full py-4 bg-gradient-to-r ${themeConfig.buttonGradient} text-white rounded-xl font-black text-base sm:text-lg shadow-lg kid-btn disabled:opacity-50`}
            >
              {isRolling ? 'Rolling...' : winner ? 'Game Over' : canPickToken ? 'Pick a token 👆' : 'Roll Dice 🎲'}
            </button>
          </div>

          {/* Message */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 border-2 border-purple-200">
            <p className="text-sm font-bold text-gray-700 text-center">{message}</p>
          </div>

          {/* Player Progress */}
          <div className="bg-white rounded-2xl p-4 shadow-xl">
            <h3 className="font-black text-gray-800 mb-3 text-sm">Tokens Home</h3>
            <div className="space-y-2">
              {PLAYERS.map((color) => (
                <div key={color} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-5 h-5 sm:w-6 sm:h-6 ${colorBg[color]} rounded-full`}></div>
                    <span className={`font-bold text-sm ${color === currentPlayer ? colorText[color] : 'text-gray-600'}`}>
                      {colorNames[color]}{color === currentPlayer ? ' ◀' : ''}
                    </span>
                  </div>
                  <span className="font-black text-gray-700">{progressOf(color)}/4 🏠</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reset */}
          <button
            onClick={resetGame}
            className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-bold shadow-md kid-btn"
          >
            Reset Game 🔄
          </button>
        </div>
      </div>

      {/* Winner overlay */}
      {winner && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={resetGame}>
          <div className={`bg-gradient-to-r ${colorBg[winner]} rounded-3xl p-8 text-white text-center shadow-2xl animate-pop-in max-w-sm w-full`}>
            <div className="text-6xl mb-4">🏆</div>
            <h2 className="text-3xl font-black mb-2">{colorNames[winner]} Wins!</h2>
            <p className="mb-6 text-white/90">All four tokens made it home.</p>
            <button onClick={resetGame} className="px-8 py-4 bg-white rounded-2xl font-black text-lg shadow-lg kid-btn text-gray-800">
              Play Again 🔄
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
