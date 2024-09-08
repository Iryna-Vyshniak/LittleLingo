import blueStone from '../../assets/images/colors/stones/blue.png';
import greenStone from '../../assets/images/colors/stones/green.png';
import yellowStone from '../../assets/images/colors/stones/yellow.png';
import { ColorStone } from '../types';

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
      className='gen-img'
      width={24}
      height={24}
    />
  ));
};
