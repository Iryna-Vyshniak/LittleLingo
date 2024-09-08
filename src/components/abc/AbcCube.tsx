import React, { useRef, useState } from 'react';

import { IonImg } from '@ionic/react';
import { EffectCube } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperCore } from 'swiper/types';

import { useAudioPlayer } from '../../shared/hooks/audio/useAudioPlayer';
import { ItemProps, Letter } from '../../shared/types';

const AbcCube: React.FC<ItemProps<Letter>> = ({ item }) => {
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

  // Create an array with slides following the specified pattern
  const slides = Array.from({ length: 12 }).map((_, index) => {
    // Determine the content based on the index
    let content;
    if (index % 3 === 0) {
      // First slide in each set shows both images
      content = (
        <>
          <IonImg
            src={item.imageCapitalLetter}
            alt={item.label}
            className='h-1/2 w-1/2'
          />
          <IonImg
            src={item.imageSmallLetter}
            alt={item.label}
            className='absolute left-[65%] top-[60%] h-[60%] w-[60%] sm:left-[60%] sm:h-1/2 sm:w-1/2'
          />
        </>
      );
    } else if (index % 3 === 1) {
      // Second slide in each set shows only the capital letter
      content = (
        <IonImg
          src={item.imageCapitalLetter}
          alt={item.label}
          className='h-1/2 w-1/2'
        />
      );
    } else {
      // Third slide in each set shows only the small letter
      content = (
        <IonImg
          src={item.imageSmallLetter}
          alt={item.label}
          className='h-1/2 w-1/2'
        />
      );
    }

    return (
      <SwiperSlide key={`${item._id}-${index}`} className='item-slide p-3'>
        <div className='letter-thumb relative flex h-full w-full items-center justify-center object-contain'>
          {content}
        </div>
      </SwiperSlide>
    );
  });

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

export default AbcCube;
