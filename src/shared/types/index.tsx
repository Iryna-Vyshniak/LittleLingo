export interface TitleProps {
  title: string;
  styleType:
    | 'app'
    | 'intro-msg'
    | 'toolbar'
    | 'intro'
    | 'menu'
    | 'card-title'
    | 'card-description'
    | 'cube-description'
    | 'modal-title';
  subtitle?: string;
  fontFamily?: boolean;
  fontSize?:
    | 'text-6xl'
    | 'text-5xl'
    | 'text-4xl'
    | 'text-3xl'
    | 'text-2xl'
    | 'text-xl'
    | 'text-lg';
}

// Definition of the base interface
export interface BaseItem {
  _id: string;
  sound: string;
}

// A type for animated elements that adds an `animationClass` property
export type AnimatedItem<T extends BaseItem> = T & {
  animationClass?: string;
};

// Interface for `Letter` extending `BaseItem`
export interface Letter extends BaseItem {
  label: string;
  imageCapitalLetter: string;
  imageSmallLetter: string;
  imageUrl: string;
  description: string;
  soundDescr: string;
  transcription: string;
}

// Interface for `Color` extending `BaseItem`
export interface Color extends BaseItem {
  label: string;
  image: string;
}
// Interface for `Number` extending `BaseItem`
export interface Number extends BaseItem {
  label: string;
  number: string;
  imageUrl: string;
}

// Interface for `Animal` extending `BaseItem`
export interface Animal extends BaseItem {
  name: string;
  imageUrl: string;
}
// Interface for `Activity` extending `BaseItem`
export interface Activity extends BaseItem {
  name: string;
  imageUrl: string;
}

export interface AnimatedAnimal extends Animal {
  animationClass?: string;
}

export interface AnimalCardsProps {
  options: Animal[];
  currentAnimal: Animal;
  handleOptionClick: (selectedAnimal: Animal) => void;
}

export interface LetterCardsProps {
  options: Letter[];
}

// Generic type for component props
export type ItemProps<T extends BaseItem> = {
  item: T;
  handleCardClick?: (item: T) => void;
};

export type ItemListProps = {
  children: React.ReactNode;
  variant?: 'default' | 'compact' | 'middle' | 'expanded';
};

export type SkeletonListProps = {
  itemCount: number;
};

export type GenericListProps<T extends BaseItem> = {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  variant?: 'default' | 'compact' | 'middle' | 'expanded';
};

export interface ColorCard {
  id: string;
  name: string;
  img: string;
  matched: boolean;
  sound: string;
}

export interface GameBoardCardProps {
  card: ColorCard;
  handleCard: (card: ColorCard) => void;
  getRandomRadius: () => string;
  flipped: boolean;
  stopFlip: boolean;
}

export interface GameInfoProps {
  score: string | number;
  timer?: string;
}

export interface ScoreCardProps {
  medal: string;
  title: string;
  value: string | number;
}

export interface GameBoardModalProps {
  isOpen: boolean;
  onDidDismiss: () => void;
  handleRefreshGame: () => void;
  isActive: boolean;
  score: string | number;
  success: number;
  failure: number;
}

export interface Position {
  x: number;
  y: number;
}

export interface ColorStone {
  id: string;
  name: string;
  img: string;
  sound: string;
  position: Position;
  speed: number;
}

export interface GemProps {
  stone: {
    id: string;
    name: string;
    img: string;
    sound: string;
    position: { x: number; y: number };
    speed: number;
  };
  onMiss: (id: string) => void;
  containerHeight: number;
  timeLeft: number;
}

export interface LetterCard {
  _id: string;
  label: string;
  imageCapitalLetter: string;
  imageSmallLetter: string;
  sound: string;
  image: string;
  imageUrl: string;
  description: string;
  soundDescr: string;
  transcription: string;
}

export interface LetterCardGameProps {
  card: LetterCard;
  onDrop: (
    item: { _id: string; label: string; sound: string },
    targetCard: { _id: string; label: string }
  ) => void;
  isFlashing: boolean;
}

export interface RefreshButtonProps {
  onClick: () => void;
  text?: string;
  imgSrc?: string;
  imgAlt?: string;
  imgSize?: { width: number; height: number };
  isActive?: boolean;
  buttonType?: 'primary' | 'secondary' | 'circle';
  additionalClasses?: string;
}

// for animation view

export enum Direction {
  Left = 'left',
  Right = 'right',
  Top = 'top',
  Down = 'down',
}

export interface AnimatedInViewProps {
  children: React.ReactNode;
  direction?: Direction;
  duration?: number;
  delay?: number;
  triggerOnHover?: boolean;
  reverse?: boolean;
}

export interface LetterProps {
  letter: string;
  index: number;
  moveLetter: (fromIndex: number, toIndex: number) => void;
  isCorrect: boolean;
  isComplete: boolean;
  isLocked: boolean;
}
