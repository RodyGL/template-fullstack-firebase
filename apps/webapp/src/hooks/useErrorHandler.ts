import type { NotificationProps } from '@mantine/notifications';
import { useNotifications } from '@mantine/notifications';
import { FirebaseError } from 'firebase/app';
import { useIntl } from 'react-intl';

export function useErrorHandler() {
  const intl = useIntl();
  const notifications = useNotifications();

  function handleError(error: unknown): string {
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.error(error);
    }

    const defaultNotificationProps: Partial<NotificationProps> = {
      color: 'red',
      autoClose: 1000 * 10, // 10 seconds
    };

    if (error instanceof FirebaseError) {
      const errorDescriptor = getFirebaseAuthErrorDescriptor(error);

      return notifications.showNotification({
        ...defaultNotificationProps,
        title:
          errorDescriptor.messageId === 'auth.error.default'
            ? intl.formatMessage({
                id: 'auth.error.default_title',
                defaultMessage: 'Unknown error',
              })
            : undefined,
        message: intl.formatMessage(
          {
            id: errorDescriptor.messageId,
            defaultMessage: errorDescriptor.defaultMessage,
          },
          { errorCode: error.code }
        ),
      });
    }

    if (error instanceof Error) {
      return notifications.showNotification({
        ...defaultNotificationProps,
        title: intl.formatMessage({
          id: 'auth.error.default_title',
          defaultMessage: 'Unknown error',
        }),
        message: intl.formatMessage(
          {
            id: 'auth.error.default',
            defaultMessage:
              'Please report the following error code: `{errorCode}`',
          },
          { errorCode: error.message }
        ),
      });
    }

    if (!__DEV__) {
      // eslint-disable-next-line no-console
      console.error(error);
    }

    return notifications.showNotification({
      ...defaultNotificationProps,
      message: 'Internal app error. Please report this issue to changeme.',
    });
  }

  return { handleError };
}

interface ErrorDescriptor {
  messageId: FormatjsIntl.Message['ids'];
  defaultMessage: string;
}

function getFirebaseAuthErrorDescriptor(error: FirebaseError): ErrorDescriptor {
  const errorCode = error.code;

  switch (errorCode) {
    case 'auth/user-not-found':
      return {
        messageId: 'auth.error.user_not_found',
        defaultMessage: 'We could not find your changeme account.',
      };

    case 'auth/wrong-password':
      return {
        messageId: 'auth.error.user_not_found',
        defaultMessage: 'We could not find your changeme account.',
      };

    default:
      return {
        messageId: 'auth.error.default',
        defaultMessage: 'Please report the following error code: `{errorCode}`',
      };
  }
}
