import { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { soundManager } from '../utils/sounds';
import confetti from 'canvas-confetti';

interface SpellingBeeGameProps {
  onBack: () => void;
}

const WORDS = [
  { word: 'APPLE', hint: '🍎 A red fruit', audio: 'apple' },
  { word: 'BALL', hint: '⚽ You play with it', audio: 'ball' },
  { word: 'CAT', hint: '🐱 Says meow', audio: 'cat' },
  { word: 'DOG', hint: '🐕 Says woof', audio: 'dog' },
  { word: 'SUN', hint: '☀️ Shines in the sky', audio: 'sun' },
  { word: 'TREE', hint: '🌳 Has leaves', audio: 'tree' },
  { word: 'FISH', hint: '🐟 Swims in water', audio: 'fish' },
  { word: 'BOOK', hint: '📖 You read it', audio: 'book' },
];

export default function SpellingBeeGame({ onBack }: SpellingBeeGameProps) {
  const { themeConfig } = useTheme();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [advancing, setAdvancing] = useState(false);

  const currentWord = WORDS[currentWordIndex];

  const resetGame = () => {
    setCurrentWordIndex(0);
    setScore(0);
    setUserInput('');
    setMessage('');
    setShowHint(false);
    setGameComplete(false);
    setAttempts(0);
    setAdvancing(false);
  };

  const handleSubmit = () => {
    if (advancing || !userInput.trim()) return;

    setAttempts(a => a + 1);

    if (userInput.toUpperCase() === currentWord.word) {
      setAdvancing(true);
      soundManager.correct();
      setMessage('🎉 Perfect!');
      setScore(s => s + 10);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });

      setTimeout(() => {
        const isLastWord = currentWordIndex >= WORDS.length - 1;
        if (isLastWord) {
          setGameComplete(true);
          soundManager.celebrate();
          confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
        } else {
          setCurrentWordIndex(i => i + 1);
          setUserInput('');
          setMessage('');
          setShowHint(false);
          setAttempts(0);
        }
        setAdvancing(false);
      }, 1500);
    } else {
      soundManager.wrong();
      if (attempts >= 2) {
        setAdvancing(true);
        setMessage(`❌ The answer is: ${currentWord.word}`);
        setTimeout(() => {
          const isLastWord = currentWordIndex >= WORDS.length - 1;
          if (isLastWord) {
            setGameComplete(true);
          } else {
            setCurrentWordIndex(i => i + 1);
            setUserInput('');
            setMessage('');
            setShowHint(false);
            setAttempts(0);
          }
          setAdvancing(false);
        }, 2000);
      } else {
        setMessage('❌ Try again!');
        setTimeout(() => setMessage(''), 1000);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const speakWord = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel(); // avoid overlapping speech on rapid taps
      const utterance = new SpeechSynthesisUtterance(currentWord.word);
      utterance.rate = 0.7;
      speechSynthesis.speak(utterance);
    }
  };

  if (gameComplete) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-3xl p-8 text-white text-center shadow-2xl animate-pop-in">
          <div className="text-6xl mb-4">🐝</div>
          <h2 className="text-3xl font-black mb-2">Spelling Champion!</h2>
          <p className="text-xl mb-4">You spelled all words correctly!</p>
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
          <h2 className="text-2xl font-black">🐝 Spelling Bee</h2>
          <p className="text-white/90 text-sm">Spell the words correctly!</p>
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

      {/* Word Card */}
      <div className="bg-white rounded-3xl p-6 shadow-xl">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4 animate-bounce-slow">{currentWord.hint.split(' ')[0]}</div>
          
          <button
            onClick={speakWord}
            className="px-6 py-3 bg-gradient-to-r from-blue-400 to-cyan-500 text-white rounded-xl font-bold shadow-lg kid-btn mb-4"
          >
            🔊 Listen
          </button>

          {showHint && (
            <div className="text-lg text-gray-600 mb-4">{currentWord.hint}</div>
          )}

          <div className="flex justify-center gap-1 mb-4">
            {currentWord.word.split('').map((_, index) => (
              <div
                key={index}
                className={`w-12 h-12 rounded-lg border-4 flex items-center justify-center text-2xl font-black transition-all ${
                  userInput[index]
                    ? 'border-green-500 bg-green-50 text-green-600'
                    : 'border-gray-300 bg-gray-50'
                }`}
              >
                {userInput[index] || ''}
              </div>
            ))}
          </div>

          {message && (
            <div className={`text-xl font-black ${message.includes('🎉') ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </div>
          )}
        </div>

        {/* Input */}
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value.toUpperCase())}
          onKeyPress={handleKeyPress}
          placeholder="Type the word..."
          className="w-full p-4 text-2xl text-center font-black border-4 border-purple-200 rounded-2xl focus:border-purple-500 focus:outline-none"
          autoFocus
        />

        {/* Controls */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={() => setShowHint(!showHint)}
            className="flex-1 py-3 bg-yellow-100 text-yellow-700 rounded-xl font-bold kid-btn"
          >
            💡 {showHint ? 'Hide' : 'Hint'}
          </button>
          <button
            onClick={handleSubmit}
            disabled={!userInput.trim()}
            className="flex-1 py-3 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-xl font-bold disabled:opacity-50 kid-btn"
          >
            ✓ Check
          </button>
        </div>
      </div>
    </div>
  );
}
