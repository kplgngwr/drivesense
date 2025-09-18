import { NavItem } from '@/types';

export type User = {
  id: number;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: string;
};

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard/home',
    icon: 'dashboard',
    label: 'Dashboard'
  },
  {
    title: 'Users',
    href: '/dashboard/users',
    icon: 'user',
    label: 'Users'
  },
  {
    title: 'Register New Vehicle',
    href: '/dashboard/register-new-vehicle',
    icon: 'vehicle',
    label: 'Register New Vehicle'
  },
  {
    title: 'Register New Driver',
    href: '/dashboard/register-new-driver',
    icon: 'user',
    label: 'Register New Driver'
  },
  {
    title: 'Truck Allocation',
    href: '/dashboard/truck-allocation',
    icon: 'vehicle',
    label: 'Truck Allocation'
  },
  {
    title: 'Vehicle Tracking',
    href: '/dashboard/vehicle-tracking',
    icon: 'vehicle',
    label: 'Vehicle Tracking'
  },
  {
    title: 'Driver Score',
    href: '/dashboard/driver-score',
    icon: 'user',
    label: 'Driver Score'
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: 'settings',
    label: 'settings'
  },
];
