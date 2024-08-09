import { IonCard, IonCardContent, IonImg } from '@ionic/react';
import React from 'react';
import { useDrag } from 'react-dnd';

import '../main/GameBoard.css';

import { ColorStoneGameProps } from '../../../shared/types';

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
      type: 'CARD',
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
      className='flex items-center justify-center m-0'
      style={{
        ...style,
        opacity: isDragging ? 0.5 : 1,
        width: `${cardSizePercentage}`,
        height: `${cardSizePercentage}`,
        cursor: 'grab',
      }}
    >
      <IonCardContent className='flex items-center justify-center object-contain w-full h-full'>
        <IonImg src={stone.img} alt={`${stone.name} stone`} className='face' />
      </IonCardContent>
    </IonCard>
  );
};

export default ColorCardGame;
