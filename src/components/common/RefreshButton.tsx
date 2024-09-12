import React from 'react';

import { IonButton } from '@ionic/react';

import { RefreshButtonProps } from '../../shared/types';

const RefreshButton: React.FC<RefreshButtonProps> = ({
  onClick,
  text,
  imgSrc,
  imgAlt,
  imgSize = { width: 30, height: 30 },
  isActive = false,
  buttonType = 'primary',
  additionalClasses = '',
}) => {
  const imageSizeClass = `w-[${imgSize.width}px] h-[${imgSize.height}px]`;
  const getButtonStyle = () => {
    switch (buttonType) {
      case 'primary':
        return 'wooden-btn text-white special-font custom tracking-wide relative transform transition-transform duration-100 ease-in-out hover:translate-y-1 active:translate-y-1 focus:translate-y-1';
      case 'secondary':
        return 'bg-secondary text-white rounded-lg px-4 py-2 hover:bg-secondary-dark';
      case 'circle':
        return 'custom-circle mt-4 w-11 h-11 md:w-14 md:h-14 mx-auto flex items-center justify-center';
      default:
        return '';
    }
  };
  return (
    <IonButton
      onClick={onClick}
      className={`${getButtonStyle()} ${additionalClasses}`}
    >
      {!isActive && text ? (
        <p className='text-white drop-shadow-[2px_3px_2px_rgba(0,0,1,1)]'>
          {text}
        </p>
      ) : (
        <img
          src={imgSrc}
          alt={imgAlt || 'button image'}
          width={imgSize.width}
          height={imgSize.height}
          className={`${imageSizeClass} ${isActive ? 'spin-active' : ''}`}
        />
      )}
    </IonButton>
  );
};

export default RefreshButton;
