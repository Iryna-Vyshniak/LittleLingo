import React from 'react';

const IntroTitle: React.FC<{ title: string; subtitle: string | undefined }> = ({
  title,
  subtitle,
}) => {
  return (
    <div className='flex items-center justify-center flex-col gap-2 p-4 bg-gradient-custom bg-clip-text text-transparent drop-shadow-[1px_2px_2px_rgba(15,41,1,1)]'>
      <h2 className='text-4xl font-bold text-center'>{title}</h2>
      {subtitle && <h3 className='text-center'>{subtitle}</h3>}
    </div>
  );
};

export default IntroTitle;
