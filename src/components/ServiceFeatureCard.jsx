import React, { useState } from 'react';

/**
 * ServiceFeatureCard component matching exact Figma specifications with responsive scaling:
 * - Component 87 (Performance Check, node 1:1881)
 * - Component 88 (Auto Repair, node 1:1888)
 * - Component 89 (Fleet Service, node 1:1895)
 */
export default function ServiceFeatureCard({
  icon,
  titleLine1,
  titleLine2,
  descLines = [],
  defaultIconTop = 129,
  defaultTitleTop = 296,
  hoverDescTop = 245,
  responsiveHelper,
  onClick,
  className = '',
}) {
  const [isHovered, setIsHovered] = useState(false);

  const r = responsiveHelper || ((px) => `${px}px`);

  // Calculate percentage tops from 468px base height for flawless scaling
  const defIconTopPct = `${(defaultIconTop / 468) * 100}%`;
  const defTitleTopPct = `${(defaultTitleTop / 468) * 100}%`;
  const hoverDescTopPct = `${(hoverDescTop / 468) * 100}%`;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={`relative bg-black overflow-hidden cursor-pointer select-none group transition-all duration-300 ease-out flex flex-col items-center justify-center border-4 sm:border-[5px] border-white rounded-[28px] sm:rounded-[36px] lg:rounded-[44px] hover:shadow-[0_0_35px_rgba(255,255,255,0.2)] ${className}`}
      style={{
        aspectRatio: '553 / 468',
        width: '100%',
      }}
    >
      {/* ─── Icon (scales between 128px default and 50px hover) ─── */}
      <div
        className="absolute left-1/2 -translate-x-1/2 transition-all duration-300 ease-out pointer-events-none flex items-center justify-center"
        style={{
          top: isHovered ? '36%' : defIconTopPct,
          width: isHovered ? 'clamp(36px, 3.8vw, 56px)' : 'clamp(72px, 8.2vw, 132px)',
          height: isHovered ? 'clamp(36px, 3.8vw, 56px)' : 'clamp(72px, 8.2vw, 132px)',
        }}
      >
        <img
          src={icon}
          alt={`${titleLine1} ${titleLine2}`}
          className="w-full h-full object-contain brightness-0 invert"
        />
      </div>

      {/* ─── Default State: Title (Sora Bold 40px base) ─── */}
      <div
        className={`absolute left-0 right-0 w-full text-center px-4 transition-all duration-300 ease-out pointer-events-none ${
          isHovered ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
        }`}
        style={{
          top: defTitleTopPct,
        }}
      >
        <p
          className="font-bold text-white text-center leading-tight tracking-tight"
          style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(20px, 2.3vw, 42px)',
            margin: 0,
          }}
        >
          {titleLine1}
        </p>
        <p
          className="font-bold text-white text-center leading-tight tracking-tight"
          style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(20px, 2.3vw, 42px)',
            marginTop: '2px',
            margin: 0,
          }}
        >
          {titleLine2}
        </p>
      </div>

      {/* ─── Hover State: Description (Sora Bold 24px base, exact 4 lines) ─── */}
      <div
        className={`absolute left-0 right-0 w-full px-4 sm:px-6 text-center transition-all duration-300 ease-out pointer-events-none ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
        }`}
        style={{
          top: hoverDescTopPct,
        }}
      >
        <div className="mx-auto text-center">
          {descLines.map((line, idx) => (
            <p
              key={idx}
              className="text-center whitespace-nowrap"
              style={{
                fontFamily: "'Sora', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(12px, 1.45vw, 24px)',
                lineHeight: 1.25,
                margin: 0,
                color: '#ffffff',
              }}
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
