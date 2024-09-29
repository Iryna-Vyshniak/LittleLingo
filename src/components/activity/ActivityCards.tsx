import React from 'react';

import { IonImg } from '@ionic/react';
import { EffectCards, Mousewheel } from 'swiper/modules';
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
        modules={[EffectCards, Mousewheel]}
        grabCursor={true}
        initialSlide={2}
        speed={500}
        loop={true}
        mousewheel={{ invert: false }}
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

            <IonImg
              src={imageUrl}
              alt={name}
              className='h-auto w-full object-contain'
            />

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
