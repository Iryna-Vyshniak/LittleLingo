import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
} from '@ionic/react';
import React from 'react';
import { DndProvider } from 'react-dnd-multi-backend';

import { caretBack } from 'ionicons/icons';

import { HTML5toTouch } from '../dndConfig';

import Title from '../components/common/Title';
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
                className='special-font tracking-wide drop-shadow-[2px_5px_2px_rgba(15,41,1,1)]'
              ></IonBackButton>
            </IonButtons>
            <Title title='Colors Game' styleType='toolbar' fontSize='text-2xl' />
          </IonToolbar>
        </IonHeader>
        <IonContent
          fullscreen
          scrollY={false}
          className='relative ion-padding colors-game-bg flex flex-col items-center justify-center'
        >
          <ColorBoardGame />
        </IonContent>
      </IonPage>
    </DndProvider>
  );
};

export default ColorStageBPage;
