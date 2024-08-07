import React from 'react';

const MenuTitle: React.FC = () => {
  return (
    <div className='absolute top-0 left-1/2 transform -translate-x-1/2 z-20 p-2 bg-gradient-custom bg-clip-text text-transparent drop-shadow-[2px_5px_2px_rgba(15,41,1,1)]'>
      <p className='text-3xl special-font custom tracking-wide'>Menu</p>
    </div>
  );
};

export default MenuTitle;
