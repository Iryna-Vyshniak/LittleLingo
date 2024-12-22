import React, { useEffect, useState } from 'react';

import { IonCol, IonGrid, IonRow, useIonViewWillEnter } from '@ionic/react';
import { AnimatePresence, motion } from 'framer-motion';

import Refresh from '../../../assets/images/refresh.webp';
import {
  FAILURE_SCORE,
  INITIAL_SCORE,
  INITIAL_TIMER,
  RADIUS,
  SUCCESS_SCORE,
} from '../../../shared/constants';
import { colorsData } from '../../../shared/data';
import { useAudioPlayer } from '../../../shared/hooks/audio/useAudioPlayer';
import { ColorCard } from '../../../shared/types';
import { shuffleArray } from '../../../shared/utils';
import RefreshButton from '../../common/RefreshButton';
import './GameBoard.css';
import GameBoardCard from './GameBoardCard';
import GameBoardModal from './GameBoardModal';
import GameInfo from './GameInfo';
import GameWinScore from './GameWinScore';

const GameBoard: React.FC = () => {
  const [cardsArray, setCardsArray] = useState<ColorCard[] | []>([]);
  const [firstCard, setFirstCard] = useState<ColorCard | null>(null);
  const [secondCard, setSecondCard] = useState<ColorCard | null>(null);

  const [timer, setTimer] = useState<number>(INITIAL_TIMER);
  const [score, setScore] = useState<number>(INITIAL_SCORE);

  const [stopFlip, setStopFlip] = useState<boolean>(false);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isActiveRefresh, setIsActiveRefresh] = useState<boolean>(false);

  const { playAudio } = useAudioPlayer(true);

  useIonViewWillEnter(() => {
    generateCards();
  });

  const shuffleOrderCards = () => {
    const shuffledCards = shuffleArray(colorsData);
    setCardsArray([...shuffledCards]);
  };

  // set timer for game
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (gameStarted && timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      if (intervalId) {
        clearInterval(intervalId);
      }

      if (timer === 0) {
        setShowModal(true);
        resetGame();
      }
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [timer, gameStarted]);

  function resetGame() {
    setFirstCard(null);
    setSecondCard(null);
    setStopFlip(false);
  }

  //this function start new Game
  function generateCards() {
    setIsActiveRefresh(true);
    shuffleOrderCards();
    setFirstCard(null);
    setSecondCard(null);
    setGameStarted(false);
    setTimer(INITIAL_TIMER);
    setScore(INITIAL_SCORE);
    setTimeout(() => {
      setIsActiveRefresh(false);
    }, 1000);
  }

  //this function helps in storing the firstCard and secondCard value
  function handleSelectedCards(item: ColorCard) {
    if (!gameStarted) {
      setGameStarted(true);
    }
    playAudio(item.sound);
    if (firstCard !== null && firstCard.id !== item.id) {
      setSecondCard(item);
    } else {
      setFirstCard(item);
    }
  }

  // Function for choosing a random border-radius
  const getRandomRadius = () => {
    const randomIndex = Math.floor(Math.random() * RADIUS.length);
    return RADIUS[randomIndex];
  };

  useEffect(() => {
    if (!firstCard || !secondCard) return;

    let timeoutId: NodeJS.Timeout | null = null;

    if (firstCard && secondCard) {
      setStopFlip(true);
      if (firstCard.name === secondCard.name) {
        setCardsArray((prevCards) =>
          prevCards.map((card) =>
            card.name === firstCard.name ? { ...card, matched: true } : card
          )
        );
        setScore((prevScore) => prevScore + 1);
        // Check if all cards are matched
        const allMatched = cardsArray.every(
          (card) => card.matched || card.name === firstCard.name
        );
        if (allMatched) {
          // Stop the timer
          setGameStarted(false);
          setShowModal(true); // Show success modal
        } else {
          resetGame();
        }
      } else {
        timeoutId = setTimeout(() => {
          resetGame();
        }, 1500);
      }
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [firstCard, secondCard, cardsArray]);

  return (
    <div className='flex h-full w-full flex-col items-center justify-center'>
      <section className='flex flex-1 flex-col items-center justify-center'>
        <GameWinScore score={score} success={SUCCESS_SCORE} />
        <GameInfo score={score} timer={timer.toString()} />
      </section>
      <section className='flex h-full w-full flex-[2] flex-col items-center justify-center'>
        <IonGrid fixed={true} className='grid-shuffle'>
          <AnimatePresence>
            <IonRow className='ion-justify-content-center ion-align-items-center'>
              {' '}
              {cardsArray.map((card) => (
                <IonCol
                  size='2.4'
                  sizeXl='1.7'
                  key={card.id}
                  className='grid-item flex items-center justify-center'
                >
                  {' '}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{
                      scale: 1,
                      transition: { delay: 0.5, type: 'spring' },
                    }}
                    exit={{
                      opacity: 0,
                      transition: { delay: 0.5 },
                    }}
                    layout
                    className='h-full w-full'
                  >
                    {' '}
                    <GameBoardCard
                      card={card}
                      handleCard={handleSelectedCards}
                      getRandomRadius={getRandomRadius}
                      flipped={
                        card === firstCard ||
                        card === secondCard ||
                        card.matched === true
                      }
                      stopFlip={stopFlip}
                    />
                  </motion.div>
                </IonCol>
              ))}
            </IonRow>
          </AnimatePresence>
        </IonGrid>
      </section>
      <section className='mb-6 flex flex-1 items-center justify-center'>
        <RefreshButton
          onClick={generateCards}
          buttonType='circle'
          isActive={isActiveRefresh}
          imgSrc={Refresh}
        />
      </section>
      {showModal && (
        <GameBoardModal
          score={score}
          success={SUCCESS_SCORE}
          failure={FAILURE_SCORE}
          handleRefreshGame={generateCards}
          isOpen={showModal}
          onDidDismiss={() => setShowModal(false)}
          isActive={isActiveRefresh}
        />
      )}{' '}
    </div>
  );
};

export default GameBoard;
