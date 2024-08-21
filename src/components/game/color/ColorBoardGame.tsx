import React, { useEffect, useState } from 'react';

import { useDrop } from 'react-dnd';

import TreasureChest from '../../../assets/images/colors/open-chest.png';
import FullTreasureChest from '../../../assets/images/colors/treasure-chest.png';
import Refresh from '../../../assets/images/refresh.webp';
import {
  CardType,
  FAILURE_COLOR_SCORE,
  INITIAL_COLOR_SCORE,
  SUCCESS_COLOR_SCORE,
} from '../../../shared/constants';
import { stonesData } from '../../../shared/data';
import { ColorStone } from '../../../shared/types';
import { calculateColorCounts, getRandomPosition } from '../../../shared/utils';
import RefreshButton from '../../common/RefreshButton';
import GameBoardModal from '../main/GameBoardModal';
import GameWinScore from '../main/GameWinScore';
import ColorCardGame from './ColorCardGame';

const ColorBoardGame: React.FC = () => {
  const [stones, setStones] = useState<ColorStone[] | []>([]);
  const [score, setScore] = useState<number>(INITIAL_COLOR_SCORE);
  const [, setTreasureChest] = useState<ColorStone[]>([]);

  const [colorCount, setColorCount] = useState<Record<string, number>>({});
  const [, setCollectedColors] = useState<Record<string, number>>({});

  const [showModal, setShowModal] = useState<boolean>(false);
  const [isActiveRefresh, setIsActiveRefresh] = useState<boolean>(false);

  useEffect(() => {
    generateStones();
  }, []);

  useEffect(() => {
    if (score === SUCCESS_COLOR_SCORE) {
      setShowModal(true);
    }
  }, [score]);

  //this function start new Game
  function generateStones() {
    setIsActiveRefresh(true);

    const randomOrderStones = stonesData
      .sort(() => Math.random() - 0.5)
      .map((card) => ({
        ...card,
        position: {
          bottom: getRandomPosition(90),
          left: getRandomPosition(90),
        },
      }));

    setStones(randomOrderStones);

    const initialColorCount = calculateColorCounts(randomOrderStones);
    setScore(INITIAL_COLOR_SCORE);
    setColorCount(initialColorCount);
    setCollectedColors({}); // Clear the collected colors
    setTimeout(() => setIsActiveRefresh(false), 1000);
  }

  const [, dropRef] = useDrop({
    accept: CardType.COLOR,
    drop: (item: ColorStone) => {
      // Add a stone to the chest
      setTreasureChest((chest) => [...chest, item]);

      // Update the collected stones of a certain color
      setCollectedColors((prevColors) => {
        const newCount = {
          ...prevColors,
          [item.name]: (prevColors[item.name] || 0) + 1,
        };

        // If all stones of the same color are collected, we increase the score
        if (newCount[item.name] === colorCount[item.name]) {
          setScore((prevScore) => prevScore + 1);
        }

        return newCount;
      });

      // Remove the stone from the main array
      setStones((prevStones) =>
        prevStones.filter((stone) => stone.id !== item.id)
      );
    },
    collect: (monitor) => ({ isOver: monitor.isOver() }),
  });

  return (
    <>
      <section className='color-game-section w-full'>
        <GameWinScore
          score={score}
          success={SUCCESS_COLOR_SCORE}
          main={false}
        />
      </section>

      <section className='color-game-section min-h-1/2 relative h-1/2 w-full flex-grow p-2 md:h-[60%] md:min-h-[60%]'>
        {stones.map((stone) => {
          return <ColorCardGame key={stone.id} draggable stone={stone} />;
        })}
      </section>

      <section className='color-game-section'>
        <RefreshButton
          onClick={generateStones}
          text='Start'
          buttonType='primary'
          isActive={isActiveRefresh}
          imgSrc={Refresh}
        />
      </section>

      <div
        className='z-24 absolute bottom-[8%] right-[6%] h-auto w-28 md:bottom-[6%] md:w-44'
        ref={dropRef}
      >
        {stones.length === 0 ? (
          <img
            src={FullTreasureChest}
            alt='full treasure chest'
            className='h-auto w-full'
          />
        ) : (
          <img
            src={TreasureChest}
            alt='treasure chest'
            className='h-auto w-full'
          />
        )}
      </div>

      {showModal && (
        <GameBoardModal
          score={score}
          success={SUCCESS_COLOR_SCORE}
          failure={FAILURE_COLOR_SCORE}
          main={false}
          handleRefreshGame={generateStones}
          isOpen={showModal}
          onDidDismiss={() => setShowModal(false)}
          isActive={isActiveRefresh}
        />
      )}
    </>
  );
};

export default ColorBoardGame;
