import { useState } from 'react';
import { useInterval } from '../hook/useInterval';

export default function PlaygroundPage() {
  const [state, setState] = useState(1);
  const { start, stop, isActive } = useInterval(
    interval => {
      setState(prev => prev + 1);
      console.log('Callback every 5000 ms', interval);
    },
    5000,
    {
      autoStart: true,
      immediate: false,
      selfCorrecting: true,
      onFinish: () => {
        console.log('Callback when timer is stopped');
      },
    },
  );
  const [active, setActive] = useState(isActive());
  const [triggerFinishCallback, setTriggerFinishCallback] = useState(true);

  return (
    <div className="bg-white p-5">
      {state}
      &nbsp;&nbsp;
      <button className="btn-primary" id="start" type="button" onClick={start}>
        Start
      </button>
      &nbsp;&nbsp;
      <button className="btn-primary" id="stop" type="button" onClick={() => stop(triggerFinishCallback)}>
        Stop
      </button>
      &nbsp;&nbsp;
      <button className="btn-primary" id="checkActive" type="button" onClick={() => setActive(isActive())}>
        Check active
      </button>
      &nbsp;&nbsp;
      <div id="active">Active: {active ? 1 : 0}</div>
      <div>
        <label htmlFor="trigger-finish-callback">
          <input defaultChecked={triggerFinishCallback}
                 id="trigger-finish-callback"
                 type="checkbox"
                 onChange={() => setTriggerFinishCallback(current => !current)}/>
          Trigger finish callback
        </label>
      </div>
    </div>
  );
}
