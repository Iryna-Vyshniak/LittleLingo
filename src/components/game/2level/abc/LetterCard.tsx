import { IonCard } from '@ionic/react';
import { useDrag } from 'react-dnd';

import { CardType } from '../../../../shared/constants';
import { useAudioPlayer } from '../../../../shared/hooks/audio/useAudioPlayer';
import { Letter } from '../../../../shared/types';
import Title from '../../../common/Title';

const LetterCard: React.FC<{ letter: Letter }> = ({ letter }) => {
  const { playAudio } = useAudioPlayer();
  const [{ isDragging }, dragRef] = useDrag({
    type: CardType.LETTER,
    item: { label: letter.label },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <li
      ref={dragRef}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'grab',
        boxShadow: isDragging ? '0px 0px 20px yellow' : 'none',
      }}
      className='letter-card w-1/3 p-2 xl:w-1/4'
    >
      <IonCard
        className='card-transparent m-0 flex h-14 items-center justify-center gap-1'
        onClick={() => playAudio(letter.sound)}
      >
        <Title
          title={letter.label.toUpperCase()}
          styleType='card-title'
          fontSize='text-4xl'
        />
        <Title
          title={letter.label.toLowerCase()}
          styleType='card-title'
          fontSize='text-4xl'
        />
      </IonCard>
    </li>
  );
};

export default LetterCard;
