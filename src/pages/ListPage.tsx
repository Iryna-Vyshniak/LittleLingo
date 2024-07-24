import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import React from 'react';
import { Route, Redirect } from 'react-router';

import TabA from './TabA';
import TabB from './TabB';

import StageA from '../assets/icons/a-stage.svg';
import StageB from '../assets/icons/b-stage.svg';

const ListPage: React.FC = () => {
  return (
    <IonTabs className='bg-transparent'>
      <IonTabBar slot='bottom' translucent={true}>
        <IonTabButton tab='stage-a' href='/app/list/stage-a'>
          <IonIcon icon={StageA} />
          <IonLabel>STAGE A</IonLabel>
        </IonTabButton>
        <IonTabButton tab='stage-b' href='/app/list/stage-b'>
          <IonIcon icon={StageB} />
          <IonLabel>STAGE B</IonLabel>
        </IonTabButton>
      </IonTabBar>

      <IonRouterOutlet>
        <Route path='/app/list/stage-a' component={TabA} />
        <Route path='/app/list/stage-b' component={TabB} />
        <Route exact path={'/app/list'}>
          <Redirect to='/app/list/stage-a' />
        </Route>
      </IonRouterOutlet>
    </IonTabs>
  );
};

export default ListPage;
