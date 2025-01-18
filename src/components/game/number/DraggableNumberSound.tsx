import React from 'react';

import { IonImg } from '@ionic/react';
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

  const dragonImageUrl = item.imageUrl || '';

  return (
    <>
      {isDragging ? (
        dragonImageUrl ? (
          <div className='number-img-wrapper border border-red-500 absolute bottom-0 left-1/2 -z-10 -translate-x-1/2 transform'>
            <IonImg src={dragonImageUrl} alt='Dragon' className='number-img' />
          </div>
        ) : null
      ) : (
        <button
          ref={drag}
          onClick={() => playAudio(item.sound)}
          style={{
            opacity: isDragging ? 0.5 : 1,
            cursor: 'grab',
            backgroundColor: 'transparent',
          }}
          className={
            'number-btn special-font custom flex h-[5vmin] items-center justify-between tracking-wide md:h-[6vmin]'
          }
          data-label={'♪'}
        >
          <span className='number-label mx-4 w-10 pl-6 md:w-[6vmin]'>
            {item.number}
          </span>
        </button>
      )}
    </>
  );
};

export default DraggableNumberSound;
