import { LetterCardsProps } from '../../../../shared/types';
import LetterCard from './LetterCard';

const LetterCards: React.FC<LetterCardsProps> = ({ options }) => {
  return (
    <ul className='mx-auto my-0 flex w-full flex-wrap items-center justify-center gap-4 p-2'>
      {options.map((letter) => (
        <LetterCard key={letter._id} letter={letter} />
      ))}
    </ul>
  );
};

export default LetterCards;
