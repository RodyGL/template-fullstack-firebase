import { Container, Paper } from '@mantine/core';

import { ThemeIconToggler } from '@/components/theme';

import { LoginForm } from '../components/LoginForm';

export function Auth() {
  return (
    <>
      <Container size="sm" my="auto">
        <Paper padding="xl">
          <LoginForm />
        </Paper>
      </Container>

      <ThemeIconToggler />
    </>
  );
}
