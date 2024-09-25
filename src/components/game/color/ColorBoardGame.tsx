import React, { useEffect, useRef, useState } from 'react';

import { useIonViewWillEnter } from '@ionic/react';
import { Link, useRouteMatch } from 'react-router-dom';

import {
  FAILURE_COLOR_SCORE,
  INITIAL_COLOR_TIMER,
  SUCCESS_COLOR_SCORE,
} from '../../../shared/constants';
import { stonesData } from '../../../shared/data';
import { useAudioPlayer } from '../../../shared/hooks/audio/useAudioPlayer';
import { ColorStone } from '../../../shared/types';
import { initializeStones } from '../../../shared/utils';
import CircleAnimation from '../../common/CircleAnimation';
import CustomButton from '../../common/CustomButton';
import Title from '../../common/Title';
import GameBoardModal from '../main/GameBoardModal';
import ColorCardGame from './ColorCardGame';
import TreasureChest from './TreasureChest';

const ColorBoardGame: React.FC = () => {
  const [stones, setStones] = useState<ColorStone[]>([]);
  const [caughtGems, setCaughtGems] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(INITIAL_COLOR_TIMER);
  const [, setTimerStopped] = useState<boolean>(false);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const { playAudio } = useAudioPlayer();
  const match = useRouteMatch();

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  useIonViewWillEnter(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
      setContainerHeight(containerRef.current.offsetHeight);
    }
  });

  const startGame = () => {
    setGameStarted(true);
    setShowModal(false);
    if (containerWidth > 0) {
      const initializedStones = initializeStones(stonesData, containerWidth);
      setStones(initializedStones);
    }
    // set timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 0) return prev - 1;
        else {
          //  if timer stop - lose game - render modal
          setShowModal(true);
          setTimerStopped(true);
          clearInterval(timer);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  };

  // if handle miss stone - stone falls once more
  const handleMiss = (id: string) => {
    const stoneSize = 80;

    setStones((prev) =>
      prev.map((gem) =>
        gem.id === id
          ? {
              ...gem,
              position: {
                x: Math.random() * (containerWidth - stoneSize),
                y: -(Math.random() * 500 + 100),
              },
              speed: Math.random() * 8000 + 6000,
            }
          : gem
      )
    );
  };

  const handleDrop = (id: string) => {
    const caughtGem = stones.find((gem) => gem.id === id);
    if (caughtGem) {
      playAudio(caughtGem.sound);
      setStones((prev) => prev.filter((gem) => gem.id !== id));
      setCaughtGems((prev) => [...prev, id]);
    }
  };

  const resetGame = () => {
    setShowModal(false);
    setGameStarted(false);
    setStones([]);
    setCaughtGems([]);
    setTimeLeft(INITIAL_COLOR_TIMER);
    setTimerStopped(true);
  };

  const restartGame = () => {
    setCaughtGems([]);
    setTimeLeft(INITIAL_COLOR_TIMER);
    setTimerStopped(false);
    startGame();
  };

  // If all stones are caught, stop the timer and reset the time
  useEffect(() => {
    if (stones.length === 0 && timeLeft > 0 && gameStarted) {
      setTimerStopped(true);
      setTimeLeft(0);
    }
  }, [stones.length, timeLeft, gameStarted]);

  const allGemsCaught = caughtGems.length === SUCCESS_COLOR_SCORE;

  return (
    <section
      className='relative h-full w-full overflow-hidden'
      ref={containerRef}
    >
      {!stones.length && !allGemsCaught && !gameStarted && (
        <CustomButton
          onClick={startGame}
          label='Start Game'
          size='small'
          variant='primary'
        />
      )}

      {stones.length > 0 && gameStarted && (
        <>
          <Title
            title={`Time left: ${timeLeft}s`}
            styleType='card-title'
            fontSize='text-2xl'
          />{' '}
          {stones.map((gem) =>
            !caughtGems.includes(gem.id) ? (
              <ColorCardGame
                key={gem.id}
                stone={gem}
                onMiss={handleMiss}
                containerHeight={containerHeight}
                timeLeft={timeLeft}
              />
            ) : null
          )}
        </>
      )}

      <TreasureChest onDrop={handleDrop} stones={stones} />
      {allGemsCaught && gameStarted ? (
        <div className='flex items-center justify-center gap-4'>
          {' '}
          <CustomButton
            onClick={restartGame}
            label='Restart Game'
            size='small'
            variant='secondary'
          />
          <Link
            to={`${match.url}/2nd-level`}
            className='special-font custom butt-small text-center tracking-wide text-white'
          >
            <span className='layer-small l1-small'>
              <span className='l5-small'>
                Next <br /> Game
              </span>
            </span>
            <span className='layer-small l2-small'></span>
            <span className='layer-small l3-small'></span>
            <span className='layer-small l4-small'></span>
            <span className='layer-small l6-small'></span>
          </Link>
        </div>
      ) : (
        showModal && (
          <GameBoardModal
            score={caughtGems.length}
            success={SUCCESS_COLOR_SCORE}
            failure={FAILURE_COLOR_SCORE}
            handleRefreshGame={resetGame}
            isOpen={showModal}
            onDidDismiss={() => setShowModal(false)}
            isActive={true}
          />
        )
      )}
      <CircleAnimation />
    </section>
  );
};

export default ColorBoardGame;
