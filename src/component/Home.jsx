import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { getLocaleObject, toIntl } from '../util/locale';

export default function Home() {
  const { formatMessage } = useIntl();
  const locales = useMemo(() => {
    return getLocaleObject(formatMessage, {
      hello: 'w.hello',
      testLocaleMessage: ['t.multi', ['t.multi', 'w.hello', 'w.locale'], ['t.multi', 'w.really', 'w.welcome']],
    });
  }, [formatMessage]);
  const testLocaleMessage = toIntl(formatMessage, ['t.multi', ['t.multi', 'w.hello', 'w.locale'], ['t.multi', 'w.really', 'w.welcome']]);

  return <>
    HOME
    &nbsp;|&nbsp;
    {testLocaleMessage}
    &nbsp;|&nbsp;
    {locales.hello}
    &nbsp;|&nbsp;
    {locales.testLocaleMessage}
  </>;
}
