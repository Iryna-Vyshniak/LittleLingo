import { IonCard, IonCardContent, IonImg } from '@ionic/react';
import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

import '../main/GameBoard.css';

import { ColorCardGameProps } from '../../../shared/types';

const ColorCardGame: React.FC<ColorCardGameProps> = ({ card, onDrop }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'CARD',
    item: { id: card.id, name: card.name, sound: card.sound },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop({
    accept: 'CARD',
    drop: (item: { id: string; name: string; sound: string }) => onDrop(item, card),
  });

  return (
    <IonCard
      className='color-card color-game-card flex items-center justify-center m-0'
      ref={(node) => drag(drop(node))}
      style={{
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: '#000000',
        width: '100%',
        height: '100%',
        cursor: 'grab',
      }}
    >
      <IonCardContent className='flex items-center justify-center object-contain w-full h-full'>
        <IonImg src={card.img} alt={`${card.name} bottle`} className='face' />
      </IonCardContent>
    </IonCard>
  );
};

export default ColorCardGame;
