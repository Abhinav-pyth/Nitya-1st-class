import { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { soundManager } from '../utils/sounds';
import confetti from 'canvas-confetti';

interface MathRaceGameProps {
  onBack: () => void;
}

type Operation = '+' | '-' | '×';

interface Problem {
  num1: number;
  num2: number;
  operation: Operation;
  answer: number;
  options: number[];
}

export default function MathRaceGame({ onBack }: MathRaceGameProps) {
  const { themeConfig } = useTheme();
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [currentProblem, setCurrentProblem] = useState<Problem | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [level, setLevel] = useState(1);
  const [answering, setAnswering] = useState(false);

  const generateProblem = (): Problem => {
    const operations: Operation[] = level >= 3 ? ['+', '-', '×'] : level >= 2 ? ['+', '-'] : ['+'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    
    let num1: number, num2: number, answer: number;
    
    switch (operation) {
      case '+':
        num1 = Math.floor(Math.random() * (level * 5)) + 1;
        num2 = Math.floor(Math.random() * (level * 5)) + 1;
        answer = num1 + num2;
        break;
      case '-':
        num1 = Math.floor(Math.random() * (level * 5)) + 5;
        num2 = Math.floor(Math.random() * num1) + 1;
        answer = num1 - num2;
        break;
      case '×':
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        answer = num1 * num2;
        break;
      default:
        num1 = 1;
        num2 = 1;
        answer = 2;
    }

    // Generate wrong options
    const options = new Set<number>([answer]);
    while (options.size < 4) {
      const offset = Math.floor(Math.random() * 10) - 5;
      const wrongAnswer = Math.max(0, answer + offset);
      if (wrongAnswer !== answer) {
        options.add(wrongAnswer);
      }
    }

    return {
      num1,
      num2,
      operation,
      answer,
      options: Array.from(options).sort(() => Math.random() - 0.5),
    };
  };

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && isPlaying) {
      setIsPlaying(false);
      setGameOver(true);
      if (score >= 50) {
        soundManager.celebrate();
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      }
    }
  }, [timeLeft, isPlaying, score]);

  const startGame = () => {
    setScore(0);
    setStreak(0);
    setTimeLeft(60);
    setGameOver(false);
    setIsPlaying(true);
    setLevel(1);
    setAnswering(false);
    setFeedback(null);
    setCurrentProblem(generateProblem());
    soundManager.startQuiz();
  };

  const handleAnswer = (selectedAnswer: number) => {
    if (!currentProblem || !isPlaying || answering || gameOver) return;
    setAnswering(true);

    if (selectedAnswer === currentProblem.answer) {
      soundManager.correct();
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > bestStreak) setBestStreak(newStreak);

      // Bonus points for streaks
      const points = newStreak >= 5 ? 5 : newStreak >= 3 ? 3 : 1;
      setScore(s => s + points);
      setFeedback('correct');

      // Level up every 10 points
      if (score + points >= level * 10 && level < 5) {
        setLevel(l => l + 1);
      }
    } else {
      soundManager.wrong();
      setStreak(0);
      setFeedback('wrong');
    }

    setTimeout(() => {
      setFeedback(null);
      setAnswering(false);
      if (!gameOver) setCurrentProblem(generateProblem());
    }, 400);
  };

  if (!isPlaying && !gameOver) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="w-12 h-12 bg-white rounded-2xl shadow-lg flex items-center justify-center hover:scale-110 transition-transform font-bold">←</button>
          <div className={`flex-1 bg-gradient-to-r ${themeConfig.primaryGradient} rounded-2xl p-4 text-white shadow-xl`}>
            <h2 className="text-2xl font-black">⚡ Math Race</h2>
            <p className="text-white/90 text-sm">Solve math problems fast!</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-xl text-center">
          <div className="text-6xl mb-4">🏎️</div>
          <h3 className="text-2xl font-black mb-4">Ready to Race?</h3>
          <p className="text-gray-600 mb-6">Solve as many math problems as you can in 60 seconds!</p>
          
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-blue-50 rounded-xl p-3">
              <div className="text-2xl">⏱️</div>
              <div className="text-xs font-bold text-gray-600">60 Seconds</div>
            </div>
            <div className="bg-green-50 rounded-xl p-3">
              <div className="text-2xl">🔥</div>
              <div className="text-xs font-bold text-gray-600">Streak Bonus</div>
            </div>
            <div className="bg-purple-50 rounded-xl p-3">
              <div className="text-2xl">📈</div>
              <div className="text-xs font-bold text-gray-600">5 Levels</div>
            </div>
          </div>

          <button onClick={startGame} className={`w-full py-4 bg-gradient-to-r ${themeConfig.buttonGradient} text-white rounded-2xl font-black text-xl shadow-lg kid-btn`}>
            Start Race! 🚀
          </button>
        </div>
      </div>
    );
  }

  if (gameOver) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-8 text-white text-center shadow-2xl animate-pop-in">
          <div className="text-6xl mb-4">🏁</div>
          <h2 className="text-3xl font-black mb-2">Time's Up!</h2>
          <div className="text-5xl font-black my-6">{score} points</div>
          
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-white/20 rounded-xl p-3">
              <div className="text-2xl font-black">{bestStreak}</div>
              <div className="text-xs opacity-80">Best Streak</div>
            </div>
            <div className="bg-white/20 rounded-xl p-3">
              <div className="text-2xl font-black">Level {level}</div>
              <div className="text-xs opacity-80">Reached</div>
            </div>
          </div>

          <button onClick={startGame} className="w-full py-4 bg-white text-purple-600 rounded-2xl font-black text-lg shadow-lg kid-btn">
            Race Again 🔄
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
          <h2 className="text-2xl font-black">⚡ Math Race</h2>
          <p className="text-white/90 text-sm">Level {level}</p>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-2xl p-3 shadow-lg text-center">
          <div className="text-xl font-black text-purple-600">{score}</div>
          <div className="text-xs text-gray-500 font-bold">Score</div>
        </div>
        <div className="bg-white rounded-2xl p-3 shadow-lg text-center">
          <div className="text-xl font-black text-orange-600 flex items-center justify-center gap-1">
            🔥 {streak}
          </div>
          <div className="text-xs text-gray-500 font-bold">Streak</div>
        </div>
        <div className={`rounded-2xl p-3 shadow-lg text-center ${timeLeft <= 10 ? 'bg-red-100 animate-pulse' : 'bg-white'}`}>
          <div className={`text-xl font-black ${timeLeft <= 10 ? 'text-red-600' : 'text-blue-600'}`}>{timeLeft}s</div>
          <div className="text-xs text-gray-500 font-bold">Time</div>
        </div>
      </div>

      {/* Problem */}
      {currentProblem && (
        <div className={`bg-white rounded-3xl p-4 sm:p-8 shadow-xl transition-all ${
          feedback === 'correct' ? 'ring-4 ring-green-500' : feedback === 'wrong' ? 'ring-4 ring-red-500' : ''
        }`}>
          <div className="text-center mb-6 sm:mb-8">
            <div className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-800 break-words">
              {currentProblem.num1} {currentProblem.operation} {currentProblem.num2} = ?
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {currentProblem.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                disabled={answering}
                className="py-5 sm:py-6 bg-gradient-to-br from-blue-400 to-cyan-500 text-white rounded-2xl text-2xl sm:text-3xl font-black shadow-lg kid-btn active:scale-95 disabled:opacity-70"
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
