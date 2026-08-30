import React, { useState } from 'react';

/**
 * ServiceFeatureCard component matching exact Figma specifications:
 * - Component 87 (Performance Check, node 1:1881)
 * - Component 88 (Auto Repair, node 1:1888)
 * - Component 89 (Fleet Service, node 1:1895)
 *
 * Exact Specs:
 * - Dimensions: 553px × 468px (aspect-ratio: 553/468)
 * - Border: 5px solid #ffffff, border-radius: 40px, background: #000000
 * - Default State: Icon 128×128 at top: ~125px, Title 40px (Sora:Bold) at top: ~290px
 * - Hover / Active State: Icon shrinks to 50×50 at top: 179px, Description 24px (Sora:Bold) at top: ~250px-273px with exact 4 lines
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

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={`relative bg-black overflow-hidden cursor-pointer select-none group transition-all duration-300 ease-out flex flex-col items-center justify-center ${className}`}
      style={{
        aspectRatio: '553 / 468',
        borderWidth: r(5),
        borderStyle: 'solid',
        borderColor: '#ffffff',
        borderRadius: r(40),
      }}
    >
      {/* ─── Icon (128x128 on default, 50x50 on hover) ─── */}
      <div
        className="absolute left-1/2 -translate-x-1/2 transition-all duration-300 ease-out pointer-events-none flex items-center justify-center"
        style={{
          top: isHovered ? r(179) : r(defaultIconTop),
          width: isHovered ? r(50) : r(128),
          height: isHovered ? r(50) : r(128),
        }}
      >
        <img
          src={icon}
          alt={`${titleLine1} ${titleLine2}`}
          className="w-full h-full object-contain brightness-0 invert"
        />
      </div>

      {/* ─── Default State: Title (Sora Bold 40px) ─── */}
      <div
        className={`absolute left-0 right-0 w-full text-center transition-all duration-300 ease-out pointer-events-none ${
          isHovered ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
        }`}
        style={{
          top: r(defaultTitleTop),
        }}
      >
        <p
          className="font-bold text-white text-center leading-none"
          style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 700,
            fontSize: r(40),
            lineHeight: 0.962,
            margin: 0,
          }}
        >
          {titleLine1}
        </p>
        <p
          className="font-bold text-white text-center leading-none"
          style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 700,
            fontSize: r(40),
            lineHeight: 0.962,
            marginTop: r(6),
            margin: 0,
          }}
        >
          {titleLine2}
        </p>
      </div>

      {/* ─── Hover State: Description (Sora Bold 24px, exact 4 lines) ─── */}
      <div
        className={`absolute left-0 right-0 w-full px-4 text-center transition-all duration-300 ease-out pointer-events-none ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
        }`}
        style={{
          top: r(hoverDescTop),
        }}
      >
        <div
          className="mx-auto text-center"
          style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 700,
            fontSize: r(24),
            color: '#ffffff',
            lineHeight: 0.962,
          }}
        >
          {descLines.map((line, idx) => (
            <p
              key={idx}
              className="text-center whitespace-nowrap"
              style={{
                fontFamily: "'Sora', sans-serif",
                fontWeight: 700,
                fontSize: r(24),
                lineHeight: 1.18,
                margin: 0,
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
