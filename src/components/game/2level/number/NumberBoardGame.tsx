import React, { useEffect, useState } from 'react';

import { Number } from '../../../../shared/types';

const NumberBoardGame: React.FC<{ numbers: Number[] }> = ({ numbers }) => {
  const [board, setBoard] = useState<Number[]>([]);
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [targetNumber, setTargetNumber] = useState<number>(10);

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

  // Check if the selected numbers are equal or their sum equals the target number
  const areNumbersEqualOrSumToTarget = (
    firstIndex: number,
    secondIndex: number
  ) => {
    const firstNumber = parseInt(board[firstIndex]?.number as string, 10); // Convert string to number
    const secondNumber = parseInt(board[secondIndex]?.number as string, 10); // Convert string to number
    return (
      firstNumber === secondNumber ||
      firstNumber + secondNumber === targetNumber
    );
  };

  // Check if the numbers can be removed
  const canRemoveNumbers = (firstIndex: number, secondIndex: number) => {
    if (!areNumbersEqualOrSumToTarget(firstIndex, secondIndex)) {
      return false;
    }
    return true;
  };

  // Handle the click on the number
  const handleNumberClick = (index: number) => {
    // Prevent clicking the same number twice
    if (selectedNumbers.length === 1 && selectedNumbers[0] === index) {
      return; // Do nothing if the same number is clicked again
    }

    // Only proceed if the number is not already removed ('—')
    if (board[index].number !== '—') {
      if (selectedNumbers.length === 1) {
        const firstIndex = selectedNumbers[0];

        // Check if the pair of numbers can be removed
        if (canRemoveNumbers(firstIndex, index)) {
          removeNumbers(firstIndex, index);
        }

        setSelectedNumbers([]);
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

  // FILL command to add new numbers
  const fillBoard = () => {
    const newBoard = board.map((item) => {
      if (item.number === '-') {
        // If this condition is true, generate a new number
        const randomIndex = Math.floor(Math.random() * numbers.length);
        const newNumber = numbers[randomIndex];
        return newNumber; // Replace '-' with a new number object
      }
      // If it's not '-', return the original item
      return item;
    });

    setBoard(newBoard); // Set the new board state
  };

  return (
    <section className='flex flex-col items-center justify-center p-4'>
      <h1 className='special-font custom mb-4 tracking-wide text-white'>
        Deleting pairs of numbers
      </h1>
      <h2 className='special-font custom mb-4 tracking-wide text-white'>
        Sum Number: {targetNumber}
      </h2>
      <h3 className='special-font custom mb-4 tracking-wide text-white'>
        Rules:
      </h3>
      <div className='special-font custom mb-4 tracking-wide text-white'>
        <p>
          In this game, you need to clear the field by removing pairs of
          numbers.
        </p>
        <h4>Rules of the game:</h4>
        <ul>
          <li>
            You can remove pairs of numbers if:
            <ul>
              <li>
                <strong className='special-font custom mb-4 tracking-wide text-red-700'>
                  The numbers are identical
                </strong>{' '}
                (e.g., 5 & 5 or 2 & 2).
              </li>
              <li>
                <strong className='special-font custom mb-4 tracking-wide text-red-700'>
                  The sum of the numbers is 10
                </strong>{' '}
                (e.g., 3 & 7 or 1 & 9).
              </li>
            </ul>
          </li>
        </ul>
        <h3>FILL command:</h3>
        <p>
          If you cannot find any more combinations to remove, you can use the
          <code className='special-font custom mb-4 ml-2 tracking-wide text-red-700'>
            FILL
          </code>{' '}
          command to add new numbers to the field.
        </p>
      </div>
      <section className='board-grid mb-12'>
        {board.map((item, index) => (
          <button
            key={index}
            onClick={() => handleNumberClick(index)}
            className={` ${typeof item === 'object' && item.number.includes('-') ? 'butt-gem' : 'butt-num cursor-pointer'}`}
          >
            <span className='special-font custom drop-number text-center'>
              {item.number}
            </span>
          </button>
        ))}
      </section>
      <section className='flex items-center justify-center gap-8'>
        {' '}
        <button
          onClick={fillBoard}
          className='butt special-font custom text-center tracking-wide text-white'
        >
          <span className='layer l1'>
            <span className='layer l5'>fill</span>
          </span>
          <span className='layer l2'></span>
          <span className='layer l3'></span>
          <span className='layer l4'></span>
          <span className='layer l6'></span>
        </button>
        <button
          onClick={initializeBoard}
          className='butt special-font custom text-center tracking-wide text-white'
        >
          <span className='layer l1'>
            <span className='layer l5'>Next Game</span>
          </span>
          <span className='layer l2'></span>
          <span className='layer l3'></span>
          <span className='layer l4'></span>
          <span className='layer l6'></span>
        </button>
      </section>
    </section>
  );
};

export default NumberBoardGame;
