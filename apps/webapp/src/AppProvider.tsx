import type { ReactNode } from 'react';

import { Loader } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';

import { AuthProvider } from '@/lib/firebase/auth';

import { LocaleProvider } from './locale/LocaleProvider';

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider(props: AppProviderProps) {
  return (
    <AuthProvider pendingElement={<Loader size="xl" m="auto" />}>
      <LocaleProvider pendingElement={<Loader size="xl" m="auto" />}>
        <NotificationsProvider position="top-right">
          {props.children}
        </NotificationsProvider>
      </LocaleProvider>
    </AuthProvider>
  );
}
