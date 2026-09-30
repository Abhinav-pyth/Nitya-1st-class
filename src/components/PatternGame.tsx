import { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { soundManager } from '../utils/sounds';
import confetti from 'canvas-confetti';

interface PatternGameProps {
  onBack: () => void;
}

const COLORS = ['🔴', '🔵', '🟢', '🟡', '🟣', '🟠'];

interface Pattern {
  sequence: string[];
  missing: number;
  options: string[];
  answer: string;
}

export default function PatternGame({ onBack }: PatternGameProps) {
  const { themeConfig } = useTheme();
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [currentPattern, setCurrentPattern] = useState<Pattern | null>(null);
  const [message, setMessage] = useState('');
  const [gameComplete, setGameComplete] = useState(false);
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    generatePattern();
  }, [level]);

  const generatePattern = () => {
    const patternLength = Math.min(3 + level, 6);
    const colorsUsed = Math.min(2 + Math.floor(level / 2), COLORS.length);
    const selectedColors = COLORS.slice(0, colorsUsed);

    // Create a repeating pattern
    const basePattern = [];
    for (let i = 0; i < patternLength; i++) {
      basePattern.push(selectedColors[Math.floor(Math.random() * selectedColors.length)]);
    }

    // Repeat the pattern so it is recognizable.
    const sequence = [...basePattern, ...basePattern];
    // Always ask for the NEXT item (end of the sequence) — that matches the
    // "What comes next?" question and stays unambiguous even when the base
    // pattern happens to be symmetric.
    const missing = sequence.length - 1;
    const answer = sequence[missing];

    // Generate options
    const options = new Set<string>([answer]);
    while (options.size < 4) {
      options.add(COLORS[Math.floor(Math.random() * COLORS.length)]);
    }

    setCurrentPattern({
      sequence,
      missing,
      options: Array.from(options).sort(() => Math.random() - 0.5),
      answer,
    });
    setMessage('');
    setAnswered(false);
  };

  const handleAnswer = (selected: string) => {
    if (!currentPattern || answered) return;

    if (selected === currentPattern.answer) {
      setAnswered(true);
      soundManager.correct();
      setMessage('🎉 Correct!');
      setScore(s => s + 10);
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });

      setTimeout(() => {
        if (level < 10) {
          setLevel(l => l + 1);
        } else {
          setGameComplete(true);
          soundManager.celebrate();
          confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
        }
      }, 1000);
    } else {
      soundManager.wrong();
      setMessage('❌ Try again!');
      setTimeout(() => setMessage(''), 1000);
    }
  };

  const resetGame = () => {
    setLevel(1);
    setScore(0);
    setGameComplete(false);
    generatePattern();
  };

  if (gameComplete) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-8 text-white text-center shadow-2xl animate-pop-in">
          <div className="text-6xl mb-4">🎨</div>
          <h2 className="text-3xl font-black mb-2">Pattern Master!</h2>
          <p className="text-xl mb-4">You completed all levels!</p>
          <div className="text-4xl font-black mb-6">Score: {score}</div>
          <button onClick={resetGame} className="px-8 py-4 bg-white text-purple-600 rounded-2xl font-black text-lg shadow-lg kid-btn">
            Play Again 🔄
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="w-12 h-12 bg-white rounded-2xl shadow-lg flex items-center justify-center hover:scale-110 transition-transform font-bold">←</button>
        <div className={`flex-1 bg-gradient-to-r ${themeConfig.primaryGradient} rounded-2xl p-4 text-white shadow-xl`}>
          <h2 className="text-2xl font-black">🎨 Pattern Game</h2>
          <p className="text-white/90 text-sm">Complete the pattern!</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white rounded-2xl p-4 shadow-lg text-center">
          <div className="text-2xl font-black text-purple-600">Level {level}</div>
          <div className="text-xs text-gray-500 font-bold">Difficulty</div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-lg text-center">
          <div className="text-2xl font-black text-green-600">{score}</div>
          <div className="text-xs text-gray-500 font-bold">Score</div>
        </div>
      </div>

      {/* Pattern Display */}
      {currentPattern && (
        <div className="bg-white rounded-3xl p-6 shadow-xl">
          <div className="text-center mb-6">
            <h3 className="text-lg font-bold text-gray-700 mb-4">What comes next in the pattern?</h3>
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {currentPattern.sequence.map((color, index) => (
                <div
                  key={index}
                  className={`w-16 h-16 rounded-xl flex items-center justify-center text-4xl transition-all ${
                    index === currentPattern.missing
                      ? 'border-4 border-dashed border-purple-500 bg-purple-50 animate-pulse'
                      : 'bg-gray-50'
                  }`}
                >
                  {index === currentPattern.missing ? '?' : color}
                </div>
              ))}
            </div>
            {message && (
              <div className={`text-xl font-black ${message.includes('🎉') ? 'text-green-600' : 'text-red-600'}`}>
                {message}
              </div>
            )}
          </div>

          {/* Options */}
          <div className="grid grid-cols-4 gap-3">
            {currentPattern.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className="aspect-square rounded-xl bg-gradient-to-br from-blue-400 to-cyan-500 text-4xl flex items-center justify-center shadow-lg kid-btn hover:scale-110"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
