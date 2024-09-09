import React from 'react';

import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
} from '@ionic/react';
import { caretBack } from 'ionicons/icons';
import { DndProvider } from 'react-dnd-multi-backend';

import Loader from '../components/common/Loader';
import SkeletonList from '../components/common/SkeletonList';
import Title from '../components/common/Title';
import NumberBoardGame from '../components/game/number/NumberBoardGame';
import { HTML5toTouch } from '../dndConfig';
import { useStageANumbers } from '../shared/hooks/stage.a/useStageANumbers';

const NumberStageBPage: React.FC = () => {
  const { numbers, isNumbersLoading } = useStageANumbers();
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
                defaultHref='/app/list/stageb'
                className='special-font tracking-wide drop-shadow-[2px_5px_2px_rgba(15,41,1,1)]'
              ></IonBackButton>
            </IonButtons>
            <Title
              title='Numbers Game'
              styleType='toolbar'
              fontSize='text-2xl'
            />
          </IonToolbar>
        </IonHeader>
        <IonContent
          fullscreen
          className='ion-padding numbers-game-bg relative flex flex-col items-center justify-center'
        >
          {isNumbersLoading && !numbers.length && (
            <>
              <SkeletonList itemCount={11} />
              <Loader />
            </>
          )}
          {!isNumbersLoading && numbers.length && (
            <NumberBoardGame numbers={numbers} />
          )}
        </IonContent>
      </IonPage>
    </DndProvider>
  );
};

export default NumberStageBPage;
