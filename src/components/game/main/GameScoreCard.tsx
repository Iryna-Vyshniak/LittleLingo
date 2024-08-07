import React from 'react';

import { ScoreCardProps } from '../../../shared/types';

const GameScoreCard: React.FC<ScoreCardProps> = ({ medal, title, value }) => {
  return (
    <div className='flex items-center justify-center gap-2'>
      <img src={medal} className='score' alt={`${title} icon`} width={44} height={44} />

      <p className='text-white special-font tracking-widest custom drop-shadow-[1px_2px_2px_rgba(15,41,1,1)]'>
        {' '}
        {title}:{' '}
        <span className='text-white special-font tracking-wide drop-shadow-[1px_2px_2px_rgba(15,41,1,1)]'>
          {value}
        </span>
      </p>
    </div>
  );
};

export default GameScoreCard;
