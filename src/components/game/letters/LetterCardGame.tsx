import { IonCard, IonCardContent, IonImg } from '@ionic/react';
import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

import '../main/GameBoard.css';

import { LetterCardGameProps } from '../../../shared/types';

const LetterCardGame: React.FC<LetterCardGameProps> = ({ card, onDrop }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'CARD',
    item: { _id: card._id, label: card.label, sound: card.sound },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop({
    accept: 'CARD',
    drop: (item: { _id: string; label: string; sound: string }) => onDrop(item, card),
  });

  return (
    <IonCard
      className='letter-card letter-game-card m-0 aspect-square flex items-center justify-center'
      ref={(node) => drag(drop(node))}
      style={{
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: '#000000',
        width: '100%',
        height: '100%',
        cursor: 'grab',
      }}
    >
      <IonCardContent className='flex items-center justify-center h-full w-full object-contain aspect-square'>
        <IonImg src={card.image} alt={`${card.label} letter`} className='face letter-face' />
      </IonCardContent>
    </IonCard>
  );
};

export default LetterCardGame;
