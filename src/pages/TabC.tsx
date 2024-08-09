import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonToolbar,
} from '@ionic/react';
import React from 'react';

import GameBoard from '../components/game/main/GameBoard';
import Title from '../components/common/Title';

const TabC: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color='primary'>
          <IonButtons slot='start'>
            <IonMenuButton />
          </IonButtons>
          <Title title='Memory Game' styleType='toolbar' fontSize='text-2xl' />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen scrollY={false} className='ion-padding main-bg'>
        <GameBoard />
      </IonContent>
    </IonPage>
  );
};

export default TabC;
