import { IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import React from 'react';
import { Route, Redirect } from 'react-router';

import TabA from './TabA';
import TabB from './TabB';

import StageA from '../assets/images/books/holy-book.png';
import StageB from '../assets/images/books/light-book.png';
import AbcTrainPage from './AbcTrainPage';

const ListPage: React.FC = () => {
  return (
    <IonPage>
      <IonTabs>
        <IonRouterOutlet>
          <Route path='/app/list/stagea' exact component={TabA} />
          <Route path='/app/list/stagea/abc-train' exact component={AbcTrainPage} />
          <Route path='/app/list/stageb' exact component={TabB} />
          <Route path='/app/list/stageb/abc-train' exact component={AbcTrainPage} />
          <Redirect from='/app/list' to='/app/list/stagea' exact />
        </IonRouterOutlet>

        <IonTabBar slot='bottom' color='secondary' mode='md'>
          <IonTabButton tab='stagea' href='/app/list/stagea'>
            <img src={StageA} alt='book stage' className='w-12 h-16' />
          </IonTabButton>
          <IonTabButton tab='stageb' href='/app/list/stageb'>
            <img src={StageB} alt='book stage' className='w-12 h-16' />
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonPage>
  );
};

export default ListPage;
