import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from '@ionic/react';
import React, { MouseEvent } from 'react';

const TabB: React.FC = () => {
  const history = useIonRouter();

  const goToABC = (e: MouseEvent<HTMLIonButtonElement>) => {
    e.preventDefault();
    history.push('/app/list/stagea/abc-train');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color='secondary'>
          <IonButtons slot='start'>
            <IonMenuButton />
          </IonButtons>
          <IonTitle>STAGE B</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        <h1>STAGE B </h1>
        <IonButton onClick={goToABC}>Go to ABC</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default TabB;
