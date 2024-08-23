import React, { useEffect, useState } from 'react';

import {
  IonCard,
  IonCardContent,
  IonCol,
  IonGrid,
  IonImg,
  IonRow,
} from '@ionic/react';

import Refresh from '../../../assets/images/refresh.webp';
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

const LetterBoardGame: React.FC<{ alphabet: Letter[] }> = ({ alphabet }) => {
  const [cards, setCards] = useState<LetterCard[] | []>([]);
  const [matchedCards, setMatchedCards] = useState<Letter[]>([]);

  const [timer, setTimer] = useState<number>(INITIAL_LETTER_TIMER);
  const [score, setScore] = useState<number>(INITIAL_LETTER_SCORE);

  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [hasTouched, setHasTouched] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isActiveRefresh, setIsActiveRefresh] = useState<boolean>(false);
  const { playAudio } = useAudioPlayer(true);

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
    setTimeout(() => setIsActiveRefresh(false), 1000);
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

    playAudio(droppedCard.sound);

    // Ensure the dropped card is not the same card as the target card
    if (
      droppedCard.label === targetCard.label &&
      droppedCard._id !== targetCard._id
    ) {
      setCards((prevCards) =>
        prevCards.filter(
          (card) => card._id !== droppedCard._id && card._id !== targetCard._id
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
      setScore((prevScore) => prevScore + 1);
    }
  };

  return (
    <IonRow className='ion-align-items-between ion-justify-content-center'>
      <IonCol size='12' sizeMd='10'>
        {' '}
        <section className='flex w-full flex-1 flex-col items-center justify-center'>
          <GameWinScore
            score={score}
            success={SUCCESS_LETTER_SCORE}
            main={false}
          />
          <GameInfo score={score} timer={timer.toString()} />
        </section>{' '}
        <section className='flex w-full flex-1 justify-center'>
          <IonGrid>
            <IonRow>
              {cards.map((card) => (
                <IonCol size='1.6' sizeMd='1.2' sizeLg='1.2' key={card._id}>
                  <LetterCardGame card={card} onDrop={handleCardDrop} />
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        </section>{' '}
        <section className='flex w-full flex-1 items-center justify-center'>
          <RefreshButton
            onClick={generateCards}
            buttonType='circle'
            isActive={isActiveRefresh}
            imgSrc={Refresh}
          />
        </section>
        <section className='flex w-full flex-1 flex-wrap justify-start gap-2 p-2'>
          {' '}
          <IonGrid>
            <IonRow>
              {matchedCards
                .filter((card) => card && card.label)
                .sort((a, b) => a.label.localeCompare(b.label))
                .map((card) => (
                  <IonCol size='1' key={card._id}>
                    {' '}
                    <IonCard
                      key={card._id}
                      className='color-matched-card wooden-game-card m-0 flex items-center justify-center'
                    >
                      <IonCardContent className='ion-no-padding flex h-full w-full items-center justify-center object-contain'>
                        <IonImg
                          src={card.imageCapitalLetter}
                          alt={`${card.label} letter`}
                          className='face'
                        />
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                ))}
            </IonRow>
          </IonGrid>
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
          isActive={isActiveRefresh}
        />
      )}
    </IonRow>
  );
};

export default LetterBoardGame;
