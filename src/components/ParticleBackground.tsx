import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface Particle {
  element: HTMLDivElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  opacity: number;
}

export default function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3'];
    const particleCount = 30;

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      const size = Math.random() * 15 + 5;
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      particle.style.position = 'absolute';
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.borderRadius = '50%';
      particle.style.backgroundColor = color;
      particle.style.opacity = '0.3';
      particle.style.pointerEvents = 'none';
      particle.style.filter = 'blur(1px)';
      
      container.appendChild(particle);

      particlesRef.current.push({
        element: particle,
        x: Math.random() * container.clientWidth,
        y: Math.random() * container.clientHeight,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size,
        color,
        opacity: 0.3,
      });
    }

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    container.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      particlesRef.current.forEach((particle) => {
        // Move particle
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Mouse interaction - particles move away from cursor
        const dx = particle.x - mouseRef.current.x;
        const dy = particle.y - mouseRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          const force = (100 - distance) / 100;
          particle.vx += (dx / distance) * force * 0.5;
          particle.vy += (dy / distance) * force * 0.5;
        }

        // Damping
        particle.vx *= 0.98;
        particle.vy *= 0.98;

        // Boundary check
        if (particle.x < 0 || particle.x > container.clientWidth) {
          particle.vx *= -1;
          particle.x = Math.max(0, Math.min(container.clientWidth, particle.x));
        }
        if (particle.y < 0 || particle.y > container.clientHeight) {
          particle.vy *= -1;
          particle.y = Math.max(0, Math.min(container.clientHeight, particle.y));
        }

        // Update position
        particle.element.style.left = `${particle.x}px`;
        particle.element.style.top = `${particle.y}px`;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      container.removeEventListener('mousemove', handleMouseMove);
      particlesRef.current.forEach((p) => p.element.remove());
      particlesRef.current = [];
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
    />
  );
}
