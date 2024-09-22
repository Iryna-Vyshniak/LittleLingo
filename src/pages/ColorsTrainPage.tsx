import React from 'react';

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
import { useHeroCardAnimation } from '../shared/hooks/hero.card/useHeroCardAnimation';
import { useStageAColors } from '../shared/hooks/stage.a/useStageAColors';
import { Color } from '../shared/types';

const ColorsTrainPage: React.FC = () => {
  const { setShowTabs } = useUIContext();
  const { isColorsLoading, colors } = useStageAColors();

  const { playAudio } = useAudioPlayer(true);
  const { heroCard, animatedOptions, handleCheckCard } = useHeroCardAnimation(
    colors,
    playAudio
  );

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
