import { IonButton, IonIcon } from '@ionic/react';
import { useSwiper } from 'swiper/react';

import IntroIcon from '../../assets/icons/intro.svg';

export default function SlideNextButton({ children }: any) {
  const swiper = useSwiper();
  return (
    <IonButton
      onClick={() => swiper.slideNext()}
      className='rounded-md shadow-md shadow-green-800 btn-gradient text-white'
    >
      <IonIcon slot='start' icon={IntroIcon} className='drop-shadow-md' />
      {children}
    </IonButton>
  );
}
