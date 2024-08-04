import React from 'react';

import AbcCube from './AbcCube';

import { Letter } from '../../shared/types';

const AbcList: React.FC<{ abc: Letter[] }> = ({ abc }) => {
  return (
    <ul className='grid grid-cols-4 lg:grid-cols-5 grid-flow-row auto-rows-max gap-2 p-2 w-full max-w-[800px] mx-auto my-0'>
      {abc.map((letter) => (
        <AbcCube key={letter._id} letter={letter} />
      ))}
    </ul>
  );
};

export default AbcList;
