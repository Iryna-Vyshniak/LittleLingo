import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  useIonViewWillEnter,
  useIonViewWillLeave,
} from '@ionic/react';
import React from 'react';
import { caretBack } from 'ionicons/icons';

import AbcList from '../components/abc/AbcList';
import AbcSkeleton from '../components/abc/AbcSkeleton';
import ToolbarTitle from '../components/common/ToolbarTitle';

import { useUIContext } from '../shared/context/tab-context';
import { useStageAABC } from '../shared/hooks/stage.a/useStageAABC';

const AbcTrainPage: React.FC = () => {
  const { setShowTabs } = useUIContext();
  const { isAbcLoading, abc } = useStageAABC();

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
          <ToolbarTitle title='Learn ABC' />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen scrollY={false} className='ion-padding'>
        {isAbcLoading && !abc.length && <AbcSkeleton />}
        {!isAbcLoading && abc.length && <AbcList abc={abc} />}
      </IonContent>
    </IonPage>
  );
};

export default AbcTrainPage;
