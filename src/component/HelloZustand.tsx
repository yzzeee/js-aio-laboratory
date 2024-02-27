import React from 'react';
import { useCounterStore } from '../zustand/counter.store';

const First = () => {
  const { first } = useCounterStore();
  return (
    <span>
      First: {first}
    </span>
  );
};

const Second = () => {
  const second = useCounterStore.use.second();
  return (
    <span>
      Second: {second}
    </span>
  );
};

const AddSecondButton = () => {
  const { addSecond } = useCounterStore.use.actions();
  return (
    <button className="btn-primary" onClick={addSecond}>
      Add Second
    </button>
  );
};

const AddFirstButton = () => {
  const { addFirst } = useCounterStore.use.actions();
  return (
    <button className="btn-primary" onClick={addFirst}>
      Add First
    </button>
  );
};

const HelloZustand = () => (
  <>
    <First/>
    &nbsp;&nbsp;
    <AddFirstButton/>
    &nbsp;&nbsp;
    <Second/>
    &nbsp;&nbsp;
    <AddSecondButton/>
    &nbsp;&nbsp;
    <br/>
  </>
);

export default HelloZustand;
