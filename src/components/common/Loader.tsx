import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className='loader-wrapper'>
      <div className='loader' role='alert' aria-live='assertive'></div>
    </div>
  );
};

export default Loader;
