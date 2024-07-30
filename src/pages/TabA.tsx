import {
  IonButtons,
  IonContent,
  IonHeader,
  IonList,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

import React from 'react';
import { useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';

const TabA: React.FC = () => {
  const match = useRouteMatch();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color='secondary'>
          <IonButtons slot='start'>
            <IonMenuButton />
          </IonButtons>
          <IonTitle>STAGE A</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
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
