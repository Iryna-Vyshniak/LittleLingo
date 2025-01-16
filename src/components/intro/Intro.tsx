import React, { useEffect, useRef, useState } from 'react';

import { IonPage, useIonRouter } from '@ionic/react';
// import required swiper modules
import { Autoplay, EffectCube } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperCore } from 'swiper/types';

import FairySound from '../../assets/sounds/fairy.wav';
import GameStart from '../../assets/sounds/game-start.mp3';
import StoryBegin from '../../assets/sounds/story-begins.mp3';
import { introImages } from '../../shared/data';
import { useAudioPlayer } from '../../shared/hooks/audio/useAudioPlayer';
import Title from '../common/Title';
import './Intro.css';
import IntroContent from './IntroContent';

const Intro: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isUserInteracted, setIsUserInteracted] = useState(false); // Track user interaction
  const router = useIonRouter();
  const { playAudio, stopAudio } = useAudioPlayer(true);
  const swiperRef = useRef<SwiperCore | null>(null);

  const handleUserInteraction = () => {
    setIsUserInteracted(true); // Set interaction to true
    playAudio(GameStart); // Play the intro audio when the user interacts
  };

  useEffect(() => {
    const playOnInteraction = () => {
      if (!isUserInteracted) {
        handleUserInteraction();
      }
    };

    // Add event listeners for click, keydown, and touchstart
    document.addEventListener('click', playOnInteraction);
    document.addEventListener('keydown', playOnInteraction);
    document.addEventListener('touchstart', playOnInteraction); // For mobile devices

    return () => {
      // Clean up event listeners on unmount
      document.removeEventListener('click', playOnInteraction);
      document.removeEventListener('keydown', playOnInteraction);
      document.removeEventListener('touchstart', playOnInteraction);
    };
  }, [isUserInteracted]);

  const handlePlayCube = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      playAudio(FairySound);
    }

    setIsPlaying(!isPlaying);

    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const goToHomePage = () => {
    playAudio(StoryBegin);
    router.push('app', 'root');
  };

  return (
    <IonPage className='mx-0 my-auto flex items-center justify-center'>
      {!isUserInteracted ? (
        <Title
          title='Tap, click, or press any key'
          subtitle='to start the app'
          styleType='intro-msg'
          fontSize='text-4xl'
        />
      ) : (
        <>
          <Title
            title='Little'
            subtitle='Lingo'
            styleType='app'
            fontSize='text-4xl'
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
          </Swiper>
        </>
      )}
    </IonPage>
  );
};

export default Intro;
