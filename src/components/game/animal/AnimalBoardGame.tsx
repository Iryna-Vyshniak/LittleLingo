import React, { useEffect, useState } from 'react';

import Nope from '../../../assets/sounds/nope.mp3';
import { useAudioPlayer } from '../../../shared/hooks/audio/useAudioPlayer';
import { Animal } from '../../../shared/types';
import { getRandomOptions } from '../../../shared/utils';
import Title from '../../common/Title';
import GameBoardModal from '../main/GameBoardModal';
import AnimalCards from './AnimalCards';

const AnimalBoardGame: React.FC<{ animals: Animal[] }> = ({ animals }) => {
  const [unusedAnimals, setUnusedAnimals] = useState<Animal[]>([...animals]);
  const [currentAnimalIndex, setCurrentAnimalIndex] = useState<number>(0);
  const [attemptsLeft, setAttemptsLeft] = useState<number>(3);
  const [visibleOptions, setVisibleOptions] = useState<Animal[]>([]);
  const [score, setScore] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [gameStatus, setGameStatus] = useState<'win' | 'lose' | null>(null);
  const { playAudio } = useAudioPlayer(true);

  const currentAnimal: Animal = unusedAnimals[currentAnimalIndex];

  // Start a new round, rendering however many options are available
  const startNewRound = () => {
    // If there are fewer than 3 animals remaining, end the game with a win
    if (unusedAnimals.length <= 3 || !currentAnimal) {
      setGameStatus('win');
      setShowModal(true);
      return;
    }

    // Generate options with 3 incorrect animals + 1 correct animal
    const options: Animal[] = getRandomOptions(currentAnimal, unusedAnimals);
    setVisibleOptions(options);
  };

  useEffect(() => {
    if (unusedAnimals.length > 3 && currentAnimal) {
      startNewRound();
    }
  }, [currentAnimalIndex, unusedAnimals]);

  const handleOptionClick = (currAnimal: Animal) => {
    const selectedAnimal = visibleOptions.find(
      (animal) => animal._id === currAnimal._id
    );

    if (selectedAnimal) {
      // if choose correct card
      if (selectedAnimal._id === currentAnimal._id) {
        playAudio(currentAnimal.sound);
        setScore((prevScore) => prevScore + 1);

        // Remove the correctly guessed animal from the list of unused animals
        const updatedUnusedAnimals = unusedAnimals.filter(
          (animal) => animal._id !== currentAnimal._id
        );
        setUnusedAnimals(updatedUnusedAnimals);

        if (updatedUnusedAnimals.length <= 3) {
          // Trigger the "You Win" modal
          setGameStatus('win');
          setShowModal(true);
        } else {
          setCurrentAnimalIndex(
            Math.floor(Math.random() * updatedUnusedAnimals.length)
          );
          setAttemptsLeft(3); // Reset attempts for the new round
        }
      } else {
        playAudio(Nope);
        setAttemptsLeft((prevAttempts) => prevAttempts - 1);

        // Remove the incorrect option from visibleOptions
        const updatedVisibleOptions = visibleOptions.filter(
          (animal) => animal._id !== selectedAnimal._id
        );
        setVisibleOptions(updatedVisibleOptions); // Set the updated visible options

        if (attemptsLeft - 1 === 0) {
          setScore(0);
          setGameStatus('lose');
          setShowModal(true);
        }
      }
    } else {
      console.error('Selected animal not found');
    }
  };

  const restartGame = () => {
    setShowModal(false);
    setUnusedAnimals([...animals]);
    setCurrentAnimalIndex(0);
    setAttemptsLeft(3);
    setScore(0);
    setGameStatus(null);
    startNewRound();
  };

  return (
    <>
      <Title
        title='Select the correct name for the animal'
        styleType='card-title'
        fontSize='text-2xl'
      />
      <Title
        title={`Attempts left: ${attemptsLeft}`}
        styleType='card-title'
        fontSize='text-xl'
      />
      <Title
        title={`Score: ${score}`}
        styleType='card-title'
        fontSize='text-xl'
      />

      {visibleOptions.length > 0 && currentAnimal && (
        <AnimalCards
          options={visibleOptions}
          currentAnimal={currentAnimal}
          handleOptionClick={handleOptionClick}
        />
      )}

      {showModal && (
        <GameBoardModal
          score={gameStatus === 'win' ? score : 1}
          success={gameStatus === 'win' ? score : 0}
          failure={1}
          main={false}
          handleRefreshGame={restartGame}
          isOpen={showModal}
          onDidDismiss={() => setShowModal(false)}
          isActive={true}
        />
      )}
    </>
  );
};

export default AnimalBoardGame;
