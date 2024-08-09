import { IonButton } from '@ionic/react';
import React from 'react';

import Title from '../common/Title';

const IntroContent: React.FC<{
  index: number;
  intro: { id: string; img: string; desc: string; subdesc?: string };
  introImages: { id: string; img: string; desc: string; subdesc?: string }[];
  goToHomePage: () => void;
}> = ({ index, intro, introImages, goToHomePage }) => {
  return (
    <div className='flex flex-col items-center justify-center gap-4 p-4 rounded-md gradient-bottom-overlay'>
      <Title title={intro.desc} subtitle={intro.subdesc} styleType='intro' fontSize='text-4xl' />
      {index === introImages.length - 1 && (
        <IonButton
          onClick={goToHomePage}
          className='wooden-btn text-white special-font custom tracking-wide relative transform transition-transform duration-100 ease-in-out hover:translate-y-1 active:translate-y-1 focus:translate-y-1'
        >
          <p className='text-white drop-shadow-[2px_3px_2px_rgba(0,0,1,1)]'>Let`s go!</p>
        </IonButton>
      )}
    </div>
  );
};

export default IntroContent;
