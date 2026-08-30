import React, { useState } from 'react';

/**
 * Exact 1:1 Figma implementation for Component 83 (SCHEDULE), Component 84 (ENGINE),
 * Component 85 (PAINTING), and Component 86 (DETAILING).
 *
 * Exact Figma Specs:
 * - Card: 403px × 491px, border: 5px solid #ffffff, border-radius: 15px, background: #000000, overflow: clip
 * - Default State: Image covers entire card, Title at top: 390px (79.43%), font: Sora ExtraBold 40px, leading: 0.962, white
 * - Hover State: Image shifts up with black bottom, Title at top: 298px-325px, Description at top: 391px-417px (Sora Regular 20px, leading: 0.962, center, white)
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
      className={`relative bg-black overflow-hidden cursor-pointer select-none group transition-all duration-300 ease-out ${className}`}
      style={{
        aspectRatio: '403 / 491',
        borderWidth: r(5),
        borderStyle: 'solid',
        borderColor: '#ffffff',
        borderRadius: r(15),
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
        className="absolute left-0 right-0 w-full text-center transition-all duration-300 ease-out pointer-events-none z-20"
        style={{
          top: isHovered ? titleHoverTop : titleDefaultTop,
        }}
      >
        <p
          className="font-extrabold text-white text-center whitespace-nowrap select-none"
          style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 800,
            fontSize: r(40),
            lineHeight: 0.962,
            letterSpacing: '0px',
            margin: 0,
            padding: 0,
          }}
        >
          {label}
        </p>
      </div>

      {/* ─── Description: 2-line exact sentences in bottom black area ─── */}
      <div
        className={`absolute left-0 right-0 w-full text-center transition-all duration-300 ease-out pointer-events-none z-20 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
        style={{
          top: descHoverTop,
        }}
      >
        <div
          className="text-center mx-auto"
          style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 400,
            fontSize: r(20),
            color: '#ffffff',
            lineHeight: 0.962,
          }}
        >
          <p
            className="whitespace-pre text-center mb-0"
            style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 400,
              fontSize: r(20),
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            {line1}
          </p>
          <p
            className="whitespace-pre text-center"
            style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 400,
              fontSize: r(20),
              lineHeight: 1.15,
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
