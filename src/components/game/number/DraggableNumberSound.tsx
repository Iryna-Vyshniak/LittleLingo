import React from 'react';

import { useDrag } from 'react-dnd';

import { CardType } from '../../../shared/constants';
import { useAudioPlayer } from '../../../shared/hooks/audio/useAudioPlayer';
import { Number } from '../../../shared/types';

interface DraggableSoundProps {
  item: Number;
}

const DraggableNumberSound: React.FC<DraggableSoundProps> = ({ item }) => {
  const { playAudio } = useAudioPlayer(true);

  const [{ isDragging }, drag] = useDrag({
    type: CardType.SOUND,
    item: { item },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <li>
      {' '}
      <button
        ref={drag}
        onClick={() => playAudio(item.sound)}
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
