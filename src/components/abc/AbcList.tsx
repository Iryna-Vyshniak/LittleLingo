import React from 'react';

import { Letter } from '../../shared/types';
import AbcCube from './AbcCube';

const AbcList: React.FC<{ abc: Letter[] }> = ({ abc }) => {
  return (
    <ul className='mx-auto my-0 grid w-full max-w-[800px] grid-flow-row auto-rows-max grid-cols-4 gap-1 p-4 lg:grid-cols-5'>
      {abc.map((letter) => (
        <AbcCube key={letter._id} letter={letter} />
      ))}
    </ul>
  );
};

export default AbcList;
