import React from 'react';

import { ScoreCardProps } from '../../shared/types';

const GameScoreCard: React.FC<ScoreCardProps> = ({ medal, title, value }) => {
  return (
    <div className='flex items-center justify-center gap-2'>
      <img src={medal} className='score' alt={`${title} icon`} width={44} height={44} />

      <p className='font-bold'>
        {' '}
        {title}: <span className='font-bold'>{value}</span>
      </p>
    </div>
  );
};

export default GameScoreCard;
