import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  // {
  //   title: 'Dashboard',
  //   icon: 'home-outline',
  //   link: '/pages/dashboard',
  //   home: true,
  // },
  {
    title: 'POS',
    icon: 'checkmark-square-outline',
    link: '/pages/pos',
  },
  {
    title: 'Customers',
    icon: 'people-outline',
    link: '/pages/customers',
  },
  {
    title: 'Packages',
    icon: 'shopping-bag-outline',
    link: '/pages/packages',
  },
  {
    title: 'Invoices',
    icon: 'credit-card-outline',
    link: '/pages/invoices',
  },
  {
    title: 'System Users',
    icon: 'person-outline',
    link: '/pages/users',
  },
  {
    title: 'System Logs',
    icon: 'alert-triangle-outline',
    link: '/pages/logs',
  },
  {
    title: 'Settings',
    icon: 'settings-outline',
    link: '/pages/settings',
  }
];

export const CASHIER_MENU_ITEMS: NbMenuItem[] = [
  // {
  //   title: 'Dashboard',
  //   icon: 'home-outline',
  //   link: '/pages/dashboard',
  //   home: true,
  // },
  {
    title: 'Customers',
    icon: 'people-outline',
    link: '/pages/customers',
  },
  {
    title: 'Packages',
    icon: 'shopping-bag-outline',
    link: '/pages/packages',
  },
  {
    title: 'Invoices',
    icon: 'credit-card-outline',
    link: '/pages/invoices',
  }
];
