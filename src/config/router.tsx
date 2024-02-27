import { createBrowserRouter } from 'react-router-dom';
import loadable from '@loadable/component';

const App = loadable(() => import('../App'));
const Home = loadable(() => import('../component/Home'));
const HelloReact = loadable(() => import('../component/HelloReact'));
const HelloReactRedux = loadable(() => import('../component/HelloReactRedux'));
const HelloRedux = loadable(() => import('../component/HelloRedux'));
const HelloReduxThunk = loadable(() => import('../component/HelloReduxThunk'));
const HelloReduxSaga = loadable(() => import('../component/HelloReduxSaga'));
const HelloZustand = loadable(() => import('../component/HelloZustand'));

export const ROUTE_OBJECT = [
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: 'home/:active_tab',
        element: <Home/>,
      },
      {
        path: 'react',
        element: <HelloReact/>,
      },
      {
        path: 'redux',
        element: <HelloRedux/>,
      },
      {
        path: 'react-redux',
        element: <HelloReactRedux/>,
      },
      {
        path: 'redux-thunk',
        element: <HelloReduxThunk/>,
      },
      {
        path: 'redux-saga',
        element: <HelloReduxSaga/>,
      },
      {
        path: 'zustand',
        element: <HelloZustand/>,
      },
      {
        path: '*',
        element: <>404</>,
      },
    ],
  },
];
export const router = createBrowserRouter(ROUTE_OBJECT);
