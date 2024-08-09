export interface TitleProps {
  title: string;
  subtitle?: string;
  fontSize: 'text-6xl' | 'text-4xl' | 'text-3xl' | 'text-2xl';
  styleType: 'app' | 'toolbar' | 'intro' | 'menu';
}

export interface Letter {
  _id: string;
  label: string;
  imageCapitalLetter: string;
  imageSmallLetter: string;
  sound: string;
}

export interface LetterProps {
  letter: {
    _id: string;
    label: string;
    imageCapitalLetter: string;
    imageSmallLetter: string;
    sound: string;
  };
}

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
  score: string | number;
  success: number;
  failure: number;
  main: boolean;
}

export interface Position {
  bottom: number;
  left: number;
}

export interface ColorCardGameProps {
  card: ColorCard;
  onDrop: (
    item: { id: string; name: string; sound: string },
    targetCard: { id: string; name: string }
  ) => void;
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
}
