import type { UserLogIn } from '@changeme/validator';
import { userLogIn } from '@changeme/validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, PasswordInput, TextInput } from '@mantine/core';
import { EnvelopeClosedIcon, LockClosedIcon } from '@radix-ui/react-icons';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';

import { useErrorHandler } from '@/hooks/useErrorHandler';
import { useAuth } from '@/lib/firebase/auth';

export function LoginForm() {
  const intl = useIntl();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<UserLogIn>({
    resolver: zodResolver(userLogIn),
  });
  const { handleError } = useErrorHandler();
  const { login } = useAuth();

  return (
    <form
      noValidate
      onSubmit={handleSubmit(async (data) => login(data).catch(handleError))}
    >
      <TextInput
        mt="md"
        required
        autoFocus
        placeholder={intl.formatMessage({
          id: 'auth.form.email_placeholder',
          defaultMessage: 'Your email',
        })}
        label={intl.formatMessage({
          id: 'auth.form.email',
          defaultMessage: 'Email',
        })}
        icon={<EnvelopeClosedIcon />}
        error={
          errors.email &&
          intl.formatMessage({
            id: 'form.error.email',
            defaultMessage: 'Invalid email',
          })
        }
        {...register('email')}
      />

      <PasswordInput
        mt="md"
        required
        placeholder={intl.formatMessage({
          id: 'auth.form.password',
          defaultMessage: 'Password',
        })}
        label={intl.formatMessage({
          id: 'auth.form.password',
          defaultMessage: 'Password',
        })}
        icon={<LockClosedIcon />}
        error={
          errors.password &&
          intl.formatMessage({
            id: 'form.error.password',
            defaultMessage: 'Must contain at least 8 characters',
          })
        }
        {...register('password')}
      />

      <Button color="blue" type="submit" mt="xl" loading={isSubmitting}>
        {intl.formatMessage({
          id: 'auth.form.log_in',
          defaultMessage: 'Log In',
        })}
      </Button>
    </form>
  );
}
