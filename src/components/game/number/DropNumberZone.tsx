import React from 'react';

import { useDrop } from 'react-dnd';

import DragHere from '../../../assets/images/drag-here.png';
import { CardType } from '../../../shared/constants';
import { Number } from '../../../shared/types';

interface DropZoneProps {
  onDrop: (item: Number) => void;
  droppedItem?: Number;
}

const DropNumberZone: React.FC<DropZoneProps> = ({ onDrop, droppedItem }) => {
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
      className={`border-2 border-green-700 special-font custom drop-number flex h-12 w-14 items-center justify-center border-dashed p-4 text-center tracking-wide ${droppedItem ? 'drop-place' : '#ffc885'}`}
    >
      {droppedItem ? (
        droppedItem.number
      ) : (
        <img
          src={DragHere}
          alt='drag here'
          width={96}
          height={96}
          className='h-full w-full object-cover'
        />
      )}
    </div>
  );
};

export default DropNumberZone;
