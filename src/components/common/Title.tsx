import { TitleProps } from '../../shared/types';

const Title: React.FC<TitleProps> = ({
  title,
  subtitle,
  styleType,
  fontSize,
  fontFamily,
}) => {
  const getStyle = () => {
    switch (styleType) {
      case 'app':
        return 'absolute top-0 left-1/2 transform -translate-x-1/2 z-20 p-4 bg-gradient-custom bg-clip-text text-transparent drop-shadow-[2px_5px_2px_rgba(10,28,0,1)]';
      case 'toolbar':
        return 'flex justify-center items-center self-center p-2 bg-gradient-toolbar bg-clip-text text-transparent drop-shadow-[2px_5px_2px_rgba(15,41,1,1)] text-2xl';
      case 'intro':
        return 'flex items-center justify-center flex-col gap-2 p-4 bg-gradient-custom bg-clip-text text-transparent drop-shadow-[1px_2px_2px_rgba(15,41,1,1)] text-4xl';
      case 'menu':
        return 'absolute top-0 left-1/2 transform -translate-x-1/2 z-20 p-2 bg-gradient-custom bg-clip-text text-transparent drop-shadow-[2px_5px_2px_rgba(15,41,1,1)] text-3xl';
      case 'card-title':
        return 'flex justify-center items-center self-center p-2 bg-gradient-custom bg-clip-text text-transparent drop-shadow-[0.5px_1px_1px_rgba(15,41,1,1)] text-xl tracking-wide';
      case 'modal-title':
        return 'flex items-center justify-center flex-col gap-2 p-4 text-orange-500 drop-shadow-[0px_0.5px_0.5px_rgba(0,0,1,1)] text-xl uppercase';
      default:
        return '';
    }
  };

  return (
    <div className={getStyle()}>
      {styleType === 'intro' ? (
        <>
          <h2
            className={`${fontSize} special-font custom text-center tracking-wide`}
          >
            {title}
          </h2>
          {subtitle && (
            <h3 className='special-font custom text-center text-2xl tracking-wide'>
              {subtitle}
            </h3>
          )}
        </>
      ) : (
        <p
          className={`${fontSize} ${fontFamily ? 'gentium-font font-bold' : 'special-font'} custom text-center tracking-wide`}
        >
          {title}
          {subtitle && <span className='ml-2'>{subtitle}</span>}
        </p>
      )}
    </div>
  );
};

export default Title;
