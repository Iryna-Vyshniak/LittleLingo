import React, { useEffect, useState } from 'react';

import { IonCard, IonImg, IonThumbnail } from '@ionic/react';

import Correct from '../../../../assets/sounds/correct.mp3';
import TryAgain from '../../../../assets/sounds/try-again.mp3';
import { useAudioPlayer } from '../../../../shared/hooks/audio/useAudioPlayer';
import { Color } from '../../../../shared/types';
import { shuffleArray } from '../../../../shared/utils';
import CustomButton from '../../../common/CustomButton';
import Title from '../../../common/Title';
import Letter from './Letter';

const ColorBoardGame: React.FC<{ colors: Color[] }> = ({ colors }) => {
  const [currentColorIndex, setCurrentColorIndex] = useState<number>(0);
  const [shuffledLetters, setShuffledLetters] = useState<string[]>([]);
  const [unusedColors, setUnusedColors] = useState<Color[]>([...colors]);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [hintUsed, setHintUsed] = useState<boolean>(false); // Track if the hint has been used
  const [lockedLetters, setLockedLetters] = useState<boolean[]>(
    Array(shuffledLetters.length).fill(false)
  ); // Track locked letters
  const { playAudio } = useAudioPlayer(true);

  const currentColor: Color = unusedColors[currentColorIndex];

  useEffect(() => {
    const shuffled = shuffleArray(currentColor.label.toLowerCase().split(''));
    setShuffledLetters(shuffled);
    setLockedLetters(Array(currentColor.label.length).fill(false)); // Скидаємо заблоковані літери
    setHintUsed(false); // Скидаємо використання підказки для нової картки
    setIsComplete(false);
    setIsCorrect(null);
  }, [currentColor]);

  // Moving letters within one field
  const moveLetter = (fromIndex: number, toIndex: number) => {
    const updatedLetters = [...shuffledLetters];
    // Swap letters at fromIndex and toIndex
    [updatedLetters[fromIndex], updatedLetters[toIndex]] = [
      updatedLetters[toIndex],
      updatedLetters[fromIndex],
    ];
    setShuffledLetters(updatedLetters); // Update the shuffled letters

    const correctLetters = currentColor.label.toLowerCase().split('');

    if (correctLetters[toIndex] !== updatedLetters[toIndex]) {
      // if the letter is incorrect
      playAudio(TryAgain);
      setIsComplete(true);
      setIsCorrect(false);
    }
    checkCorrect(updatedLetters);
  };

  // Checking if each letter is correct
  const checkCorrect = (currentLetters: string[]) => {
    const correctLetters = currentColor.label.toLowerCase();

    // Check if the entire word is correct
    if (currentLetters.join('') === correctLetters) {
      setIsCorrect(true);
      setIsComplete(true);
      playAudio(Correct);
    } else {
      setIsCorrect(false);
      setIsComplete(true);
    }
  };

  // Restart the game for the current card
  const handleRestart = () => {
    const shuffled = shuffleArray(currentColor.label.toLowerCase().split(''));
    setShuffledLetters(shuffled);
    setIsComplete(false);
    setIsCorrect(null);
    setHintUsed(false);
    setLockedLetters(Array(shuffledLetters.length).fill(false));
  };

  // Move to the next color and restart the game
  const handleNewGame = () => {
    /// Remove the current color from the list
    const updatedUnusedColors = unusedColors.filter(
      (color) => color._id !== currentColor._id
    );

    if (updatedUnusedColors.length > 0) {
      setUnusedColors(updatedUnusedColors);
      setCurrentColorIndex(0); // Start from the first color in the list
    } else {
      // If all colors are used, restart with the full list
      setUnusedColors([...colors]);
      setCurrentColorIndex(0); // Start again with the first color
    }
    handleRestart(); // Restart the game with the new color
  };

  // Provide a hint by moving the first incorrect letter to the correct position
  const getHint = () => {
    const correctLetters = currentColor.label.toLowerCase().split('');

    // Знаходимо першу неправильну літеру
    for (let i = 0; i < shuffledLetters.length; i += 1) {
      if (shuffledLetters[i] !== correctLetters[i] && !lockedLetters[i]) {
        const updatedLetters = [...shuffledLetters];
        const updatedLocked = [...lockedLetters];

        // Find the correct letter that should be in the current position
        const correctLetterIndex = updatedLetters.findIndex(
          (letter, idx) =>
            letter === correctLetters[i] && correctLetters[idx] !== letter
        );

        if (correctLetterIndex !== -1) {
          // Swap the incorrect letter with the correct one
          [updatedLetters[i], updatedLetters[correctLetterIndex]] = [
            updatedLetters[correctLetterIndex],
            updatedLetters[i],
          ];

          // Lock the correctly placed letter
          updatedLocked[i] = true;

          // Update the shuffled letters
          setShuffledLetters(updatedLetters);
          // Update the locked letters
          setLockedLetters(updatedLocked);

          // Check if the word is fully correct after the hint
          if (updatedLetters.join('') === correctLetters.join('')) {
            setIsCorrect(true);
            setIsComplete(true);
            playAudio(Correct);
          }

          break; // Stop after finding the first incorrect letter
        }
      }
    }

    // Disable the hint button after use
    setHintUsed(true);
  };

  return (
    <>
      <section className='mb-4'>
        <div className='hero-wrapper'>
          <IonCard
            onClick={() => playAudio(currentColor.sound)}
            className={`hero cursor-pointer`}
          >
            <IonThumbnail className='h-full w-full'>
              <IonImg
                src={currentColor.image}
                alt={currentColor.label}
                className='h-full w-full object-contain'
              />
            </IonThumbnail>
          </IonCard>
        </div>
        <Title
          title={`Put in correct order:`}
          styleType='card-title'
          fontSize='text-2xl'
        />
        <div
          className={`mb-4 mt-12 flex flex-wrap items-center justify-center gap-4 text-center md:gap-6 lg:gap-10`}
        >
          {shuffledLetters.map((letter, index) => {
            const isCorrectLetter =
              currentColor.label.toLowerCase().split('')[index] === letter;
            return (
              <Letter
                key={index}
                letter={letter}
                index={index}
                moveLetter={moveLetter}
                isCorrect={isCorrectLetter} // Pass individual letter correctness
                isComplete={isComplete}
                isLocked={lockedLetters[index]}
              />
            );
          })}
        </div>
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
      <section className='mb-14 flex items-center gap-4'>
        <CustomButton
          onClick={getHint}
          label='Hint'
          size='small'
          variant='primary'
          disabled={hintUsed} // Disable button after using the hint
        />
        <CustomButton
          onClick={handleRestart}
          label='Try Again'
          size='small'
          variant='secondary'
        />
        <CustomButton
          onClick={handleNewGame}
          label='Next Card'
          size='small'
          variant='primary'
        />
      </section>
    </>
  );
};

export default ColorBoardGame;
