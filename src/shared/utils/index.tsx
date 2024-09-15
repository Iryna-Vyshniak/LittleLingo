import blueStone from '../../assets/images/colors/stones/blue.png';
import greenStone from '../../assets/images/colors/stones/green.png';
import yellowStone from '../../assets/images/colors/stones/yellow.png';
import { Animal, ColorStone } from '../types';

export function getRandomPosition(maxPercentage = 80): number {
  return Math.floor(Math.random() * maxPercentage);
}

// Function to count the number of stones of each color
export function calculateColorCounts(
  stones: ColorStone[]
): Record<string, number> {
  const colorCounts: Record<string, number> = {};

  stones.forEach((stone) => {
    colorCounts[stone.name] = (colorCounts[stone.name] || 0) + 1;
  });

  return colorCounts;
}

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
