import { useState, useEffect, useCallback } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { soundManager } from '../utils/sounds';
import confetti from 'canvas-confetti';

interface MemoryGameProps {
  onBack: () => void;
}

const EMOJI_PAIRS = ['🍎', '🍌', '🍇', '🍓', '🍊', '🥝', '🍉', '🍑'];

export default function MemoryGame({ onBack }: MemoryGameProps) {
  const { themeConfig } = useTheme();
  const [cards, setCards] = useState<{ id: number; emoji: string; flipped: boolean; matched: boolean }[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const initializeGame = useCallback(() => {
    const shuffled = [...EMOJI_PAIRS, ...EMOJI_PAIRS]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({ id: index, emoji, flipped: false, matched: false }));
    setCards(shuffled);
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setGameWon(false);
    setTimer(0);
    setIsPlaying(false);
  }, []);

  useEffect(() => { initializeGame(); }, [initializeGame]);

  useEffect(() => {
    let interval: number;
    if (isPlaying && !gameWon) {
      interval = window.setInterval(() => setTimer(t => t + 1), 1000);
    }
    return () => window.clearInterval(interval);
  }, [isPlaying, gameWon]);

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2) return;
    if (cards[id].flipped || cards[id].matched) return;

    if (!isPlaying) setIsPlaying(true);
    soundManager.click();

    const newCards = [...cards];
    newCards[id].flipped = true;
    setCards(newCards);

    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [first, second] = newFlipped;

      if (cards[first].emoji === cards[second].emoji) {
        soundManager.correct();
        setTimeout(() => {
          const matched = [...cards];
          matched[first].matched = true;
          matched[second].matched = true;
          setCards(matched);
          setFlippedCards([]);
          const newMatches = matches + 1;
          setMatches(newMatches);

          if (newMatches === EMOJI_PAIRS.length) {
            setGameWon(true);
            soundManager.celebrate();
            confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
          }
        }, 500);
      } else {
        soundManager.wrong();
        setTimeout(() => {
          const reset = [...cards];
          reset[first].flipped = false;
          reset[second].flipped = false;
          setCards(reset);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="w-12 h-12 bg-white rounded-2xl shadow-lg flex items-center justify-center hover:scale-110 transition-transform font-bold">←</button>
        <div className={`flex-1 bg-gradient-to-r ${themeConfig.primaryGradient} rounded-2xl p-4 text-white shadow-xl`}>
          <h2 className="text-2xl font-black">🧠 Memory Match</h2>
          <p className="text-white/90 text-sm">Find all matching pairs!</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-2xl p-4 shadow-lg text-center">
          <div className="text-2xl font-black text-purple-600">{moves}</div>
          <div className="text-xs text-gray-500 font-bold">Moves</div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-lg text-center">
          <div className="text-2xl font-black text-green-600">{matches}/{EMOJI_PAIRS.length}</div>
          <div className="text-xs text-gray-500 font-bold">Matches</div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-lg text-center">
          <div className="text-2xl font-black text-blue-600">{formatTime(timer)}</div>
          <div className="text-xs text-gray-500 font-bold">Time</div>
        </div>
      </div>

      {/* Game Board */}
      <div className="bg-white rounded-3xl p-6 shadow-xl">
        <div className="grid grid-cols-4 gap-3">
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`aspect-square rounded-2xl text-4xl md:text-5xl font-bold transition-all duration-300 transform ${
                card.flipped || card.matched
                  ? 'bg-gradient-to-br from-purple-100 to-pink-100 scale-100 rotate-0'
                  : 'bg-gradient-to-br from-purple-500 to-pink-500 hover:scale-105 hover:shadow-lg'
              } ${card.matched ? 'opacity-60' : ''}`}
              disabled={card.matched}
            >
              {card.flipped || card.matched ? card.emoji : '?'}
            </button>
          ))}
        </div>
      </div>

      {gameWon && (
        <div className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl p-6 text-white text-center shadow-xl animate-pop-in">
          <div className="text-5xl mb-2">🎉</div>
          <h3 className="text-2xl font-black mb-2">You Won!</h3>
          <p className="mb-4">Completed in {moves} moves and {formatTime(timer)}</p>
          <button onClick={initializeGame} className="px-6 py-3 bg-white text-green-600 rounded-xl font-black shadow-lg kid-btn">
            Play Again 🔄
          </button>
        </div>
      )}

      <button onClick={initializeGame} className="w-full py-3 bg-gray-100 rounded-xl font-bold text-gray-700 kid-btn">
        🔄 Restart Game
      </button>
    </div>
  );
}
