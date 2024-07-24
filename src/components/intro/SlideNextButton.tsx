import { IonButton, IonIcon } from '@ionic/react';
import { useSwiper } from 'swiper/react';

import IntroIcon from '../../assets/icons/intro.svg';

export default function SlideNextButton({ children }: any) {
  const swiper = useSwiper();
  return (
    <div className='relative'>
      <IonIcon
        slot='start'
        icon={IntroIcon}
        size='large'
        className='absolute -top-4 -left-8 z-10 drop-shadow-md w-14 h-20'
      />
      <IonButton onClick={() => swiper.slideNext()} className='rounded-md btn-gradient text-white'>
        {children}
      </IonButton>
    </div>
  );
}
