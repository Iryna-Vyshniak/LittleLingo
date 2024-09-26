import React from 'react';

import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonImg,
  IonThumbnail,
} from '@ionic/react';

import { useAudioPlayer } from '../../../shared/hooks/audio/useAudioPlayer';
import { Letter } from '../../../shared/types';

const MatchedCards: React.FC<{ matchedCards: Letter[] }> = ({
  matchedCards,
}) => {
  const { playAudio } = useAudioPlayer();
  return (
    <section className='mb-12'>
      {' '}
      <ul className='flex w-full flex-wrap items-center justify-center gap-2'>
        {matchedCards
          .filter((card) => card && card.label)
          .sort((a, b) => a.label.localeCompare(b.label))
          .map((card) => (
            <li
              key={card._id}
              className='letter-matched-card h-40 w-1/4 lg:w-1/5'
            >
              {' '}
              <IonCard
                key={card._id}
                className='card-transparent ion-no-padding m-0 flex h-full w-full cursor-pointer flex-col items-center justify-center pb-4'
                onClick={() => playAudio(card.soundDescr)}
              >
                <IonThumbnail>
                  {' '}
                  <IonImg
                    src={card.imageUrl}
                    alt={`${card.label} letter`}
                    className='h-full w-full object-contain'
                  />
                </IonThumbnail>

                <IonCardHeader className='ion-no-padding'>
                  <IonCardTitle className='base-style gentium-font text-shadow-base text-2xl font-bold text-[var(--ion-color-secondary)]'>
                    {card.label.toUpperCase()} {card.label.toLowerCase()}
                  </IonCardTitle>
                </IonCardHeader>
              </IonCard>
            </li>
          ))}
      </ul>
    </section>
  );
};

export default MatchedCards;
