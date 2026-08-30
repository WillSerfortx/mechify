import React, { useState } from 'react';

/**
 * Exact Figma Component 87 (1:1881), Component 88 (1:1888), Component 89 (1:1895)
 */
export default function ServiceFeatureCard({
  variant = 'performance', // 'performance' | 'repair' | 'fleet'
  onClick,
  className = '',
  style = {},
}) {
  const [isHovered, setIsHovered] = useState(false);

  const configs = {
    performance: {
      nodeId: '1:1881',
      defaultId: '1:1882',
      hoverId: '1:1885',
      icon: '/images/workshop/icon-performance.png',
      defaultIconTop: 129,
      defaultTitleTop: 296,
      defaultTitleLeft: 274.5,
      titleLines: ['Performance', 'Check'],
      hoverIconTop: 179,
      hoverTextTop: 245,
      hoverTextLeft: 271.5,
      hoverLines: [
        'Comprehensive checks to ensure',
        'peak vehicle performance.',
        'Identify issues early and drive',
        'with confidence.',
      ],
    },
    repair: {
      nodeId: '1:1888',
      defaultId: '1:1889',
      hoverId: '1:1892',
      icon: '/images/workshop/icon-repair.png',
      defaultIconTop: 119,
      defaultTitleTop: 282,
      defaultTitleLeft: 268,
      titleLines: ['Auto', 'Repair'],
      hoverIconTop: 179,
      hoverTextTop: 255,
      hoverTextLeft: 271.5,
      hoverLines: [
        'Reliable auto services to keep your',
        'car road-ready.',
        'From routine maintenance to major',
        'repairs,we handle it all.',
      ],
    },
    fleet: {
      nodeId: '1:1895',
      defaultId: '1:1896',
      hoverId: '1:1899',
      icon: '/images/workshop/icon-fleet.png',
      defaultIconTop: 140,
      defaultTitleTop: 286,
      defaultTitleLeft: 272,
      titleLines: ['Fleet', 'Service'],
      hoverIconTop: 179,
      hoverTextTop: 273,
      hoverTextLeft: 272,
      hoverLines: [
        'Efficient maintenance solutions for',
        'commercial fleets.',
        'Keep your vehicles running smoothly ',
        'with minimal downtime.',
      ],
    },
  };

  const c = configs[variant] || configs.performance;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={`bg-black border-5 border-solid border-white h-[468px] overflow-clip relative rounded-[40px] w-[553px] cursor-pointer select-none transition-all duration-300 hover:border-red-500 hover:shadow-[0_0_35px_rgba(255,255,255,0.25)] ${className}`}
      style={style}
      data-node-id={isHovered ? c.hoverId : c.defaultId}
    >
      {/* ─── DEFAULT STATE (Frame 427319227 / 427319228 / 427319229) ─── */}
      {!isHovered ? (
        <>
          {/* Default 128px Icon */}
          <div
            className="absolute left-[208px] pointer-events-none size-[128px]"
            style={{ top: `${c.defaultIconTop}px` }}
          >
            <img
              alt=""
              className="absolute inset-0 max-w-none object-cover size-full"
              src={c.icon}
            />
            <div className="absolute inset-0 rounded-[inherit] shadow-[inset_200px_200px_4px_0px_white]" />
          </div>

          {/* Default 40px Title */}
          <div
            className="-translate-x-1/2 [word-break:break-word] absolute font-['Sora'] font-bold leading-[0.962] text-[40px] text-center text-white whitespace-nowrap"
            style={{
              left: `${c.defaultTitleLeft}px`,
              top: `${c.defaultTitleTop}px`,
            }}
          >
            {c.titleLines.map((line, idx) => (
              <p key={idx} className="mb-0">
                {line}
              </p>
            ))}
          </div>
        </>
      ) : (
        /* ─── HOVER STATE (Frame 427319230 / 427319231 / 427319232) ─── */
        <>
          {/* Hover 50px Icon */}
          <div
            className="absolute left-[247px] pointer-events-none size-[50px] animate-fadeIn"
            style={{ top: `${c.hoverIconTop}px` }}
          >
            <img
              alt=""
              className="absolute inset-0 max-w-none object-cover size-full"
              src={c.icon}
            />
            <div className="absolute inset-0 rounded-[inherit] shadow-[inset_200px_200px_4px_0px_white]" />
          </div>

          {/* Hover 24px Description */}
          <div
            className="-translate-x-1/2 [word-break:break-word] absolute font-['Sora'] font-bold leading-[1.05] text-[24px] text-center text-white whitespace-nowrap animate-fadeIn"
            style={{
              left: `${c.hoverTextLeft}px`,
              top: `${c.hoverTextTop}px`,
            }}
          >
            {c.hoverLines.map((line, idx) => (
              <p key={idx} className="mb-0 whitespace-pre">
                {line}
              </p>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
