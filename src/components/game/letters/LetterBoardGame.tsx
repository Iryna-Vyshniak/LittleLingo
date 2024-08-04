import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonGrid,
  IonImg,
  IonList,
  IonRow,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';

import Refresh from '../../../assets/images/refresh.webp';

import { Letter, LetterCard } from '../../../shared/types';
import {
  INITIAL_LETTER_TIMER,
  SUCCESS_LETTER_SCORE,
  FAILURE_LETTER_SCORE,
  INITIAL_LETTER_SCORE,
} from '../../../shared/constants';

import GameInfo from '../main/GameInfo';
import GameBoardModal from '../main/GameBoardModal';
import GameWinScore from '../main/GameWinScore';
import LetterCardGame from './LetterCardGame';

const LetterBoardGame: React.FC<{ alphabet: Letter[] }> = ({ alphabet }) => {
  const [cards, setCards] = useState<LetterCard[] | []>([]);
  const [matchedCards, setMatchedCards] = useState<Letter[]>([]);

  const [timer, setTimer] = useState<number>(INITIAL_LETTER_TIMER);
  const [score, setScore] = useState<number>(INITIAL_LETTER_SCORE);

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

    if (timer === 0 || score === SUCCESS_LETTER_SCORE) {
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
    const firstSet = alphabet.map((card) => ({
      ...card,
      image: card.imageCapitalLetter,
      _id: `first-${card._id}`,
    }));
    const secondSet = alphabet.map((card) => ({
      ...card,
      image: card.imageSmallLetter,
      _id: `second-${card._id}`,
    }));
    const randomOrderArray = firstSet.concat(secondSet).sort(() => Math.random() - 0.5);

    setCards(randomOrderArray);
    setMatchedCards([]);
    setTimer(INITIAL_LETTER_TIMER);
    setScore(INITIAL_LETTER_SCORE);
    setGameStarted(false);
  }

  const handleCardDrop = (
    droppedCard: { _id: string; label: string; sound: string },
    targetCard: { _id: string; label: string }
  ) => {
    console.log(' droppedCard: : ', droppedCard);
    console.log('targetCard:: ', targetCard);
    if (!hasTouched) {
      setHasTouched(true);
    }
    if (!gameStarted) {
      setGameStarted(true);
    }

    const audio = new Audio(droppedCard.sound);
    audio.play();

    if (droppedCard.label === targetCard.label) {
      setCards((prevCards) =>
        prevCards.filter((card) => card._id !== droppedCard._id && card._id !== targetCard._id)
      );
      const fullDroppedCard = cards.find((card) => card._id === droppedCard._id);
      if (fullDroppedCard) {
        setMatchedCards((prev) => {
          const newMatchedCards = [...prev, fullDroppedCard];
          return newMatchedCards.filter(
            (card, index, arr) => index === arr.findIndex((c) => c.label === card.label)
          );
        });
      }
      setScore((prevScore) => prevScore + 1);
    }
  };

  return (
    <IonRow className='ion-align-items-between ion-justify-content-center'>
      <IonCol size='12' sizeMd='10'>
        {' '}
        <section className='flex-1 w-full flex flex-col justify-center items-center'>
          <GameWinScore score={score} success={SUCCESS_LETTER_SCORE} main={false} />
          <GameInfo score={score} timer={timer.toString()} />
        </section>{' '}
        <section className='flex-1 w-full flex justify-center'>
          <IonGrid>
            <IonRow>
              {cards.map((card) => (
                <IonCol size='1.6' sizeMd='2' sizeLg='1.6' key={card._id}>
                  <LetterCardGame card={card} onDrop={handleCardDrop} />
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        </section>{' '}
        <section className='flex-1 w-full flex justify-center items-center'>
          <IonButton className='mt-4 max-w-[120px] h-11 mx-auto' onClick={generateCards}>
            <img src={Refresh} alt='refresh' width={32} height={32} />
          </IonButton>
        </section>
        <section className='row-span-1'>
          {' '}
          <IonList className='flex-1 w-full flex flex-wrap justify-start gap-2 p-2'>
            {matchedCards.map((card) => (
              <IonCard key={card._id} className='color-matched-card w-12 h-12 m-0'>
                <IonCardContent className='flex items-center justify-center object-contain'>
                  <img
                    src={card.imageCapitalLetter}
                    alt={`${card.label} letter`}
                    width={44}
                    height={44}
                    className='w-full h-auto'
                  />
                </IonCardContent>
              </IonCard>
            ))}
          </IonList>
        </section>
      </IonCol>

      {showModal && (
        <GameBoardModal
          score={score}
          success={SUCCESS_LETTER_SCORE}
          failure={FAILURE_LETTER_SCORE}
          main={false}
          handleRefreshGame={generateCards}
          isOpen={showModal}
          onDidDismiss={() => setShowModal(false)}
        />
      )}
    </IonRow>
  );
};

export default LetterBoardGame;
