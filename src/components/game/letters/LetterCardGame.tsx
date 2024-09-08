import React from 'react';

import { IonCard, IonCardContent, IonImg } from '@ionic/react';
import { useDrag, useDrop } from 'react-dnd';

import { CardType } from '../../../shared/constants';
import { LetterCardGameProps } from '../../../shared/types';
import '../main/GameBoard.css';

const LetterCardGame: React.FC<LetterCardGameProps> = ({
  card,
  onDrop,
  isFlashing,
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: CardType.LETTER,
    item: { _id: card._id, label: card.label, sound: card.sound },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop({
    accept: CardType.LETTER,
    drop: (item: { _id: string; label: string; sound: string }) => {
      onDrop(item, card);
      return undefined;
    },
  });

  return (
    <IonCard
      className={
        !isFlashing
          ? `letter-card letter-game-card m-0 flex items-center justify-center`
          : 'flash active m-0 flex items-center justify-center'
      }
      ref={(node) => drag(drop(node))}
      style={{
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: 'transparent',
        width: '100%',
        height: '100%',
        cursor: 'grab',
      }}
    >
      {!isFlashing ? (
        <IonCardContent className='ion-no-padding flex h-full w-full items-center justify-center object-contain'>
          <IonImg
            src={card.image}
            alt={`${card.label} letter`}
            className='face'
          />
        </IonCardContent>
      ) : (
        <div className='explode explode-card'></div> // Show flash animation
      )}
    </IonCard>
  );
};

export default LetterCardGame;
