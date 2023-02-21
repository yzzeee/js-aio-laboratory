import { CounterSlice } from 'counter-module';
import { ZustandFuncSelectors } from 'auto-zustand-selectors-hook';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

const INITIAL_STATE = {
  id: 'A',
  first: 0,
  second: 0,
  person: {
    name: 'yj',
    age: 31,
  },
};

const STORE = 'COUNTER';

const store = create<CounterSlice>()(
  devtools(
    persist(
      immer((setStore, getStore) => ({
        ...INITIAL_STATE,
        actions: {
          cleanCounterStore: () => {
            setStore(INITIAL_STATE);
          },
          addFirst: () => setStore({
            first: getStore().first + 1,
          }),
          addSecond: () => setStore(state => {
            console.log('이런 저런 작업');
            state.second = getStore().second + 1;
          }),
        },
      })), {
        name: `se-persist:${STORE}`,
      }), {
      name: `${STORE}`,
      enabled: process.env.NODE_ENV === 'development',
      trace: true,
    }),
);

function createSelectorFunctions(_store) {
  const storeIn = _store;
  storeIn.use = {};
  Object.keys(storeIn.getState()).forEach(function(key) {
    const selector = function(state) {
      return state[key];
    };
    storeIn.use[key] = function() {
      return storeIn(selector);
    };
  });
  return _store;
}

export const useCounterStore = createSelectorFunctions(store) as typeof store & ZustandFuncSelectors<CounterSlice>;
