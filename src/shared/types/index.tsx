export interface Letter {
  _id: string;
  label: string;
  image: string;
  sound: string;
}

export interface LetterProps {
  letter: { _id: string; label: string; image: string; sound: string };
}
