export function getLocale(): FormatjsIntl.IntlConfig['locale'] {
  const userLocale = navigator.language.split('-')[0]?.toLowerCase();

  switch (userLocale) {
    case 'es':
      return 'es';

    default:
      return 'en';
  }
}
