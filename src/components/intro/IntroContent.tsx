import { IonButton } from '@ionic/react';
import React from 'react';

import IntroTitle from './IntroTitle';

const IntroContent: React.FC<{
  index: number;
  intro: { id: string; img: string; desc: string; subdesc?: string };
  introImages: { id: string; img: string; desc: string; subdesc?: string }[];
  goToHomePage: () => void;
}> = ({ index, intro, introImages, goToHomePage }) => {
  return (
    <div>
      {' '}
      <div className='flex flex-col items-center justify-center gap-4 p-4 rounded-md gradient-overlay'>
        <IntroTitle title={intro.desc} subtitle={intro.subdesc} />
        {index === introImages.length - 1 && (
          <IonButton onClick={goToHomePage} className='btn-gradient text-white'>
            Let`s GO!
          </IonButton>
        )}
      </div>
    </div>
  );
};

export default IntroContent;
