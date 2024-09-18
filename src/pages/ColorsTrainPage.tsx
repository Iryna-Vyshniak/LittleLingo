import React, { useEffect, useRef, useState } from 'react';

import {
  IonBackButton,
  IonButtons,
  IonCard,
  IonContent,
  IonHeader,
  IonImg,
  IonPage,
  IonThumbnail,
  IonToolbar,
  useIonViewWillEnter,
  useIonViewWillLeave,
} from '@ionic/react';
import { caretBack } from 'ionicons/icons';

import ColorCube from '../components/colors/ColorCube';
import CircleAnimation from '../components/common/CircleAnimation';
import GenericList from '../components/common/GenericList';
import Loader from '../components/common/Loader';
import SkeletonList from '../components/common/SkeletonList';
import Title from '../components/common/Title';
import { useUIContext } from '../shared/context/tab-context';
import { useAudioPlayer } from '../shared/hooks/audio/useAudioPlayer';
import { useStageAColors } from '../shared/hooks/stage.a/useStageAColors';
import { AnimatedColor, Color } from '../shared/types';
import { clearCurrentTimeout } from '../shared/utils';

const ColorsTrainPage: React.FC = () => {
  const { setShowTabs } = useUIContext();
  const { isColorsLoading, colors } = useStageAColors();
  const [heroCard, setHeroCard] = useState<AnimatedColor | null>(null);
  console.log('heroCard: ', heroCard);
  const { playAudio } = useAudioPlayer(true);
  const [animatedOptions, setAnimatedOptions] = useState<AnimatedColor[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Initial setup for all cards with the "scale-up" class
    const animatedOptionsWithClass = colors.map((color) => ({
      ...color,
      animationClass: 'scale-up',
    }));
    setAnimatedOptions(animatedOptionsWithClass);

    return () => clearCurrentTimeout(timeoutRef);
  }, [colors]);

  const handleCheckCard = (selectedColor: Color) => {
    // Clear the previous timeout if it hasn't finished yet
    clearCurrentTimeout(timeoutRef);

    // First, scale down the selected card
    setAnimatedOptions((prevOptions) =>
      prevOptions.map((option) =>
        option._id === selectedColor._id
          ? { ...option, animationClass: 'scale-down' }
          : option
      )
    );

    // Set a new timeout to complete the animation
    timeoutRef.current = setTimeout(() => {
      if (selectedColor === heroCard) {
        setHeroCard(null); // If the selected card is the current hero, remove it as the hero
      } else {
        // First, set the new hero without animation
        setHeroCard({
          ...selectedColor,
          animationClass: '', // Remove the animation class initially
        });

        setTimeout(() => {
          // Then, after a delay, add the "scale-up" class for the new hero
          setHeroCard((prevHero) =>
            prevHero
              ? {
                  ...prevHero,
                  animationClass: 'scale-up', // Add the animation class
                }
              : null
          );

          setAnimatedOptions((prevOptions) =>
            prevOptions.map((option) =>
              option._id === selectedColor._id
                ? { ...option, animationClass: 'scale-up' } // Add animation to the selected card
                : option
            )
          );

          playAudio(selectedColor.sound); // Play the sound for the new card
        }, 50); // Short delay before applying the animation
      }
    }, 500); // 500ms delay to finish the "scale-down" animation
  };

  useEffect(() => {
    // Cleanup timeouts when the component unmounts
    return () => clearCurrentTimeout(timeoutRef);
  }, []);

  useIonViewWillEnter(() => {
    setShowTabs(false);
  });

  useIonViewWillLeave(() => {
    setShowTabs(true);
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color='primary'>
          <IonButtons slot='start'>
            <IonBackButton
              text='Previous'
              icon={caretBack}
              mode='md'
              defaultHref='/app/list/stagea'
              className='special-font tracking-wide drop-shadow-[2px_5px_2px_rgba(15,41,1,1)]'
            ></IonBackButton>
          </IonButtons>
          <Title title='Learn Colors' styleType='toolbar' fontSize='text-2xl' />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className='ion-padding'>
        {isColorsLoading && !colors.length && (
          <>
            <SkeletonList itemCount={11} />
            <Loader />
          </>
        )}
        {!isColorsLoading && colors.length && (
          <>
            {heroCard && (
              <div className='hero-wrapper'>
                <IonCard
                  className={`hero cursor-pointer ${heroCard.animationClass}`}
                  onClick={() => playAudio(heroCard.sound)}
                >
                  <Title
                    title={heroCard.label}
                    styleType='modal-title'
                    fontSize='text-3xl'
                    fontFamily={true}
                  />
                  <IonThumbnail className='h-1/2 w-full'>
                    <IonImg
                      src={heroCard.image}
                      alt={heroCard.label}
                      className='h-full w-full object-contain'
                    />
                  </IonThumbnail>

                  <Title
                    title={heroCard.label.toLowerCase()}
                    styleType='card-title'
                    fontSize='text-4xl'
                  />
                </IonCard>
              </div>
            )}{' '}
            <GenericList<Color>
              items={animatedOptions.filter(
                (card) => card._id !== heroCard?._id
              )}
              renderItem={(color) => (
                <ColorCube
                  key={color._id}
                  item={color}
                  handleCardClick={handleCheckCard}
                />
              )}
            />
          </>
        )}
        <CircleAnimation />
      </IonContent>
    </IonPage>
  );
};

export default ColorsTrainPage;
