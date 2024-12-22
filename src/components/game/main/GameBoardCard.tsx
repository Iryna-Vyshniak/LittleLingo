import React from 'react';

import { IonCard, IonCardContent, IonImg } from '@ionic/react';

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
      className='color-card ion-no-margin h-full w-full'
      style={{ borderRadius: getRandomRadius() }}
    >
      <IonCardContent
        className={flipped ? 'flip h-full w-full' : 'h-full w-full'}
      >
        <IonImg src={card.img} alt={`${card.name} bottle`} className='face' />
        <button
          className='back'
          onClick={() => !stopFlip && handleCard(card)}
        ></button>
      </IonCardContent>
    </IonCard>
  );
};

export default GameBoardCard;
