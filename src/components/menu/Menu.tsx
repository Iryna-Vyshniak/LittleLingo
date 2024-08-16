import React from 'react';

import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonMenu,
  IonMenuToggle,
  IonToolbar,
} from '@ionic/react';

import WoodenMenu from '../../assets/images/wooden-menu.png';
import { menuPaths } from '../../shared/data';
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
              className='special-font ion-margin-top relative flex h-11 w-full items-center justify-center tracking-wide drop-shadow-[2px_5px_2px_rgba(15,41,1,1)]'
              lines='none'
            >
              <img
                src={WoodenMenu}
                alt='wooden menu'
                width={156}
                height={24}
                className='absolute inset-0 h-11 w-40'
              />
              <div className='absolute left-4 z-10 flex items-center justify-center'>
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
