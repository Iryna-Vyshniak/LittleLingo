import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/ionic-swiper.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
import '@ionic/react/css/palettes/dark.class.css';
import '@ionic/react/css/palettes/dark.system.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/typography.css';
import { Route } from 'react-router-dom';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/effect-cards';
import 'swiper/css/effect-cube';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/virtual';

import Intro from './components/intro/Intro';
import HomePage from './pages/HomePage';
import './theme/Activity.css';
import './theme/Animal.css';
import './theme/Circle.css';
import './theme/Flash.css';
import './theme/global.css';
import './theme/ItemCube.css';
import './theme/ItemNumber.css';
import './theme/Loader.css';
import './theme/Rules.css';
import './theme/ShuffleGrid.css';

/* Tailwind styles */
import './theme/tailwind.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact({ mode: 'ios' });

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path='/' component={Intro} />
        <Route path='/app' component={HomePage} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
