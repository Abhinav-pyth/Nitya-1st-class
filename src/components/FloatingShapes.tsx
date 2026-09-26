import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface FloatingShape {
  element: HTMLDivElement;
  x: number;
  y: number;
  rotation: number;
  scale: number;
}

export default function FloatingShapes() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shapesRef = useRef<FloatingShape[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const shapes: FloatingShape[] = [];
    const emojis = ['⭐', '🌟', '✨', '💫', '🎈', '🎨', '📚', '✏️', '🔢', '🎵'];

    // Create floating shapes
    for (let i = 0; i < 15; i++) {
      const shape = document.createElement('div');
      const emoji = emojis[Math.floor(Math.random() * emojis.length)];
      const size = Math.random() * 30 + 20;
      
      shape.innerHTML = emoji;
      shape.style.position = 'absolute';
      shape.style.fontSize = `${size}px`;
      shape.style.opacity = '0.15';
      shape.style.pointerEvents = 'none';
      shape.style.userSelect = 'none';
      
      container.appendChild(shape);

      const x = Math.random() * container.clientWidth;
      const y = Math.random() * container.clientHeight;

      shapes.push({
        element: shape,
        x,
        y,
        rotation: Math.random() * 360,
        scale: 1,
      });

      // Initial position
      shape.style.left = `${x}px`;
      shape.style.top = `${y}px`;

      // Animate each shape
      gsap.to(shape, {
        y: `+=${Math.random() * 100 + 50}`,
        x: `+=${(Math.random() - 0.5) * 100}`,
        rotation: `+=${Math.random() * 360}`,
        duration: Math.random() * 10 + 10,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    }

    shapesRef.current = shapes;

    return () => {
      shapes.forEach((s) => s.element.remove());
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    />
  );
}
