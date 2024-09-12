import React, { useState } from 'react';

import { IonImg, IonPopover } from '@ionic/react';

import NumberDragon from '../../assets/images/dragon-game.png';
import { useAudioPlayer } from '../../shared/hooks/audio/useAudioPlayer';
import { ItemProps, Number } from '../../shared/types';
import { generateGemImages } from '../../shared/utils';

const NumberItem: React.FC<ItemProps<Number>> = ({ item }) => {
  const { playAudio } = useAudioPlayer(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  return (
    <li className='flex items-center justify-center'>
      <button
        id={`hover-trigger-${item._id}`}
        onClick={() => playAudio(item.sound)}
        className='number-btn special-font custom text-center tracking-wide'
        data-label={item.number}
      >
        <span className='number-img-wrapper'>
          {isLoading && !hasError && (
            <IonImg
              src={NumberDragon} /* Default image */
              alt='default dragon'
              className='number-img'
            />
          )}

          <IonImg
            src={item.imageUrl || ''}
            alt={item.label + 'dragon baby'}
            className='number-img'
            onIonImgWillLoad={() => setIsLoading(true)}
            onIonImgDidLoad={() => setIsLoading(false)} // Image loaded
            onIonError={() => {
              setIsLoading(false);
              setHasError(true); // If loading error
            }}
          />
        </span>

        <span className='number-label p-4'>{item.label}</span>
      </button>
      <IonPopover
        trigger={`hover-trigger-${item._id}`}
        keepContentsMounted={true}
        size='cover'
        translucent={true}
      >
        <div className='gem-container'>{generateGemImages(+item.number)}</div>{' '}
      </IonPopover>
    </li>
  );
};

export default NumberItem;
