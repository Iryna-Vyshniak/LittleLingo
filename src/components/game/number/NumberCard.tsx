import React from 'react';

import { Number } from '../../../shared/types';
import DropNumberZone from './DropNumberZone';

const NumberCard: React.FC<{
  item: Number;
  onDrop: (item: Number) => void;
  droppedItem?: Number;
}> = ({ item, onDrop, droppedItem }) => {
  return (
    <li className='number-card flex h-[6vmin] items-center justify-center'>
      <DropNumberZone onDrop={onDrop} droppedItem={droppedItem} item={item} />
    </li>
  );
};

export default NumberCard;
