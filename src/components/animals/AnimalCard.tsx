import React, { useEffect, useRef } from 'react';

import { IonCard, IonImg, IonThumbnail } from '@ionic/react';

import { useAudioPlayer } from '../../shared/hooks/audio/useAudioPlayer';
import { Animal } from '../../shared/types';
import Title from '../common/Title';

const AnimalCard: React.FC<{ animal: Animal }> = ({ animal }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const { playAudio } = useAudioPlayer();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scale-up');
          } else {
            entry.target.classList.remove('scale-up');
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div className='card-wrapper md:w-[80%] lg:w-1/2 xl:w-1/3' ref={cardRef}>
      <IonCard
        className='animal-card ion-padding flex cursor-pointer flex-col gap-2'
        onClick={() => playAudio(animal.sound)}
      >
        <Title
          title={animal.name}
          styleType='modal-title'
          fontSize='text-3xl'
          fontFamily={true}
        />
        <IonThumbnail className='h-1/2 w-full'>
          <IonImg
            src={animal.imageUrl}
            alt={animal.name}
            className='h-full w-full object-contain'
          />
        </IonThumbnail>

        <Title
          title={animal.name.toLowerCase()}
          styleType='card-title'
          fontSize='text-4xl'
        />
      </IonCard>
    </div>
  );
};

export default AnimalCard;
