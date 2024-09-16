export const API = import.meta.env.VITE_API_KEY;

export const RADIUS = [
  '50%',
  '54% 46% 55% 45% / 48% 54% 46% 52%',
  '54% 46% 55% 45% / 48% 60% 40% 52%',
  '54% 46% 55% 45% / 42% 60% 40% 58%',
  '50%',
  '62% 38% 55% 45% / 42% 60% 40% 58%',
  '50%',
  '62% 38% 55% 45% / 42% 50% 50% 58%',
  '50%',
  '51% 49% 55% 45% / 42% 50% 50% 58%',
  '50%',
];

export const INITIAL_TIMER = 60;
export const INITIAL_COLOR_TIMER = 60;
export const INITIAL_LETTER_TIMER = 120;
export const INITIAL_MOVE = 0;
export const INITIAL_SCORE = 0;
export const INITIAL_COLOR_SCORE = 0;
export const INITIAL_LETTER_SCORE = 0;
export const SUCCESS_SCORE = 9;
export const FAILURE_SCORE = 5;
export const SUCCESS_COLOR_SCORE = 22;
export const FAILURE_COLOR_SCORE = 21;
export const SUCCESS_LETTER_SCORE = 26;
export const FAILURE_LETTER_SCORE = 25;

export const CardType = {
  LETTER: 'letter',
  COLOR: 'color',
  SOUND: 'sound',
};
