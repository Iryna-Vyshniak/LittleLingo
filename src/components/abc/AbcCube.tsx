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

  // Create an array with multiple instances of the same slide
  const slides = Array.from({ length: 12 }).map((_, index) => (
    <SwiperSlide key={`${letter._id}-${index}`} className='abc-slide p-6'>
      <div className='flex items-center justify-center object-contain'>
        <img src={letter.image} alt={letter.label} className='h-16' />
      </div>
    </SwiperSlide>
  ));

  return (
    <li className='w-40 h-40 flex items-center justify-center'>
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
