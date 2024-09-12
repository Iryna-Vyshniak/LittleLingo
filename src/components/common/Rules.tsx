import React from 'react';

const Rules: React.FC = () => {
  return (
    <div className='rules-inner-wrapper'>
      <div className='rules-title'>
        <p className='special-font custom tracking-wide text-orange-600'>
          In this game, your goal is to clear the field by removing pairs of
          numbers.
        </p>
      </div>
      <div className='rules-description'>
        <ul className='mb-4'>
          <li>You can remove pairs of numbers if:</li>
          <ul>
            <li>
              <strong className='special-font custom mb-4 mr-2 tracking-wide text-red-700'>
                The numbers are identical
              </strong>
              (e.g. <span className='font-bold text-red-700'>5 & 5</span> or{' '}
              <span className='font-bold text-red-700'>2 & 2</span>).
            </li>
            <li>
              <strong className='special-font custom mb-4 mr-2 tracking-wide text-red-700'>
                The sum of the numbers is 10
              </strong>
              (e.g. <span className='font-bold text-red-700'>3 & 7</span> or{' '}
              <span className='font-bold text-red-700'>1 & 9</span>).
            </li>
            <li>
              They are{' '}
              <span className='special-font custom font-bold text-red-700'>
                in the same column
              </span>{' '}
              with no other numbers in between.
            </li>
            <li>
              They are{' '}
              <span className='special-font custom font-bold text-red-700'>
                in the same row
              </span>{' '}
              with no other numbers in between.
            </li>
          </ul>
        </ul>
        <ul className='mb-4 flex flex-col gap-6'>
          <li>
            <h3 className='font-bold tracking-wide text-orange-600'>
              HINT Button:
            </h3>
            <p>
              If you cannot find any more pairs to remove, you can use the
              <code className='special-font custom mb-4 ml-2 mr-2 tracking-wide text-red-700'>
                HINT
              </code>
              button to highlight available pairs of numbers on the field.
            </p>
          </li>
          <li>
            <h3 className='font-bold text-orange-600'>FILL Button:</h3>
            <p>
              If you cannot find any more pairs to remove, you can use the
              <code className='special-font custom mb-4 ml-2 mr-2 tracking-wide text-red-700'>
                FILL
              </code>
              button to add new numbers to the field.
            </p>
          </li>
          <li>
            <h3 className='font-bold text-orange-600'>RESTART GAME Button:</h3>
            <p>
              If you want to start over, you can press the
              <code className='special-font custom mb-4 ml-2 mr-2 uppercase tracking-wide text-red-700'>
                Restart Game
              </code>
              button to reset the game, clearing the field and restarting from
              the beginning.
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Rules;
