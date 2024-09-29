import React, { useState } from 'react';

import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonToolbar,
} from '@ionic/react';
import { useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';

import Title from '../components/common/Title';

const TabA: React.FC = () => {
  const match = useRouteMatch();
  const [activeLink, setActiveLink] = useState<number | null>(null);
  const [isFlashing, setIsFlashing] = useState<boolean>(false);

  const handleLinkClick = (index: number) => {
    setActiveLink(index);
    setIsFlashing(true);
    setTimeout(() => {
      setActiveLink(null);
      setIsFlashing(false);
    }, 1000); // Duration of flash animation
  };

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
        <ul className='flex flex-wrap items-center justify-center gap-12'>
          <Link
            to={`${match.url}/abc-train`}
            className={`blob stage-category flash ${activeLink === 1 ? 'active' : ''}`}
            onClick={() => handleLinkClick(1)}
          >
            {!isFlashing ? (
              <figure className='ball ball-abc'>
                <span className='shadow'></span>
                <span className='label'></span>
              </figure>
            ) : (
              <div className='ball explode'></div>
            )}
          </Link>
          <Link
            to={`${match.url}/colors-train`}
            className={`blob stage-category flash ${activeLink === 2 ? 'active' : ''}`}
            onClick={() => handleLinkClick(2)}
          >
            {!isFlashing ? (
              <figure className='ball ball-colors'>
                <span className='shadow'></span>
                <span className='label'></span>
              </figure>
            ) : (
              <div className='explode'></div>
            )}
          </Link>
          <Link
            to={`${match.url}/numbers-train`}
            className={`blob stage-category flash ${activeLink === 3 ? 'active' : ''}`}
            onClick={() => handleLinkClick(3)}
          >
            {!isFlashing ? (
              <figure className='ball ball-numbers'>
                <span className='shadow'></span>
                <span className='label'></span>
              </figure>
            ) : (
              <div className='explode'></div>
            )}
          </Link>
          <Link
            to={`${match.url}/animals-train`}
            className={`blob stage-category flash ${activeLink === 4 ? 'active' : ''}`}
            onClick={() => handleLinkClick(4)}
          >
            {!isFlashing ? (
              <figure className='ball ball-animals'>
                <span className='shadow'></span>
                <span className='label'></span>
              </figure>
            ) : (
              <div className='explode'></div>
            )}
          </Link>
          <Link
            to={`${match.url}/activity-train`}
            className={`blob stage-category flash ${activeLink === 4 ? 'active' : ''}`}
            onClick={() => handleLinkClick(5)}
          >
            {!isFlashing ? (
              <figure className='ball ball-activity'>
                <span className='shadow'></span>
                <span className='label'></span>
              </figure>
            ) : (
              <div className='explode'></div>
            )}
          </Link>
        </ul>
      </IonContent>
    </IonPage>
  );
};

export default TabA;
