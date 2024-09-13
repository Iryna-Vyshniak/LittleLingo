import React, { useMemo } from 'react';

// Importing styles

const CircleAnimation: React.FC = () => {
  // Helper function to generate random values between a min and max range
  const randomValue = (min: number, max: number) =>
    Math.random() * (max - min) + min;

  const circles = useMemo(() => {
    const totalCircles = 25; // Number of circles to create
    return Array.from({ length: totalCircles }).map((_, index) => {
      const circleSize = randomValue(1, 4); // Random size for each circle
      const moveDuration = randomValue(28, 37); // Random movement duration
      const delay = randomValue(0, 37); // Random animation delay
      const randomXStart = `${randomValue(0, 100)}vw`; // Random starting X position
      const randomXEnd = `${randomValue(0, 100)}vw`; // Random ending X position
      const animationClass = `move-${index % 5}`; // Attach animation class based on the index

      // CSS styles for the individual circle
      const circleStyle: React.CSSProperties = {
        width: `${circleSize}px`,
        height: `${circleSize}px`,
        animationDuration: `${randomValue(2, 5)}s`,
        animationDelay: `${randomValue(0, 4)}s`,
      };

      // CSS styles for the container that moves the circle
      const containerStyle: React.CSSProperties = {
        '--x-start': randomXStart,
        '--x-end': randomXEnd,
        animationDuration: `${moveDuration}s`,
        animationDelay: `${delay}s`,
      } as React.CSSProperties; // Explicitly specify the type for the CSS properties

      // Render the circle container with its corresponding animation class and inline styles
      return (
        <div
          key={index}
          className={`circle-container ${animationClass}`}
          style={containerStyle}
        >
          <div className='circle' style={circleStyle}></div>
        </div>
      );
    });
  }, []);

  return <>{circles}</>;
};

export default CircleAnimation;
