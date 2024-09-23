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

import AbcCube from '../components/abc/AbcCube';
import GenericList from '../components/common/GenericList';
import Loader from '../components/common/Loader';
import SkeletonList from '../components/common/SkeletonList';
import Title from '../components/common/Title';
import { useUIContext } from '../shared/context/tab-context';
import { useAudioPlayer } from '../shared/hooks/audio/useAudioPlayer';
import { useHeroCardAnimation } from '../shared/hooks/hero.card/useHeroCardAnimation';
import { useStageAABC } from '../shared/hooks/stage.a/useStageAABC';
import { Letter } from '../shared/types';

const AbcTrainPage: React.FC = () => {
  const { setShowTabs } = useUIContext();
  const { isAbcLoading, abc } = useStageAABC();
  const { playAudio } = useAudioPlayer(true);
  const { heroCard, animatedOptions, handleCheckCard } = useHeroCardAnimation(
    abc,
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
          <Title title='Learn ABC' styleType='toolbar' fontSize='text-2xl' />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className='ion-padding relative'>
        {isAbcLoading && !abc.length && (
          <>
            <SkeletonList itemCount={26} /> <Loader />
          </>
        )}
        {!isAbcLoading && abc.length && (
          <>
            {' '}
            {heroCard && (
              <div className='hero-wrapper mb-6 mt-6'>
                <IonCard
                  className={`hero cursor-pointer ${heroCard.animationClass}`}
                  onClick={() => playAudio(heroCard.soundDescr)}
                >
                  <div className='flex items-center'>
                    {' '}
                    <Title
                      title={heroCard.label.toUpperCase()}
                      styleType='card-title'
                      fontSize='text-6xl'
                      fontFamily={true}
                    />
                    <Title
                      title={heroCard.label.toLowerCase()}
                      styleType='card-title'
                      fontSize='text-6xl'
                      fontFamily={true}
                    />
                  </div>

                  <IonThumbnail className='h-1/2 w-full'>
                    <IonImg
                      src={heroCard.imageUrl}
                      alt={heroCard.label}
                      className='h-full w-full object-contain'
                    />
                  </IonThumbnail>

                  <Title
                    title={heroCard.description}
                    styleType='card-description'
                    fontSize='text-5xl'
                  />
                </IonCard>
              </div>
            )}{' '}
            <GenericList<Letter>
              items={animatedOptions.filter(
                (card) => card._id !== heroCard?._id
              )}
              variant='middle'
              renderItem={(letter) => (
                <AbcCube
                  key={letter._id}
                  item={letter}
                  handleCardClick={handleCheckCard}
                />
              )}
            />
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default AbcTrainPage;
