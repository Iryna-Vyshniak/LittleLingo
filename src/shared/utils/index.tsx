import blueStone from '../../assets/images/colors/stones/blue.png';
import greenStone from '../../assets/images/colors/stones/green.png';
import yellowStone from '../../assets/images/colors/stones/yellow.png';
import { BaseItem, ColorStone } from '../types';

export const initializeStones = (
  stonesData: Partial<ColorStone>[],
  containerWidth: number
): ColorStone[] => {
  const stoneSize = 80;
  const maxWidth = containerWidth - stoneSize; // Maximum width including pebble

  return stonesData.map((stone) => ({
    ...stone,
    position: {
      x: Math.random() * maxWidth, // The x-axis position is bounded by the container
      y: -(Math.random() * 700 + 100), // Position above screen
    },
    speed: Math.random() * 8000 + 6000, // Rate of fall
  })) as ColorStone[];
};

// Array of available stone images
const stoneImages = [greenStone, blueStone, yellowStone];

// Function to randomly pick an image
const getRandomStoneImage = () => {
  const randomIndex = Math.floor(Math.random() * stoneImages.length);
  return stoneImages[randomIndex];
};

//  function generates an array of images based on the number contained in item.number ()or from another data in future)

export const generateGemImages = (count: number) => {
  return Array.from({ length: count }, (_, idx) => (
    <img
      key={idx}
      src={getRandomStoneImage()}
      alt='skyblue gem'
      className='gen-img h-6 w-6'
      width={24}
      height={24}
    />
  ));
};

// Function for randomly selecting elements from an array
export const getRandomOptions = <T extends BaseItem>(
  correctItem: T,
  allItems: T[],
  count: number = 3
): T[] => {
  // Filter out the correct item
  const incorrectOptions = allItems.filter(
    (item) => item._id !== correctItem._id
  );

  // If there are fewer incorrect options than needed, return all incorrect options
  const randomIncorrect = incorrectOptions
    .sort(() => Math.random() - 0.5)
    .slice(0, count);

  // Add the correct animal to the options
  const options = [...randomIncorrect, correctItem];

  // Shuffle and return the options
  return options.sort(() => Math.random() - 0.5);
};

// function to generate a mix of word letters and random alphabet letters, ensuring a total length of otherLettersCount
export const getRandomLetters = (word: string, otherLettersCount = 24) => {
  const letters = word.split('');
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const otherLetters = Array.from(
    { length: otherLettersCount - letters.length },
    () => alphabet.charAt(Math.floor(Math.random() * alphabet.length))
  );
  return [...letters, ...otherLetters].sort(() => 0.5 - Math.random());
};

// function to randomly select two distinct positions in the word and replace the letters with blanks ('_')
export const getWordWithBlanks = (word: string) => {
  const letters = word.split('');

  const randomIndex1 = Math.floor(Math.random() * letters.length);
  let randomIndex2 = Math.floor(Math.random() * letters.length);

  // Check that indexes are not duplicated
  while (randomIndex2 === randomIndex1) {
    randomIndex2 = Math.floor(Math.random() * letters.length);
  }

  const randomIndexes = [randomIndex1, randomIndex2].sort((a, b) => a - b);

  letters[randomIndexes[0]] = '_';
  letters[randomIndexes[1]] = '_';

  return { wordWithBlanks: letters, missingIndexes: randomIndexes };
};

// Function to clear an active timeout stored in timeoutRef.current
// If there's an active timeout, it clears it and resets the reference to null
export const clearCurrentTimeout = (
  timeoutRef: React.MutableRefObject<NodeJS.Timeout | null>
) => {
  if (timeoutRef.current) {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
  }
};

// This function ensures that the shuffled array of letters will not form the correct word
// It shuffles the array until the shuffled result differs from the original array
export function shuffleArray<T>(array: T[]): T[] {
  const shuffledArray = [...array];

  do {
    shuffledArray.sort(() => Math.random() - 0.5);
  } while (shuffledArray.every((val, index) => val === array[index]));

  return shuffledArray;
}
