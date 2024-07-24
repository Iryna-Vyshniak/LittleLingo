import Slide1Image from '../../assets/images/intro.jpg';
import Slide2Image from '../../assets/images/intro-abc.jpg';
import Slide3Image from '../../assets/images/intro-colors.jpg';
import Slide4Image from '../../assets/images/intro-animals.jpg';
import { homeOutline, settingsOutline } from 'ionicons/icons';

export const introImages = [
  {
    id: '2gsbqy72',
    img: Slide1Image,
    desc: '',
  },
  {
    id: '2gsbqf42',
    img: Slide1Image,
    desc: 'Welcome to LittleLingo!',
    subdesc: "Let's start a fun journey of learning English!",
  },
  {
    id: '2gsbqy73',
    img: Slide2Image,
    desc: 'Discover the world of letters!',
    subdesc: '',
  },
  {
    id: '2gsbqy74',
    img: Slide3Image,
    desc: 'Dive into a colorful adventure!',
    subdesc: '',
  },
  {
    id: '2gsbqy75',
    img: Slide4Image,
    desc: 'Meet your new animal friends!',
    subdesc: '... and many-many others!',
  },
];

export const menuPaths = [
  { id: '2g45fqy77', name: 'Home', url: '/app/list', icon: homeOutline },
  { id: '2g1erqy78', name: 'Settings', url: '/app/settings', icon: settingsOutline },
];
