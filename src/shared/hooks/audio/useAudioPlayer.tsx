import { useEffect, useRef } from 'react';

export const useAudioPlayer = (shouldReset: boolean = true) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const playAudio = (sound: string) => {
    // Якщо вже є AbortController, скасовуємо попередню дію
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Створюємо новий AbortController для кожного відтворення
    abortControllerRef.current = new AbortController();
    const { signal } = abortControllerRef.current;

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.src = sound;
    } else {
      audioRef.current = new Audio(sound);
    }

    audioRef.current.play().catch((error) => {
      if (signal.aborted) {
        console.log('Audio play aborted');
      } else if (error.name === 'NotAllowedError') {
        console.warn('Audio play prevented: User interaction required');
      } else {
        console.error('Audio play error:', error);
      }
    });

    // Додаємо обробник скасування для аудіо
    signal.addEventListener('abort', () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        console.log('Playback aborted');
      }
    });
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort(); // Скасовуємо поточну дію при розмонтаженні
      }

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        if (shouldReset) {
          audioRef.current = null;
        } else {
          audioRef.current.src = '';
        }
      }
    };
  }, [shouldReset]);

  return { playAudio, stopAudio };
};

// export const useAudioPlayer = (shouldReset: boolean = true) => {
//   const audioRef = useRef<HTMLAudioElement | null>(null);

//   const playAudio = (sound: string) => {
//     if (audioRef.current) {
//       // Check if the audio is already loaded and ready to play
//       if (!audioRef.current.paused || audioRef.current.readyState < 4) {
//         return;
//       }

//       audioRef.current.pause();
//       audioRef.current.currentTime = 0;
//       audioRef.current.src = sound;
//     } else {
//       audioRef.current = new Audio(sound);
//     }

//     audioRef.current.play().catch((error) => {
//       console.error('Audio play error:', error);
//     });
//   };

//   const stopAudio = () => {
//     if (audioRef.current) {
//       audioRef.current.pause();
//       audioRef.current.currentTime = 0;
//     }
//   };

//   useEffect(() => {
//     return () => {
//       if (audioRef.current) {
//         audioRef.current.pause();
//         audioRef.current.currentTime = 0;
//         if (shouldReset) {
//           audioRef.current = null; // For components where full cleanup is required
//         } else {
//           audioRef.current.src = ''; // For components where the audio object should be left active
//         }
//       }
//     };
//   }, [shouldReset]);

//   return { playAudio, stopAudio };
// };

// HTMLMediaElement має п'ять можливих значень для readyState:
// 0 (HAVE_NOTHING): Браузер ще не завантажив жодних даних для цього медіаелемента.
// 1 (HAVE_METADATA): Браузер завантажив метадані (такі як тривалість медіафайлу) але ще не завантажив самі дані медіафайлу.
// 2 (HAVE_CURRENT_DATA): Браузер має достатньо даних для відтворення хоча б одного кадру медіафайлу.
// 3 (HAVE_FUTURE_DATA): Браузер має достатньо даних для відтворення хоча б одного кадру, а також може продовжити відтворення без зупинок.
// 4 (HAVE_ENOUGH_DATA): Браузер завантажив достатньо даних, щоб відтворити весь медіафайл без необхідності додаткового завантаження.
// audioRef.current.readyState < 4 перевіряє, чи не досяг аудіо-елемент стану "HAVE_ENOUGH_DATA" (тобто повністю завантажений і готовий до безперервного відтворення).
