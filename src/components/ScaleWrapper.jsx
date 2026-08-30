import { useState, useEffect } from 'react';

/**
 * ScaleWrapper: Proportional 1920px scaler for full Figma frames
 */
export default function ScaleWrapper({ children, height = 4800 }) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      const newScale = windowWidth / 1920;
      setScale(newScale);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div 
      className="bg-black w-full overflow-x-hidden" 
      style={{ height: `${height * scale}px` }}
    >
      <div 
        className="relative bg-black"
        style={{ 
          width: '1920px', 
          height: `${height}px`,
          transform: `scale(${scale})`,
          transformOrigin: 'top left'
        }}
      >
        {children}
      </div>
    </div>
  );
}
