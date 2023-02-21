import { useState } from 'react';
import { IntlProvider } from 'react-intl';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { t_en, t_ko, w_en, w_ko } from '@locale';
import HelloReact from './component/HelloReact';
import HelloReactRedux from './component/HelloReactRedux';
import HelloRedux from './component/HelloRedux';
import HelloReduxSaga from './component/HelloReduxSaga';
import HelloReduxThunk from './component/HelloReduxThunk';
import HelloZustand from './component/HelloZustand';
import Home from './component/Home';
import IndexPage from './page/IndexPage';
import PlaygroundPage from './page/PlaygroundPage';

const DEFAULT_LOCALE = 'ko';
const messages = {
  en: Object.assign({}, t_en, w_en),
  ko: Object.assign({}, t_ko, w_ko),
};

export default function App() {
  const [locale, setLocale] = useState(DEFAULT_LOCALE);
  const handleLocale = () => {
    setLocale(prev => (prev === 'ko' ? 'en' : 'ko'));
  };
  return (
    <IntlProvider key={locale} locale={locale} messages={messages[locale]}>
      <input checked={locale === 'ko'} type="checkbox" onChange={handleLocale}/>
      <Router>
        <div>
          <Link to="/">Index</Link>
          <Link to="/chart">Chart</Link>
          <Link to="/react">React</Link>
          <Link to="/redux">Redux</Link>
          <Link to="/react-redux">React Redux</Link>
          <Link to="/redux-thunk">Redux Thunk</Link>
          <Link to="/redux-saga">Redux Saga</Link>
          <Link to="/zustand">Zustand</Link>

          <Routes>
            <Route element={<IndexPage/>} path="/"/>
            <Route element={<PlaygroundPage/>} path="/chart"/>
            <Route element={<Home/>} path="/:active_tab"/>
            <Route element={<HelloReact/>} path="/react"/>
            <Route element={<HelloRedux/>} path="/redux"/>
            <Route element={<HelloReactRedux/>} path="/react-redux"/>
            <Route element={<HelloReduxThunk/>} path="/redux-thunk"/>
            <Route element={<HelloReduxSaga/>} path="/redux-saga"/>
            <Route element={<HelloZustand/>} path="/zustand"/>
          </Routes>
        </div>
      </Router>
    </IntlProvider>
  );
}
