import React from 'react';

import { IonCard, IonCardContent, IonImg } from '@ionic/react';
import { useDrag } from 'react-dnd';

import { CardType } from '../../../shared/constants';
import { ColorStoneGameProps } from '../../../shared/types';
import '../main/GameBoard.css';

const ColorCardGame: React.FC<ColorStoneGameProps> = ({ stone }) => {
  const cardSizePercentage = `clamp(4rem, 8vw, 10vw)`;

  const style = {
    position: 'absolute',
    top: `${stone.position.bottom}%`,
    left: `${stone.position.left}%`,
    width: `${cardSizePercentage}`,
  };

  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: CardType.COLOR,
      item: () => {
        // Add audio when dragging starts
        const audio = new Audio(stone.sound);
        audio.play();
        return { id: stone.id, name: stone.name, sound: stone.sound };
      },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [stone]
  );

  return (
    <IonCard
      ref={dragRef}
      className='m-0 flex items-center justify-center'
      style={{
        ...style,
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: 'transparent',
        width: `${cardSizePercentage}`,
        height: `${cardSizePercentage}`,
        cursor: 'grab',
      }}
    >
      <IonCardContent className='flex h-full w-full items-center justify-center object-contain'>
        <IonImg src={stone.img} alt={`${stone.name} stone`} className='face' />
      </IonCardContent>
    </IonCard>
  );
};

export default ColorCardGame;
