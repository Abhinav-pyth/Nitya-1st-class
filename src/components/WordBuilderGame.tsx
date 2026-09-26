import { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { soundManager } from '../utils/sounds';
import confetti from 'canvas-confetti';

interface WordBuilderGameProps {
  onBack: () => void;
}

const WORDS = [
  { word: 'CAT', letters: ['C', 'A', 'T'], hint: '🐱' },
  { word: 'DOG', letters: ['D', 'O', 'G'], hint: '🐕' },
  { word: 'SUN', letters: ['S', 'U', 'N'], hint: '☀️' },
  { word: 'BAT', letters: ['B', 'A', 'T'], hint: '🦇' },
  { word: 'CUP', letters: ['C', 'U', 'P'], hint: '🥤' },
  { word: 'RED', letters: ['R', 'E', 'D'], hint: '🔴' },
  { word: 'BIG', letters: ['B', 'I', 'G'], hint: '🐘' },
  { word: 'HAT', letters: ['H', 'A', 'T'], hint: '🎩' },
];

export default function WordBuilderGame({ onBack }: WordBuilderGameProps) {
  const { themeConfig } = useTheme();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [availableLetters, setAvailableLetters] = useState<{ letter: string; id: number; used: boolean }[]>([]);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);

  const currentWord = WORDS[currentWordIndex];

  useEffect(() => {
    initializeLetters();
  }, [currentWordIndex]);

  const initializeLetters = () => {
    const extraLetters = ['X', 'Y', 'Z', 'Q', 'W'];
    const allLetters = [...currentWord.letters, ...extraLetters.slice(0, 2)]
      .sort(() => Math.random() - 0.5)
      .map((letter, index) => ({ letter, id: index, used: false }));
    setAvailableLetters(allLetters);
    setSelectedLetters([]);
    setMessage('');
    setShowHint(false);
  };

  const handleLetterClick = (id: number) => {
    const letter = availableLetters.find(l => l.id === id);
    if (!letter || letter.used) return;

    soundManager.click();
    const newSelected = [...selectedLetters, letter.letter];
    setSelectedLetters(newSelected);

    const newAvailable = availableLetters.map(l =>
      l.id === id ? { ...l, used: true } : l
    );
    setAvailableLetters(newAvailable);

    // Check if word is complete
    if (newSelected.length === currentWord.word.length) {
      const formedWord = newSelected.join('');
      if (formedWord === currentWord.word) {
        soundManager.correct();
        setMessage('🎉 Correct!');
        setScore(s => s + 10);
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });

        setTimeout(() => {
          if (currentWordIndex < WORDS.length - 1) {
            setCurrentWordIndex(i => i + 1);
          } else {
            setGameComplete(true);
            soundManager.celebrate();
            confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
          }
        }, 1500);
      } else {
        soundManager.wrong();
        setMessage('❌ Try again!');
        setTimeout(() => {
          setSelectedLetters([]);
          setAvailableLetters(prev => prev.map(l => ({ ...l, used: false })));
          setMessage('');
        }, 1000);
      }
    }
  };

  const handleUndo = () => {
    if (selectedLetters.length === 0) return;
    soundManager.click();
    const lastLetter = selectedLetters[selectedLetters.length - 1];
    setSelectedLetters(prev => prev.slice(0, -1));

    const unusedLetter = availableLetters.find(l => l.letter === lastLetter && l.used);
    if (unusedLetter) {
      setAvailableLetters(prev =>
        prev.map(l => l.id === unusedLetter.id ? { ...l, used: false } : l)
      );
    }
  };

  const resetGame = () => {
    setCurrentWordIndex(0);
    setScore(0);
    setGameComplete(false);
    initializeLetters();
  };

  if (gameComplete) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-3xl p-8 text-white text-center shadow-2xl animate-pop-in">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-3xl font-black mb-2">Amazing!</h2>
          <p className="text-xl mb-4">You completed all words!</p>
          <div className="text-4xl font-black mb-6">Score: {score}</div>
          <button onClick={resetGame} className="px-8 py-4 bg-white text-green-600 rounded-2xl font-black text-lg shadow-lg kid-btn">
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
          <h2 className="text-2xl font-black">🔤 Word Builder</h2>
          <p className="text-white/90 text-sm">Build words with letters!</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white rounded-2xl p-4 shadow-lg text-center">
          <div className="text-2xl font-black text-purple-600">{score}</div>
          <div className="text-xs text-gray-500 font-bold">Score</div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-lg text-center">
          <div className="text-2xl font-black text-green-600">{currentWordIndex + 1}/{WORDS.length}</div>
          <div className="text-xs text-gray-500 font-bold">Word</div>
        </div>
      </div>

      {/* Word Display */}
      <div className="bg-white rounded-3xl p-6 shadow-xl">
        <div className="text-center mb-6">
          {showHint && (
            <div className="text-6xl mb-4 animate-bounce-slow">{currentWord.hint}</div>
          )}
          <div className="flex justify-center gap-2 mb-4">
            {currentWord.word.split('').map((_, index) => (
              <div
                key={index}
                className={`w-16 h-16 rounded-xl border-4 flex items-center justify-center text-3xl font-black transition-all ${
                  selectedLetters[index]
                    ? 'border-green-500 bg-green-50 text-green-600'
                    : 'border-gray-300 bg-gray-50'
                }`}
              >
                {selectedLetters[index] || ''}
              </div>
            ))}
          </div>
          {message && (
            <div className={`text-xl font-black ${message.includes('🎉') ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </div>
          )}
        </div>

        {/* Available Letters */}
        <div className="grid grid-cols-5 gap-3 mb-4">
          {availableLetters.map((letter) => (
            <button
              key={letter.id}
              onClick={() => handleLetterClick(letter.id)}
              disabled={letter.used}
              className={`aspect-square rounded-xl text-2xl font-black transition-all kid-btn ${
                letter.used
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-br from-blue-400 to-cyan-500 text-white hover:scale-110'
              }`}
            >
              {letter.letter}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="flex gap-3">
          <button
            onClick={handleUndo}
            disabled={selectedLetters.length === 0}
            className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold disabled:opacity-50 kid-btn"
          >
            ↩️ Undo
          </button>
          <button
            onClick={() => setShowHint(!showHint)}
            className="flex-1 py-3 bg-yellow-100 text-yellow-700 rounded-xl font-bold kid-btn"
          >
            💡 {showHint ? 'Hide' : 'Hint'}
          </button>
        </div>
      </div>
    </div>
  );
}
