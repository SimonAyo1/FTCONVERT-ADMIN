// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Users',
    path: '/dashboard/users',
    icon: icon('ic_user'),
  },
  {
    title: 'Crypto Requests',
    path: '/dashboard/crypto-requests',
    icon: icon('ic_cart'),
  },
  {
    title: 'settings',
    path: '/dashboard/settings',
    icon: icon('ic_lock'),
  },
];

export default navConfig;
