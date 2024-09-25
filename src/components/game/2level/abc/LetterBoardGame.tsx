import React, { useEffect, useState } from 'react';

import Correct from '../../../../assets/sounds/correct.mp3';
import Nope from '../../../../assets/sounds/nope.mp3';
import { useAudioPlayer } from '../../../../shared/hooks/audio/useAudioPlayer';
import { Letter } from '../../../../shared/types';
import { getRandomOptions } from '../../../../shared/utils';
import CustomButton from '../../../common/CustomButton';
import Title from '../../../common/Title';
import GameBoardModal from '../../main/GameBoardModal';
import ImageDropZone from './ImageDropZone';
import LetterCards from './LetterCards';

const LetterBoardGame: React.FC<{ abc: Letter[] }> = ({ abc }) => {
  const [unusedImages, setUnusedImages] = useState<Letter[]>([...abc]);
  const [currentImageIndex, setcurrentImageIndex] = useState<number>(0);
  const [attemptsLeft, setAttemptsLeft] = useState<number>(3);
  const [visibleOptions, setVisibleOptions] = useState<Letter[]>([]);
  const [score, setScore] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [gameStatus, setGameStatus] = useState<'win' | 'lose' | null>(null);
  const { playAudio } = useAudioPlayer(true);

  const currentImage: Letter = unusedImages[currentImageIndex];

  // Start a new round, rendering options
  const startNewRound = () => {
    if (unusedImages.length < 1 || !currentImage) {
      setGameStatus('win');
      return;
    } else {
      setGameStatus(null);
    }

    const options: Letter[] = getRandomOptions(currentImage, [...abc], 5);
    setVisibleOptions(options);
  };

  useEffect(() => {
    if (unusedImages.length > 0 && currentImage) {
      startNewRound();
    }
  }, [currentImageIndex, unusedImages]);

  // Handle card drag
  const handleDrop = (droppedItem: { label: string }) => {
    const selectedLetter = visibleOptions.find(
      (letter) => letter.label === droppedItem.label
    );

    if (droppedItem.label === currentImage.label) {
      playAudio(Correct);
      setScore((prevScore) => prevScore + 1);

      // Remove the guessed image card from the unused ones
      const updatedUnusedImages = unusedImages.filter(
        (letter) => letter._id !== currentImage._id
      );
      setUnusedImages(updatedUnusedImages);

      if (updatedUnusedImages.length < 1) {
        setGameStatus('win');
      } else {
        setcurrentImageIndex(
          Math.floor(Math.random() * updatedUnusedImages.length)
        );
        setAttemptsLeft(3);
      }
    } else {
      playAudio(Nope);
      setAttemptsLeft((prevAttempts) => prevAttempts - 1);

      // Remove the incorrect option from visibleOptions
      const updatedVisibleOptions = visibleOptions.filter(
        (letter) => letter._id !== selectedLetter?._id
      );
      setVisibleOptions(updatedVisibleOptions); // Set the updated visible options

      if (attemptsLeft - 1 === 0) {
        setScore(0);
        setGameStatus('lose');
        setShowModal(true);
      }
    }
  };

  const restartGame = () => {
    setShowModal(false);
    setUnusedImages([...abc]);
    setcurrentImageIndex(0);
    setAttemptsLeft(3);
    setScore(0);
    startNewRound();
  };

  return (
    <>
      <Title
        title='Select the correct name for the letter'
        styleType='card-title'
        fontSize='text-2xl'
      />
      <Title
        title={`Attempts left: ${attemptsLeft}`}
        styleType='card-title'
        fontSize='text-xl'
      />
      <Title
        title={`Score: ${score}`}
        styleType='card-title'
        fontSize='text-xl'
      />

      {currentImage && (
        <ImageDropZone onDrop={handleDrop} card={currentImage} />
      )}

      {gameStatus === 'win' ? (
        <section className='mb-12'>
          <CustomButton
            onClick={restartGame}
            label='Restart Game'
            size='small'
            variant='secondary'
          />
        </section>
      ) : (
        showModal && (
          <GameBoardModal
            score={1}
            success={0}
            failure={1}
            handleRefreshGame={restartGame}
            isOpen={showModal}
            onDidDismiss={() => setShowModal(false)}
            isActive={true}
          />
        )
      )}

      {visibleOptions.length > 0 && currentImage && (
        <LetterCards options={visibleOptions} />
      )}
    </>
  );
};

export default LetterBoardGame;
