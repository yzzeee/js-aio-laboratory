import React from 'react';
import { createStore } from 'redux';
import { Provider, connect, useSelector, useDispatch } from 'react-redux';

const INCREMENT1 = 'INCREMENT1';
const INCREMENT2 = 'INCREMENT2';
const DECREMENT1 = 'DECREMENT1';
const DECREMENT2 = 'DECREMENT2';

function counter(state, action) {
  if (state === undefined) {
    return { count1: 0, count2: 0 };
  }

  switch (action.type) {
    case INCREMENT1:
      return { ...state, count1: state.count1 + 1 };
    case INCREMENT2:
      return { ...state, count2: state.count2 + 1 };
    case DECREMENT1:
      return { ...state, count1: state.count1 - 1 };
    case DECREMENT2:
      return { ...state, count2: state.count2 - 1 };
    default:
      return state;
  }
}

const store = createStore(counter);

class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { count, increment, decrement } = this.props;

    return (
      <p>
        🍋 <span>{count}</span>
        <button onClick={() => increment()}>+</button>
        <button onClick={() => decrement()}>-</button>
      </p>
    );
  }
}

const mapStateToProps = state => ({
  count: state.count1,
});

const mapDispatchToProps = dispatch => ({
  increment: () => dispatch({ type: INCREMENT1 }),
  decrement: () => dispatch({ type: DECREMENT1 }),
});

const ClassComponentCounter = connect(
  mapStateToProps,
  mapDispatchToProps
)(ClassComponent);

function FunctionalComponentCounter() {
  const count = useSelector(state => state.count2);
  const dispatch = useDispatch();
  return (
    <p>
      🍓 <span>{count}</span>
      <button onClick={() => dispatch({ type: INCREMENT2 })}>+</button>
      <button onClick={() => dispatch({ type: DECREMENT2 })}>-</button>
    </p>
  );
}

export default function HelloReactRedux() {
  return (
    <Provider store={store}>
      <ClassComponentCounter />
      <FunctionalComponentCounter />
    </Provider>
  );
}
