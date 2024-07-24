import './ExploreContainer.css';

interface ContainerProps {}

const ExploreContainer: React.FC<ContainerProps> = () => {
  return (
    <div id='container'>
      <h1 className='text-2xl font-bold text-red-800'>Using TailwindCSS in Ionic with React</h1>
    </div>
  );
};

export default ExploreContainer;
