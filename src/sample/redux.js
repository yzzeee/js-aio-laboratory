import * as Redux from 'redux';

function counter(state, action) {
  if (state === undefined)
    return 0;

  switch (action.type) {
  case 'INCREMENT':
    return state + 1;
  case 'DECREMENT':
    return state - 1;
  default:
    return state;
  }
}

const store = Redux.createStore(counter);

document.getElementById('increment').addEventListener('click', function() {
  store.dispatch({ type: 'INCREMENT' });
});

document.getElementById('decrement').addEventListener('click', function() {
  store.dispatch({ type: 'DECREMENT' });
});

store.subscribe(listener);

function listener() {
  document.getElementById('value').innerText = store.getState();
}
