import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { EffectCube } from 'swiper/modules';

import { LetterProps } from '../../shared/types';

import './AbcCube.css';
import { IonImg } from '@ionic/react';

const AbcCube: React.FC<LetterProps> = ({ letter }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const swiperRef = useRef<any | null>(null);
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
      swiperRef.current!.swiper.slideNext();
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
          <IonImg src={letter.imageCapitalLetter} alt={letter.label} className='w-1/2 h-1/2' />
          <IonImg
            src={letter.imageSmallLetter}
            alt={letter.label}
            className='absolute top-[60%] left-[65%] sm:left-[60%] w-[60%] h-[60%] sm:w-1/2 sm:h-1/2'
          />
        </>
      );
    } else if (index % 3 === 1) {
      // Second slide in each set shows only the capital letter
      content = (
        <IonImg src={letter.imageCapitalLetter} alt={letter.label} className='w-1/2 h-1/2' />
      );
    } else {
      // Third slide in each set shows only the small letter
      content = <IonImg src={letter.imageSmallLetter} alt={letter.label} className='w-1/2 h-1/2' />;
    }

    return (
      <SwiperSlide key={`${letter._id}-${index}`} className='abc-slide p-3'>
        <div className='relative letter-thumb object-contain flex items-center justify-center w-full h-full'>
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
        ref={swiperRef}
      >
        {slides}
      </Swiper>
      <audio ref={audioRef} className='w-full h-full'>
        <source src={letter.sound} type='audio/mp3' />
      </audio>
    </li>
  );
};

export default AbcCube;
