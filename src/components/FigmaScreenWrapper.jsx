import { useState, useEffect } from 'react';

/**
 * FigmaScreenWrapper
 * Renders a fixed 1920x1080 Figma canvas proportionally scaled to fit any viewport
 * with a full-bleed fixed background image so there are NEVER any black gaps on the right or bottom.
 */
export default function FigmaScreenWrapper({ children, bgImage = "/images/auth/bg.png" }) {
  const [scale, setScale] = useState(1);
  const [shiftX, setShiftX] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      if (w < 1024) {
        setIsMobile(true);
        // On mobile and tablet viewports, focus and center the form card (width 745, height 908)
        const targetW = 760;
        const targetH = 940;
        const scaleW = (w - 16) / targetW;
        const scaleH = (h - 50) / targetH;
        // Ensure the card fits comfortably without being microscopic or clipped
        const newScale = Math.min(scaleW, scaleH);
        setScale(newScale);
        // Form card center is at x=1453.5. Canvas center is at x=960.
        // Shifting canvas by -(1453.5 - 960) = -493.5px aligns the card to screen center.
        setShiftX(-493.5);
      } else {
        setIsMobile(false);
        const scaleW = w / 1920;
        const scaleH = h / 1080;
        const newScale = Math.min(scaleW, scaleH);
        setScale(newScale);
        setShiftX(0);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative w-full h-[100dvh] min-h-screen bg-black overflow-hidden flex items-center justify-center select-none">
      {/* ─── FULL BLEED BACKGROUND (100vw x 100vh, 0 gaps) ─── */}
      <img
        src={bgImage}
        alt="Background"
        className="fixed inset-0 w-full h-full object-cover object-center pointer-events-none z-0"
      />

      {/* Subtle dark overlay for contrast */}
      <div className="fixed inset-0 bg-black/40 pointer-events-none z-0" />

      {/* Mobile Top Navigation Bar */}
      {isMobile && (
        <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-black/60 backdrop-blur-md border-b border-white/10">
          <a
            href="#/landing"
            className="flex items-center gap-2 text-white font-bold text-xs tracking-wider uppercase bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full border border-white/20 transition-all"
          >
            ← Back to Mechify
          </a>
          <div className="flex items-center gap-1 text-red-500 font-black text-sm tracking-widest">
            MECHIFY
          </div>
        </div>
      )}

      {/* ─── SCALED 1920x1080 FIGMA CANVAS ─── */}
      <div
        className="relative z-10 w-[1920px] h-[1080px] flex-shrink-0 origin-center transition-transform duration-200"
        style={{
          transform: `scale(${scale}) translateX(${shiftX}px)`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
