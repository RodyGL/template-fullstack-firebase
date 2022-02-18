import type { ReactNode } from 'react';

import type { ColorScheme } from '@mantine/core';
import { ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { useColorScheme, useLocalStorageValue } from '@mantine/hooks';

export function ThemeProvider(props: { children: ReactNode }) {
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useLocalStorageValue<ColorScheme>({
    key: 'changeme-color-scheme',
    defaultValue: preferredColorScheme,
  });

  function toggleColorScheme(nextColorScheme?: ColorScheme) {
    setColorScheme(
      nextColorScheme ?? (colorScheme === 'dark' ? 'light' : 'dark')
    );
  }

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withNormalizeCSS
        withGlobalStyles
        theme={{ colorScheme, loader: 'dots' }}
      >
        {props.children}
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
