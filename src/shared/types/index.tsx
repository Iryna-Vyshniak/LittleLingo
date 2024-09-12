export interface TitleProps {
  title: string;
  fontSize: 'text-6xl' | 'text-4xl' | 'text-3xl' | 'text-2xl' | 'text-xl';
  styleType:
    | 'app'
    | 'toolbar'
    | 'intro'
    | 'menu'
    | 'card-title'
    | 'modal-title';
  subtitle?: string;
  fontFamily?: boolean;
}

// Definition of the base interface
export interface BaseItem {
  _id: string;
  sound: string;
}

// Interface for `Letter` extending `BaseItem`
export interface Letter extends BaseItem {
  label: string;
  imageCapitalLetter: string;
  imageSmallLetter: string;
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

// Generic type for component props
export type ItemProps<T extends BaseItem> = {
  item: T;
};

export type ItemListProps = {
  children: React.ReactNode;
  variant?: 'default' | 'compact' | 'expanded';
};

export type SkeletonListProps = {
  itemCount: number;
};

export type GenericListProps<T extends BaseItem> = {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  variant?: 'default' | 'compact' | 'expanded';
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
  main: boolean;
}

export interface Position {
  bottom: number;
  left: number;
}

export interface ColorStone {
  id: string;
  name: string;
  img: string;
  matched: boolean;
  sound: string;
  position: Position;
}

export interface ColorStoneGameProps {
  stone: ColorStone;
  draggable: true;
}

export interface LetterCard {
  _id: string;
  label: string;
  image: string;
  imageCapitalLetter: string;
  imageSmallLetter: string;
  sound: string;
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
