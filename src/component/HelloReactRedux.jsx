import { Provider, connect, useDispatch, useSelector } from 'react-redux';
import { createStore } from 'redux';

const INCREMENT1 = 'INCREMENT1';
const INCREMENT2 = 'INCREMENT2';
const DECREMENT1 = 'DECREMENT1';
const DECREMENT2 = 'DECREMENT2';

function counter(state, action) {
  if (state === undefined)
    return { count1: 0, count2: 0 };

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
      <p className="mb-4">
        🍋 <span className="m-5">{count}</span>
        <button className="btn-primary mr-2" onClick={() => increment()}>+</button>
        <button className="btn-primary" onClick={() => decrement()}>-</button>
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
  mapDispatchToProps,
)(ClassComponent);

function FunctionalComponentCounter() {
  const count = useSelector(state => state.count2);
  const dispatch = useDispatch();
  return (
    <p>
      🍓 <span className="m-5">{count}</span>
      <button className="btn-primary mr-2" onClick={() => dispatch({ type: INCREMENT2 })}>+</button>
      <button className="btn-primary" onClick={() => dispatch({ type: DECREMENT2 })}>-</button>
    </p>
  );
}

export default function HelloReactRedux() {
  return (
    <Provider store={store}>
      <ClassComponentCounter/>
      <FunctionalComponentCounter/>
    </Provider>
  );
}
