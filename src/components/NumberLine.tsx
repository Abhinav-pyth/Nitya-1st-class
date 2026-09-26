import { useState } from 'react';
import gsap from 'gsap';
import { useRef } from 'react';

interface NumberLineProps {
  start?: number;
  end?: number;
  onNumberClick?: (num: number) => void;
}

export default function NumberLine({ start = 0, end = 20, onNumberClick }: NumberLineProps) {
  const [activeNumbers, setActiveNumbers] = useState<number[]>([]);
  const numbersRef = useRef<(HTMLDivElement | null)[]>([]);

  const handleReset = () => {
    // Animate all numbers back to default
    numbersRef.current.forEach((element) => {
      if (element) {
        gsap.to(element, {
          scale: 1,
          backgroundColor: '#ffffff',
          duration: 0.3,
          ease: 'back.out(1.7)',
        });
      }
    });
    setActiveNumbers([]);
  };

  const handleNumberClick = (num: number, index: number) => {
    const element = numbersRef.current[index];
    if (!element) return;

    // Toggle active state
    if (activeNumbers.includes(num)) {
      setActiveNumbers(activeNumbers.filter(n => n !== num));
      gsap.to(element, {
        scale: 1,
        backgroundColor: '#ffffff',
        duration: 0.3,
        ease: 'back.out(1.7)',
      });
    } else {
      setActiveNumbers([...activeNumbers, num]);
      
      // Bounce animation
      gsap.to(element, {
        scale: 1.3,
        duration: 0.2,
        ease: 'power2.out',
        onComplete: () => {
          gsap.to(element, {
            scale: 1.1,
            backgroundColor: '#a78bfa',
            duration: 0.3,
            ease: 'elastic.out(1, 0.5)',
          });
        },
      });
    }

    onNumberClick?.(num);
  };

  const numbers = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  return (
    <div className="w-full bg-white rounded-2xl p-6 shadow-lg">
      <h3 className="text-lg font-bold text-gray-800 mb-4">🔢 Interactive Number Line</h3>
      
      {/* Number line */}
      <div className="relative">
        {/* Line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-purple-300 to-pink-300 transform -translate-y-1/2" />
        
        {/* Numbers */}
        <div className="relative flex justify-between items-center">
          {numbers.map((num, index) => (
            <div
              key={num}
              ref={el => { numbersRef.current[index] = el; }}
              onClick={() => handleNumberClick(num, index)}
              className="relative z-10 w-10 h-10 bg-white border-2 border-purple-300 rounded-full flex items-center justify-center font-bold text-gray-700 cursor-pointer hover:border-purple-500 transition-colors"
              style={{ transform: 'translateY(0)' }}
            >
              {num}
            </div>
          ))}
        </div>
      </div>

      {/* Active numbers display */}
      {activeNumbers.length > 0 && (
        <div className="mt-4 p-3 bg-purple-50 rounded-xl">
          <p className="text-sm text-gray-600 mb-1">Selected numbers:</p>
          <p className="text-lg font-bold text-purple-700">
            {activeNumbers.sort((a, b) => a - b).join(', ')}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Sum: <span className="font-bold">{activeNumbers.reduce((a, b) => a + b, 0)}</span>
          </p>
        </div>
      )}

      {/* Instructions and Reset Button */}
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          💡 Click numbers to select them. Try adding them up!
        </div>
        {activeNumbers.length > 0 && (
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-gradient-to-r from-red-400 to-pink-500 text-white rounded-lg font-bold text-sm hover:scale-105 transition-transform shadow-md"
          >
            🔄 Reset
          </button>
        )}
      </div>
    </div>
  );
}
