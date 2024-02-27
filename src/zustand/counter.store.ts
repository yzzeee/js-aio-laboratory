import { CounterSlice } from 'counter-module';
import { ZustandFuncSelectors, createSelectorFunctions } from 'auto-zustand-selectors-hook';
import { omit } from 'lodash';
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
        partialize: state => {
          const omitted = ['actions']; /* 함수를 제외하지 않으면, 정상동작 하지 않음 */
          return omit(state, omitted);
        },
      }), {
      name: `${STORE}`,
      enabled: process.env.NODE_ENV === 'development',
      trace: true,
    }),
);

export const useCounterStore = createSelectorFunctions(store) as typeof store & ZustandFuncSelectors<CounterSlice>;
