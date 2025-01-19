import React from 'react';

import { IonLabel, IonThumbnail } from '@ionic/react';
import { useDrop } from 'react-dnd';

import DragHere from '../../../assets/images/drag-here.png';
import { CardType } from '../../../shared/constants';
import { Number } from '../../../shared/types';

interface DropZoneProps {
  item: Number;
  onDrop: (item: Number) => void;
  droppedItem?: Number;
}

const DropNumberZone: React.FC<DropZoneProps> = ({
  onDrop,
  droppedItem,
  item,
}) => {
  const [{ isOver }, drop] = useDrop({
    accept: CardType.SOUND,
    drop: (item: { item: Number }) => {
      onDrop(item.item);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      style={{
        backgroundColor: isOver ? '#ff8c00' : '#ffc885',
      }}
      className={`border-2 border-green-700 flex h-full w-full items-center justify-center border-dashed ${droppedItem ? 'drop-place' : '#ffc885'}`}
    >
      <IonLabel className='special-font custom number-card-caption drop-place flex h-full items-center justify-center px-2 py-1 text-center tracking-wide'>
        {item.label}
      </IonLabel>
      {droppedItem ? (
        <p className='special-font custom drop-number px-4 text-center tracking-wide'>
          {droppedItem.number}
        </p>
      ) : (
        <IonThumbnail className='h-full w-10 md:w-[6vmin]' slot='end'>
          {' '}
          <img
            src={DragHere}
            alt='drag here'
            width={96}
            height={96}
            className='h-full w-full object-contain'
          />
        </IonThumbnail>
      )}
    </div>
  );
};

export default DropNumberZone;
