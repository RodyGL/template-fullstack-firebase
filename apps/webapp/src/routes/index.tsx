import { Loader } from '@mantine/core';
import type { Route } from 'react-location';
import {
  Navigate,
  Outlet,
  ReactLocation,
  Router as ReactLocationRouter,
} from 'react-location';
import { ReactLocationDevtools } from 'react-location-devtools';

import { useAuth } from '@/lib/firebase/auth';

import { protectedRoutes } from './protected';
import { publicRoutes } from './public';
import type { LocationGenerics } from './types';

const location = new ReactLocation<LocationGenerics>();

function FallbackRoute() {
  const { user } = useAuth();

  return <Navigate replace to={user ? '/app' : '/auth'} />;
}

const commonRoutes: Array<Route<LocationGenerics>> = [
  {
    element: <FallbackRoute />,
  },
];

const routes = [...protectedRoutes, ...publicRoutes, ...commonRoutes];

export function Router() {
  return (
    <ReactLocationRouter
      location={location}
      routes={routes}
      defaultPendingMs={2000}
      defaultPendingMinMs={1000}
      defaultPendingElement={<Loader size="xl" m="auto" />}
    >
      <Outlet />
      <ReactLocationDevtools initialIsOpen={false} position="bottom-left" />
    </ReactLocationRouter>
  );
}
