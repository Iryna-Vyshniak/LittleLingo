import { useEffect, useRef, useState } from 'react';

import { AnimatedItem, BaseItem } from '../../types';
import { clearCurrentTimeout } from '../../utils';

export const useHeroCardAnimation = <T extends BaseItem>(
  items: T[],
  playAudio: (sound: string) => void
) => {
  const [heroCard, setHeroCard] = useState<AnimatedItem<T> | null>(null);
  const [animatedOptions, setAnimatedOptions] = useState<AnimatedItem<T>[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const animatedOptionsWithClass = items.map((item) => ({
      ...item,
      animationClass: 'scale-up',
    }));
    setAnimatedOptions(animatedOptionsWithClass);

    return () => clearCurrentTimeout(timeoutRef);
  }, [items]);

  const handleCheckCard = (selectedItem: T) => {
    clearCurrentTimeout(timeoutRef);

    setAnimatedOptions((prevOptions) =>
      prevOptions.map((option) =>
        option._id === selectedItem._id
          ? { ...option, animationClass: 'scale-down' }
          : option
      )
    );

    timeoutRef.current = setTimeout(() => {
      if (selectedItem === heroCard) {
        setHeroCard(null);
      } else {
        setHeroCard({
          ...selectedItem,
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
              option._id === selectedItem._id
                ? { ...option, animationClass: 'scale-up' }
                : option
            )
          );

          playAudio(selectedItem.sound);
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
