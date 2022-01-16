import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './component/Home';
import HelloReact from './component/HelloReact';
import HelloRedux from './component/HelloRedux';
import HelloReactRedux from './component/HelloReactRedux';
import HelloReduxThunk from './component/HelloReduxThunk';
import HelloReduxSaga from './component/HelloReduxSaga';

export default function App() {
  return (
    <Router>
      <div>
        <Link to='/'>Home</Link>
        <Link to='/react'>React</Link>
        <Link to='/redux'>Redux</Link>
        <Link to='/react-redux'>React Redux</Link>
        <Link to='/redux-thunk'>Redux Thunk</Link>
        <Link to='/redux-saga'>Redux Saga</Link>

        <Routes>
          <Route path='' element={<Home />} />
          <Route path='react' element={<HelloReact />} />
          <Route path='redux' element={<HelloRedux />} />
          <Route path='react-redux' element={<HelloReactRedux />} />
          <Route path='redux-thunk' element={<HelloReduxThunk />} />
          <Route path='redux-saga' element={<HelloReduxSaga />} />
        </Routes>
      </div>
    </Router>
  );
}
