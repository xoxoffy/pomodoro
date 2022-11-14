import {
  Fragment,
  FunctionComponent,
  useEffect,
  useMemo,
  useState,
} from 'react';
import './Timer.css';

const Timer: FunctionComponent = () => {
  const INITIAL_TIME_IN_SECONDS = 25 * 60; // 25 minutes
  const INITIAL_SHORT_BREAK_TIME_IN_SECONDS = 5 * 60; // 5 minutes
  let intervalCount = 0;

  const [timer, setTimer] = useState(INITIAL_TIME_IN_SECONDS);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (active) {
      const interval = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);

      if (timer === 0 && intervalCount === 1) {
        setActive(false);
        clearInterval(interval);
        setTimer(INITIAL_TIME_IN_SECONDS);
      }

      if (timer === 0) {
        setActive(false);
        clearInterval(interval);
        setTimer(INITIAL_TIME_IN_SECONDS);
      }
      return () => {
        clearInterval(interval);
      };
    }
  }, [active, timer]);

  const minutes = useMemo(() => Math.floor(timer / 60), [timer]);
  const seconds = useMemo(() => timer % 60, [timer]);

  return (
    <Fragment>
      <br />
      <div className="state-buttons">
        <button>Working!</button>
        <button>Short Break</button>
        <button>Long Break</button>
      </div>
      <br />
      <img
        onClick={() => setActive(!active)}
        src="https://i.pinimg.com/originals/8c/5b/1e/8c5b1e51887a9c76d35c27da5a133d1d.jpg"
      />
      <h1 className="task">Task</h1>
      <h1 className="timer">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </h1>
    </Fragment>
  );
};

export default Timer;
