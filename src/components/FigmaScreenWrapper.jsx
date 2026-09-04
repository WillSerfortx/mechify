import { useState, useEffect } from 'react';

/**
 * FigmaScreenWrapper
 * Renders a fixed 1920x1080 Figma canvas proportionally scaled to fit any viewport
 * with a full-bleed fixed background image so there are NEVER any black gaps on the right or bottom.
 */
export default function FigmaScreenWrapper({ children, bgImage = "/images/auth/bg.png" }) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      // Fit scale proportionally to window
      const scaleW = w / 1920;
      const scaleH = h / 1080;
      // On wide desktop screens, fit to the smaller dimension to prevent cutoff, with fallback for responsive
      const newScale = Math.min(scaleW, scaleH);
      setScale(Math.max(newScale, 0.45));
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-black overflow-x-hidden flex items-center justify-center select-none">
      {/* ─── FULL BLEED BACKGROUND (100vw x 100vh, 0 gaps) ─── */}
      <img
        src={bgImage}
        alt="Background"
        className="fixed inset-0 w-full h-full object-cover object-center pointer-events-none z-0"
      />

      {/* Subtle overlay */}
      <div className="fixed inset-0 bg-black/20 pointer-events-none z-0" />

      {/* ─── SCALED 1920x1080 FIGMA CANVAS ─── */}
      <div
        className="relative z-10 w-[1920px] h-[1080px] flex-shrink-0"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
        }}
      >
        {children}
      </div>
    </div>
  );
}
