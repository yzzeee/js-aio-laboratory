import { useState } from 'react';
import { IntlProvider } from 'react-intl';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { t_en, t_ko, w_en, w_ko } from '@locale';
import HelloReact from './component/HelloReact';
import HelloReactRedux from './component/HelloReactRedux';
import HelloRedux from './component/HelloRedux';
import HelloReduxSaga from './component/HelloReduxSaga';
import HelloReduxThunk from './component/HelloReduxThunk';
import Home from './component/Home';
import PlaygroundPage from './page/PlaygroundPage';

const DEFAULT_LOCALE = 'ko';
const messages = {
  en: Object.assign({}, t_en, w_en),
  ko: Object.assign({}, t_ko, w_ko),
};

export default function App() {
  const [locale, setLocale] = useState(DEFAULT_LOCALE);
  const handleLocale = () => {
    setLocale(prev => prev === 'ko' ? 'en' : 'ko');
  };
  return (
    <IntlProvider key={locale} locale={locale} messages={messages[locale]}>
      <input type='checkbox' checked={locale === 'ko'} onChange={handleLocale} />
      <Router>
        <div>
          <Link to='/'>Playground</Link>
          <Link to='/react'>React</Link>
          <Link to='/redux'>Redux</Link>
          <Link to='/react-redux'>React Redux</Link>
          <Link to='/redux-thunk'>Redux Thunk</Link>
          <Link to='/redux-saga'>Redux Saga</Link>

          <Routes>
            <Route path='/' element={<PlaygroundPage />} />
            <Route path='/:active_tab' element={<Home />} />
            <Route path='/react' element={<HelloReact />} />
            <Route path='/redux' element={<HelloRedux />} />
            <Route path='/react-redux' element={<HelloReactRedux />} />
            <Route path='/redux-thunk' element={<HelloReduxThunk />} />
            <Route path='/redux-saga' element={<HelloReduxSaga />} />
          </Routes>
        </div>
      </Router>
    </IntlProvider>
  );
}
