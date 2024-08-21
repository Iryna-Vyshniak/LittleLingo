import React, { useEffect, useRef } from 'react';

import { ItemProps, Number } from '../../shared/types';

const NumberItem: React.FC<ItemProps<Number>> = ({ item }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlayAudio = (sound: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.src = sound;
    } else {
      audioRef.current = new Audio(sound);
    }

    audioRef.current.play().catch((error) => {
      console.error('Audio play error:', error);
    });
  };

  useEffect(() => {
    // Clean up audio when disassembling a component
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  return (
    <li className='aspect-square flex items-center justify-center'>
      <button
        onClick={() => handlePlayAudio(item.sound)}
        className='number-btn special-font custom text-center tracking-wide'
        data-label={item.number}
      >
        <span>{item.label}</span>
      </button>
    </li>
  );
};

export default NumberItem;
