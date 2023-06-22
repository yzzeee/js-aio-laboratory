import { useCallback, useEffect, useRef } from 'react';

const noop = (): void => null;

type EmptyCallback = () => void;

export type IntervalHookCallback = (ticks?: number) => void;
export type IntervalHookFinishCallback = () => void;
export type IntervalHookStartMethod = EmptyCallback;
export type IntervalHookStopMethod = (triggerFinishCallback?: boolean) => void;
export type IntervalHookIsActiveMethod = () => boolean;

/**
 * useInterval 옵션 타입
 *
 * @type {Object} IntervalHookOptions
 * @property {IntervalHookFinishCallback} [onFinish=noop] - 인터벌이 종료되었을 때 실행되는 함수
 * @property {boolean} [autoStart=true] - 마운트 시 Interval 자동으로 시작할지 여부
 * @property {boolean} [immediate=false] - Interval 시작 직후에 콜백 함수를 즉시 실행할지 여부
 * @property {boolean} [selfCorrecting=true] - Interval 이 예상 시간보다 늦어지면 자동으로 시간을 조절할지 여부
 */
export interface IntervalHookOptions {
  onFinish?: IntervalHookFinishCallback;
  autoStart?: boolean;
  immediate?: boolean;
  selfCorrecting?: boolean;
}

/**
 * useInterval 반환 타입
 *
 * @type {Object} IntervalHookResult
 * @property {IntervalHookStartMethod} start - Interval 시작 함수
 * @property {IntervalHookStopMethod} stop - Interval 중지 함수
 * @property {IntervalHookIsActiveMethod} isActive - Interval 활성화 여부 확인 함수
 */
export type IntervalHookResult = {
  start: IntervalHookStartMethod;
  stop: IntervalHookStopMethod;
  isActive: IntervalHookIsActiveMethod;
};

/**
 * Interval 간 콜백 함수를 실행하는 훅
 *
 * @param {IntervalHookCallback} callback - 매 tick 마다 실행되는 함수
 * @param {number} [interval=1000] - Interval tick milliseconds
 * @param {IntervalHookOptions} [options={}] - useInterval 훅 옵션
 * @returns {IntervalHookResult} useInterval 훅 반환값
 */
export function useInterval(
  callback: IntervalHookCallback,
  interval = 1000,
  { onFinish = noop, autoStart = true, immediate = false, selfCorrecting = true }: IntervalHookOptions = {},
): IntervalHookResult {
  const timer = useRef<NodeJS.Timeout>();
  const active = useRef<boolean>(false);
  const expected = useRef<number | null>(null);
  const savedCallback = useRef<IntervalHookCallback>(callback);

  const tick = useCallback(() => {
    const expectedTimestamp = expected.current || 0;

    if (selfCorrecting) {
      const delay = Date.now() - expectedTimestamp;
      const ticks = 1 + (delay > 0 ? Math.floor(delay / interval) : 0);
      expected.current = expectedTimestamp + interval * ticks;
      set(Math.max(interval - delay, 1));
      savedCallback.current(ticks);
    } else {
      set(interval);
      savedCallback.current();
    }

  }, [interval]);

  const set = useCallback(
    ms => {
      if (timer.current !== undefined)
        clearTimeout(timer.current);

      if (active.current)
        timer.current = setTimeout(tick, ms);
      else
        console.debug(
          'Trying to set interval timeout on inactive timer, this is no-op and probably indicates bug in your code.',
        );

    },
    [tick, active],
  );

  const start = useCallback(() => {
    const isActive = active.current;
    active.current = true;

    if (expected.current === null)
      expected.current = Date.now() + interval;

    if (immediate && !isActive) {
      expected.current -= interval;
      tick();
    }

    set(interval);
  }, [tick, interval, immediate, set]);

  const stop = useCallback(
    (triggerFinish = true) => {
      const isActive = active.current;

      if (timer.current !== undefined)
        clearTimeout(timer.current);

      active.current = false;
      timer.current = undefined;
      expected.current = null;
      if (isActive && triggerFinish)
        onFinish();

    },
    [onFinish],
  );

  const isActive = useCallback(() => active.current, []);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    autoStart && start();

    return stop;
  }, []);

  return { start, stop, isActive };
}
