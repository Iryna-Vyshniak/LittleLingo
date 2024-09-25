import React, { useState } from 'react';

import { IonImg } from '@ionic/react';
import { useDrag } from 'react-dnd';

import NumberDragon from '../../../assets/images/dragon-game.png';
import { CardType } from '../../../shared/constants';
import { useAudioPlayer } from '../../../shared/hooks/audio/useAudioPlayer';
import { Number } from '../../../shared/types';

interface DraggableSoundProps {
  item: Number;
  isFlashing: boolean;
}

const DraggableNumberSound: React.FC<DraggableSoundProps> = ({
  item,
  isFlashing,
}) => {
  const { playAudio } = useAudioPlayer(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  const [{ isDragging }, drag] = useDrag({
    type: CardType.SOUND,
    item: { item },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <>
      {
        <button
          ref={drag}
          onClick={() => playAudio(item.sound)}
          style={{
            opacity: isDragging ? 0.5 : 1,
            cursor: 'grab',
            backgroundColor: 'transparent',
          }}
          className={
            !isFlashing
              ? 'number-btn special-font custom text-center tracking-wide'
              : 'flash active number-btn'
          }
          data-label={'♪'}
        >
          {!isFlashing ? (
            <>
              <span className='number-img-wrapper'>
                {isLoading && !hasError && (
                  <IonImg
                    src={NumberDragon} /* Default image */
                    alt='default image'
                    className='number-img'
                  />
                )}

                <IonImg
                  src={item.imageUrl || ''}
                  alt={item.label}
                  className='number-img'
                  onIonImgWillLoad={() => setIsLoading(true)}
                  onIonImgDidLoad={() => setIsLoading(false)} // Image loaded
                  onIonError={() => {
                    setIsLoading(false);
                    setHasError(true); // If loading error
                  }}
                />
              </span>
              <span className='number-label'>{item.number}</span>
            </>
          ) : (
            <div className='explode explode-card explode-earth'></div>
          )}
        </button>
      }
    </>
  );
};

export default DraggableNumberSound;
