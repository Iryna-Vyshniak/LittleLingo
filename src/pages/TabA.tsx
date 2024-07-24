import {
  IonButtons,
  IonButton,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React from 'react';

const TabA: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={'success'}>
          <IonButtons slot='start'>
            <IonMenuButton />
          </IonButtons>
          <IonTitle>STAGE A</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>STAGE A</IonContent>
    </IonPage>
  );
};

export default TabA;
