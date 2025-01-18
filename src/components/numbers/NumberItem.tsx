import React from 'react';

import { IonImg, IonPopover, IonThumbnail } from '@ionic/react';

import { useAudioPlayer } from '../../shared/hooks/audio/useAudioPlayer';
import { ItemProps, Number } from '../../shared/types';
import { generateGemImages } from '../../shared/utils';

const NumberItem: React.FC<ItemProps<Number>> = ({ item }) => {
  const { playAudio } = useAudioPlayer(true);

  const dragonImageUrl = item.imageUrl || '';
  return (
    <li className='flex items-center justify-center'>
      <button
        id={`hover-trigger-${item._id}`}
        onClick={() => playAudio(item.sound)}
        className='number-btn special-font custom relative flex h-[12vmin] w-32 flex-col items-center justify-end gap-2 text-center tracking-wide md:h-[8vmin] md:w-[10vmin] md:items-center lg:w-[12vmin]'
        data-label={item.number}
      >
        {dragonImageUrl ? (
          <IonThumbnail className='number-img-wrapper absolute -top-6 left-[60%] z-20 w-1/3 -translate-x-[60%] transform md:-top-2 md:w-1/2'>
            <IonImg
              src={item.imageUrl || ''}
              alt={item.label + 'dragon baby'}
              className='number-img h-auto w-full'
            />
          </IonThumbnail>
        ) : null}

        <span className='number-label mx-4 pl-6'>{item.label}</span>
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
