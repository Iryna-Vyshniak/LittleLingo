import { Redirect, Route } from 'react-router';
import { IonPage, IonRouterOutlet, IonSplitPane } from '@ionic/react';

import ListPage from './ListPage';
import SettingsPage from './SettingsPage';
import Menu from '../components/menu/Menu';

const HomePage: React.FC = () => {
  return (
    <IonPage>
      <IonSplitPane contentId='main' when='sm'>
        <Menu />
        <IonRouterOutlet id='main'>
          <Route path='/app/list' component={ListPage} />
          <Route path='/app/settings' component={SettingsPage} />
          <Route exact path={'/app'}>
            <Redirect to={'/app/list'} />
          </Route>
        </IonRouterOutlet>
      </IonSplitPane>
    </IonPage>
  );
};

export default HomePage;
