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
  useIonViewWillEnter,
  useIonViewWillLeave,
} from '@ionic/react';
import { caretBack } from 'ionicons/icons';
import { DndProvider } from 'react-dnd-multi-backend';

import Loader from '../components/common/Loader';
import Rules from '../components/common/Rules';
import SkeletonList from '../components/common/SkeletonList';
import Title from '../components/common/Title';
import LetterBoardGame from '../components/game/letters/LetterBoardGame';
import { HTML5toTouch } from '../dndConfig';
import { useUIContext } from '../shared/context/tab-context';
import rulesData from '../shared/data/rules.json';
import { useStageAABC } from '../shared/hooks/stage.a/useStageAABC';

const AbcStageBPage: React.FC = () => {
  const { setShowTabs } = useUIContext();
  const { isAbcLoading, abc } = useStageAABC();
  const modal = useRef<HTMLIonModalElement>(null);
  const page = useRef(null);
  // Find the rules for a specific game
  const selectedGame = rulesData.games.find(
    ({ gameType }) => gameType === 'letters-match'
  );

  if (!selectedGame) {
    throw new Error('Game rules for letters-match not found');
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

  useIonViewWillEnter(() => {
    setShowTabs(false);
  });

  useIonViewWillLeave(() => {
    setShowTabs(true);
  });

  return (
    <DndProvider options={HTML5toTouch}>
      {' '}
      <IonPage ref={page}>
        <IonHeader>
          <IonToolbar
            color='primary'
            className='flex items-center justify-center'
          >
            <IonButtons slot='start'>
              <IonBackButton
                text='Previous'
                icon={caretBack}
                mode='md'
                defaultHref='/app/list/stagea'
                className='special-font tracking-wide drop-shadow-[2px_5px_2px_rgba(15,41,1,1)]'
              ></IonBackButton>
            </IonButtons>
            <Title title='ABC Game' styleType='toolbar' fontSize='text-2xl' />
          </IonToolbar>
        </IonHeader>
        <IonContent
          fullscreen
          scrollY={false}
          className='ion-padding letters-game-bg'
        >
          <div className='flex h-full w-full flex-col gap-4'>
            {' '}
            {isAbcLoading && !abc.length && (
              <>
                <SkeletonList itemCount={26} />
                <Loader />
              </>
            )}
            {!isAbcLoading && abc.length && (
              <>
                {' '}
                <IonButton
                  expand='block'
                  onClick={openModal}
                  className='sparkles'
                >
                  <span className='special-font custom text-center tracking-wide'>
                    View Rules
                  </span>
                </IonButton>
                <LetterBoardGame alphabet={abc} />
              </>
            )}
          </div>

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

export default AbcStageBPage;
