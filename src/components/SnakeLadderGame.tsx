import { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { soundManager } from '../utils/sounds';

interface SnakeLadderGameProps {
  onBack: () => void;
}

export default function SnakeLadderGame({ onBack }: SnakeLadderGameProps) {
  const { themeConfig } = useTheme();
  const [position, setPosition] = useState(0);
  const [diceValue, setDiceValue] = useState(0);
  const [isRolling, setIsRolling] = useState(false);
  const [message, setMessage] = useState('Roll the dice to start!');
  const [hasWon, setHasWon] = useState(false);

  // Snakes: head -> tail
  const snakes: Record<number, number> = {
    16: 6,
    47: 26,
    49: 11,
    56: 53,
    62: 19,
    64: 60,
    87: 24,
    93: 73,
    95: 75,
    98: 78,
  };

  // Ladders: bottom -> top
  const ladders: Record<number, number> = {
    1: 38,
    4: 14,
    9: 31,
    21: 42,
    28: 84,
    36: 44,
    51: 67,
    71: 91,
    80: 100,
  };

  const rollDice = () => {
    if (isRolling || hasWon) return;
    
    setIsRolling(true);
    soundManager.click();
    
    // Animate dice roll
    let rollCount = 0;
    const rollInterval = setInterval(() => {
      setDiceValue(Math.floor(Math.random() * 6) + 1);
      rollCount++;
      
      if (rollCount >= 10) {
        clearInterval(rollInterval);
        const finalValue = Math.floor(Math.random() * 6) + 1;
        setDiceValue(finalValue);
        
        // Move player
        let newPosition = position + finalValue;
        
        if (newPosition > 100) {
          setMessage('Need exact number to reach 100! Try again.');
          newPosition = position;
        } else if (newPosition === 100) {
          setHasWon(true);
          setMessage('🎉 Congratulations! You won!');
          soundManager.celebrate();
        } else {
          // Check for snake or ladder
          if (snakes[newPosition]) {
            newPosition = snakes[newPosition];
            setMessage(`🐍 Oh no! Snake took you down to ${newPosition}`);
            soundManager.wrong();
          } else if (ladders[newPosition]) {
            newPosition = ladders[newPosition];
            setMessage(`🪜 Yay! Ladder took you up to ${newPosition}`);
            soundManager.correct();
          } else {
            setMessage(`Moved to square ${newPosition}`);
          }
        }
        
        setPosition(newPosition);
        setIsRolling(false);
      }
    }, 100);
  };

  const resetGame = () => {
    setPosition(0);
    setDiceValue(0);
    setHasWon(false);
    setMessage('Roll the dice to start!');
    soundManager.click();
  };

  // Generate board squares
  const boardSquares = Array.from({ length: 100 }, (_, i) => i + 1);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onBack}
          className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
        >
          ←
        </button>
        <div className={`flex-1 bg-gradient-to-r ${themeConfig.primaryGradient} rounded-2xl p-4 text-white shadow-lg`}>
          <h2 className="text-2xl font-black">🐍🪜 Snake & Ladder</h2>
          <p className="text-white/90 text-sm">Roll the dice and climb to 100!</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Game Board */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-xl">
          <div className="grid grid-cols-10 gap-1">
            {boardSquares.map((num) => {
              const isSnake = snakes[num];
              const isLadder = ladders[num];
              const isPlayer = position === num;
              
              return (
                <div
                  key={num}
                  className={`aspect-square rounded-lg flex items-center justify-center text-xs font-bold relative ${
                    isPlayer
                      ? 'bg-yellow-400 text-white scale-110 shadow-lg z-10'
                      : isSnake
                      ? 'bg-red-100 text-red-700'
                      : isLadder
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-50 text-gray-600'
                  }`}
                >
                  <span className="text-[10px]">{num}</span>
                  {isSnake && <span className="absolute top-0 right-0 text-[8px]">🐍</span>}
                  {isLadder && <span className="absolute top-0 right-0 text-[8px]">🪜</span>}
                  {isPlayer && <span className="absolute text-lg">🎲</span>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-4">
          {/* Dice */}
          <div className="bg-white rounded-2xl p-6 shadow-xl text-center">
            <div className="text-6xl mb-4">
              {diceValue > 0 ? ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'][diceValue - 1] : '🎲'}
            </div>
            <button
              onClick={rollDice}
              disabled={isRolling || hasWon}
              className={`w-full py-4 bg-gradient-to-r ${themeConfig.buttonGradient} text-white rounded-xl font-black text-lg shadow-lg kid-btn disabled:opacity-50`}
            >
              {isRolling ? 'Rolling...' : 'Roll Dice 🎲'}
            </button>
          </div>

          {/* Position */}
          <div className="bg-white rounded-2xl p-6 shadow-xl">
            <h3 className="font-black text-gray-800 mb-2">Your Position</h3>
            <div className="text-5xl font-black text-center text-purple-600">{position}</div>
          </div>

          {/* Message */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 border-2 border-purple-200">
            <p className="text-sm font-bold text-gray-700 text-center">{message}</p>
          </div>

          {/* Reset */}
          {hasWon && (
            <button
              onClick={resetGame}
              className="w-full py-4 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-xl font-black text-lg shadow-lg kid-btn"
            >
              Play Again 🔄
            </button>
          )}

          {/* Legend */}
          <div className="bg-white rounded-2xl p-4 shadow-xl">
            <h3 className="font-black text-gray-800 mb-2 text-sm">Legend</h3>
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 bg-red-100 rounded"></span>
                <span>🐍 Snake (goes down)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 bg-green-100 rounded"></span>
                <span>🪜 Ladder (goes up)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 bg-yellow-400 rounded"></span>
                <span>🎲 Your position</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
