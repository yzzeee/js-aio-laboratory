import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { Col, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import { getLocaleObject, toIntl } from '../util/locale';
import AbortControllerTest from './AbortControllerTest';
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

  const DEFAULT_ACTIVE_TAB = 'in_progress';

  const tabs = {
    abort_controller_test: {
      title: 'AbortControllerTest',
      content: (
        <Row className="p-2">
          <Col className="p-2" sm="12">
            <h4 className="text-info">AbortControllerTest</h4>
            <AbortControllerTest/>
          </Col>
        </Row>
      ),
    },
    in_progress: {
      title: 'In Progress',
      content: (
        <Row className="p-2">
          <Col className="p-2" sm="12">
            <h4 className="text-primary">In Progress Tasks</h4>
          </Col>
        </Row>
      ),
    },
    completed: {
      title: 'Completed',
      content: (
        <Row className="p-2">
          <Col className="p-2" sm="12">
            <h4 className="text-success">Completed Tasks</h4>
          </Col>
        </Row>
      ),
    },
  };
  const { active_tab } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!active_tab)
      navigate(`/${DEFAULT_ACTIVE_TAB}`);

  }, []);

  const toggle = tab => {
    if (active_tab !== tab)
      navigate(`/${tab}`);

  };

  return (
    <>
      <div className="row p-4">
        <div className="col-lg-12">
          <h2 className="mb-4">Tasks</h2>
          <Nav tabs>
            {
              Object.entries(tabs).map(tab => (
                <NavItem key={tab[0]}>
                  <NavLink className={active_tab === tab[0] ? 'active' : ''}
                           role="button"
                           onClick={() => {
                      toggle(tab[0]);
                    }}>
                    {tab[1].title}
                  </NavLink>
                </NavItem>
              ))
            }
          </Nav>

          <TabContent activeTab={active_tab}>
            {
              Object.entries(tabs).map(tab => (
                <TabPane key={tab[0]} tabId={tab[0]}>
                  {tab[1].content}
                  <Outlet/>
                </TabPane>
              ))
            }
          </TabContent>
        </div>
      </div>
      HOME

      &nbsp;|&nbsp;
      {testLocaleMessage}
      &nbsp;|&nbsp;
      {locales.hello}
      &nbsp;|&nbsp;
      {locales.testLocaleMessage}
    </>
  );
}
