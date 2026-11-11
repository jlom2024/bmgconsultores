"use client";

import { useEffect, useState, type ReactNode } from "react";

// Client-only wrapper — renders children only after mount
export function ClientOnly({ children, fallback = null }: { children: ReactNode; fallback?: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted ? <>{children}</> : <>{fallback}</>;
}

// Lenis + GSAP scroll animations, client-side only
// Returns null — it's a side-effect provider that installs global scroll behavior
export function MotionProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    let cleanup: (() => void) | null = null;
    let cancelled = false;

    const init = async () => {
      // Skip if user prefers reduced motion
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      try {
        const gsapModule = await import("gsap");
        if (cancelled) return;

        const gsap = (gsapModule as any).default || (gsapModule as any).gsap;
        const { ScrollTrigger } = gsapModule as any;

        if (!gsap) return;

        gsap.registerPlugin(ScrollTrigger);

        // Animate elements with data-animate
        const animated = document.querySelectorAll("[data-animate]");
        animated.forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });

        // Subtle parallax hero background
        const heroBg = document.querySelector("[data-hero-bg]");
        if (heroBg && document.querySelector("[data-hero-section]")) {
          gsap.fromTo(
            heroBg,
            { yPercent: -8 },
            {
              yPercent: 8,
              ease: "none",
              scrollTrigger: {
                trigger: "[data-hero-section]",
                start: "top top",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }

        // Parallax plates
        const plates = document.querySelectorAll("[data-parallax-plate]");
        plates.forEach((plate) => {
          const parent = plate.parentElement;
          if (!parent) return;
          gsap.to(plate, {
            yPercent: 12,
            ease: "none",
            scrollTrigger: {
              trigger: parent,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        });

        // Magnetic effect on CTA buttons
        const magneticBtns = document.querySelectorAll("[data-magnetic]");
        magneticBtns.forEach((btn) => {
          const handleMove = (e: MouseEvent | any) => {
            const rect = (btn as HTMLElement).getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(btn, {
              x: x * 0.15,
              y: y * 0.15,
              duration: 0.3,
              ease: "power2.out",
            });
          };
          const handleLeave = () => {
            gsap.to(btn, {
              x: 0,
              y: 0,
              duration: 0.5,
              ease: "elastic.out(1, 0.5)",
            });
          };
          btn.addEventListener("mousemove", handleMove as EventListener);
          btn.addEventListener("mouseleave", handleLeave as EventListener);
          (btn as any)._cleanupMagnetic = () => {
            btn.removeEventListener("mousemove", handleMove as EventListener);
            btn.removeEventListener("mouseleave", handleLeave as EventListener);
          };
        });

        cleanup = () => {
          magneticBtns.forEach((btn) => {
            if ((btn as any)._cleanupMagnetic) (btn as any)._cleanupMagnetic();
          });
          ScrollTrigger.getAll().forEach((s: any) => s.kill());
        };
      } catch (e) {
        // Motion is progressive enhancement — silently fail
        console.warn("Motion init failed:", e);
      }
    };

    // Defer to after first paint
    const timeout = setTimeout(() => init(), 100);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
      if (cleanup) cleanup();
    };
  }, []);

  return <>{children}</>;
}