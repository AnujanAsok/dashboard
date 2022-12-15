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
    title: 'campaigns',
    path: '/dashboard/campaigns',
    icon: icon('ic_user'),
  },
  {
    title: 'Start A New Campaign',
    path: '/dashboard/start-a-new-campaign',
    icon: icon('ic_cart'),
  },
  {
    title: 'Contacts',
    path: '/dashboard/contacts',
    icon: icon('ic_user'),
  },
  {
    title: 'Documents',
    path: '/dashboard/documents',
    icon: icon('ic_blog'),
  },

  {
    title: 'login',
    path: '/login',
    icon: icon('ic_lock'),
  },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
