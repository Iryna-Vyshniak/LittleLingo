import { BaseItem, GenericListProps } from '../../shared/types';
import ItemList from './ItemList';

const GenericList = <T extends BaseItem>({
  items,
  renderItem,
}: GenericListProps<T>) => {
  return <ItemList>{items.map((item) => renderItem(item))}</ItemList>;
};

export default GenericList;
