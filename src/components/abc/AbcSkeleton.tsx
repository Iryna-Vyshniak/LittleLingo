import React from 'react';
import { IonSkeletonText } from '@ionic/react';

const AbcSkeleton: React.FC = () => {
  return (
    <ul className='flex flex-wrap items-center justify-center gap-4'>
      {[...Array(32)].map((_, idx) => (
        <li key={idx} className='w-40 h-40 flex items-center justify-center'>
          <IonSkeletonText animated={true} className='w-full h-full' />
        </li>
      ))}
    </ul>
  );
};

export default AbcSkeleton;
