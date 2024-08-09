import { createAnimation, IonModal } from '@ionic/react';
import React, { useEffect, useRef } from 'react';

import { GameBoardModalProps } from '../../../shared/types';

import GameWinScore from './GameWinScore';

import SuccessSound from '../../../assets/sounds/wingame.mp3';
import WitchLaugh from '../../../assets/sounds/witch-laugh.mp3';
import WinnerSlogan from '../../../assets/images/winner-slogan.png';
import Treasure from '../../../assets/images/treasure.png';
import Failure from '../../../assets/images/failure.png';
import Refresh from '../../../assets/images/refresh.webp';
import RefreshButton from '../../common/RefreshButton';

const GameBoardModal: React.FC<GameBoardModalProps> = ({
  score,
  success,
  failure,
  main,
  handleRefreshGame,
  isOpen,
  onDidDismiss,
  isActive,
}) => {
  const modal = useRef<HTMLIonModalElement>(null);

  const dismiss = () => {
    modal.current?.dismiss();
  };

  const enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;

    const backdropAnimation = createAnimation()
      .addElement(root?.querySelector('ion-backdrop')!)
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

    const wrapperAnimation = createAnimation()
      .addElement(root?.querySelector('.modal-wrapper')!)
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
    const audio = new Audio(Number(score) > failure ? SuccessSound : WitchLaugh);
    audio.play();
  }, []);

  return (
    <IonModal
      id='game-board-modal'
      ref={modal}
      isOpen={isOpen}
      onDidDismiss={onDidDismiss}
      enterAnimation={enterAnimation}
      leaveAnimation={leaveAnimation}
    >
      <div className='modal flex flex-col items-center justify-center gap-4 w-full h-full p-2'>
        {Number(score) > failure && <img src={WinnerSlogan} alt='winner' width={250} height={50} />}

        <div className='flex flex-wrap items-center justify-center p-4 bg-gradient-custom bg-clip-text text-transparent drop-shadow-[2px_5px_2px_rgba(15,41,1,1)] self-center'>
          <h1 className='modal-text special-font tracking-wide text-center'>
            {Number(score) === success || Number(score) > failure
              ? 'You`re a Champ!'
              : 'Next time, champ! Keep going!'}
          </h1>
        </div>

        <img
          src={Number(score) > failure ? Treasure : Failure}
          alt={Number(score) > failure ? 'treasure' : 'failure'}
          width={310}
          height={310}
        />
        <GameWinScore score={score} success={success} main={main} />
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
