import { useEffect, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate, useParams } from 'react-router-dom';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import ChartPage from '@page/ChartPage';
import PlaygroundPage from '@page/PlaygroundPage';
import { useAtom } from 'jotai';
import { localeAtom } from '../App';
import { getLocaleObject, toIntl } from '../util/locale';
import AbortControllerTest from './AbortControllerTest';

const DEFAULT_ACTIVE_TAB = 'abort_controller';

/**
 * @link https://www.pluralsight.com/guides/handling-tabs-using-page-urls-and-react-router-doms
 **/
export default function Home() {
  const { formatMessage } = useIntl();
  const locales = useMemo(() => getLocaleObject(formatMessage, {
    hello: 'w.hello',
    testLocaleMessage: ['t.multi', ['t.multi', 'w.hello', 'w.locale'], ['t.multi', 'w.really', 'w.welcome']],
  }), [formatMessage]);
  const testLocaleMessage = toIntl(formatMessage, ['t.multi', ['t.multi', 'w.hello', 'w.locale'], ['t.multi', 'w.really', 'w.welcome']]);

  const [locale, setLocale] = useAtom(localeAtom);

  const handleLocale = () => {
    setLocale(prev => (prev === 'ko' ? 'en' : 'ko'));
  };

  const tabs = {
    abort_controller: {
      title: 'abort_controller',
      content: <AbortControllerTest/>,
    },
    use_interval: {
      title: 'use_interval',
      content: <PlaygroundPage/>,
    },
    chart: {
      title: 'chart',
      content: <ChartPage/>,
    },
    react_intl: {
      title: 'react_intl',
      content: (
        <h4 className="text-success">
          <input checked={locale === 'ko'} type="checkbox" onChange={handleLocale}/>
          &nbsp;|&nbsp;
          {testLocaleMessage}
          &nbsp;|&nbsp;
          {locales.hello}
          &nbsp;|&nbsp;
          {locales.testLocaleMessage}
        </h4>
      ),
    },
  };
  const { active_tab } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!active_tab)
      navigate(`/home/${DEFAULT_ACTIVE_TAB}`);

  }, []);

  const toggle = tab => {
    if (active_tab !== tab)
      navigate(`/home/${tab}`);

  };

  return (
    <>
      <div className="row p-4">
        <div className="col-lg-12">
          <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={active_tab}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={(event, newValue) => toggle(newValue)}>
                  {
                    Object.entries(tabs).map(([tabKey, tabValue]) => (
                      <Tab key={tabKey} label={tabValue.title} value={tabKey}/>
                    ))
                  }
                </TabList>
              </Box>
              {
                Object.entries(tabs).map(([tabKey, tabValue]) => (
                  <TabPanel key={tabKey} value={tabKey}>
                    {tabValue.content}
                  </TabPanel>
                ))
              }
            </TabContext>
          </Box>
        </div>
      </div>
    </>
  );
}
