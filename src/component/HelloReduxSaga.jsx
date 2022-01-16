import React from 'react';
import { applyMiddleware, createStore } from 'redux';
import { Provider, useSelector } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { all, call, delay, put, take, takeEvery } from 'redux-saga/effects';

const ASYNC_ACTION1 = 'ASYNC_ACTION1';
const ASYNC_ACTION2 = 'ASYNC_ACTION2';
const ASYNC_GET_COMMENT = 'ASYNC_GET_COMMENT';
const SET_COMMENT = 'SET_COMMENT';

function reducer(state, action) {
  switch (action.type) {
    case SET_COMMENT:
      return { ...state, comment: action.payload };
    default:
      return state;
  }
}

function* helloSaga() {
  while (true) {
    console.log('START HELLO SAGA');
    yield take(ASYNC_ACTION1);
    yield delay(1000);
    console.log('END ASYNC ACTION1');
    yield take(ASYNC_ACTION2);
    yield delay(1000);
    console.log('END ASYNC ACTION2');
  }
}

function* watchCommentSaga() {
  yield takeEvery(ASYNC_GET_COMMENT, function* () {
    const comment = yield call(
      id =>
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`).then(res =>
          res.json()
        ),
      Math.floor(Math.random() * 10) + 1
    );

    yield put({ type: SET_COMMENT, payload: comment });
  });
}

function* rootSaga() {
  yield all([helloSaga(), watchCommentSaga()]);
}

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

store.dispatch({ type: ASYNC_GET_COMMENT });

// store.subscribe(() => console.log(store.getState()));

function Component() {
  const comment = useSelector(state => state?.comment);
  return <>{comment?.username}</>;
}

export default function HelloReduxSaga() {
  return (
    <Provider store={store}>
      <Component />
    </Provider>
  );
}
