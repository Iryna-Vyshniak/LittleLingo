import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import React from 'react';
import { Route, Redirect } from 'react-router';

import TabA from './TabA';
import TabB from './TabB';

import StageA from '../assets/icons/a-stage.svg';
import StageB from '../assets/icons/b-stage.svg';

const ListPage: React.FC = () => {
  return (
    <IonTabs className='bg-transparent w-full'>
      <IonTabBar slot='bottom' translucent={true} className='h-[15%] md:h-[8%]'>
        <IonTabButton tab='stage-a' href='/app/list/stage-a'>
          <IonIcon icon={StageA} size='large' className='w-12 h-16' />
          <IonLabel>
            <p className='text-bold'>STAGE A</p>
          </IonLabel>
        </IonTabButton>
        <IonTabButton tab='stage-b' href='/app/list/stage-b'>
          <IonIcon icon={StageB} size='large' className='w-12 h-16' />
          <IonLabel>
            <p className='text-bold'>STAGE B</p>
          </IonLabel>
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
