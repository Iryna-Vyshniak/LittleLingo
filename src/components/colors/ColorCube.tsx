import React, { useRef, useState } from 'react';

import { IonImg } from '@ionic/react';
import { EffectCube } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperCore } from 'swiper/types';

import { useAudioPlayer } from '../../shared/hooks/audio/useAudioPlayer';
import { Color, ItemProps } from '../../shared/types';

const ColorCube: React.FC<ItemProps<Color>> = ({ item }) => {
  const { playAudio, stopAudio } = useAudioPlayer(false);
  const swiperRef = useRef<SwiperCore | null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const handlePlayAudio = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      playAudio(item.sound);
    }
    setIsPlaying(!isPlaying);
    // Move to the next slide
    if (swiperRef.current) {
      swiperRef.current!.slideNext();
    }
  };

  // Create an array with slides that all show the same image
  const slides = Array.from({ length: 12 }).map((_, index) => (
    <SwiperSlide
      key={`${item._id}-${index}`}
      className='item-slide color-slide p-3'
    >
      <div className='color-thumb relative flex h-full w-full items-center justify-center object-contain'>
        <IonImg src={item.image} alt={item.label} className='h-full w-full' />
      </div>
    </SwiperSlide>
  ));

  return (
    <li className='aspect-square flex items-center justify-center'>
      <Swiper
        effect={'cube'}
        loop={true}
        modules={[EffectCube]}
        onClick={handlePlayAudio}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {slides}
      </Swiper>
    </li>
  );
};

export default ColorCube;
