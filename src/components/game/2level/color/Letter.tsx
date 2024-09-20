import React from 'react';

import { useDrag, useDrop } from 'react-dnd';

import { CardType } from '../../../../shared/constants';
import { LetterProps } from '../../../../shared/types';

const Letter: React.FC<LetterProps> = ({
  letter,
  index,
  moveLetter,
  isCorrect,
  isComplete,
  isLocked,
}) => {
  const [, ref] = useDrag({
    item: { index },
    type: CardType.COLOR,
    canDrag: !isLocked,
  });

  const [collectedProps, drop] = useDrop({
    accept: CardType.COLOR,
    drop: (item: { index: number }) => {
      if (!isLocked) {
        moveLetter(item.index, index);
        item.index = index;
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(), // Check if the letter is currently above this element
      canDrop: monitor.canDrop(), // Check if this element can be dropped
    }),
  });

  const { isOver, canDrop } = collectedProps;

  return (
    <h2
      ref={(node) => ref(drop(node))}
      style={{
        cursor: 'grab',
        padding: '1rem',
        border:
          isOver && canDrop
            ? '1px dashed yellow'
            : '1px dashed rgba(250, 250, 250, 0.5)',
        transition: 'border-color 0.2s ease',
      }}
    >
      <span
        className={`special-font text-lg tracking-wide md:text-2xl lg:text-6xl ${
          isOver && canDrop
            ? 'drop-shadow-[0px_0px_20px_rgba(1,173,4,1)]'
            : 'drop-shadow-[0px_5px_5px_rgba(0,0,1,1)]'
        } ${
          isLocked || (isComplete && isCorrect)
            ? 'text-[var(--ion-color-secondary)]'
            : isComplete && !isCorrect
              ? 'text-[var(--ion-color-danger)]'
              : 'text-white'
        }`}
      >
        {letter}
      </span>
    </h2>
  );
};

export default Letter;
