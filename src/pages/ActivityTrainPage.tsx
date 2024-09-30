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

import ActivityCards from '../components/activity/ActivityCards';
import Loader from '../components/common/Loader';
import SkeletonList from '../components/common/SkeletonList';
import Title from '../components/common/Title';
import { useUIContext } from '../shared/context/tab-context';
import { useStageAactivity } from '../shared/hooks/stage.a/useStageAActivity';

const ActivityTrainPage: React.FC = () => {
  const { setShowTabs } = useUIContext();
  const { isActivityLoading, activity } = useStageAactivity();

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
            title='Learn Activity'
            styleType='toolbar'
            fontSize='text-2xl'
          />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen scrollY={false} className='ion-padding relative'>
        {isActivityLoading && !activity.length && (
          <>
            <SkeletonList itemCount={11} /> <Loader />
          </>
        )}
        {!isActivityLoading && activity.length && (
          <ActivityCards activity={activity} />
        )}
      </IonContent>
    </IonPage>
  );
};

export default ActivityTrainPage;
