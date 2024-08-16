import React, { useRef, useState } from 'react';

import { IonImg } from '@ionic/react';
import { EffectCube } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperCore } from 'swiper/types';

import { LetterProps } from '../../shared/types';
import './AbcCube.css';

const AbcCube: React.FC<LetterProps> = ({ letter }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const swiperRef = useRef<SwiperCore | null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const handlePlayAudio = () => {
    if (isPlaying) {
      audioRef.current!.pause();
    } else {
      audioRef.current!.play();
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
            src={letter.imageCapitalLetter}
            alt={letter.label}
            className='h-1/2 w-1/2'
          />
          <IonImg
            src={letter.imageSmallLetter}
            alt={letter.label}
            className='absolute left-[65%] top-[60%] h-[60%] w-[60%] sm:left-[60%] sm:h-1/2 sm:w-1/2'
          />
        </>
      );
    } else if (index % 3 === 1) {
      // Second slide in each set shows only the capital letter
      content = (
        <IonImg
          src={letter.imageCapitalLetter}
          alt={letter.label}
          className='h-1/2 w-1/2'
        />
      );
    } else {
      // Third slide in each set shows only the small letter
      content = (
        <IonImg
          src={letter.imageSmallLetter}
          alt={letter.label}
          className='h-1/2 w-1/2'
        />
      );
    }

    return (
      <SwiperSlide key={`${letter._id}-${index}`} className='abc-slide p-3'>
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
      <audio ref={audioRef} className='h-full w-full'>
        <source src={letter.sound} type='audio/mp3' />
        <track kind='captions' src='' label='No captions' />
      </audio>
    </li>
  );
};

export default AbcCube;
