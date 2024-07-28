import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React from 'react';
import { caretBack } from 'ionicons/icons';

import AbcList from '../components/abc/AbcList';

const AbcTrainPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color='primary'>
          <IonButtons slot='start'>
            <IonBackButton
              text='Previous'
              icon={caretBack}
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
