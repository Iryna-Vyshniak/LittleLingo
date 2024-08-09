import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
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
import Title from '../components/common/Title';

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
          <IonToolbar color='primary' className='flex items-center justify-center'>
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
        <IonContent fullscreen scrollY={false} className='ion-padding letters-game-bg'>
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
