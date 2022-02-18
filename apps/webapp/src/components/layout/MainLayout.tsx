import { useState } from 'react';

import {
  AppShell,
  Avatar,
  Burger,
  Divider,
  Header,
  MediaQuery,
  Menu,
  Navbar,
  Text,
  UnstyledButton,
  useMantineColorScheme,
} from '@mantine/core';
import { ExitIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useIntl } from 'react-intl';
import { Outlet } from 'react-location';

import { useErrorHandler } from '@/hooks/useErrorHandler';
import { useAuth, useUser } from '@/lib/firebase/auth';

function UserNavigation() {
  const user = useUser();
  const { logout } = useAuth();
  const { handleError } = useErrorHandler();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const intl = useIntl();

  const dark = colorScheme === 'dark';

  return (
    <Menu
      position="bottom"
      placement="start"
      size="lg"
      control={
        <UnstyledButton>
          <Avatar size="md" radius="xl" style={{ textTransform: 'uppercase' }}>
            {user.email?.[0]}
          </Avatar>
        </UnstyledButton>
      }
    >
      <Menu.Label>
        {intl.formatMessage({
          id: 'main_layout.app',
          defaultMessage: 'Application',
        })}
      </Menu.Label>
      <Menu.Item
        icon={dark ? <SunIcon /> : <MoonIcon />}
        onClick={() => toggleColorScheme()}
      >
        {dark
          ? intl.formatMessage({
              id: 'main_layout.theme_light',
              defaultMessage: 'Light theme',
            })
          : intl.formatMessage({
              id: 'main_layout.theme_dark',
              defaultMessage: 'Dark theme',
            })}
      </Menu.Item>

      <Divider />

      <Menu.Item
        icon={<ExitIcon />}
        onClick={() => {
          logout().catch(handleError);
        }}
      >
        {intl.formatMessage({
          id: 'main_layout.log_out',
          defaultMessage: 'Log out',
        })}
      </Menu.Item>
    </Menu>
  );
}

const layoutBreakpoint = 'sm' as const;

export function MainLayout() {
  const [open, setOpen] = useState(false);

  return (
    <AppShell
      navbarOffsetBreakpoint={layoutBreakpoint}
      fixed
      navbar={
        <Navbar
          padding="md"
          hiddenBreakpoint={layoutBreakpoint}
          hidden={!open}
          width={{ sm: 240 }}
        >
          Navbar
        </Navbar>
      }
      header={
        <Header height={64} padding="md">
          <div
            style={{ display: 'flex', alignItems: 'center', height: '100%' }}
          >
            <MediaQuery
              largerThan={layoutBreakpoint}
              styles={{ display: 'none' }}
            >
              <Burger
                opened={open}
                onClick={() => setOpen((prevOpen) => !prevOpen)}
                size="sm"
                mr="xl"
              />
            </MediaQuery>

            <div style={{ marginLeft: 'auto' }}>
              <UserNavigation />
            </div>
          </div>
        </Header>
      }
    >
      <Text>Resize app to see responsive navbar in action</Text>
      <Outlet />
    </AppShell>
  );
}
