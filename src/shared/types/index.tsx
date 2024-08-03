export interface Letter {
  _id: string;
  label: string;
  image: string;
  sound: string;
}

export interface LetterProps {
  letter: { _id: string; label: string; image: string; sound: string };
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
}

export interface ColorCardGameProps {
  card: ColorCard;
  onDrop: (
    item: { id: string; name: string; sound: string },
    targetCard: { id: string; name: string }
  ) => void;
}
