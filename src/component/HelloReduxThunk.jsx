import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider, useSelector } from 'react-redux';
import thunk from 'redux-thunk';

const INITIAL_STATE = { user: '' };
const SET_USER = 'SET_USER';

// thunk 구조 따라서 구현
const customMiddleware =
  ({ dispatch, getState }) =>
  next =>
  action => {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }
    next(action);
  };

const rootReducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
  }
  return state;
};

const store = createStore(rootReducer, INITIAL_STATE, applyMiddleware(thunk));

const fetchUser = id => {
  return (dispatch, getState) => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(response => response.json())
      .then(json => {
        dispatch({ type: SET_USER, payload: json });
      });
  };
};

store.dispatch(fetchUser(Math.floor(Math.random() * 10) + 1));

// store.subscribe(() => {
//   console.log(store.getState());
// });

function Component() {
  const user = useSelector(state => state.user);
  return <>{user?.name}</>;
}

export default function HelloReduxThunk() {
  return (
    <Provider store={store}>
      <Component />
    </Provider>
  );
}
