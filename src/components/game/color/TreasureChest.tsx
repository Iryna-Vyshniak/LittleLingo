import { useDrop } from 'react-dnd';

import EmptyTreasureChest from '../../../assets/images/colors/open-chest.png';
import FullTreasureChest from '../../../assets/images/colors/treasure-chest.png';
import { CardType } from '../../../shared/constants';
import { ColorStone } from '../../../shared/types';

const TreasureChest: React.FC<{
  stones: ColorStone[];
  onDrop: (id: string) => void;
}> = ({ stones, onDrop }) => {
  const [{ isOver }, dropRef] = useDrop({
    accept: CardType.COLOR,
    drop: (item: { id: string }) => onDrop(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      className='z-24 absolute bottom-[12%] right-[6%] h-auto w-28 md:bottom-[10%] md:w-44'
      style={{ filter: isOver ? 'drop-shadow(0px 0px 20px yellow)' : 'none' }}
      ref={dropRef}
    >
      {stones.length === 0 ? (
        <img
          src={FullTreasureChest}
          alt='full treasure chest'
          className='h-auto w-full'
        />
      ) : (
        <img
          src={EmptyTreasureChest}
          alt='treasure chest'
          className='h-auto w-full'
        />
      )}
    </div>
  );
};

export default TreasureChest;
