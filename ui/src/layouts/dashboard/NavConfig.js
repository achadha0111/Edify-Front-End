// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  // DONE Replace this Dashboard path with path to all notes
  // {
  //   title: 'Dashboard',
  //   path: '/dashboard/app',
  //   icon: getIcon('eva:pie-chart-2-fill'),
  // },
    // TODO Change iconset
  {
    title: 'All Notes',
    path: '/home/app',
    icon: getIcon('eva:book-fill'),
  },
  {
    title: 'Review',
    path: '/home/review',
    icon: getIcon('eva:credit-card-fill'),
  },
  {
    title: 'Note',
    path: '/home/note',
    icon: getIcon('eva:book-open-fill'),
  },
  {
    title: 'Profile & Settings',
    path: '/profile',
    icon: getIcon('eva:settings-fill')
  }
  // {
  //   title: 'register',
  //   path: '/home/register',
  //   icon: getIcon('eva:person-add-fill'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: getIcon('eva:alert-triangle-fill'),
  // },
];

export default navConfig;
