import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Hook for page entrance animations
export const usePageAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Animate container entrance
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      );

      // Animate children with stagger
      const children = containerRef.current?.children;
      if (!children) return;
      gsap.fromTo(
        children,
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.5, 
          stagger: 0.1, 
          ease: 'back.out(1.7)',
          delay: 0.2
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return containerRef;
};

// Hook for scroll-triggered animations
export const useScrollAnimation = (trigger: string = '.scroll-trigger') => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(trigger).forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, [trigger]);
};

// Hook for floating animation
export const useFloatingAnimation = (selector: string = '.float-element') => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(selector).forEach((element, i) => {
        gsap.to(element, {
          y: '+=20',
          duration: 2 + i * 0.5,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
      });
    });

    return () => ctx.revert();
  }, [selector]);
};

// Hook for card hover animations
export const useCardHover = (selector: string = '.hover-card') => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(selector).forEach((card) => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out',
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out',
          });
        });
      });
    });

    return () => ctx.revert();
  }, [selector]);
};

// Hook for button press animations
export const useButtonPress = (selector: string = '.press-button') => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(selector).forEach((button) => {
        button.addEventListener('mousedown', () => {
          gsap.to(button, {
            scale: 0.95,
            duration: 0.1,
            ease: 'power2.out',
          });
        });

        button.addEventListener('mouseup', () => {
          gsap.to(button, {
            scale: 1,
            duration: 0.2,
            ease: 'elastic.out(1, 0.5)',
          });
        });
      });
    });

    return () => ctx.revert();
  }, [selector]);
};

// Hook for staggered list animations
export const useStaggerAnimation = (selector: string = '.stagger-item') => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        selector,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
        }
      );
    });

    return () => ctx.revert();
  }, [selector]);
};

// Hook for rotating elements
export const useRotateAnimation = (selector: string = '.rotate-element') => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(selector).forEach((element) => {
        gsap.to(element, {
          rotation: 360,
          duration: 20,
          ease: 'none',
          repeat: -1,
        });
      });
    });

    return () => ctx.revert();
  }, [selector]);
};

// Hook for pulse animation
export const usePulseAnimation = (selector: string = '.pulse-element') => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(selector).forEach((element) => {
        gsap.to(element, {
          scale: 1.1,
          duration: 1,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
      });
    });

    return () => ctx.revert();
  }, [selector]);
};

// Utility function for creating confetti burst
export const createConfettiBurst = (x: number, y: number) => {
  const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#5f27cd'];
  
  for (let i = 0; i < 30; i++) {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.left = `${x}px`;
    confetti.style.top = `${y}px`;
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
    confetti.style.pointerEvents = 'none';
    confetti.style.zIndex = '9999';
    document.body.appendChild(confetti);

    const angle = (Math.PI * 2 * i) / 30;
    const velocity = 200 + Math.random() * 100;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity;

    gsap.to(confetti, {
      x: vx,
      y: vy + 200,
      rotation: Math.random() * 720,
      opacity: 0,
      duration: 1.5,
      ease: 'power2.out',
      onComplete: () => confetti.remove(),
    });
  }
};

// Utility function for creating sparkle effect
export const createSparkleEffect = (element: HTMLElement) => {
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  for (let i = 0; i < 8; i++) {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = '✨';
    sparkle.style.position = 'fixed';
    sparkle.style.left = `${centerX}px`;
    sparkle.style.top = `${centerY}px`;
    sparkle.style.fontSize = '20px';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '9999';
    document.body.appendChild(sparkle);

    const angle = (Math.PI * 2 * i) / 8;
    const distance = 50 + Math.random() * 30;

    gsap.to(sparkle, {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      opacity: 0,
      scale: 0,
      duration: 0.8,
      ease: 'power2.out',
      onComplete: () => sparkle.remove(),
    });
  }
};

export { gsap, ScrollTrigger };
