import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
  useIonViewWillLeave,
} from '@ionic/react';
import React from 'react';
import { DndProvider } from 'react-dnd-multi-backend';
import { caretBack } from 'ionicons/icons';

import AbcSkeleton from '../components/abc/AbcSkeleton';
import LetterBoardGame from '../components/game/letters/LetterBoardGame';

import { HTML5toTouch } from '../dndConfig';

import { useUIContext } from '../shared/context/tab-context';
import { useStageAABC } from '../shared/hooks/stage.a/useStageAABC';

const LetterStageBPage: React.FC = () => {
  const { setShowTabs } = useUIContext();
  const { isAbcLoading, abc } = useStageAABC();

  useIonViewWillEnter(() => {
    setShowTabs(false);
  });

  useIonViewWillLeave(() => {
    setShowTabs(true);
  });

  return (
    <DndProvider options={HTML5toTouch}>
      {' '}
      <IonPage>
        <IonHeader>
          <IonToolbar color='primary'>
            <IonButtons slot='start'>
              <IonBackButton
                text='Previous'
                icon={caretBack}
                mode='md'
                defaultHref='/app/list/stagea'
              ></IonBackButton>
            </IonButtons>
            <IonTitle>ABC GAME</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen scrollY={false} className='ion-padding'>
          <IonGrid fixed>
            {isAbcLoading && !abc.length && <AbcSkeleton />}
            {!isAbcLoading && abc.length && <LetterBoardGame alphabet={abc} />}
          </IonGrid>
        </IonContent>
      </IonPage>
    </DndProvider>
  );
};

export default LetterStageBPage;
