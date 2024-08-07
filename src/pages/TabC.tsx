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
import ToolbarTitle from '../components/common/ToolbarTitle';

const TabC: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color='primary'>
          <IonButtons slot='start'>
            <IonMenuButton />
          </IonButtons>
          <ToolbarTitle title='Memory Game' />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen scrollY={false} className='ion-padding main-bg'>
        <GameBoard />
      </IonContent>
    </IonPage>
  );
};

export default TabC;
