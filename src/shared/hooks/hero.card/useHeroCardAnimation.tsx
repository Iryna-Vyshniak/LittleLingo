import { useEffect, useRef, useState } from 'react';

import { AnimatedColor, Color } from '../../types';
import { clearCurrentTimeout } from '../../utils';

export const useHeroCardAnimation = (
  colors: Color[],
  playAudio: (sound: string) => void
) => {
  const [heroCard, setHeroCard] = useState<AnimatedColor | null>(null);
  const [animatedOptions, setAnimatedOptions] = useState<AnimatedColor[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const animatedOptionsWithClass = colors.map((color) => ({
      ...color,
      animationClass: 'scale-up',
    }));
    setAnimatedOptions(animatedOptionsWithClass);

    return () => clearCurrentTimeout(timeoutRef);
  }, [colors]);

  const handleCheckCard = (selectedColor: Color) => {
    clearCurrentTimeout(timeoutRef);

    setAnimatedOptions((prevOptions) =>
      prevOptions.map((option) =>
        option._id === selectedColor._id
          ? { ...option, animationClass: 'scale-down' }
          : option
      )
    );

    timeoutRef.current = setTimeout(() => {
      if (selectedColor === heroCard) {
        setHeroCard(null);
      } else {
        setHeroCard({
          ...selectedColor,
          animationClass: '',
        });

        setTimeout(() => {
          setHeroCard((prevHero) =>
            prevHero
              ? {
                  ...prevHero,
                  animationClass: 'scale-up',
                }
              : null
          );

          setAnimatedOptions((prevOptions) =>
            prevOptions.map((option) =>
              option._id === selectedColor._id
                ? { ...option, animationClass: 'scale-up' }
                : option
            )
          );

          playAudio(selectedColor.sound);
        }, 50);
      }
    }, 500);
  };

  useEffect(() => {
    return () => clearCurrentTimeout(timeoutRef);
  }, []);

  return {
    heroCard,
    animatedOptions,
    handleCheckCard,
  };
};
