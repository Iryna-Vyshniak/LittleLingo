import React from 'react';

import { useDrag } from 'react-dnd';

import { CardType } from '../../../shared/constants';
import { Number } from '../../../shared/types';

interface DraggableSoundProps {
  item: Number;
}

const DraggableNumberSound: React.FC<DraggableSoundProps> = ({ item }) => {
  const [{ isDragging }, drag] = useDrag({
    type: CardType.SOUND,
    item: { item },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const playSound = () => {
    const audio = new Audio(item.sound);
    audio.play().catch((error) => console.error('Audio play error:', error));
  };
  return (
    <li>
      {' '}
      <button
        ref={drag}
        onClick={playSound}
        style={{
          opacity: isDragging ? 0.5 : 1,
          cursor: 'move',
          backgroundColor: 'transparent',
        }}
        className='number-btn special-font custom text-center tracking-wide'
        data-label={'🎵'}
      >
        <span>{item.number}</span>
      </button>
    </li>
  );
};

export default DraggableNumberSound;
