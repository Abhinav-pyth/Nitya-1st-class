import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface AnimatedProgressBarProps {
  value: number;
  max?: number;
  color?: string;
  showLabel?: boolean;
  animate?: boolean;
}

export default function AnimatedProgressBar({ 
  value, 
  max = 100, 
  color = 'from-purple-500 to-pink-500',
  showLabel = true,
  animate = true 
}: AnimatedProgressBarProps) {
  const progressRef = useRef<HTMLDivElement>(null);
  const percentage = Math.min((value / max) * 100, 100);

  useEffect(() => {
    if (!progressRef.current || !animate) return;

    gsap.fromTo(
      progressRef.current,
      { width: '0%' },
      {
        width: `${percentage}%`,
        duration: 1.5,
        ease: 'power3.out',
      }
    );
  }, [percentage, animate]);

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm font-bold text-gray-900">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
        <div
          ref={progressRef}
          className={`h-4 rounded-full bg-gradient-to-r ${color} relative overflow-hidden`}
          style={{ width: animate ? '0%' : `${percentage}%` }}
        >
          {/* Shimmer effect */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
              animation: 'shimmer 2s infinite',
            }}
          />
        </div>
      </div>
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
