import { IonButton, IonContent, IonList, useIonViewWillEnter } from '@ionic/react';
import React, { useEffect, useState } from 'react';

import './GameBoard.css';

import { colorsData } from '../../../shared/data';
import { ColorCard } from '../../../shared/types';
import {
  INITIAL_SCORE,
  INITIAL_TIMER,
  RADIUS,
  SUCCESS_SCORE,
  FAILURE_SCORE,
} from '../../../shared/constants';

import GameBoardCard from './GameBoardCard';
import GameInfo from './GameInfo';
import GameWinScore from './GameWinScore';
import GameBoardModal from './GameBoardModal';

const GameBoard: React.FC = () => {
  const [cardsArray, setCardsArray] = useState<ColorCard[] | []>([]);
  const [firstCard, setFirstCard] = useState<ColorCard | null>(null);
  const [secondCard, setSecondCard] = useState<ColorCard | null>(null);

  const [timer, setTimer] = useState<number>(INITIAL_TIMER);
  const [score, setScore] = useState<number>(INITIAL_SCORE);

  const [stopFlip, setStopFlip] = useState<boolean>(false);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  useIonViewWillEnter(() => {
    generateCards();
  });

  // set timer for game
  useEffect(() => {
    let intervalId = null;

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
    const randomOrderArray = [...colorsData].sort(() => Math.random() - 0.5);
    setCardsArray(randomOrderArray);
    setFirstCard(null);
    setSecondCard(null);
    setTimer(INITIAL_TIMER);
    setScore(INITIAL_SCORE);
    setGameStarted(false);
  }

  //this function helps in storing the firstCard and secondCard value
  function handleSelectedCards(item: ColorCard) {
    if (!gameStarted) {
      setGameStarted(true);
    }
    const audio = new Audio(item.sound);
    audio.play();
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
        resetGame();
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
  }, [firstCard, secondCard]);

  return (
    <IonContent className='ion-padding grid grid-rows-3 grid-flow-row auto-rows-max mx-auto my-0'>
      <div className='row-span-1'>
        <GameWinScore score={score} success={SUCCESS_SCORE}/>
        <GameInfo score={score} timer={timer.toString()} />
      </div>
      <div className='row-span-1'>
        <IonList className='grid grid-cols-5 grid-rows-4 gap-4 p-4 w-full max-w-[800px] mx-auto my-0'>
          {cardsArray.map((card) => (
            <GameBoardCard
              key={card.id}
              card={card}
              handleCard={handleSelectedCards}
              getRandomRadius={getRandomRadius}
              flipped={card === firstCard || card === secondCard || card.matched === true}
              stopFlip={stopFlip}
            />
          ))}
        </IonList>
      </div>
      <div className='row-span-1'>
        <IonButton className='mt-4 max-w-[120px] h-11 mx-auto' onClick={generateCards}>
          New Game
        </IonButton>
      </div>
      {showModal && (
        <GameBoardModal
          score={score}
          success={SUCCESS_SCORE}
          failure={FAILURE_SCORE}
          handleRefreshGame={generateCards}
          isOpen={showModal}
          onDidDismiss={() => setShowModal(false)}
        />
      )}{' '}
    </IonContent>
  );
};

export default GameBoard;
