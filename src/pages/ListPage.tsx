import {
  IonFab,
  IonFabButton,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  useIonViewWillEnter,
} from '@ionic/react';
import React from 'react';
import { Route, Redirect, useRouteMatch } from 'react-router';

import TabA from './TabA';
import TabB from './TabB';
import TabC from './TabC';
import AbcTrainPage from './AbcTrainPage';
import ColorStageBPage from './ColorStageBPage';

import StageA from '../assets/images/books/holy-book.png';
import StageB from '../assets/images/books/light-book.png';
import WoodenTab from '../assets/images/wooden-frame.png';

import { useUIContext } from '../shared/context/tab-context';

import Fab from '../assets/images/dragon-game.png';
import LetterStageBPage from './LetterStageBPage';

const ListPage: React.FC = () => {
  const { showTabs, setShowTabs } = useUIContext();
  const match = useRouteMatch();

  useIonViewWillEnter(() => {
    setShowTabs(true);
  });

  let tabBarStyle = showTabs ? { display: 'flex' } : { display: 'none' };

  return (
    <>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path={`${match.url}/stagea`} component={TabA} />
          <Route exact path='/app/list/stagea/abc-train'>
            <AbcTrainPage />
          </Route>
          <Route exact path={`${match.url}/stageb`} component={TabB} />
          <Route exact path='/app/list/stageb/abc-game'>
            <LetterStageBPage />
          </Route>
          <Route exact path={`${match.url}/stagec`} component={TabC} />
          <Route exact path='/app/list/stageb/color-game'>
            <ColorStageBPage />
          </Route>
          <Route exact path={'/app/list'}>
            <Redirect to='/app/list/stagea' />
          </Route>
        </IonRouterOutlet>

        <IonTabBar slot='bottom' mode='md' style={tabBarStyle} color='primary'>
          <IonTabButton
            tab='stagea'
            href='/app/list/stagea'
            className='stagea relative flex items-center justify-center'
          >
            <img
              src={WoodenTab}
              alt='wooden board'
              width={96}
              height={44}
              className='absolute w-24 h-11'
            />
            <img
              src={StageA}
              alt='Stage A'
              width={44}
              height={44}
              className='absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2'
            />
          </IonTabButton>

          <IonTabButton tab='stagec' href='/app/list/stagec'></IonTabButton>

          <IonTabButton
            tab='stageb'
            href='/app/list/stageb'
            className='stagea relative flex items-center justify-center'
          >
            <img
              src={WoodenTab}
              alt='wooden board'
              width={96}
              height={44}
              className='absolute w-24 h-11'
            />
            <img
              src={StageB}
              alt='Stage B'
              width={44}
              height={44}
              className='absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2'
            />
          </IonTabButton>
        </IonTabBar>
      </IonTabs>

      {showTabs && (
        <div className='custom-fab'>
          <IonFab slot='fixed' vertical='bottom' horizontal='center' edge>
            <IonFabButton routerDirection='root' routerLink='/app/list/stagec'>
              <img src={Fab} alt='Baby Dragon' width={44} height={44} />
            </IonFabButton>
          </IonFab>
        </div>
      )}
    </>
  );
};

export default ListPage;
