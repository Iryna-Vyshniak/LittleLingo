import { Redirect, Route } from 'react-router';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonMenu,
  IonMenuToggle,
  IonPage,
  IonRouterOutlet,
  IonSplitPane,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

import { menuPaths } from '../shared/data';

import ListPage from './ListPage';
import SettingsPage from './SettingsPage';

const HomePage: React.FC = () => {
  return (
    <IonPage>
      <IonSplitPane contentId='main' when='sm'>
        <IonMenu contentId='main'>
          <IonHeader>
            <IonToolbar color='secondary'>
              <IonTitle>Menu</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent fullscreen>
            {menuPaths.map(({ id, name, url, icon }) => (
              <IonMenuToggle key={id} autoHide={false}>
                <IonItem detail={true} routerLink={url}>
                  <IonIcon slot='start' icon={icon} />
                  {name}
                </IonItem>
              </IonMenuToggle>
            ))}
          </IonContent>
        </IonMenu>
        <IonRouterOutlet id='main'>
          <Route exact path='/app/list' component={ListPage} />
          <Route path='/app/settings' component={SettingsPage} />
          <Route exact path='/app'>
            <Redirect to='/app/list' />
          </Route>
        </IonRouterOutlet>
      </IonSplitPane>
    </IonPage>
  );
};

export default HomePage;
