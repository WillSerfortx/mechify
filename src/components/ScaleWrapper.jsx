import { useState, useEffect } from 'react';

export default function ScaleWrapper({ children, height }) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      // The design is fixed at 1920px width
      const newScale = windowWidth / 1920;
      setScale(newScale);
    };

    handleResize(); // Initial calculation
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div 
      className="bg-black w-full overflow-hidden flex justify-center" 
      style={{ height: `${height * scale}px` }}
    >
      <div 
        className="relative bg-black transform-origin-top-left"
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
