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

const HelloZustand = () => {
  const { cleanCounterStore } = useCounterStore.use.actions();

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl">
      <First/>
      &nbsp;&nbsp;
      <AddFirstButton/>
      &nbsp;&nbsp;
      <Second/>
      &nbsp;&nbsp;
      <AddSecondButton/>
      &nbsp;&nbsp;
      <br/>
    </div>
  );
};

export default HelloZustand;
