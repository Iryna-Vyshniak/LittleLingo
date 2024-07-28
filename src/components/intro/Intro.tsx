import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { IonButton, IonText, useIonRouter } from '@ionic/react';
// import required modules
import { EffectCube } from 'swiper/modules';

import './Intro.css';

import SlideNextButton from './SlideNextButton';
import AppTitle from '../common/AppTitle';

import { introImages } from '../../shared/data';
import CubeSound from '../../assets/sounds/magic-open.mp3';

const Intro: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const router = useIonRouter();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const swiperRef = useRef<any | null>(null);

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
    router.push('app', 'root');
  };

  return (
    <Swiper
      ref={swiperRef}
      effect={'cube'}
      loop={true}
      grabCursor={true}
      cubeEffect={{
        shadow: true,
        slideShadows: true,
        shadowOffset: 20,
        shadowScale: 0.94,
      }}
      modules={[EffectCube]}
      onClick={handlePlayCube}
      className='mySwiper intro-swiper w-full max-w-[1220px] max-h-screen h-screen mx-0 my-auto flex items-center justify-center bg-[#226100]'
    >
      {introImages.map(({ id, img, desc, subdesc }, index) => (
        <SwiperSlide
          key={id}
          className='intro-slide relative swiper-slide w-full min-h-screen bg-no-repeat bg-center bg-cover'
          style={{ backgroundImage: `url(${img})` }}
        >
          {' '}
          <AppTitle title='Little' subtitle='Lingo' />
          <div className='w-full min-h-screen h-screen flex flex-col items-center justify-end gap-4'>
            {' '}
            <div className='flex flex-col items-center justify-center gap-4 p-4 rounded-md gradient-overlay'>
              <IonText>
                <h2 className='text-white font-bold'>{desc}</h2>
              </IonText>
              {subdesc && (
                <IonText>
                  <h3 className='text-white font-semibold'>{subdesc}</h3>
                </IonText>
              )}
              {index === introImages.length - 1 ? (
                <IonButton onClick={goToHomePage} className='btn-gradient text-white'>
                  Let`s GO!
                </IonButton>
              ) : (
                <SlideNextButton>Next</SlideNextButton>
              )}
            </div>
          </div>
        </SwiperSlide>
      ))}
      <audio ref={audioRef} className='w-full h-full'>
        <source src={CubeSound} type='audio/mp3' />
      </audio>
    </Swiper>
  );
};

export default Intro;
