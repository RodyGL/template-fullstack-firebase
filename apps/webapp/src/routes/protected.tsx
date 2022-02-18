import type { Route } from 'react-location';
import { Navigate, Outlet } from 'react-location';

import { useAuth } from '@/lib/firebase/auth';

import type { LocationGenerics } from './types';

function ProtectedRoute() {
  const { user } = useAuth();

  return user ? <Outlet /> : <Navigate to="/auth" />;
}

export const protectedRoutes: Array<Route<LocationGenerics>> = [
  {
    path: 'app',
    element: <ProtectedRoute />,
    children: [
      {
        element: () =>
          import('@/components/layout').then(({ MainLayout }) => (
            <MainLayout />
          )),
        children: [],
      },
    ],
  },
];
