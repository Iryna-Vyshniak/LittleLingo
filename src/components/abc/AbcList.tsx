import React from 'react';

import AbcCube from './AbcCube';
import { useStageAABC } from '../../shared/hooks/stage.a/useStageAABC';

const AbcList: React.FC = () => {
  const { abc } = useStageAABC();

  return (
    <ul className='flex flex-wrap items-center justify-center gap-4'>
      {abc.map((letter) => (
        <AbcCube key={letter._id} letter={letter} />
      ))}
    </ul>
  );
};

export default AbcList;
