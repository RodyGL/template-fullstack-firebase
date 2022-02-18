import type messages from './locale/es.json';

declare global {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const __DEV__: boolean;

  namespace FormatjsIntl {
    interface Message {
      ids: keyof typeof messages;
    }

    interface IntlConfig {
      locale: 'en' | 'es';
    }
  }
}
