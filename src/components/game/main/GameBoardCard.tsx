import { IonCard, IonCardContent, IonImg } from '@ionic/react';
import React from 'react';

import { GameBoardCardProps } from '../../../shared/types';

const GameBoardCard: React.FC<GameBoardCardProps> = ({
  card,
  handleCard,
  getRandomRadius,
  stopFlip,
  flipped,
}) => {
  return (
    <IonCard
      key={card.id}
      className='color-card w-full h-full m-0 aspect-square'
      style={{ borderRadius: getRandomRadius() }}
    >
      <IonCardContent className={flipped ? 'flip' : ''}>
        <IonImg src={card.img} alt={`${card.name} bottle`} className='face' />
        <div className='back' onClick={() => !stopFlip && handleCard(card)}></div>
      </IonCardContent>
    </IonCard>
  );
};

export default GameBoardCard;
