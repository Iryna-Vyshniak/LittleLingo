import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
  useIonViewWillLeave,
} from '@ionic/react';
import React from 'react';
import { caretBack } from 'ionicons/icons';

import AbcList from '../components/abc/AbcList';
import { useUIContext } from '../shared/context/tab-context';

const AbcTrainPage: React.FC = () => {
  const { setShowTabs } = useUIContext();

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
            ></IonBackButton>
          </IonButtons>
          <IonTitle>ABC TRAIN</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        <AbcList />
      </IonContent>
    </IonPage>
  );
};

export default AbcTrainPage;
