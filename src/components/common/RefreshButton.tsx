import React from 'react';

const RefreshButton: React.FC<{
  generateCards: () => void;
  refresh: string;
  isActive: boolean;
}> = ({ generateCards, refresh, isActive }) => {
  return (
    <button
      className='custom-circle mt-4 w-11 h-11 md:w-14 md:h-14 mx-auto flex items-center justify-center'
      onClick={generateCards}
    >
      <img
        src={refresh}
        alt='refresh'
        width={30}
        height={30}
        className={isActive ? 'spin-active' : ''}
      />
    </button>
  );
};

export default RefreshButton;
