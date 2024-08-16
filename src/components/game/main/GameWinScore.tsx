import React from 'react';

import FirePotion from '../../../assets/images/fire-potion.png';
import LivePotion from '../../../assets/images/live-potion.png';

const GameWinScore: React.FC<{
  score: number | string;
  success: number;
  main: boolean;
}> = ({ score, success, main }) => {
  return (
    <ul className='mb-4 flex flex-wrap items-center justify-center gap-1'>
      {Array.from({ length: success }, (_, idx) => (
        <li key={idx}>
          <img
            src={idx < Number(score) ? LivePotion : FirePotion}
            alt={idx < Number(score) ? 'success green potion' : 'red potion'}
            width={main ? 36 : 24}
            height={main ? 36 : 24}
          />
        </li>
      ))}
    </ul>
  );
};

export default GameWinScore;
