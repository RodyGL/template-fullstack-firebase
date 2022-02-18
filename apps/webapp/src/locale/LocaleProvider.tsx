import type { ComponentProps, ReactNode } from 'react';
import { useEffect, useState } from 'react';

import { IntlProvider } from 'react-intl';

import { getLocale } from './utils';

const userLocale = getLocale();

async function loadLocaleData(locale: FormatjsIntl.IntlConfig['locale']) {
  switch (locale) {
    case 'es':
      return import('./es.json');
    default:
      return Promise.resolve(undefined);
  }
}

interface LocaleProviderProps {
  children: ReactNode;
  pendingElement: ReactNode;
}

export function LocaleProvider(props: LocaleProviderProps) {
  const [messages, setMessages] =
    useState<ComponentProps<typeof IntlProvider>['messages']>();

  useEffect(() => {
    loadLocaleData(userLocale)
      .then((fetchedMessages) => setMessages(fetchedMessages?.default))
      .catch(() => setMessages(undefined));
  }, []);

  if (!messages && userLocale !== 'en') {
    return <>{props.pendingElement}</>;
  }

  return (
    <IntlProvider
      locale={messages ? userLocale : 'en'}
      defaultLocale="en"
      messages={messages}
    >
      {props.children}
    </IntlProvider>
  );
}
