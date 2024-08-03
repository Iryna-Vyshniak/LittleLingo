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
        <IonContent className='ion-padding grid grid-rows-4 grid-flow-row auto-rows-max mx-auto my-0'>
          <ColorBoardGame />
        </IonContent>
      </IonPage>
    </DndProvider>
  );
};

export default ColorStageBPage;
