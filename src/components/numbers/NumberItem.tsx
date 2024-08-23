import React from 'react';

import { useAudioPlayer } from '../../shared/hooks/audio/useAudioPlayer';
import { ItemProps, Number } from '../../shared/types';

const NumberItem: React.FC<ItemProps<Number>> = ({ item }) => {
  const { playAudio } = useAudioPlayer(true);
  return (
    <li className='aspect-square flex items-center justify-center'>
      <button
        onClick={() => playAudio(item.sound)}
        className='number-btn special-font custom text-center tracking-wide'
        data-label={item.number}
      >
        <span>{item.label}</span>
      </button>
    </li>
  );
};

export default NumberItem;
