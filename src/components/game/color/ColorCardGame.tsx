import React, { useEffect, useState } from 'react';

import { IonCard, IonCardContent, IonImg } from '@ionic/react';
import { useDrag } from 'react-dnd';

import BrokenGem from '../../../assets/sounds/broken-gem.mp3';
import { CardType } from '../../../shared/constants';
import { useAudioPlayer } from '../../../shared/hooks/audio/useAudioPlayer';
import { GemProps } from '../../../shared/types';
import '../main/GameBoard.css';

const ColorCardGame: React.FC<GemProps> = ({
  stone,
  onMiss,
  containerHeight,
  timeLeft,
}) => {
  const { playAudio } = useAudioPlayer(true);

  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: CardType.COLOR,
      item: { id: stone.id },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [stone]
  );

  const [topPosition, setTopPosition] = useState(stone.position.y);
  const [leftPosition] = useState(stone.position.x);

  useEffect(() => {
    if (timeLeft > 0) {
      const fallInterval = setInterval(() => {
        setTopPosition((prev) => {
          return containerHeight > 980 ? prev + 5 : prev + 2;
        });
      }, stone.speed / 100);

      if (topPosition > containerHeight - 50) {
        playAudio(BrokenGem);
        onMiss(stone.id);
        setTopPosition(-(Math.random() * 500 + 100));
      }

      return () => clearInterval(fallInterval);
    } else {
      setTopPosition(containerHeight - 50);
      playAudio(BrokenGem);
    }
  }, [topPosition, containerHeight, timeLeft]);

  return (
    <IonCard
      ref={dragRef}
      className='m-0 flex items-center justify-center'
      style={{
        top: topPosition,
        left: leftPosition,
        position: 'absolute',
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: 'transparent',
        cursor: 'grab',
      }}
    >
      <IonCardContent className='flex h-20 w-20 items-center justify-center object-contain'>
        <IonImg src={stone.img} alt={`${stone.name} stone`} className='face' />
      </IonCardContent>
    </IonCard>
  );
};

export default ColorCardGame;
