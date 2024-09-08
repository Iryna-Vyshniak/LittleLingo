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

import ColorCube from '../components/colors/ColorCube';
import GenericList from '../components/common/GenericList';
import Loader from '../components/common/Loader';
import SkeletonList from '../components/common/SkeletonList';
import Title from '../components/common/Title';
import { useUIContext } from '../shared/context/tab-context';
import { useStageAColors } from '../shared/hooks/stage.a/useStageAColors';
import { Color } from '../shared/types';

const ColorsTrainPage: React.FC = () => {
  const { setShowTabs } = useUIContext();
  const { isColorsLoading, colors } = useStageAColors();

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
          <Title title='Learn Colors' styleType='toolbar' fontSize='text-2xl' />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className='ion-padding'>
        {isColorsLoading && !colors.length && (
          <>
            <SkeletonList itemCount={11} />
            <Loader />
          </>
        )}
        {!isColorsLoading && colors.length && (
          <GenericList<Color>
            items={colors}
            renderItem={(color) => <ColorCube key={color._id} item={color} />}
          />
        )}
      </IonContent>
    </IonPage>
  );
};

export default ColorsTrainPage;
