import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React from 'react';

const TabB: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={'success'}>
          <IonButtons slot='start'>
            <IonMenuButton />
          </IonButtons>
          <IonTitle>STAGE B</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>STAGE B</IonContent>
    </IonPage>
  );
};

export default TabB;
