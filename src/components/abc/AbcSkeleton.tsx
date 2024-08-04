import React from 'react';
import { IonSkeletonText } from '@ionic/react';

const AbcSkeleton: React.FC = () => {
  return (
    <ul className='grid grid-cols-4 lg:grid-cols-5 grid-flow-row auto-rows-max gap-2 p-2 w-full max-w-[800px] mx-auto my-0'>
      {[...Array(26)].map((_, idx) => (
        <li key={idx} className='aspect-square flex items-center justify-center'>
          <IonSkeletonText animated={true} className='w-full h-full' />
        </li>
      ))}
    </ul>
  );
};

export default AbcSkeleton;
