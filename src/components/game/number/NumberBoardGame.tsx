import React, { useEffect, useState } from 'react';

import { Link, useRouteMatch } from 'react-router-dom';

import Refresh from '../../../assets/images/refresh.png';
import Nope from '../../../assets/sounds/nope.mp3';
import Ok from '../../../assets/sounds/ok.mp3';
import { useAudioPlayer } from '../../../shared/hooks/audio/useAudioPlayer';
import { Number } from '../../../shared/types';
import RefreshButton from '../../common/RefreshButton';
import DraggableNumberSound from './DraggableNumberSound';
import NumberCard from './NumberCard';

interface NumberGameProps {
  numbers: Number[];
}

const NumberBoardGame: React.FC<NumberGameProps> = ({ numbers }) => {
  const [numbersCards, setNumbersCards] = useState<Number[] | []>([]);
  const [droppedSounds, setDroppedSounds] = useState<{ [key: string]: Number }>(
    {}
  );
  const [soundsButtons, setSoundsButtons] = useState<Number[] | []>([]);
  const [isActiveRefresh, setIsActiveRefresh] = useState<boolean>(false);
  const [flashingCards, setFlashingCards] = useState<string[]>([]); // Track flashing cards

  const { playAudio } = useAudioPlayer(true);
  const match = useRouteMatch();

  //this function start new Game
  function generateCards() {
    setIsActiveRefresh(true);
    resetGame();
    const randomOrderCards = [...numbers].sort(() => Math.random() - 0.5);
    const randomOrderSounds = [...numbers].sort(() => Math.random() - 0.5);

    setNumbersCards(randomOrderCards);
    setSoundsButtons(randomOrderSounds);
    const timeoutId = setTimeout(() => setIsActiveRefresh(false), 1000);

    return () => {
      clearTimeout(timeoutId); // Clear timeout on unmount or next call
    };
  }

  useEffect(() => {
    generateCards();
  }, [numbers]);

  const resetGame = () => {
    setNumbersCards([]);
    setSoundsButtons([]);
    setDroppedSounds({});
  };

  const handleDrop = (item: Number, correctNumber: string) => {
    if (item.number === correctNumber) {
      // Add a number to flashingCards
      setFlashingCards((prevFlashingCards) => [
        ...prevFlashingCards,
        item.number,
      ]);
      const timeoutId = setTimeout(() => {
        setDroppedSounds((prevSound) => ({
          ...prevSound,
          [correctNumber]: item,
        }));

        // Clear the list of sounds
        setSoundsButtons((prevSounds) =>
          prevSounds.filter((sound) => sound.number !== correctNumber)
        );

        // Remove the card from the flash list
        setFlashingCards((prevFlashingCards) =>
          prevFlashingCards.filter((num) => num !== item.number)
        );

        playAudio(Ok);
      }, 500);

      // Return the function to clear the timeout during disassembly
      return () => {
        clearTimeout(timeoutId);
      };
    } else {
      playAudio(Nope); // Play the sound when the drop is incorrect
    }
  };

  return (
    <>
      <section className='my-12 flex w-full flex-1 items-center justify-center'>
        {' '}
        <div className='flex flex-wrap items-center justify-center gap-12'>
          {soundsButtons.map((item: Number) => (
            <DraggableNumberSound
              key={item.sound}
              item={item}
              isFlashing={flashingCards.includes(item.number)}
            />
          ))}
        </div>
      </section>
      <section className='mb-12 flex w-full flex-1 items-center justify-center'>
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
      <section className='flex w-full flex-1 items-center justify-center'>
        <RefreshButton
          onClick={generateCards}
          buttonType='circle'
          isActive={isActiveRefresh}
          imgSrc={Refresh}
        />
      </section>
      {soundsButtons.length < 1 && (
        <Link
          to={`${match.url}/2nd-level`}
          className='butt special-font custom mb-12 text-center tracking-wide text-white'
        >
          <span className='layer l1'>
            <span className='layer l5'>
              Next <br /> Game
            </span>
          </span>
          <span className='layer l2'></span>
          <span className='layer l3'></span>
          <span className='layer l4'></span>
          <span className='layer l6'></span>
        </Link>
      )}
    </>
  );
};

export default NumberBoardGame;
