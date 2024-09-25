import React from 'react';

import {
  IonFab,
  IonFabButton,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  useIonViewWillEnter,
} from '@ionic/react';
import { Redirect, Route, useRouteMatch } from 'react-router';

import StageA from '../assets/images/books/holy-book.png';
import StageB from '../assets/images/books/light-book.png';
import WoodenTab from '../assets/images/common/wooden-frame.png';
import Fab from '../assets/images/dragon-game.png';
import { useUIContext } from '../shared/context/tab-context';
import AbcStageBPage from './AbcStageBPage';
import AbcTrainPage from './AbcTrainPage';
import AnimalStageBPage from './AnimalStageBPage';
import AnimalsTrainPage from './AnimalsTrainPage';
import ColorStageBPage from './ColorStageBPage';
import ColorsTrainPage from './ColorsTrainPage';
import NumberStageBPage from './NumberStageBPage';
import NumbersTrainPage from './NumbersTrainPage';
import AbcSecondLevelPage from './second.level/AbcSecondLevelPage';
import AnimalSecondLevelPage from './second.level/AnimalSecondLevelPage';
import ColorSecondLevelPage from './second.level/ColorSecondLevelPage';
import NumSecondLevelPage from './second.level/NumSecondLevelPage';
import TabA from './TabA';
import TabB from './TabB';
import TabC from './TabC';

const ListPage: React.FC = () => {
  const { showTabs, setShowTabs } = useUIContext();
  const match = useRouteMatch();

  useIonViewWillEnter(() => {
    setShowTabs(true);
  });

  const tabBarStyle = showTabs ? { display: 'flex' } : { display: 'none' };

  return (
    <>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path={`${match.url}/stagea`} component={TabA} />
          <Route exact path='/app/list/stagea/abc-train'>
            <AbcTrainPage />
          </Route>
          <Route exact path='/app/list/stagea/colors-train'>
            <ColorsTrainPage />
          </Route>
          <Route exact path='/app/list/stagea/numbers-train'>
            <NumbersTrainPage />
          </Route>
          <Route exact path='/app/list/stagea/animals-train'>
            <AnimalsTrainPage />
          </Route>
          <Route exact path={`${match.url}/stageb`} component={TabB} />
          <Route exact path='/app/list/stageb/abc-game'>
            <AbcStageBPage />
          </Route>
          <Route exact path='/app/list/stageb/color-game'>
            <ColorStageBPage />
          </Route>
          <Route exact path='/app/list/stageb/number-game'>
            <NumberStageBPage />
          </Route>
          <Route exact path='/app/list/stageb/animal-game'>
            <AnimalStageBPage />
          </Route>
          <Route exact path='/app/list/stageb/abc-game/2nd-level'>
            <AbcSecondLevelPage />
          </Route>
          <Route exact path='/app/list/stageb/number-game/2nd-level'>
            <NumSecondLevelPage />
          </Route>
          <Route exact path='/app/list/stageb/animal-game/2nd-level'>
            <AnimalSecondLevelPage />
          </Route>
          <Route exact path='/app/list/stageb/color-game/2nd-level'>
            <ColorSecondLevelPage />
          </Route>
          <Route exact path={`${match.url}/stagec`} component={TabC} />
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
              className='absolute h-11 w-24'
            />
            <img
              src={StageA}
              alt='Stage A'
              width={44}
              height={44}
              className='absolute left-1/2 top-1/2 h-11 w-11 -translate-x-1/2 -translate-y-1/2 transform'
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
              className='absolute h-11 w-24'
            />
            <img
              src={StageB}
              alt='Stage B'
              width={44}
              height={44}
              className='absolute left-1/2 top-1/2 h-11 w-11 -translate-x-1/2 -translate-y-1/2 transform'
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
