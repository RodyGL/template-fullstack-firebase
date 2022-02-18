import { StrictMode, Suspense } from 'react';

import { render } from 'react-dom';
import './index.css';

import { Loader } from '@mantine/core';

import { ThemeProvider } from './components/theme';
import { lazyImport } from './utils/lazyImport';

const { App } = lazyImport(() => import('./App'));

render(
  <StrictMode>
    <ThemeProvider>
      <Suspense fallback={<Loader size="xl" m="auto" />}>
        <App />
      </Suspense>
    </ThemeProvider>
  </StrictMode>,
  document.getElementById('root')
);
