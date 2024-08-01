import React from 'react';

import { GameInfoProps } from '../../shared/types';

import GameScoreCard from './GameScoreCard';

import Medal from '../../assets/images/live-potion.png';
import Timer from '../../assets/images/timer.png';

const GameInfo: React.FC<GameInfoProps> = ({ score, timer }) => {
  return (
    <div className='flex items-center justify-center gap-4'>
      <GameScoreCard medal={Medal} title='Score' value={score} />
      {timer && <GameScoreCard medal={Timer} title='Timer' value={timer} />}
    </div>
  );
};

export default GameInfo;
