import React, { useEffect, useState } from 'react';

import {
  IonCol,
  IonContent,
  IonGrid,
  IonRow,
  useIonViewWillEnter,
} from '@ionic/react';

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
    setIsActiveRefresh(true);
    const randomOrderArray = [...colorsData].sort(() => Math.random() - 0.5);
    setCardsArray(randomOrderArray);
    setFirstCard(null);
    setSecondCard(null);
    setTimer(INITIAL_TIMER);
    setScore(INITIAL_SCORE);
    setGameStarted(false);
    setTimeout(() => setIsActiveRefresh(false), 1000);
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
    <IonContent
      scrollY={false}
      className='ion-padding mx-auto my-0 grid grid-flow-row auto-rows-max grid-rows-3 place-items-center'
    >
      <section className='row-span-1'>
        <GameWinScore score={score} success={SUCCESS_SCORE} main={true} />
        <GameInfo score={score} timer={timer.toString()} />
      </section>
      <section className='row-span-1'>
        <IonGrid>
          <IonRow className='mx-auto my-0 w-full max-w-[800px] p-4'>
            {cardsArray.map((card) => (
              <IonCol size='2.4' sizeMd='1.6' sizeLg='1.6' key={card.id}>
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
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </section>
      <section className='row-span-1 flex items-center justify-center'>
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
          main={true}
          handleRefreshGame={generateCards}
          isOpen={showModal}
          onDidDismiss={() => setShowModal(false)}
          isActive={isActiveRefresh}
        />
      )}{' '}
    </IonContent>
  );
};

export default GameBoard;
