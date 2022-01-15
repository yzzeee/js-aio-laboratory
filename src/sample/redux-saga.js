import React from 'react';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { delay, take } from 'redux-saga/effects';

const ASYNC_ACTION1 = 'ASYNC_ACTION1';
const ASYNC_ACTION2 = 'ASYNC_ACTION2';

function reducer(state, action) {
  console.log('REDUCER', action);
  return state;
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

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(helloSaga);

setTimeout(() => store.dispatch({ type: ASYNC_ACTION1 }), 1000);
setTimeout(() => store.dispatch({ type: ASYNC_ACTION2 }), 3000);
setTimeout(() => store.dispatch({ type: ASYNC_ACTION1 }), 5000);
setTimeout(() => store.dispatch({ type: ASYNC_ACTION1 }), 7000); // helloSaga wait ASYNC_ACTION2
setTimeout(() => store.dispatch({ type: ASYNC_ACTION2 }), 9000);

/**
 START HELLO SAGA
 REDUCER {type: 'ASYNC_ACTION1'}
 END ASYNC ACTION1
 REDUCER {type: 'ASYNC_ACTION2'}
 END ASYNC ACTION2
 START HELLO SAGA
 REDUCER {type: 'ASYNC_ACTION1'}
 END ASYNC ACTION1
 REDUCER {type: 'ASYNC_ACTION1'} // helloSaga does not work
 REDUCER {type: 'ASYNC_ACTION2'}
 END ASYNC ACTION2
 START HELLO SAGA
*/
