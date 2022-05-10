import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import Home from './component/Home';
import HelloReact from './component/HelloReact';
import HelloRedux from './component/HelloRedux';
import HelloReactRedux from './component/HelloReactRedux';
import HelloReduxThunk from './component/HelloReduxThunk';
import HelloReduxSaga from './component/HelloReduxSaga';
import { IntlProvider } from 'react-intl';
import { t_en, t_ko, w_en, w_ko } from '@locale';

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
          <Link to='/'>Home</Link>
          <Link to='/react'>React</Link>
          <Link to='/redux'>Redux</Link>
          <Link to='/react-redux'>React Redux</Link>
          <Link to='/redux-thunk'>Redux Thunk</Link>
          <Link to='/redux-saga'>Redux Saga</Link>

          <Routes>
            <Route path='/' element={<Home />} />
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
