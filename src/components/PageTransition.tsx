import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface PageTransitionProps {
  children: React.ReactNode;
  pageKey: string;
}

export default function PageTransition({ children, pageKey }: PageTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Page entrance animation
      const tl = gsap.timeline();

      tl.fromTo(
        containerRef.current,
        { 
          opacity: 0, 
          y: 30,
          scale: 0.98,
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: 'power3.out',
        }
      );

      // Animate children with stagger
      const children = containerRef.current?.children;
      if (children && children.length > 0) {
        tl.fromTo(
          children,
          { 
            opacity: 0, 
            y: 20,
          },
          { 
            opacity: 1, 
            y: 0,
            duration: 0.4,
            stagger: 0.08,
            ease: 'back.out(1.4)',
          },
          '-=0.3'
        );
      }
    });

    return () => ctx.revert();
  }, [pageKey]);

  return (
    <div ref={containerRef} className="w-full">
      {children}
    </div>
  );
}
