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

import CircleAnimation from '../../components/common/CircleAnimation';
import Loader from '../../components/common/Loader';
import Rules from '../../components/common/Rules';
import SkeletonList from '../../components/common/SkeletonList';
import Title from '../../components/common/Title';
import ColorBoardGame from '../../components/game/2level/color/ColorBoardGame';
import { HTML5toTouch } from '../../dndConfig';
import rulesData from '../../shared/data/rules.json';
import { useStageAColors } from '../../shared/hooks/stage.a/useStageAColors';

const ColorSecondLevelPage: React.FC = () => {
  const { colors, isColorsLoading } = useStageAColors();
  const modal = useRef<HTMLIonModalElement>(null);
  const page = useRef(null);
  // Find the rules for a specific game
  const selectedGame = rulesData.games.find(
    ({ gameType }) => gameType === 'colors-two-level'
  );

  if (!selectedGame) {
    throw new Error('Game rules for colors not found');
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
              title='Colors 2 Game'
              styleType='toolbar'
              fontSize='text-2xl'
            />
          </IonToolbar>
        </IonHeader>
        <IonContent
          fullscreen
          className='ion-padding numbers-game-bg relative flex flex-col items-center justify-center'
        >
          {isColorsLoading && !colors.length && (
            <>
              <SkeletonList itemCount={11} />
              <Loader />
            </>
          )}
          {!isColorsLoading && colors.length && (
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
              <ColorBoardGame colors={colors} />
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
        <CircleAnimation />
      </IonPage>
    </DndProvider>
  );
};

export default ColorSecondLevelPage;
