import { IonButton, IonCard, IonCardContent, IonCol, IonGrid, IonImg, IonList, IonRow } from '@ionic/react';
import React, { useEffect, useState } from 'react';

import Refresh from '../../../assets/images/refresh.webp';

import { colorsData } from '../../../shared/data';
import { ColorCard } from '../../../shared/types';
import {
  INITIAL_COLOR_TIMER,
  INITIAL_COLOR_SCORE,
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
  const [score, setScore] = useState<number>(INITIAL_COLOR_SCORE);

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
    setScore(INITIAL_COLOR_SCORE);
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
     <IonRow className='ion-align-items-between ion-justify-content-center'>
      <IonCol size='12' sizeMd='10'>
      <section className='row-span-1'>
        <GameWinScore score={score} success={SUCCESS_COLOR_SCORE} main={false} />
        <GameInfo score={score} timer={timer.toString()} />
      </section>
      <section className='row-span-1'>
            <IonGrid fixed>
            <IonRow>
              {cards.map((card) => (
                <IonCol size='1.6' sizeMd='2' sizeLg='1.6' key={card.id}>
                 <ColorCardGame key={card.id} card={card} onDrop={handleCardDrop} />
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
      </section>
      <section className='row-span-1 flex items-center justify-center'>
        <IonButton className='mt-4 max-w-[120px] h-11 mx-auto' onClick={generateCards}>
          <img src={Refresh} alt='refresh' width={32} height={32} />
        </IonButton>
      </section>
      <section className='row-span-1'>
        {' '}
        <IonList className='flex flex-wrap items-center justify-start gap-2 p-2'>
          {matchedCards.map((card) => (
            <IonCard key={card.id} className='color-card color-matched-card w-12 h-12 m-0'>
              <IonCardContent className='flip'>
                <IonImg src={card.img} alt={`${card.name} bottle`} className='face' />
              </IonCardContent>
            </IonCard>
          ))}
        </IonList>
      </section>
    </IonCol>

      {showModal && (
        <GameBoardModal
          score={score}
          success={SUCCESS_COLOR_SCORE}
          failure={FAILURE_COLOR_SCORE}
          main={false}
          handleRefreshGame={generateCards}
          isOpen={showModal}
          onDidDismiss={() => setShowModal(false)}
        />
      )}
      </IonRow>
  );
};

export default ColorBoardGame;
