import React, { useEffect, useRef, useState } from 'react';

const GameWinScore: React.FC<{
  score: number | string;
  success: number;
}> = ({ score, success }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  const updateContainerWidth = () => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
  };

  useEffect(() => {
    updateContainerWidth(); // Update container width on mount
    window.addEventListener('resize', updateContainerWidth); // Update on window resize

    return () => {
      window.removeEventListener('resize', updateContainerWidth); // Cleanup listener
    };
  }, [score]);

  const filledWidth = (Number(score) / success) * containerWidth;

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        '--bar-filled',
        `${filledWidth}px`
      );
      containerRef.current.style.setProperty(
        '--candle-position',
        `${filledWidth}px`
      );
    }
  }, [filledWidth]);

  return (
    <div className='container-progress mb-6 mt-6 w-64' ref={containerRef}>
      <div className='progress'>
        <div className='progress-candle'></div>
      </div>
    </div>
  );
};

export default GameWinScore;
