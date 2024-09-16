import blueStone from '../../assets/images/colors/stones/blue.png';
import greenStone from '../../assets/images/colors/stones/green.png';
import yellowStone from '../../assets/images/colors/stones/yellow.png';
import { Animal, ColorStone } from '../types';

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
export const getRandomOptions = (
  correctAnimal: Animal,
  allAnimals: Animal[],
  count: number = 3
): Animal[] => {
  // Filter out the correct animal
  const incorrectOptions = allAnimals.filter(
    (animal) => animal._id !== correctAnimal._id
  );

  // If there are fewer incorrect options than needed, return all incorrect options
  const randomIncorrect = incorrectOptions
    .sort(() => Math.random() - 0.5)
    .slice(0, count);

  // Add the correct animal to the options
  const options = [...randomIncorrect, correctAnimal];

  // Shuffle and return the options
  return options.sort(() => Math.random() - 0.5);
};
