import React, { useEffect, useState } from 'react';

import { IonCol, IonGrid, IonRow } from '@ionic/react';
import { Link, useRouteMatch } from 'react-router-dom';

import Refresh from '../../../assets/images/refresh.webp';
import Nope from '../../../assets/sounds/nope.mp3';
import {
  FAILURE_LETTER_SCORE,
  INITIAL_LETTER_SCORE,
  INITIAL_LETTER_TIMER,
  SUCCESS_LETTER_SCORE,
} from '../../../shared/constants';
import { useAudioPlayer } from '../../../shared/hooks/audio/useAudioPlayer';
import { Letter, LetterCard } from '../../../shared/types';
import RefreshButton from '../../common/RefreshButton';
import GameBoardModal from '../main/GameBoardModal';
import GameInfo from '../main/GameInfo';
import GameWinScore from '../main/GameWinScore';
import LetterCardGame from './LetterCardGame';
import MatchedCards from './MatchedCards';

const LetterBoardGame: React.FC<{ alphabet: Letter[] }> = ({ alphabet }) => {
  const [cards, setCards] = useState<LetterCard[] | []>([]);
  const [matchedCards, setMatchedCards] = useState<Letter[]>([]);
  const [flashingCards, setFlashingCards] = useState<string[]>([]); // Track flashing cards

  const [timer, setTimer] = useState<number>(INITIAL_LETTER_TIMER);
  const [score, setScore] = useState<number>(INITIAL_LETTER_SCORE);

  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [hasTouched, setHasTouched] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isActiveRefresh, setIsActiveRefresh] = useState<boolean>(false);
  const { playAudio } = useAudioPlayer(true);
  const match = useRouteMatch();

  useEffect(() => {
    generateCards();
  }, []);

  // Update the timer for the game
  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | null = null;

    if (
      gameStarted &&
      hasTouched &&
      timer > 0 &&
      score < SUCCESS_LETTER_SCORE
    ) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    if (gameStarted && timer === 0 && score < SUCCESS_LETTER_SCORE) {
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
    setIsActiveRefresh(true);
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
    const randomOrderArray = firstSet
      .concat(secondSet)
      .sort(() => Math.random() - 0.5);

    setCards(randomOrderArray);
    setMatchedCards([]);
    setTimer(INITIAL_LETTER_TIMER);
    setScore(INITIAL_LETTER_SCORE);
    setGameStarted(false);

    const timeoutId = setTimeout(() => setIsActiveRefresh(false), 1000);

    return () => {
      clearTimeout(timeoutId); // Clear timeout on unmount or next call
    };
  }

  const handleCardDrop = (
    droppedCard: { _id: string; label: string; sound: string },
    targetCard: { _id: string; label: string }
  ) => {
    if (!hasTouched) {
      setHasTouched(true);
    }
    if (!gameStarted) {
      setGameStarted(true);
    }

    // Ensure the dropped card is not the same card as the target card
    if (
      droppedCard.label === targetCard.label &&
      droppedCard._id !== targetCard._id
    ) {
      playAudio(droppedCard.sound);
      setFlashingCards([droppedCard._id, targetCard._id]); // Trigger flash effect

      const timeoutId = setTimeout(() => {
        setCards((prevCards) =>
          prevCards.filter(
            (card) =>
              card._id !== droppedCard._id && card._id !== targetCard._id
          )
        );
        const fullDroppedCard = cards.find(
          (card) => card._id === droppedCard._id
        );
        if (fullDroppedCard) {
          setMatchedCards((prev) => {
            const newMatchedCards = [...prev, fullDroppedCard];
            return newMatchedCards.filter(
              (card, index, arr) =>
                index === arr.findIndex((c) => c.label === card.label)
            );
          });
        }
        setFlashingCards([]); // Remove flash effect after animation
      }, 500); // Duration of flash animation

      setScore((prevScore) => prevScore + 1);

      // If the player reaches the success score, reset the timer and prevent modal from rendering
      if (score + 1 === SUCCESS_LETTER_SCORE) {
        setTimer(0); // Set timer to 0 to stop further countdown
        setShowModal(false); // Do not show modal on success
      }

      return () => {
        clearTimeout(timeoutId); // Clear the timeout when disassembling the component
      };
    } else {
      playAudio(Nope);
    }
  };

  return (
    <IonRow className='ion-align-items-between ion-justify-content-center mb-12'>
      <IonCol size='12' sizeMd='10'>
        {' '}
        <section className='flex w-full flex-1 flex-col items-center justify-center'>
          <GameWinScore score={score} success={SUCCESS_LETTER_SCORE} />
          <GameInfo score={score} timer={timer.toString()} />
        </section>{' '}
        <section className='flex w-full flex-1 justify-center'>
          <IonGrid>
            <IonRow>
              {cards.map((card) => (
                <IonCol size='1.6' sizeMd='1.2' sizeLg='1.2' key={card._id}>
                  <LetterCardGame
                    card={card}
                    onDrop={handleCardDrop}
                    isFlashing={flashingCards.includes(card._id)}
                  />
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        </section>{' '}
        <section className='mb-12 flex w-full flex-1 items-center justify-center'>
          <RefreshButton
            onClick={generateCards}
            buttonType='circle'
            isActive={isActiveRefresh}
            imgSrc={Refresh}
          />
        </section>
        <MatchedCards matchedCards={matchedCards} />
        {score === SUCCESS_LETTER_SCORE ? (
          <Link
            to={`${match.url}/2nd-level`}
            className='special-font custom butt-small mb-12 text-center tracking-wide text-white'
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
        ) : (
          showModal && (
            <GameBoardModal
              score={score}
              success={SUCCESS_LETTER_SCORE}
              failure={FAILURE_LETTER_SCORE}
              handleRefreshGame={generateCards}
              isOpen={showModal}
              onDidDismiss={() => setShowModal(false)}
              isActive={isActiveRefresh}
            />
          )
        )}
      </IonCol>
    </IonRow>
  );
};

export default LetterBoardGame;
