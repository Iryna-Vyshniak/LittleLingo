import React, { useEffect, useState } from 'react';

import { useIonToast } from '@ionic/react';

import Correct from '../../../../assets/sounds/correct.mp3';
import Nope from '../../../../assets/sounds/nope.mp3';
import { useAudioPlayer } from '../../../../shared/hooks/audio/useAudioPlayer';
import { Number } from '../../../../shared/types';
import CustomButton from '../../../common/CustomButton';
import Title from '../../../common/Title';

const NumberBoardGame: React.FC<{ numbers: Number[] }> = ({ numbers }) => {
  const [board, setBoard] = useState<Number[]>([]);
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [targetNumber, setTargetNumber] = useState<number>(10);
  const [hintPair, setHintPair] = useState<[number, number] | []>([]);
  const { playAudio } = useAudioPlayer(true);
  const [showToast] = useIonToast();
  const INITIAL_COLUMNS = 8;

  useEffect(() => {
    initializeBoard();
  }, []);

  // Initialize the random number board and reset everything
  const initializeBoard = () => {
    const newBoard = Array.from({ length: 48 }, () => {
      const randomIndex = Math.floor(Math.random() * numbers.length);
      return numbers[randomIndex]; // Use fresh numbers for the new game
    });
    setSelectedNumbers([]); // Clear selected numbers
    setTargetNumber(generateRandomTargetNumber()); // Generate a new target number
    setBoard(newBoard); // Completely reset the board
  };

  // Generate a random number for each new game
  const generateRandomTargetNumber = () => {
    return Math.floor(Math.random() * 10) + 1; // A random number from 1 to 10
  };

  // Helper to check if two indices are in the same column and adjacent vertically
  const isInSameColumn = (firstIndex: number, secondIndex: number) => {
    // Both must be in the same column
    const firstColumn = firstIndex % INITIAL_COLUMNS;
    const secondColumn = secondIndex % INITIAL_COLUMNS;

    if (firstColumn !== secondColumn) return false;

    // Ensure there are no other numbers between them vertically
    const step = INITIAL_COLUMNS;
    const start = Math.min(firstIndex, secondIndex);
    const end = Math.max(firstIndex, secondIndex);

    for (let i = start + step; i < end; i += step) {
      if (board[i].number !== '-' && board[i] !== null) {
        return false; // There is a number between them, so they can't be removed
      }
    }

    return true;
  };

  // Helper to check if two indices are adjacent horizontally
  const isHorizontallyAdjacent = (firstIndex: number, secondIndex: number) => {
    // Calculate the row of each index
    const firstRow = Math.floor(firstIndex / INITIAL_COLUMNS);
    const secondRow = Math.floor(secondIndex / INITIAL_COLUMNS);

    // Check if they are directly next to each other in the same row
    if (firstRow === secondRow) {
      const start = Math.min(firstIndex, secondIndex);
      const end = Math.max(firstIndex, secondIndex);

      // Ensure no number exists between them horizontally
      for (let i = start + 1; i < end; i++) {
        if (board[i].number !== '-' && board[i] !== null) {
          return false; // There is a number between them, so they can't be removed
        }
      }

      return true;
    }

    return false; // Not horizontally adjacent or wrapping
  };

  // Check if the selected numbers are equal or their sum equals the target number
  const areNumbersEqualOrSumToTarget = (
    firstIndex: number,
    secondIndex: number
  ) => {
    const firstNumber = parseInt(board[firstIndex]?.number as string, 10); // Convert string to number
    const secondNumber = parseInt(board[secondIndex]?.number as string, 10); // Convert string to number
    // Check if they are in the same column without other numbers between them
    if (isInSameColumn(firstIndex, secondIndex)) {
      return (
        firstNumber === secondNumber ||
        firstNumber + secondNumber === targetNumber
      );
    }

    // Check if they are adjacent horizontally (wrap-around logic is handled)
    if (isHorizontallyAdjacent(firstIndex, secondIndex)) {
      return (
        firstNumber === secondNumber ||
        firstNumber + secondNumber === targetNumber
      );
    }

    return false; // If none of the conditions are satisfied, they can't be removed
  };

  // Check if the numbers can be removed (for hints, without sound)
  const canRemoveNumbers = (firstIndex: number, secondIndex: number) => {
    return areNumbersEqualOrSumToTarget(firstIndex, secondIndex);
  };

  // Validate user selection and play audio if the selection is invalid
  const validateUserSelection = (
    firstIndex: number,
    secondIndex: number,
    sound: string
  ) => {
    const firstNumber = parseInt(board[firstIndex]?.number as string, 10); // Convert string to number
    const secondNumber = parseInt(board[secondIndex]?.number as string, 10); // Convert string to number
    if (!canRemoveNumbers(firstIndex, secondIndex)) {
      playAudio(Nope); // Play "Nope" sound only when the user selects an invalid pair
      return false;
    }
    if (firstNumber + secondNumber === targetNumber) {
      playAudio(Correct); // Play correct sound if the sum of the numbers is equal to target number
    } else {
      playAudio(sound); // Play number sound if the numbers are identical
    }
    return true;
  };

  // Handle the click on the number
  const handleNumberClick = (index: number, sound: string) => {
    // Prevent clicking the same number twice
    if (selectedNumbers.length === 1 && selectedNumbers[0] === index) {
      return; // Do nothing if the same number is clicked again
    }

    // Only proceed if the number is not already removed ('-')
    if (board[index].number !== '-') {
      if (selectedNumbers.length === 1) {
        const firstIndex = selectedNumbers[0];

        // Check if the pair of numbers can be removed by the user and play the sound if invalid
        if (validateUserSelection(firstIndex, index, sound)) {
          removeNumbers(firstIndex, index);
        }

        setSelectedNumbers([]);
        setHintPair([]); // Clear the hint after interaction
      } else {
        setSelectedNumbers([index]);
      }
    }
  };

  // Remove numbers and replace only the selected pair
  const removeNumbers = (firstIndex: number, secondIndex: number) => {
    const newBoard = [...board];
    newBoard[firstIndex] = { ...newBoard[firstIndex], number: '-' }; // Ensure we are storing '-'
    newBoard[secondIndex] = { ...newBoard[secondIndex], number: '-' };
    setBoard(newBoard);
  };

  //  Function that selects a random empty spot and fills it with a random number
  const fillBoard = () => {
    // Find all empty spots ('-')
    const emptySpots = board
      .map((item, idx) => (item.number === '-' ? idx : null)) // Create an array of indices or null
      .filter((idx) => idx !== null); // Filter out null values

    // If there are empty spots
    if (emptySpots.length > 0) {
      // Select a random empty spot
      const randomEmptyIndex =
        emptySpots[Math.floor(Math.random() * emptySpots.length)];

      // Select a random number from the numbers array
      const randomNumberIndex = Math.floor(Math.random() * numbers.length);
      const newNumber = numbers[randomNumberIndex];
      playAudio(newNumber.sound);

      // Create a new board and update the randomly selected empty spot
      const newBoard = [...board];
      newBoard[randomEmptyIndex] = newNumber; // Replace the random empty spot with a new number
      setBoard(newBoard);
    } else {
      showToast({
        message: 'Uh-oh! All spots are filled! Try removing some numbers!',
        duration: 2000,
        color: 'warning',
      });
      console.log('No empty spots available');
    }
  };

  const showHints = () => {
    // Use find for the first index and some for the second index
    const hintPair = board.find((_, firstIndex) =>
      board.some((_, secondIndex) => {
        // Ensure the numbers can be removed and are adjacent
        if (
          firstIndex !== secondIndex &&
          canRemoveNumbers(firstIndex, secondIndex) &&
          (isHorizontallyAdjacent(firstIndex, secondIndex) ||
            isInSameColumn(firstIndex, secondIndex))
        ) {
          setHintPair([firstIndex, secondIndex]); // Set the first valid pair found
          return true; // Stop as soon as a valid pair is found
        }
        return false; // Continue if no valid pair is found
      })
    );

    if (!hintPair) {
      showToast({
        message: 'Ooops... No pairs left. Try filling or restarting!',
        duration: 2000,
        color: 'warning',
      });
      console.log('No valid pairs left. Try filling or restarting!');
    }
  };

  return (
    <section className='flex flex-col items-center justify-center p-4'>
      <div className='rules-container'>
        <Title
          title='Sum of the Numbers:'
          subtitle={targetNumber.toString()}
          styleType='card-title'
          fontSize='text-xl'
        />
      </div>
      <section className='board-grid mb-12'>
        {board.map((item, index) => (
          <button
            key={index}
            onClick={() => handleNumberClick(index, item.sound)}
            className={`${
              typeof item === 'object' && item.number === '-'
                ? 'butt-spot'
                : 'butt-num flex cursor-pointer items-center justify-center'
            } ${!!hintPair.length && hintPair.includes(index) ? 'hint-highlight' : ''}`}
            style={{
              animationDelay: `${index * 0.2}s`,
            }}
          >
            <span className='special-font custom drop-number text-center'>
              {item.number}
            </span>
          </button>
        ))}
      </section>
      <section className='mb-20 flex flex-wrap items-center justify-center gap-8'>
        {' '}
        <CustomButton
          onClick={showHints}
          label='Hint'
          size='large'
          variant='secondary'
        />
        <CustomButton
          onClick={fillBoard}
          label='Fill'
          size='large'
          variant='primary'
        />
        <CustomButton
          onClick={initializeBoard}
          label='Restart Game'
          size='large'
          variant='primary'
        />
      </section>
    </section>
  );
};

export default NumberBoardGame;
