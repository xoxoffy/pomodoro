import {
  Fragment,
  FunctionComponent,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useSelector } from 'react-redux/es/exports';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { queryActions } from '../../store/slices/querySlice';
import { timerActions } from '../../store/slices/timerSlice';
import './Timer.css';

const Timer: FunctionComponent = () => {
  const INITIAL_TIME_IN_SECONDS = 25 * 60; // 25 minutes
  const INITIAL_SHORT_BREAK_TIME_IN_SECONDS = 5 * 60; // 5 minutes
  let intervalCount = 0;

  const dispatch = useDispatch();
  const active = useSelector((state: any) => state.timer.isTimerActive);
  const task = useSelector((state: any) => state.query.task);
  const taskIsAccepted = useSelector((state: any) => state.query.isTaskVisible);

  const [timer, setTimer] = useState(INITIAL_TIME_IN_SECONDS);

  useEffect(() => {
    if (active) {
      const interval = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);

      if (timer === 0) {
        dispatch(timerActions.toggleTimer());
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

  const activateTaskHandler = () => {
    dispatch(queryActions.toggleTask());
    dispatch(timerActions.toggleTimer());
  };

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
        onClick={activateTaskHandler}
        src="https://i.pinimg.com/originals/8c/5b/1e/8c5b1e51887a9c76d35c27da5a133d1d.jpg"
      />
      <h1 className="task">{active && taskIsAccepted && task}</h1>
      <h1 className="timer">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </h1>
    </Fragment>
  );
};

export default Timer;
