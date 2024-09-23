import React, { useRef } from 'react';

import { IonImg } from '@ionic/react';
import { EffectCube } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperCore } from 'swiper/types';

import { AnimatedItem, Color, ItemProps } from '../../shared/types';

const ColorCube: React.FC<ItemProps<AnimatedItem<Color>>> = ({
  item,
  handleCardClick,
}) => {
  const swiperRef = useRef<SwiperCore | null>(null);

  const onClickCard = () => {
    if (swiperRef.current) {
      swiperRef.current!.slideNext();
    }

    if (handleCardClick) {
      handleCardClick(item);
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
    <li
      className={`cube aspect-square flex items-center justify-center ${item.animationClass}`}
    >
      <Swiper
        effect={'cube'}
        loop={true}
        modules={[EffectCube]}
        onClick={onClickCard}
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
