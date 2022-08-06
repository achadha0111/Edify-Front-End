// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'All Notes',
    path: '/home',
    icon: getIcon('eva:book-fill'),
  },
  {
    title: 'Review',
    path: '/review',
    icon: getIcon('eva:credit-card-fill'),
  },
  {
    title: 'Note',
    path: '/note',
    icon: getIcon('eva:book-open-fill'),
  },
  {
    title: 'Profile & Settings',
    path: '/profile',
    icon: getIcon('eva:settings-fill')
  }
];

export default navConfig;
