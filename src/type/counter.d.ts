declare module 'counter-module' {
  export interface CounterSlice extends CounterState {
    actions: {
      cleanCounterStore: () => void;
      addFirst: () => void;
      addSecond: () => void;
    };
  }

  interface CounterState {
    id: string;
    first: number;
    second: number;
  }
}
