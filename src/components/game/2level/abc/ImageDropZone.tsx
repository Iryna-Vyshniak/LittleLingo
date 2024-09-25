import { IonCard, IonImg, IonThumbnail } from '@ionic/react';
import { useDrop } from 'react-dnd';

import { CardType } from '../../../../shared/constants';
import { useAudioPlayer } from '../../../../shared/hooks/audio/useAudioPlayer';
import { Letter } from '../../../../shared/types';

const ImageDropZone: React.FC<{
  card: Letter;
  onDrop: (item: { label: string }) => void;
}> = ({ card, onDrop }) => {
  const { playAudio } = useAudioPlayer();
  const [{ isOver }, dropRef] = useDrop({
    accept: CardType.LETTER,
    drop: (item: { label: string }) => {
      onDrop(item);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <IonCard
      ref={dropRef}
      className='hero-letter cursor-pointer'
      style={{ filter: isOver ? 'drop-shadow(0px 0px 20px yellow)' : 'none' }}
      onClick={() => playAudio(card.soundDescr)}
    >
      <IonThumbnail className='h-1/2 w-full'>
        {' '}
        <IonImg
          src={card.imageUrl}
          alt={card.description}
          className='h-full w-full object-contain'
        />
      </IonThumbnail>
    </IonCard>
  );
};

export default ImageDropZone;
