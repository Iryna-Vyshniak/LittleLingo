import { useEffect, useRef, useState } from 'react';

import { IonCard, IonImg, IonThumbnail } from '@ionic/react';

import { Animal, AnimalCardsProps, AnimatedItem } from '../../../shared/types';
import { clearCurrentTimeout } from '../../../shared/utils';
import Title from '../../common/Title';

const AnimalCards: React.FC<AnimalCardsProps> = ({
  options,
  currentAnimal,
  handleOptionClick,
}) => {
  const [animatedOptions, setAnimatedOptions] = useState<
    AnimatedItem<Animal>[]
  >([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Apply "scale-up" class when options change
    const animatedOptionsWithClass = options.map((option) => ({
      ...option,
      animationClass: 'scale-up',
    }));
    setAnimatedOptions(animatedOptionsWithClass);

    return () => clearCurrentTimeout(timeoutRef);
  }, [options]);

  const handleRemoveCard = (selectedAnimal: Animal) => {
    // Add "scale-down" class to the clicked card
    setAnimatedOptions((prevOptions) =>
      prevOptions.map((option) =>
        option._id === selectedAnimal._id
          ? { ...option, animationClass: 'scale-down' }
          : option
      )
    );

    clearCurrentTimeout(timeoutRef);

    // Wait for the animation to complete before removing the card
    timeoutRef.current = setTimeout(() => {
      handleOptionClick(selectedAnimal);
    }, 500);
  };

  useEffect(() => {
    // Cleanup timeouts when the component unmounts
    return () => clearCurrentTimeout(timeoutRef);
  }, []);

  return (
    <ul className='mx-auto my-0 flex w-full flex-wrap items-center'>
      {animatedOptions.map((animal) => (
        <li key={animal._id} className='w-1/2 p-2 lg:w-1/3 xl:w-1/4'>
          <IonCard
            onClick={() => handleRemoveCard(animal)}
            className={`animal-game-card cursor-pointer gap-2 ${animal.animationClass}`}
          >
            <IonThumbnail className='h-full w-full'>
              <IonImg
                src={currentAnimal.imageUrl}
                alt={currentAnimal.name}
                className='h-full w-full object-contain'
              />
            </IonThumbnail>
            <Title
              title={animal.name.toLowerCase()}
              styleType='card-title'
              fontSize='text-4xl'
            />
          </IonCard>
        </li>
      ))}
    </ul>
  );
};

export default AnimalCards;
