import { BaseItem, GenericListProps } from '../../shared/types';
import ItemList from './ItemList';

const GenericList = <T extends BaseItem>({
  items,
  renderItem,
  variant = 'default',
}: GenericListProps<T>) => {
  return (
    <ItemList variant={variant}>
      {items.map((item) => renderItem(item))}
    </ItemList>
  );
};

export default GenericList;
