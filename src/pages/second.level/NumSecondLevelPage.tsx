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
import NumberBoardGame from '../../components/game/2level/number/NumberBoardGame';
import { HTML5toTouch } from '../../dndConfig';
import rulesData from '../../shared/data/rules.json';
import { useStageANumbers } from '../../shared/hooks/stage.a/useStageANumbers';

const NumSecondLevelPage: React.FC = () => {
  const { numbers, isNumbersLoading } = useStageANumbers();
  const modal = useRef<HTMLIonModalElement>(null);
  const page = useRef(null);
  // Find the rules for a specific game
  const selectedGame = rulesData.games.find(
    ({ gameType }) => gameType === 'numbers-math'
  );

  if (!selectedGame) {
    throw new Error('Game rules for numbers-math not found');
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
              title='Numbers 2 Game'
              styleType='toolbar'
              fontSize='text-2xl'
            />
          </IonToolbar>
        </IonHeader>
        <IonContent
          fullscreen
          className='ion-padding numbers-game-bg relative flex flex-col items-center justify-center'
        >
          {isNumbersLoading && !numbers.length && (
            <>
              <SkeletonList itemCount={11} />
              <Loader />
            </>
          )}
          {!isNumbersLoading && numbers.length && (
            <>
              <IonButton
                expand='block'
                onClick={openModal}
                className='sparkles'
              >
                <span className='special-font custom text-center tracking-wide'>
                  View Rules
                </span>
              </IonButton>
              <NumberBoardGame numbers={numbers} />
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

export default NumSecondLevelPage;
