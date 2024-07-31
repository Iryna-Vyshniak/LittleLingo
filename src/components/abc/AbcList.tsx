import React from 'react';

import AbcCube from './AbcCube';

import { Letter } from '../../shared/types';

const AbcList: React.FC<{ abc: Letter[] }> = ({ abc }) => {
  return (
    <ul className='flex flex-wrap items-center justify-center gap-4'>
      {abc.map((letter) => (
        <AbcCube key={letter._id} letter={letter} />
      ))}
    </ul>
  );
};

export default AbcList;
