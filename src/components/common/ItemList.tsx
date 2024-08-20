import React from 'react';

import { ItemListProps } from '../../shared/types';

const ItemList: React.FC<ItemListProps> = ({ children }) => {
  return (
    <ul className='mx-auto my-0 grid w-full max-w-[800px] grid-flow-row auto-rows-max grid-cols-4 gap-1 p-4 lg:grid-cols-5'>
      {children}
    </ul>
  );
};

export default ItemList;
