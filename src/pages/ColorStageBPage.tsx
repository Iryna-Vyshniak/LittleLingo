import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
} from '@ionic/react';
import React from 'react';
import { DndProvider } from 'react-dnd-multi-backend';

import { caretBack } from 'ionicons/icons';

import { HTML5toTouch } from '../dndConfig';

import ColorBoardGame from '../components/game/color/ColorBoardGame';

const ColorStageBPage: React.FC = () => {
  return (
    <DndProvider options={HTML5toTouch}>
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
            <IonTitle>COLORS GAME</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen scrollY={false} className='ion-padding'>
          <IonGrid fixed>
            {' '}
            <ColorBoardGame />
          </IonGrid>
        </IonContent>
      </IonPage>
    </DndProvider>
  );
};

export default ColorStageBPage;
