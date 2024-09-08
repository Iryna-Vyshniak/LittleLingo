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

import GenericList from '../components/common/GenericList';
import Loader from '../components/common/Loader';
import SkeletonList from '../components/common/SkeletonList';
import Title from '../components/common/Title';
import { useStageAAnimals } from '../shared/hooks/stage.a/useStageAAnimals';
import { Animal } from '../shared/types';

const AnimalsTrainPage: React.FC = () => {
  const { isAnimalsLoading, animals } = useStageAAnimals();

  return (
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
          <Title
            title='Learn Animals'
            styleType='toolbar'
            fontSize='text-2xl'
          />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className='ion-padding numbers-game-bg'>
        {isAnimalsLoading && !animals.length && (
          <>
            <SkeletonList itemCount={11} />
            <Loader />
          </>
        )}
        {!isAnimalsLoading && animals.length && (
          <GenericList<Animal>
            items={animals}
            variant='expanded'
            renderItem={(animal) => <div key={animal._id}>{animal.name}</div>}
          />
        )}
      </IonContent>
    </IonPage>
  );
};

export default AnimalsTrainPage;
