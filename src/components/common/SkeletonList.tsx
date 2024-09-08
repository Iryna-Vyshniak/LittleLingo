import { IonSkeletonText } from '@ionic/react';

import { SkeletonListProps } from '../../shared/types';

const SkeletonList: React.FC<SkeletonListProps> = ({ itemCount }) => {
  return (
    <ul className='z-1 relative mx-auto my-0 grid w-full max-w-[800px] grid-flow-row auto-rows-max grid-cols-4 gap-2 p-2 lg:grid-cols-5'>
      {[...Array(itemCount)].map((_, idx) => (
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

export default SkeletonList;
