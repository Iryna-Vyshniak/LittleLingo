import React, { useRef } from 'react';

import { IonImg } from '@ionic/react';
import { EffectCube } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperCore } from 'swiper/types';

import { AnimatedItem, ItemProps, Letter } from '../../shared/types';
import Title from '../common/Title';

const AbcCube: React.FC<ItemProps<AnimatedItem<Letter>>> = ({
  item,
  handleCardClick,
}) => {
  const swiperRef = useRef<SwiperCore | null>(null);

  const handlePlayAudio = () => {
    // Move to the next slide
    if (swiperRef.current) {
      swiperRef.current!.slideNext();
    }

    if (handleCardClick) {
      handleCardClick(item);
    }
  };

  // Create an array with slides following the specified pattern
  const slides = Array.from({ length: 12 }).map((_, index) => {
    let content;

    switch (index % 6) {
      case 0:
        // First slide — uppercase and lowercase letters
        content = (
          <>
            <IonImg
              src={item.imageCapitalLetter}
              alt={item.label}
              className='h-1/3 w-1/3'
            />
            <IonImg
              src={item.imageSmallLetter}
              alt={item.label}
              className='absolute left-[65%] top-[60%] h-[33%] w-[33%] sm:left-[60%] sm:h-1/3 sm:w-1/3'
            />
          </>
        );
        break;
      case 1:
        // The second slide is capital letter only
        content = (
          <IonImg
            src={item.imageCapitalLetter}
            alt={item.label}
            className='h-1/2 w-1/2'
          />
        );
        break;
      case 2:
        // The third slide is just a small letter
        content = (
          <IonImg
            src={item.imageSmallLetter}
            alt={item.label}
            className='h-1/2 w-1/2'
          />
        );
        break;
      case 3:
        // The fourth slide is a transcription
        content = (
          <Title
            title={item.transcription}
            styleType='card-title'
            fontSize='text-lg'
          />
        );
        break;
      case 4:
        // The fifth slide is a picture of the description
        content = (
          <IonImg
            src={item.imageUrl}
            alt={item.description}
            className='h-full w-full object-contain'
          />
        );
        break;
      case 5:
        // The sixth slide is the description text
        content = (
          <Title title={item.description} styleType='cube-description' />
        );
        break;
      default:
        break;
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
    <li
      className={`aspect-square flex items-center justify-center ${item.animationClass} p-2`}
    >
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
