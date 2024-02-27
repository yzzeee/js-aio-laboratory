import { useState } from 'react';
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

function Component() {
  const [count, setCount] = useState(0);
  store.subscribe(function listener() {
    setCount(store.getState());
  });

  return (
    <div>
      <p>
        🍆 <span className="m-5" id="value">{count}</span>
        <button className="btn-primary mr-2"
                id="increment"
                onClick={() => {
            store.dispatch({ type: 'INCREMENT' });
          }}>
          +
        </button>
        <button className="btn-primary"
                id="decrement"
                onClick={() => {
            store.dispatch({ type: 'DECREMENT' });
          }}>
          -
        </button>
      </p>
    </div>
  );
}

export default function HelloRedux() {
  return <Component/>;
}
