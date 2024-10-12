import React from 'react';

import { IonicSlides, IonImg, IonThumbnail } from '@ionic/react';
import { EffectFade, Mousewheel } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useAudioPlayer } from '../../shared/hooks/audio/useAudioPlayer';
import { Activity } from '../../shared/types';
import Title from '../common/Title';

const ActivityCards: React.FC<{ activity: Activity[] }> = ({ activity }) => {
  const { playAudio } = useAudioPlayer();
  return (
    <section className='activity'>
      <Swiper
        effect={'fade'}
        modules={[Mousewheel, IonicSlides, EffectFade]}
        grabCursor={true}
        loop={true}
        mousewheel={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        className='swiper activity-cards w-full lg:w-1/2'
      >
        {activity.map(({ _id, imageUrl, name, sound }) => (
          <SwiperSlide key={_id} onClick={() => playAudio(sound)}>
            <Title
              title={name.toUpperCase()}
              styleType='card-title'
              fontSize='text-lg'
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
              fontSize='text-lg'
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ActivityCards;
