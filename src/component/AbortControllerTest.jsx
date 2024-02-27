import { useCallback, useState } from 'react';

const BUTTON = {
  RUN: 'RUN',
  STOP: 'STOP',
};

const AbortControllerTest = () => {
  const [activeButton, setActiveButton] = useState(BUTTON.RUN);
  const [abortController, setAbortController] = useState(null);

  const handleRunClick = useCallback(async e => {
    setActiveButton(BUTTON.STOP);
    const ac = new AbortController();
    setAbortController(ac);
    const result = await fetch('https://hub.dummyapis.com/delay?seconds=10', { signal: ac.signal });
    console.log('done!', result.json());
  }, []);

  const handleStopClick = useCallback(async e => {
    abortController?.abort(); // 5
    setAbortController(null);
    setActiveButton(BUTTON.RUN);
  }, [abortController]);

  return (
    <>
      {activeButton === BUTTON.RUN && <button className="btn-primary" onClick={handleRunClick}>RUN</button>}
      {activeButton === BUTTON.STOP && <button className="btn-primary" onClick={handleStopClick}>STOP</button>}
    </>
  );
};

export default AbortControllerTest;
