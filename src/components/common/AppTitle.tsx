import React from 'react';

const AppTitle: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => {
  return (
    <div className='absolute top-0 left-1/2 transform -translate-x-1/2 z-20 p-4 bg-gradient-custom bg-clip-text text-transparent drop-shadow-[2px_5px_2px_rgba(10,28,0,1)]'>
      <p className='text-6xl special-font custom tracking-wide'>
        {title}
        <span>{subtitle}</span>
      </p>
    </div>
  );
};

export default AppTitle;
