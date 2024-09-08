import React from 'react';

import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  useIonViewWillEnter,
  useIonViewWillLeave,
} from '@ionic/react';
import { caretBack } from 'ionicons/icons';

import GenericList from '../components/common/GenericList';
import Loader from '../components/common/Loader';
import SkeletonList from '../components/common/SkeletonList';
import Title from '../components/common/Title';
import NumberItem from '../components/numbers/NumberItem';
import { useUIContext } from '../shared/context/tab-context';
import { useStageANumbers } from '../shared/hooks/stage.a/useStageANumbers';
import { Number } from '../shared/types';

const NumbersTrainPage: React.FC = () => {
  const { setShowTabs } = useUIContext();
  const { isNumbersLoading, numbers } = useStageANumbers();

  useIonViewWillEnter(() => {
    setShowTabs(false);
  });

  useIonViewWillLeave(() => {
    setShowTabs(true);
  });

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
            title='Learn Numbers'
            styleType='toolbar'
            fontSize='text-2xl'
          />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className='ion-padding numbers-game-bg'>
        {isNumbersLoading && !numbers.length && (
          <>
            <SkeletonList itemCount={11} />
            <Loader />
          </>
        )}
        {!isNumbersLoading && numbers.length && (
          <GenericList<Number>
            items={numbers}
            variant='expanded'
            renderItem={(number) => (
              <NumberItem key={number._id} item={number} />
            )}
          />
        )}
      </IonContent>
    </IonPage>
  );
};

export default NumbersTrainPage;
