import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { IonPage, useIonRouter } from '@ionic/react';
// import required modules
import { Autoplay, EffectCube } from 'swiper/modules';

import './Intro.css';

import IntroContent from './IntroContent';

import { introImages } from '../../shared/data';

import CubeSound from '../../assets/sounds/magic-open.mp3';
import FairySound from '../../assets/sounds/fairy.wav';
import Title from '../common/Title';

const Intro: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const router = useIonRouter();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const swiperRef = useRef<any | null>(null);

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
      swiperRef.current!.swiper.slideNext();
    }
  };

  const goToHomePage = () => {
    const audio = new Audio(CubeSound);
    audio.play();
    router.push('app', 'root');
  };

  return (
    <IonPage className='flex items-center justify-center mx-0 my-auto'>
      <Title title='Little' subtitle='Lingo' styleType='app' fontSize='text-6xl' />
      <Swiper
        ref={swiperRef}
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
            className='intro-slide relative swiper-slide'
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
        <audio ref={audioRef} className='w-full h-full'>
          <source src={FairySound} type='audio/wav' />
        </audio>
      </Swiper>
    </IonPage>
  );
};

export default Intro;
