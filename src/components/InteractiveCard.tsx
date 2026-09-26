import { useRef, useState } from 'react';
import gsap from 'gsap';
import { createSparkleEffect } from '../utils/animations';

interface InteractiveCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function InteractiveCard({ children, className = '', onClick }: InteractiveCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    gsap.to(cardRef.current, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.3,
      ease: 'power2.out',
      transformPerspective: 1000,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (!cardRef.current) return;

    gsap.to(cardRef.current, {
      scale: 1.05,
      duration: 0.3,
      ease: 'power2.out',
      boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (!cardRef.current) return;

    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.5,
      ease: 'elastic.out(1, 0.5)',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    });
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    // Bounce effect
    gsap.to(cardRef.current, {
      scale: 0.95,
      duration: 0.1,
      ease: 'power2.in',
      onComplete: () => {
        gsap.to(cardRef.current, {
          scale: isHovered ? 1.05 : 1,
          duration: 0.4,
          ease: 'elastic.out(1, 0.5)',
        });
      },
    });

    // Sparkle effect
    createSparkleEffect(cardRef.current);

    onClick?.();
  };

  return (
    <div
      ref={cardRef}
      className={`transform-gpu ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{ 
        transformStyle: 'preserve-3d',
        cursor: onClick ? 'pointer' : 'default',
      }}
    >
      {children}
    </div>
  );
}
