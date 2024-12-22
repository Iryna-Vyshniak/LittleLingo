import React from 'react';

import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonToolbar,
} from '@ionic/react';

import Title from '../components/common/Title';
import GameBoard from '../components/game/main/GameBoard';

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
      <IonContent
        fullscreen
        scrollY={false}
        className='ion-margin-vertical main-bg ion-justify-content-center ion-align-items-center h-full'
      >
        <GameBoard />
      </IonContent>
    </IonPage>
  );
};

export default TabC;
