import React from 'react';

import RefreshButton from '../common/RefreshButton';
import Title from '../common/Title';

const IntroContent: React.FC<{
  index: number | string;
  intro: { id: string; img: string; desc: string; subdesc?: string };
  introImages: { id: string; img: string; desc: string; subdesc?: string }[];
  goToHomePage: () => void;
}> = ({ index, intro, introImages, goToHomePage }) => {
  return (
    <div className='rounded-md gradient-bottom-overlay flex flex-col items-center justify-center gap-4 p-4'>
      <Title
        title={intro.desc}
        subtitle={intro.subdesc}
        styleType='intro'
        fontSize='text-4xl'
      />
      {index === introImages.length - 1 && (
        <RefreshButton
          onClick={goToHomePage}
          text='Let`s go!'
          buttonType='primary'
        />
      )}
    </div>
  );
};

export default IntroContent;
