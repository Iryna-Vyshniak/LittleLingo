import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonGrid,
} from '@ionic/react';
import React from 'react';
import { DndProvider } from 'react-dnd-multi-backend';

import { caretBack } from 'ionicons/icons';

import { HTML5toTouch } from '../dndConfig';

import ColorBoardGame from '../components/game/color/ColorBoardGame';
import ToolbarTitle from '../components/common/ToolbarTitle';

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
                className='special-font tracking-wide drop-shadow-[2px_5px_2px_rgba(15,41,1,1)]'
              ></IonBackButton>
            </IonButtons>
            <ToolbarTitle title='Colors Game' />
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen scrollY={false} className='ion-padding colors-game-bg'>
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
