import React, { useEffect, useState } from 'react';

import Refresh from '../../../assets/images/refresh.webp';
import Nope from '../../../assets/sounds/nope.mp3';
import Ok from '../../../assets/sounds/ok.mp3';
import { useAudioPlayer } from '../../../shared/hooks/audio/useAudioPlayer';
import { useStageANumbers } from '../../../shared/hooks/stage.a/useStageANumbers';
import { Number } from '../../../shared/types';
import RefreshButton from '../../common/RefreshButton';
import DraggableNumberSound from './DraggableNumberSound';
import NumberCard from './NumberCard';

const NumberBoardGame: React.FC = () => {
  const [numbersCards, setNumbersCards] = useState<Number[] | []>([]);
  const [droppedSounds, setDroppedSounds] = useState<{ [key: string]: Number }>(
    {}
  );
  const [soundsButtons, setSoundsButtons] = useState<Number[] | []>([]);
  const [isActiveRefresh, setIsActiveRefresh] = useState<boolean>(false);
  const { numbers } = useStageANumbers();
  const { playAudio } = useAudioPlayer(true);

  //this function start new Game
  function generateCards() {
    setIsActiveRefresh(true);
    const randomOrderCards = [...numbers].sort(() => Math.random() - 0.5);
    const randomOrderSounds = [...numbers].sort(() => Math.random() - 0.5);

    setNumbersCards(randomOrderCards);
    setSoundsButtons(randomOrderSounds);
    setTimeout(() => setIsActiveRefresh(false), 1000);
  }

  useEffect(() => {
    generateCards();
  }, [numbers]);

  const handleDrop = (item: Number, correctNumber: string) => {
    if (item.number === correctNumber) {
      setDroppedSounds((prevSound) => ({
        ...prevSound,
        [correctNumber]: item,
      }));
      setSoundsButtons((prevSounds) =>
        prevSounds.filter((sound) => sound.number !== correctNumber)
      );
      playAudio(Ok);
    } else {
      playAudio(Nope);
    }
  };

  return (
    <>
      <section className='mb-4 flex w-full flex-1 items-center justify-center'>
        <ul className='flex flex-wrap items-center justify-center gap-4'>
          {numbersCards.map((item: Number) => (
            <NumberCard
              key={item.number}
              item={item}
              droppedItem={droppedSounds[item.number]}
              onDrop={(droppedItem) => handleDrop(droppedItem, item.number)}
            />
          ))}
        </ul>
      </section>
      <section className='mb-4 flex w-full flex-1 items-center justify-center'>
        {' '}
        <ul className='flex flex-wrap items-center justify-center gap-2'>
          {soundsButtons.map((item: Number) => (
            <DraggableNumberSound key={item.sound} item={item} />
          ))}
        </ul>
      </section>

      <section className='flex w-full flex-1 items-center justify-center'>
        <RefreshButton
          onClick={generateCards}
          buttonType='circle'
          isActive={isActiveRefresh}
          imgSrc={Refresh}
        />
      </section>
    </>
  );
};

export default NumberBoardGame;
