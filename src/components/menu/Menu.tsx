import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonMenu,
  IonMenuToggle,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React from 'react';

import { menuPaths } from '../../shared/data';

import WoodenMenu from '../../assets/images/wooden-menu.png';

import Title from '../common/Title';

const Menu: React.FC = () => {
  return (
    <IonMenu contentId='main'>
      <IonHeader>
        <IonToolbar className='toolbar-menu ion-padding'>
          <Title title='Menu' styleType='menu' fontSize='text-3xl' />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className='menu'>
        {' '}
        {menuPaths.map(({ id, name, url, icon }) => (
          <IonMenuToggle key={id} autoHide={false}>
            <IonItem
              detail={true}
              routerLink={url}
              className='relative special-font tracking-wide drop-shadow-[2px_5px_2px_rgba(15,41,1,1)] flex justify-center items-center w-full h-11 ion-margin-top'
              lines='none'
            >
              <img
                src={WoodenMenu}
                alt='wooden menu'
                width={156}
                height={24}
                className='absolute inset-0 w-40 h-11'
              />
              <div className='absolute left-4 z-10 flex justify-center items-center'>
                {' '}
                <IonIcon slot='start' icon={icon} className='ion-margin-end' />
                {name}
              </div>
            </IonItem>
          </IonMenuToggle>
        ))}
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
