import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { EffectCube } from 'swiper/modules';

import { LetterProps } from '../../shared/types';

import './AbcCube.css';

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
          <img src={letter.imageCapitalLetter} alt={letter.label} className='w-full h-full' />
          <img
            src={letter.imageSmallLetter}
            alt={letter.label}
            className='absolute top-[60%] left-[80%] w-1/2 h-1/2'
          />
        </>
      );
    } else if (index % 3 === 1) {
      // Second slide in each set shows only the capital letter
      content = (
        <img src={letter.imageCapitalLetter} alt={letter.label} className='w-full h-full' />
      );
    } else {
      // Third slide in each set shows only the small letter
      content = <img src={letter.imageSmallLetter} alt={letter.label} className='w-full h-full' />;
    }

    return (
      <SwiperSlide key={`${letter._id}-${index}`} className='abc-slide p-6'>
        <div className='aspect-square object-contain flex items-center justify-center'>
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
