import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonToolbar,
} from '@ionic/react';

import React from 'react';
import { useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';

import Title from '../components/common/Title';

const TabA: React.FC = () => {
  const match = useRouteMatch();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color='primary'>
          <IonButtons slot='start'>
            <IonMenuButton />
          </IonButtons>
          <Title title='Stage A' styleType='toolbar' fontSize='text-2xl' />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen scrollY={false} className='ion-padding main-bg'>
        <h1>STAGE A </h1>
        <ul className='flex items-center justify-center gap-4'>
          {' '}
          <Link to={`${match.url}/abc-train`} className='stage-category'>
            <figure className='ball ball-abc'>
              <span className='shadow'></span>
              <span className='label'></span>
            </figure>
          </Link>
          <Link to={`${match.url}/abc-train`} className='stage-category'>
            <figure className='ball ball-colors'>
              <span className='shadow'></span>
              <span className='label'></span>
            </figure>
          </Link>
        </ul>
      </IonContent>
    </IonPage>
  );
};

export default TabA;
