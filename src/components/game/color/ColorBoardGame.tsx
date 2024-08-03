import { IonButton, IonCard, IonCardContent, IonImg, IonList } from '@ionic/react';
import React, { useEffect, useState } from 'react';

import Refresh from '../../../assets/images/refresh.webp';

import { colorsData } from '../../../shared/data';
import { ColorCard } from '../../../shared/types';
import {
  INITIAL_COLOR_TIMER,
  INITIAL_SCORE,
  SUCCESS_COLOR_SCORE,
  FAILURE_COLOR_SCORE,
} from '../../../shared/constants';

import ColorCardGame from './ColorCardGame';
import GameInfo from '../main/GameInfo';
import GameBoardModal from '../main/GameBoardModal';
import GameWinScore from '../main/GameWinScore';

const ColorBoardGame: React.FC = () => {
  const [cards, setCards] = useState<ColorCard[] | []>([]);
  const [matchedCards, setMatchedCards] = useState<ColorCard[]>([]);

  const [timer, setTimer] = useState<number>(INITIAL_COLOR_TIMER);
  const [score, setScore] = useState<number>(INITIAL_SCORE);

  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [hasTouched, setHasTouched] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    generateCards();
  }, []);

  // set timer for game
  useEffect(() => {
    let intervalId = null;

    if (gameStarted && hasTouched && timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    if (timer === 0 || score === SUCCESS_COLOR_SCORE) {
      console.log('Showing modal');
      setShowModal(true);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [timer, gameStarted, score, hasTouched]);

  //this function start new Game
  function generateCards() {
    const firstSet = colorsData.map((card) => ({ ...card, id: `first-${card.id}` }));
    const secondSet = colorsData.map((card) => ({ ...card, id: `second-${card.id}` }));
    const randomOrderArray = firstSet.concat(secondSet).sort(() => Math.random() - 0.5);

    setCards(randomOrderArray);
    setMatchedCards([]);
    setTimer(INITIAL_COLOR_TIMER);
    setScore(INITIAL_SCORE);
    setGameStarted(false);
  }

  const handleCardDrop = (
    droppedCard: { id: string; name: string; sound: string },
    targetCard: { id: string; name: string }
  ) => {
    if (!hasTouched) {
      setHasTouched(true);
    }
    if (!gameStarted) {
      setGameStarted(true);
    }

    const audio = new Audio(droppedCard.sound);
    audio.play();

    if (droppedCard.name === targetCard.name) {
      setCards((prevCards) =>
        prevCards.filter((card) => card.id !== droppedCard.id && card.id !== targetCard.id)
      );
      const fullDroppedCard = cards.find((card) => card.id === droppedCard.id);
      if (fullDroppedCard) {
        setMatchedCards((prev) => {
          const newMatchedCards = [...prev, fullDroppedCard];
          return newMatchedCards.filter(
            (card, index, arr) => index === arr.findIndex((c) => c.name === card.name)
          );
        });
      }
      setScore((prevScore) => prevScore + 1);
    }
  };

  return (
    <>
      <section className='row-span-1'>
        <GameWinScore score={score} success={SUCCESS_COLOR_SCORE} />
        <GameInfo score={score} timer={timer.toString()} />
      </section>
      <section className='row-span-1'>
        <IonList className='row-span-1 grid grid-cols-5 grid-rows-8 gap-2 p-2 w-full max-w-[800px] mx-auto my-0'>
          {cards.map((card) => (
            <ColorCardGame key={card.id} card={card} onDrop={handleCardDrop} />
          ))}
        </IonList>
      </section>
      <section className='row-span-1'>
        <IonButton className='mt-4 max-w-[120px] h-11 mx-auto' onClick={generateCards}>
          <img src={Refresh} alt='refresh' width={44} height={44} />
        </IonButton>
      </section>
      <section className='row-span-1'>
        {' '}
        <IonList className='flex items-center justify-start gap-2 p-2'>
          {matchedCards.map((card) => (
            <IonCard key={card.id} className='color-card color-matched-card w-12 h-12 m-0'>
              <IonCardContent className='flip'>
                <IonImg src={card.img} alt={`${card.name} bottle`} className='face' />
              </IonCardContent>
            </IonCard>
          ))}
        </IonList>
      </section>

      {showModal && (
        <GameBoardModal
          score={score}
          success={SUCCESS_COLOR_SCORE}
          failure={FAILURE_COLOR_SCORE}
          handleRefreshGame={generateCards}
          isOpen={showModal}
          onDidDismiss={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default ColorBoardGame;
