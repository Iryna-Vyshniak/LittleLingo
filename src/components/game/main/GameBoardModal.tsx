import React, { useEffect, useRef } from 'react';

import { createAnimation, IonImg, IonModal, IonThumbnail } from '@ionic/react';

import Failure from '../../../assets/images/failure.png';
import Refresh from '../../../assets/images/refresh.webp';
import Treasure from '../../../assets/images/treasure.png';
import WinnerSlogan from '../../../assets/images/winner-slogan.png';
import SuccessSound from '../../../assets/sounds/wingame.mp3';
import WitchLaugh from '../../../assets/sounds/witch-laugh.mp3';
import { useAudioPlayer } from '../../../shared/hooks/audio/useAudioPlayer';
import { GameBoardModalProps } from '../../../shared/types';
import RefreshButton from '../../common/RefreshButton';

const GameBoardModal: React.FC<GameBoardModalProps> = ({
  score,
  success,
  failure,
  handleRefreshGame,
  isOpen,
  onDidDismiss,
  isActive,
}) => {
  const modal = useRef<HTMLIonModalElement>(null);
  const { playAudio } = useAudioPlayer(true);

  const dismiss = () => {
    modal.current?.dismiss();
  };

  const enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;

    const backdropElement = root?.querySelector('ion-backdrop');
    const wrapperElement = root?.querySelector('.modal-wrapper');

    if (!backdropElement || !wrapperElement) {
      throw new Error('Required elements for animation not found.');
    }

    const backdropAnimation = createAnimation()
      .addElement(backdropElement)
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

    const wrapperAnimation = createAnimation()
      .addElement(wrapperElement)
      .keyframes([
        { offset: 0, opacity: '0', transform: 'scale(0)' },
        { offset: 1, opacity: '0.99', transform: 'scale(1)' },
      ]);

    return createAnimation()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(500)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  const leaveAnimation = (baseEl: HTMLElement) => {
    return enterAnimation(baseEl).direction('reverse');
  };

  useEffect(() => {
    playAudio(Number(score) > failure ? SuccessSound : WitchLaugh);
  }, [score, failure]);

  return (
    <IonModal
      id='game-board-modal'
      ref={modal}
      isOpen={isOpen}
      onDidDismiss={onDidDismiss}
      enterAnimation={enterAnimation}
      leaveAnimation={leaveAnimation}
      keepContentsMounted={true}
    >
      <div className='modal flex h-full w-full flex-col items-center justify-center gap-4 p-2'>
        {Number(score) > failure && (
          <img src={WinnerSlogan} alt='winner' width={250} height={50} />
        )}

        <div className='flex flex-wrap items-center justify-center self-center bg-gradient-custom bg-clip-text p-4 text-transparent drop-shadow-[2px_5px_2px_rgba(15,41,1,1)]'>
          <h1 className='modal-text special-font text-center tracking-wide'>
            {Number(score) === success || Number(score) > failure
              ? 'You`re a Champ!'
              : 'Next time, champ! Keep going!'}
          </h1>
        </div>
        <IonThumbnail className='h-auto w-1/2'>
          {' '}
          <IonImg
            src={Number(score) > failure ? Treasure : Failure}
            alt={Number(score) > failure ? 'treasure' : 'failure'}
            className='h-full w-full'
          />
        </IonThumbnail>

        <RefreshButton
          text='Repeat'
          onClick={() => {
            dismiss();
            handleRefreshGame();
          }}
          buttonType='primary'
          isActive={isActive}
          imgSrc={Refresh}
        />
      </div>
    </IonModal>
  );
};

export default GameBoardModal;
