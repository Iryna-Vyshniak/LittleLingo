import React from 'react';

import { IonSkeletonText } from '@ionic/react';

const AbcSkeleton: React.FC = () => {
  return (
    <ul className='mx-auto my-0 grid w-full max-w-[800px] grid-flow-row auto-rows-max grid-cols-4 gap-2 p-2 lg:grid-cols-5'>
      {[...Array(26)].map((_, idx) => (
        <li
          key={idx}
          className='aspect-square flex items-center justify-center'
        >
          <IonSkeletonText animated={true} className='h-full w-full' />
        </li>
      ))}
    </ul>
  );
};

export default AbcSkeleton;
