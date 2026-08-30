import React, { useState } from 'react';

/**
 * GalleryCard component matching exact Figma specifications:
 * - Component 83 (SCHEDULE, node 1:1849)
 * - Component 84 (ENGINE, node 1:1857)
 * - Component 85 (PAINTING, node 1:1865)
 * - Component 86 (DETAILING, node 1:1873)
 *
 * Visual spec:
 * - Width / Height aspect-ratio: 403 / 491
 * - Border: 5px solid #FFFFFF
 * - Border radius: 15px
 * - Background: #000000
 * - Default state: Image fills full height, title at bottom (top: ~79.4%), subtle bottom shadow.
 * - Active/Hover state: Image takes top ~72% height, bottom ~28% is solid black, title moves to top of black split (~62%), 2-line centered description appears in black area (~80%).
 */
export default function GalleryCard({
  img,
  label,
  descLine1,
  descLine2,
  titleTopHoverPercent = 62,
  descTopHoverPercent = 80,
  onClick,
  responsiveHelper,
  className = '',
  active = false,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const isExpanded = active || isHovered;

  const r = responsiveHelper || ((px) => `${px}px`);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={`relative bg-black overflow-hidden cursor-pointer select-none group transition-all duration-300 ease-out ${className}`}
      style={{
        aspectRatio: '403 / 491',
        borderWidth: r(5),
        borderStyle: 'solid',
        borderColor: '#ffffff',
        borderRadius: r(15),
      }}
    >
      {/* ─── Upper Image Area ─── */}
      <div
        className="absolute top-0 left-0 right-0 overflow-hidden transition-all duration-300 ease-out pointer-events-none"
        style={{
          height: isExpanded ? '72%' : '100%',
        }}
      >
        <img
          src={img}
          alt={label}
          className={`w-full h-full object-cover transition-transform duration-500 ease-out ${
            isExpanded ? 'scale-100' : 'group-hover:scale-105'
          }`}
          style={{
            objectPosition: 'center 20%',
          }}
        />
        {/* Default state subtle shadow to enhance text contrast */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent transition-opacity duration-300 ${
            isExpanded ? 'opacity-0' : 'opacity-100'
          }`}
        />
      </div>

      {/* ─── Lower Black Box Area for Hover State ─── */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-black transition-all duration-300 ease-out pointer-events-none ${
          isExpanded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          height: '28%',
        }}
      />

      {/* ─── Title Text: "SCHEDULE", "ENGINE", etc. ─── */}
      <div
        className="absolute left-0 right-0 text-center transition-all duration-300 ease-out pointer-events-none z-20"
        style={{
          top: isExpanded ? `${titleTopHoverPercent}%` : '79.4%',
          transform: 'translateY(-50%)',
        }}
      >
        <p
          className="font-extrabold text-white leading-none tracking-normal uppercase text-center"
          style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: r(40),
          }}
        >
          {label}
        </p>
      </div>

      {/* ─── Description in Bottom Black Box ─── */}
      <div
        className={`absolute left-0 right-0 px-2 text-center transition-all duration-300 ease-out pointer-events-none z-20 ${
          isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
        style={{
          top: `${descTopHoverPercent}%`,
        }}
      >
        <p
          className="font-normal text-white text-center whitespace-pre-line mx-auto"
          style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: r(20),
            lineHeight: '1.15',
            letterSpacing: '-0.01em',
            maxWidth: '92%',
          }}
        >
          {descLine1}
          {descLine2 && (
            <>
              <br />
              {descLine2}
            </>
          )}
        </p>
      </div>
    </div>
  );
}
