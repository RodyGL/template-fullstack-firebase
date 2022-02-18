import type { ReactNode } from 'react';
import { useMemo, useEffect, useState } from 'react';

import type { Auth, User } from 'firebase/auth';
import {
  browserLocalPersistence,
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  connectAuthEmulator,
  getAuth,
  onAuthStateChanged,
} from 'firebase/auth';

import { makeContextValue } from '@/utils/makeContext';

import { firebaseApp } from '../firebaseApp';

const auth = getAuth(firebaseApp);
if (__DEV__) {
  connectAuthEmulator(auth, 'http://localhost:9099');
}

interface AuthContextValue {
  auth: Auth;
  user: User | null;
  login: typeof login;
  logout: typeof logout;
}

const [authContext, useAuth] = makeContextValue<AuthContextValue>();

export { useAuth };

async function login(
  credentials: { email: string; password: string },
  options = { localPersistance: true }
) {
  const { email, password } = credentials;

  return setPersistence(
    auth,
    options.localPersistance
      ? browserLocalPersistence
      : browserSessionPersistence
  ).then(() => signInWithEmailAndPassword(auth, email, password));
}

async function logout() {
  return signOut(auth).then(() => {
    window.location.href = '/auth';

    return true;
  });
}

export interface AuthProviderProps {
  children: ReactNode;
  pendingElement: ReactNode;
}

export function AuthProvider(props: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      setLoading(false);
      setUser(nextUser);

      return () => {
        unsubscribe();
      };
    });
  }, []);

  const contextValue = useMemo<AuthContextValue>(
    () => ({ auth, user, login, logout }),
    [user]
  );

  if (loading) {
    return <>{props.pendingElement}</>;
  }

  return (
    <authContext.Provider value={contextValue}>
      {props.children}
    </authContext.Provider>
  );
}

export function useUser() {
  const user = auth.currentUser;

  if (!user) {
    throw new Error('User is not authenticated');
  }

  return user;
}
