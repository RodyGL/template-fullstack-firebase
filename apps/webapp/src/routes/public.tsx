import type { Route } from 'react-location';
import { Outlet, Navigate } from 'react-location';

import { useAuth } from '@/lib/firebase/auth';

import type { LocationGenerics } from './types';

function PublicRoute() {
  const { user } = useAuth();

  return user ? <Navigate to="/app" /> : <Outlet />;
}

export const publicRoutes: Array<Route<LocationGenerics>> = [
  {
    path: 'auth',
    element: <PublicRoute />,
    children: [
      {
        path: '/',
        element: () => import('@/features/auth').then(({ Auth }) => <Auth />),
      },
    ],
  },
];
