import React from 'react';

import { ItemListProps } from '../../shared/types';

const ItemList: React.FC<ItemListProps> = ({
  children,
  variant = 'default',
}) => {
  const variantClasses = {
    default: 'grid-cols-4 lg:grid-cols-5',
    compact: 'grid-cols-6 lg:grid-cols-8',
    expanded: 'grid-cols-3 lg:grid-cols-5',
  };
  return (
    <ul
      className={`mx-auto my-0 grid w-full max-w-[800px] grid-flow-row auto-rows-max gap-1 p-4 pl-2 ${variantClasses[variant]}`}
    >
      {children}
    </ul>
  );
};

export default ItemList;
