import React from 'react';

import { IonImg, IonThumbnail } from '@ionic/react';
import { EffectCards } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useAudioPlayer } from '../../shared/hooks/audio/useAudioPlayer';
import { Activity } from '../../shared/types';
import Title from '../common/Title';

const ActivityCards: React.FC<{ activity: Activity[] }> = ({ activity }) => {
  const { playAudio } = useAudioPlayer();
  return (
    <section className='activity'>
      <Swiper
        effect={'cards'}
        modules={[EffectCards]}
        grabCursor={true}
        initialSlide={2}
        speed={500}
        loop={true}
        className='swiper activity-cards w-full md:w-1/2'
      >
        {activity.map(({ _id, imageUrl, name, sound }) => (
          <SwiperSlide key={_id} onClick={() => playAudio(sound)}>
            <Title
              title={name.toUpperCase()}
              styleType='card-title'
              fontSize='text-2xl'
              fontFamily={true}
            />
            <IonThumbnail className='h-1/2 w-full'>
              {' '}
              <IonImg
                src={imageUrl}
                alt={name}
                className='h-full w-full object-contain'
              />
            </IonThumbnail>

            <Title
              title={name.toLowerCase()}
              styleType='card-title'
              fontSize='text-4xl'
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ActivityCards;
