import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function MagicCursor() {
  const trailRef = useRef<HTMLDivElement[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();

  useEffect(() => {
    // Only show on desktop with a real pointer (no touch devices).
    const hasFinePointer =
      typeof window.matchMedia === 'function' ? window.matchMedia('(pointer: fine)').matches : true;
    if (window.innerWidth < 768 || !hasFinePointer) return;

    const trailCount = 8;
    const trail: HTMLDivElement[] = [];

    // Create trail elements
    for (let i = 0; i < trailCount; i++) {
      const dot = document.createElement('div');
      const size = 12 - i;
      const opacity = 1 - i / trailCount;
      
      dot.style.position = 'fixed';
      dot.style.width = `${size}px`;
      dot.style.height = `${size}px`;
      dot.style.borderRadius = '50%';
      dot.style.background = `linear-gradient(135deg, #ff6b9d, #c44eff)`;
      dot.style.opacity = `${opacity}`;
      dot.style.pointerEvents = 'none';
      dot.style.zIndex = '9999';
      // Centered via translate baked into the GSAP transform (xPercent/yPercent)
      dot.style.mixBlendMode = 'screen';
      dot.style.filter = 'blur(1px)';
      
      document.body.appendChild(dot);
      trail.push(dot);
    }

    trailRef.current = trail;

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const positions = trail.map(() => ({ x: 0, y: 0 }));

    const animate = () => {
      positions.forEach((pos, i) => {
        const target = i === 0 ? mouseRef.current : positions[i - 1];
        const speed = 0.3 - i * 0.02;
        
        pos.x += (target.x - pos.x) * speed;
        pos.y += (target.y - pos.y) * speed;

        trail[i].style.left = `${pos.x}px`;
        trail[i].style.top = `${pos.y}px`;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Click effect
    const handleClick = (e: MouseEvent) => {
      const burst = document.createElement('div');
      burst.style.position = 'fixed';
      burst.style.left = `${e.clientX}px`;
      burst.style.top = `${e.clientY}px`;
      burst.style.width = '0px';
      burst.style.height = '0px';
      burst.style.borderRadius = '50%';
      burst.style.border = '2px solid #ff6b9d';
      burst.style.pointerEvents = 'none';
      burst.style.zIndex = '9999';
      burst.style.transform = 'translate(-50%, -50%)';
      
      document.body.appendChild(burst);

      gsap.to(burst, {
        width: 60,
        height: 60,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        onComplete: () => burst.remove(),
      });
    };

    window.addEventListener('click', handleClick);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      trail.forEach((dot) => dot.remove());
    };
  }, []);

  return null;
}
