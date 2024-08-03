import React from 'react';

import LivePotion from '../../../assets/images/live-potion.png';
import FirePotion from '../../../assets/images/fire-potion.png';

const GameWinScore: React.FC<{ score: number | string; success: number }> = ({
  score,
  success,
}) => {
  return (
    <ul className='flex items-center justify-center gap-1 mb-4'>
      {Array.from({ length: success }, (_, idx) => (
        <li key={idx}>
          <img
            src={idx < Number(score) ? LivePotion : FirePotion}
            alt={idx < Number(score) ? 'success green potion' : 'red potion'}
            width={44}
            height={44}
          />
        </li>
      ))}
    </ul>
  );
};

export default GameWinScore;
