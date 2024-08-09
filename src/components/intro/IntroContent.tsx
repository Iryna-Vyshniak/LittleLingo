import { IonButton } from '@ionic/react';
import React from 'react';

import Title from '../common/Title';
import RefreshButton from '../common/RefreshButton';

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
        <RefreshButton onClick={goToHomePage} text='Let`s go!' buttonType='primary' />
      )}
    </div>
  );
};

export default IntroContent;
