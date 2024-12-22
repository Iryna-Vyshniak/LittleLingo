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
      case 'intro-msg':
        return 'absolute top-[35%] left-1/2 transform -translate-x-1/2 z-20 p-4 bg-gradient-custom bg-clip-text text-transparent drop-shadow-[2px_5px_2px_rgba(10,28,0,1)]';
      case 'toolbar':
        return `base-style bg-gradient-toolbar bg-clip-text text-transparent drop-shadow-[2px_5px_2px_rgba(15,41,1,1)] text-2xl`;
      case 'intro':
        return `base-style flex-col gap-2 p-4 bg-gradient-custom bg-clip-text text-transparent drop-shadow-[1px_2px_2px_rgba(15,41,1,1)] text-4xl`;
      case 'menu':
        return 'absolute top-0 left-1/2 transform -translate-x-1/2 z-20 p-2 bg-gradient-custom bg-clip-text text-transparent drop-shadow-[2px_5px_2px_rgba(15,41,1,1)] text-3xl';
      case 'card-title':
        return `base-style bg-gradient-custom bg-clip-text text-transparent text-shadow-base`;
      case 'card-description':
        return `base-style text-[var(--ion-color-secondary)] text-shadow-base`;
      case 'cube-description':
        return `base-style text-[var(--ion-color-secondary)] text-shadow-base`;
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
          className={`${fontSize === 'text-lg' ? 'xs:text-sm x:text-xl s:text-sm sm:text-lg md:text-2xl lg:text-3xl xl:text-2xl' : fontSize} ${fontFamily ? 'gentium-font font-bold' : 'special-font'} ${
            styleType === 'card-description'
              ? 'first-letter:font-bold first-letter:text-red-700'
              : ''
          } ${
            styleType === 'cube-description'
              ? 'first-letter:font-bold first-letter:text-red-700 xs:text-sm x:text-xl s:text-sm sm:text-lg md:text-2xl lg:text-3xl xl:text-2xl'
              : ''
          } custom text-center tracking-wide`}
        >
          {title}
          {subtitle && <span className='ml-2'>{subtitle}</span>}
        </p>
      )}
    </div>
  );
};

export default Title;
