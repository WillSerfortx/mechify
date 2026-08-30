import React, { useState } from 'react';

/**
 * GalleryCard component matching Figma Component 83 (SCHEDULE, node 1:1849)
 * and sibling components (ENGINE, PAINTING, DETAILING).
 *
 * Implements the interactive 2-state card:
 * - Default state: Full photo background with bold title at the bottom.
 * - Hover / Active state: Image slides up to top half, solid black bottom,
 *   title moves up, and 2-line description fades in centered below.
 */
export default function GalleryCard({
  img,
  label,
  descLine1,
  descLine2,
  onClick,
  responsiveHelper,
  className = '',
}) {
  const [isHovered, setIsHovered] = useState(false);

  // Fallback if responsive helper is not provided
  const r = responsiveHelper || ((px) => `${px}px`);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={`relative bg-black overflow-hidden cursor-pointer group transition-colors duration-500 select-none ${className}`}
      style={{
        aspectRatio: '403 / 491',
        borderWidth: r(5),
        borderStyle: 'solid',
        borderColor: '#ffffff',
        borderRadius: r(15),
      }}
    >
      {/* ─── Top/Background Image ─── */}
      <div
        className="absolute top-0 left-0 right-0 overflow-hidden transition-all duration-500 ease-out pointer-events-none"
        style={{
          height: isHovered ? '58%' : '100%',
        }}
      >
        <img
          src={img}
          alt={label}
          className={`w-full h-full object-cover transition-transform duration-500 ease-out ${
            isHovered ? 'scale-105' : 'group-hover:scale-105'
          }`}
          style={{
            objectPosition: 'center 20%',
          }}
        />
        {/* Subtle dark gradient overlay in default state for title legibility */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent transition-opacity duration-500 ${
            isHovered ? 'opacity-0' : 'opacity-100'
          }`}
        />
      </div>

      {/* ─── Black base plate for hover state ─── */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-black transition-opacity duration-500 pointer-events-none ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ height: '44%' }}
      />

      {/* ─── Card Text & Transitions ─── */}
      <div className="absolute inset-0 flex flex-col justify-end pointer-events-none z-10">
        {/* Title Container (moves up on hover) */}
        <div
          className="w-full text-center transition-all duration-500 ease-out"
          style={{
            transform: isHovered
              ? `translateY(-${r(102)})`
              : `translateY(-${r(32)})`,
          }}
        >
          <p
            className="font-extrabold text-white leading-none tracking-wide text-center uppercase"
            style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: r(40),
            }}
          >
            {label}
          </p>
        </div>

        {/* Description Container (fades and translates in on hover) */}
        <div
          className={`w-full px-4 text-center transition-all duration-500 ease-out absolute bottom-0 left-0 right-0 ${
            isHovered
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-3 pointer-events-none'
          }`}
          style={{
            paddingBottom: r(28),
          }}
        >
          <p
            className="font-normal text-white text-center leading-tight mx-auto"
            style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: r(20),
              maxWidth: '90%',
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
    </div>
  );
}
