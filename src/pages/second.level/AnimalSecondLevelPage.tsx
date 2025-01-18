import React, { useEffect, useRef, useState } from 'react';

import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonPage,
  IonToolbar,
} from '@ionic/react';
import { caretBack } from 'ionicons/icons';
import { DndProvider } from 'react-dnd-multi-backend';

import Loader from '../../components/common/Loader';
import Rules from '../../components/common/Rules';
import SkeletonList from '../../components/common/SkeletonList';
import Title from '../../components/common/Title';
import AnimalBoardGame from '../../components/game/2level/animal/AnimalBoardGame';
import { HTML5toTouch } from '../../dndConfig';
import rulesData from '../../shared/data/rules.json';
import { useStageBAnimals } from '../../shared/hooks/stage.b/useStageBAnimals';

const AnimalSecondLevelPage: React.FC = () => {
  const { animals, isAnimalsLoading } = useStageBAnimals();
  const modal = useRef<HTMLIonModalElement>(null);
  const page = useRef(null);
  // Find the rules for a specific game
  const selectedGame = rulesData.games.find(
    ({ gameType }) => gameType === 'fill-missing-letters'
  );

  if (!selectedGame) {
    throw new Error('Game rules for animals not found');
  }

  const [presentingElement, setPresentingElement] =
    useState<HTMLElement | null>(null);

  useEffect(() => {
    setPresentingElement(page.current);
  }, []);

  function dismiss() {
    modal.current?.dismiss();
  }

  function openModal() {
    modal.current?.present();
  }

  async function canDismiss(role?: string) {
    return role !== 'gesture';
  }

  return (
    <DndProvider options={HTML5toTouch}>
      <IonPage ref={page}>
        <IonHeader>
          <IonToolbar color='primary'>
            <IonButtons slot='start'>
              <IonBackButton
                text='Previous'
                icon={caretBack}
                mode='md'
                defaultHref='/app/list/stageb'
                className='special-font tracking-wide drop-shadow-[2px_5px_2px_rgba(15,41,1,1)]'
              ></IonBackButton>
            </IonButtons>
            <Title
              title='Animals 2 Game'
              styleType='toolbar'
              fontSize='text-2xl'
            />
          </IonToolbar>
        </IonHeader>
        <IonContent
          fullscreen
          className='ion-padding numbers-game-bg relative flex flex-col items-center justify-center'
        >
          {isAnimalsLoading && !animals.length && (
            <>
              <SkeletonList itemCount={11} />
              <Loader />
            </>
          )}
          {!isAnimalsLoading && animals.length && (
            <>
              <IonButton
                expand='block'
                onClick={openModal}
                className='sparkles h-8 min-h-[2em] md:h-11'
              >
                <span className='special-font custom text-center tracking-wide'>
                  View Rules
                </span>
              </IonButton>
              <AnimalBoardGame animals={animals} />
            </>
          )}
          <IonModal
            ref={modal}
            canDismiss={canDismiss}
            presentingElement={presentingElement!}
            className='modal-rules'
          >
            <IonHeader>
              <IonToolbar>
                <Title
                  title='Rules'
                  styleType='modal-title'
                  fontSize='text-xl'
                />
                <IonButtons slot='end'>
                  <IonButton
                    onClick={dismiss}
                    className='special-font custom text-center tracking-wide'
                  >
                    <span className='text-white'>Close</span>
                  </IonButton>
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <IonContent>
              <Rules rulesData={selectedGame} />
            </IonContent>
          </IonModal>
        </IonContent>
      </IonPage>
    </DndProvider>
  );
};

export default AnimalSecondLevelPage;
