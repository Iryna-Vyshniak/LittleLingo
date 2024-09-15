import { useEffect, useRef, useState } from 'react';

import { IonCard, IonImg, IonItem, IonList, IonThumbnail } from '@ionic/react';

import {
  Animal,
  AnimalCardsProps,
  AnimatedAnimal,
} from '../../../shared/types';
import Title from '../../common/Title';

const AnimalCards: React.FC<AnimalCardsProps> = ({
  options,
  currentAnimal,
  handleOptionClick,
}) => {
  const [animatedOptions, setAnimatedOptions] = useState<AnimatedAnimal[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Apply "scale-up" class when options change
    const animatedOptionsWithClass = options.map((option) => ({
      ...option,
      animationClass: 'scale-up',
    }));
    setAnimatedOptions(animatedOptionsWithClass);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
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
    // Wait for the animation to complete before removing the card
    timeoutRef.current = setTimeout(() => {
      handleOptionClick(selectedAnimal);
    }, 500);
  };

  return (
    <IonList
      className='mx-auto my-0 flex flex-wrap items-center justify-center'
      lines='none'
    >
      {animatedOptions.map((animal) => (
        <IonItem
          key={animal._id}
          className='ion-padding w-full md:w-1/2 lg:w-1/3'
        >
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
        </IonItem>
      ))}
    </IonList>
  );
};

export default AnimalCards;
