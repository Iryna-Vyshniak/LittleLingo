import React, { useEffect, useState } from 'react';

import {
  IonCard,
  IonCol,
  IonGrid,
  IonImg,
  IonRow,
  IonThumbnail,
} from '@ionic/react';

import Correct from '../../../../assets/sounds/correct.mp3';
import TryAgain from '../../../../assets/sounds/try-again.mp3';
import { useAudioPlayer } from '../../../../shared/hooks/audio/useAudioPlayer';
import { Animal } from '../../../../shared/types';
import { getRandomLetters, getWordWithBlanks } from '../../../../shared/utils';
import CustomButton from '../../../common/CustomButton';
import Title from '../../../common/Title';

const AnimalBoardGame: React.FC<{ animals: Animal[] }> = ({ animals }) => {
  const [currentAnimalIndex, setCurrentAnimalIndex] = useState<number>(0);
  const [unusedAnimals, setUnusedAnimals] = useState<Animal[]>([...animals]);
  const [wordWithBlanks, setWordWithBlanks] = useState<string[]>([]);
  const [missingIndexes, setMissingIndexes] = useState<number[]>([]);
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [gridLetters, setGridLetters] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const { playAudio } = useAudioPlayer(true);

  const currentAnimal: Animal = unusedAnimals[currentAnimalIndex];

  useEffect(() => {
    // Update the word with skips and the rest of the states
    const { wordWithBlanks, missingIndexes } = getWordWithBlanks(
      currentAnimal.name.toLowerCase()
    );

    setWordWithBlanks(wordWithBlanks);
    setMissingIndexes(missingIndexes);
    setGridLetters(getRandomLetters(currentAnimal.name.toLowerCase()));
    setSelectedLetters([]);
    setIsComplete(false);
    setIsCorrect(null);
  }, [currentAnimal]);

  // Check for correctness after state update
  useEffect(() => {
    // We check the correctness after selecting all letters
    if (
      selectedLetters.length === missingIndexes.length &&
      missingIndexes.length > 0
    ) {
      const formedWord = wordWithBlanks
        .map((char, idx) =>
          char === '_'
            ? selectedLetters[missingIndexes.indexOf(idx)]?.toLowerCase() || '_'
            : char
        )
        .join('');

      if (formedWord === currentAnimal.name.toLowerCase()) {
        setIsCorrect(true);
        playAudio(Correct);
      } else {
        setIsCorrect(false);
        playAudio(TryAgain);
      }
      setIsComplete(true);
    }
  }, [
    selectedLetters,
    wordWithBlanks,
    currentAnimal.name,
    missingIndexes,
    playAudio,
  ]);

  const handleLetterClick = (letter: string) => {
    if (selectedLetters.length < missingIndexes.length) {
      setSelectedLetters((prevSelectedLetters) => [
        ...prevSelectedLetters,
        letter,
      ]);
      setWordWithBlanks((prev) =>
        prev.map((char, idx) =>
          char === '_'
            ? selectedLetters[missingIndexes.indexOf(idx)]?.toLowerCase() || '_'
            : char
        )
      );
    }
  };

  // Update for game restart (same card)
  const handleRestart = () => {
    const { wordWithBlanks, missingIndexes } = getWordWithBlanks(
      currentAnimal.name.toLowerCase()
    );

    setWordWithBlanks(wordWithBlanks);
    setMissingIndexes(missingIndexes);
    setGridLetters(getRandomLetters(currentAnimal.name.toLowerCase()));
    setSelectedLetters([]);
    setIsComplete(false);
    setIsCorrect(null);
  };

  // Update for new game (next card no repeats)
  const handleNewGame = () => {
    // Remove the current animal from the unused list
    const updatedUnusedAnimals = unusedAnimals.filter(
      (animal) => animal._id !== currentAnimal._id
    );

    if (updatedUnusedAnimals.length > 0) {
      setUnusedAnimals(updatedUnusedAnimals);
      setCurrentAnimalIndex(0); // Go to the first animal in the list
    } else {
      // If all animals are used, we start over
      setUnusedAnimals([...animals]);
      setCurrentAnimalIndex(0); // We start again with the first animal
    }
    handleRestart();
  };

  return (
    <>
      <section className='mb-4'>
        <div className='mx-auto my-0 w-1/2 p-2 lg:w-1/3 xl:w-1/4'>
          <IonCard
            onClick={() => playAudio(currentAnimal.sound)}
            className={`animal-game-card cursor-pointer`}
          >
            <IonThumbnail className='h-full w-full'>
              <IonImg
                src={currentAnimal.imageUrl}
                alt={currentAnimal.name}
                className='h-full w-full object-contain'
              />
            </IonThumbnail>
          </IonCard>
        </div>
        <Title
          title={`Fill in the missing letters:`}
          styleType='card-title'
          fontSize='text-2xl'
        />
        <h2
          className={`special-font mb-4 text-center text-6xl tracking-wide drop-shadow-[0px_5px_5px_rgba(0,0,1,1)] ${
            isComplete
              ? isCorrect
                ? 'text-[var(--ion-color-secondary)]'
                : 'text-[var(--ion-color-danger)]'
              : 'text-white'
          }`}
        >
          {wordWithBlanks.map((char, i) => (
            <span key={i} className='mx-2'>
              {char === '_'
                ? selectedLetters[missingIndexes.indexOf(i)]?.toLowerCase() ||
                  '_'
                : char}
            </span>
          ))}
        </h2>

        <IonGrid fixed>
          {Array.from({ length: Math.ceil(gridLetters.length / 6) }).map(
            (_, rowIndex) => (
              <IonRow key={rowIndex} class='ion-justify-content-center'>
                {gridLetters
                  .slice(rowIndex * 6, (rowIndex + 1) * 6)
                  .map((letter, colIndex) => (
                    <IonCol key={colIndex} size='2' sizeLg='1'>
                      <button
                        onClick={() => handleLetterClick(letter)}
                        className='butt-animal cursor-pointer'
                      >
                        <span className='font-bold'>
                          {letter.toLowerCase()}
                        </span>
                      </button>
                    </IonCol>
                  ))}
              </IonRow>
            )
          )}
        </IonGrid>
      </section>
      <section className='mb-4 h-16'>
        {isComplete && (
          <Title
            title={isCorrect ? 'Correct!' : 'Try again!'}
            styleType='card-title'
            fontSize='text-2xl'
          />
        )}
      </section>
      <section className='mb-12 flex items-center gap-4'>
        <CustomButton
          onClick={handleRestart}
          label='Restart Game'
          size='small'
          variant='secondary'
        />
        <CustomButton
          onClick={handleNewGame}
          label='Next Cards'
          size='small'
          variant='primary'
        />
      </section>
    </>
  );
};

export default AnimalBoardGame;
