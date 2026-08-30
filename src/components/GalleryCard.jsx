import React, { useState } from 'react';

/**
 * Exact 1:1 Figma implementation for Component 83 (SCHEDULE), Component 84 (ENGINE),
 * Component 85 (PAINTING), and Component 86 (DETAILING) with responsive scaling.
 */
export default function GalleryCard({
  img,
  label,
  line1,
  line2,
  titleDefaultTop = '79.43%',
  titleHoverTop = '60.69%',
  descHoverTop = '79.63%',
  imageHoverShift = '-25%',
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
      className={`relative bg-black overflow-hidden cursor-pointer select-none group transition-all duration-300 ease-out border-4 sm:border-[5px] border-white rounded-[20px] sm:rounded-[24px] hover:shadow-[0_0_35px_rgba(255,255,255,0.25)] ${className}`}
      style={{
        aspectRatio: '403 / 491',
        width: '100%',
      }}
    >
      {/* ─── Image Container with Exact Figma Crop & Shift ─── */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none transition-all duration-300 ease-out"
        style={{
          height: isHovered ? '72%' : '100%',
        }}
      >
        <img
          src={img}
          alt={label}
          className="w-full h-full object-cover transition-all duration-300 ease-out"
          style={{
            objectPosition: 'center 15%',
            transform: isHovered ? `translateY(${imageHoverShift})` : 'translateY(0%)',
          }}
        />
        {/* Subtle shadow overlay in default state */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300 ${
            isHovered ? 'opacity-0' : 'opacity-100'
          }`}
        />
      </div>

      {/* ─── Black Bottom Plate for Hover State ─── */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-black transition-opacity duration-300 ease-out pointer-events-none ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          height: '28%',
        }}
      />

      {/* ─── Title ("SCHEDULE", "ENGINE", "PAINTING", "DETAILING") ─── */}
      <div
        className="absolute left-0 right-0 w-full text-center transition-all duration-300 ease-out pointer-events-none z-20 px-2"
        style={{
          top: isHovered ? titleHoverTop : titleDefaultTop,
        }}
      >
        <p
          className="font-extrabold text-white text-center whitespace-nowrap select-none tracking-tight"
          style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(18px, 2.2vw, 38px)',
            lineHeight: 0.962,
            margin: 0,
            padding: 0,
          }}
        >
          {label}
        </p>
      </div>

      {/* ─── Description: 2-line exact sentences in bottom black area ─── */}
      <div
        className={`absolute left-0 right-0 w-full text-center transition-all duration-300 ease-out pointer-events-none z-20 px-2 sm:px-4 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
        style={{
          top: descHoverTop,
        }}
      >
        <div className="text-center mx-auto">
          <p
            className="whitespace-pre text-center mb-0 text-white"
            style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 400,
              fontSize: 'clamp(11px, 1.2vw, 19px)',
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            {line1}
          </p>
          <p
            className="whitespace-pre text-center text-white"
            style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 400,
              fontSize: 'clamp(11px, 1.2vw, 19px)',
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            {line2}
          </p>
        </div>
      </div>
    </div>
  );
}
