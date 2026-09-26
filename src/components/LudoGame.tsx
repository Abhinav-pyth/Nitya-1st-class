import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { soundManager } from '../utils/sounds';

interface LudoGameProps {
  onBack: () => void;
}

type PlayerColor = 'red' | 'green' | 'yellow' | 'blue';

interface Player {
  color: PlayerColor;
  position: number;
  tokens: number[];
}

export default function LudoGame({ onBack }: LudoGameProps) {
  const { themeConfig } = useTheme();
  const [currentPlayer, setCurrentPlayer] = useState<PlayerColor>('red');
  const [diceValue, setDiceValue] = useState(0);
  const [isRolling, setIsRolling] = useState(false);
  const [message, setMessage] = useState('Red player, roll the dice!');

  const [players, setPlayers] = useState<Record<PlayerColor, Player>>({
    red: { color: 'red', position: 0, tokens: [0, 0, 0, 0] },
    green: { color: 'green', position: 0, tokens: [0, 0, 0, 0] },
    yellow: { color: 'yellow', position: 0, tokens: [0, 0, 0, 0] },
    blue: { color: 'blue', position: 0, tokens: [0, 0, 0, 0] },
  });

  const colorMap: Record<PlayerColor, string> = {
    red: 'bg-red-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    blue: 'bg-blue-500',
  };

  const colorNames: Record<PlayerColor, string> = {
    red: 'Red',
    green: 'Green',
    yellow: 'Yellow',
    blue: 'Blue',
  };

  const rollDice = () => {
    if (isRolling) return;
    
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
        
        // Move current player
        const player = players[currentPlayer];
        const newPosition = player.position + finalValue;
        
        if (newPosition <= 57) {
          setPlayers({
            ...players,
            [currentPlayer]: { ...player, position: newPosition },
          });
          setMessage(`${colorNames[currentPlayer]} moved to ${newPosition}`);
        } else {
          setMessage(`${colorNames[currentPlayer]} needs exact number to finish!`);
        }
        
        // Switch player (unless rolled 6)
        if (finalValue !== 6) {
          const nextPlayer = getNextPlayer(currentPlayer);
          setCurrentPlayer(nextPlayer);
          setTimeout(() => {
            setMessage(`${colorNames[nextPlayer]} player, roll the dice!`);
          }, 1000);
        } else {
          setMessage(`${colorNames[currentPlayer]} rolled 6! Roll again!`);
        }
        
        setIsRolling(false);
      }
    }, 100);
  };

  const getNextPlayer = (current: PlayerColor): PlayerColor => {
    const order: PlayerColor[] = ['red', 'green', 'yellow', 'blue'];
    const currentIndex = order.indexOf(current);
    return order[(currentIndex + 1) % 4];
  };

  const resetGame = () => {
    setPlayers({
      red: { color: 'red', position: 0, tokens: [0, 0, 0, 0] },
      green: { color: 'green', position: 0, tokens: [0, 0, 0, 0] },
      yellow: { color: 'yellow', position: 0, tokens: [0, 0, 0, 0] },
      blue: { color: 'blue', position: 0, tokens: [0, 0, 0, 0] },
    });
    setCurrentPlayer('red');
    setDiceValue(0);
    setMessage('Red player, roll the dice!');
    soundManager.click();
  };

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
          <h2 className="text-2xl font-black">🎲 Ludo Game</h2>
          <p className="text-white/90 text-sm">Roll dice and race to finish!</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Game Board */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-xl">
          {/* Simplified Ludo Board */}
          <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-4 relative">
            {/* Center */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center">
              <span className="text-3xl">🏁</span>
            </div>

            {/* Player Homes */}
            <div className="absolute top-4 left-4 w-24 h-24 bg-red-100 rounded-xl flex items-center justify-center border-4 border-red-500">
              <div className="grid grid-cols-2 gap-1">
                {players.red.tokens.map((_, i) => (
                  <div key={i} className="w-6 h-6 bg-red-500 rounded-full"></div>
                ))}
              </div>
            </div>

            <div className="absolute top-4 right-4 w-24 h-24 bg-green-100 rounded-xl flex items-center justify-center border-4 border-green-500">
              <div className="grid grid-cols-2 gap-1">
                {players.green.tokens.map((_, i) => (
                  <div key={i} className="w-6 h-6 bg-green-500 rounded-full"></div>
                ))}
              </div>
            </div>

            <div className="absolute bottom-4 left-4 w-24 h-24 bg-yellow-100 rounded-xl flex items-center justify-center border-4 border-yellow-500">
              <div className="grid grid-cols-2 gap-1">
                {players.yellow.tokens.map((_, i) => (
                  <div key={i} className="w-6 h-6 bg-yellow-500 rounded-full"></div>
                ))}
              </div>
            </div>

            <div className="absolute bottom-4 right-4 w-24 h-24 bg-blue-100 rounded-xl flex items-center justify-center border-4 border-blue-500">
              <div className="grid grid-cols-2 gap-1">
                {players.blue.tokens.map((_, i) => (
                  <div key={i} className="w-6 h-6 bg-blue-500 rounded-full"></div>
                ))}
              </div>
            </div>

            {/* Path indicators */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="text-6xl opacity-20">🎲</div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-4">
          {/* Current Player */}
          <div className={`${colorMap[currentPlayer]} rounded-2xl p-6 text-white shadow-xl`}>
            <h3 className="font-black text-xl mb-2">Current Turn</h3>
            <div className="text-3xl font-black">{colorNames[currentPlayer]}</div>
          </div>

          {/* Dice */}
          <div className="bg-white rounded-2xl p-6 shadow-xl text-center">
            <div className="text-6xl mb-4">
              {diceValue > 0 ? ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'][diceValue - 1] : '🎲'}
            </div>
            <button
              onClick={rollDice}
              disabled={isRolling}
              className={`w-full py-4 bg-gradient-to-r ${themeConfig.buttonGradient} text-white rounded-xl font-black text-lg shadow-lg kid-btn disabled:opacity-50`}
            >
              {isRolling ? 'Rolling...' : 'Roll Dice 🎲'}
            </button>
          </div>

          {/* Message */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 border-2 border-purple-200">
            <p className="text-sm font-bold text-gray-700 text-center">{message}</p>
          </div>

          {/* Player Positions */}
          <div className="bg-white rounded-2xl p-4 shadow-xl">
            <h3 className="font-black text-gray-800 mb-3 text-sm">Player Positions</h3>
            <div className="space-y-2">
              {Object.values(players).map((player) => (
                <div key={player.color} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 ${colorMap[player.color]} rounded-full`}></div>
                    <span className="font-bold text-sm">{colorNames[player.color]}</span>
                  </div>
                  <span className="font-black text-gray-700">{player.position}/57</span>
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
    </div>
  );
}
