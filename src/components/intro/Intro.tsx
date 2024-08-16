import React, { useEffect, useRef, useState } from 'react';

import { IonPage, useIonRouter } from '@ionic/react';
// import required swiper modules
import { Autoplay, EffectCube } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperCore } from 'swiper/types';

import FairySound from '../../assets/sounds/fairy.wav';
import CubeSound from '../../assets/sounds/magic-open.mp3';
import { introImages } from '../../shared/data';
import Title from '../common/Title';
import './Intro.css';
import IntroContent from './IntroContent';

const Intro: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const router = useIonRouter();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const swiperRef = useRef<SwiperCore | null>(null);

  useEffect(() => {
    const audio = new Audio(CubeSound);
    audio.play();
  }, []);

  const handlePlayCube = () => {
    if (audioRef.current) {
      audioRef.current!.play();
    } else {
      audioRef.current!.pause();
    }
    setIsPlaying(!isPlaying);
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const goToHomePage = () => {
    const audio = new Audio(CubeSound);
    audio.play();
    router.push('app', 'root');
  };

  return (
    <IonPage className='mx-0 my-auto flex items-center justify-center'>
      <Title
        title='Little'
        subtitle='Lingo'
        styleType='app'
        fontSize='text-6xl'
      />
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        effect={'cube'}
        loop={true}
        autoplay={{
          delay: 3500,
          pauseOnMouseEnter: true,
        }}
        speed={1000}
        grabCursor={true}
        cubeEffect={{
          shadow: true,
          slideShadows: true,
          shadowOffset: 75,
          shadowScale: 0.94,
        }}
        modules={[Autoplay, EffectCube]}
        onClick={handlePlayCube}
        className='mySwiper intro-swiper'
      >
        {introImages.map((intro, index) => (
          <SwiperSlide
            key={intro.id}
            className='intro-slide swiper-slide relative'
            style={{ backgroundImage: `url(${intro.img})` }}
          >
            <div className='gradient-top-overlay'></div>
            <IntroContent
              index={index}
              intro={intro}
              introImages={introImages}
              goToHomePage={goToHomePage}
            />
          </SwiperSlide>
        ))}
        <audio ref={audioRef} className='h-full w-full'>
          <source src={FairySound} type='audio/wav' />
          <track
            kind='captions'
            src=''
            label='No captions'
            className='hidden'
          />
        </audio>
      </Swiper>
    </IonPage>
  );
};

export default Intro;
