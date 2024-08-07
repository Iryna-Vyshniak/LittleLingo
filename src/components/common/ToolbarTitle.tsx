import React from 'react';

const ToolbarTitle: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div className='flex justify-center items-center self-center p-2 bg-gradient-toolbar bg-clip-text text-transparent drop-shadow-[2px_5px_2px_rgba(15,41,1,1)]'>
      <p className='text-2xl special-font custom tracking-wide'>{title}</p>
    </div>
  );
};

export default ToolbarTitle;
