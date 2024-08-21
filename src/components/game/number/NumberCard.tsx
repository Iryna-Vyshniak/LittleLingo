import React from 'react';

import { Number } from '../../../shared/types';
import DropNumberZone from './DropNumberZone';

const NumberCard: React.FC<{
  item: Number;
  onDrop: (item: Number) => void;
  droppedItem?: Number;
}> = ({ item, onDrop, droppedItem }) => {
  return (
    <li className='number-card flex h-12 items-center justify-center'>
      <div className='special-font custom number-card-caption flex items-center justify-center text-center tracking-wide'>
        {item.label}
      </div>
      <DropNumberZone onDrop={onDrop} droppedItem={droppedItem} />
    </li>
  );
};

export default NumberCard;
