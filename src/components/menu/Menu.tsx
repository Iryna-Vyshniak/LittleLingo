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

const Menu: React.FC = () => {
  return (
    <IonMenu contentId='main'>
      <IonHeader mode='md'>
        <IonToolbar color='secondary'>
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className='menu' color='secondary'>
        {menuPaths.map(({ id, name, url, icon }) => (
          <IonMenuToggle key={id} autoHide={false}>
            <IonItem detail={true} routerLink={url} color='secondary'>
              <IonIcon slot='start' icon={icon} />
              {name}
            </IonItem>
          </IonMenuToggle>
        ))}
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
