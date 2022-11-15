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
  const INITIAL_WORK_TIME_IN_SECONDS = 25 * 60; // 25 minutes
  const INITIAL_SHORT_BREAK_TIME_IN_SECONDS = 5 * 60; // 5 minutes
  const INITIAL_LONG_BREAK_TIME_IN_SECONDS = 15 * 60; // 15 minutes

  const [intervalCount, setIntervalCount] = useState(0);

  const dispatch = useDispatch();
  const active = useSelector((state: any) => state.timer.isTimerActive);
  const task = useSelector((state: any) => state.query.task);
  const taskIsAccepted = useSelector((state: any) => state.query.isTaskVisible);

  const activateTaskHandler = () => {
    dispatch(queryActions.toggleTask());
    dispatch(timerActions.toggleTimer());
  };

  const [timer, setTimer] = useState(INITIAL_WORK_TIME_IN_SECONDS);

  useEffect(() => {
    if (active) {
      const interval = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);

      if (timer === 1495 && intervalCount === 0) {
        // worktimer 0 work 1
        dispatch(timerActions.toggleTimer());
        clearInterval(interval);
        setTimer(INITIAL_SHORT_BREAK_TIME_IN_SECONDS);
        dispatch(queryActions.toggleTask());
        setIntervalCount((prevCount) => prevCount + 1);
      }
      console.log(intervalCount);
      if (timer === 295 && intervalCount === 1) {
        // shortBr timer 0 shortbr 1
        dispatch(timerActions.toggleTimer());
        clearInterval(interval);
        setTimer(INITIAL_WORK_TIME_IN_SECONDS);
        dispatch(queryActions.toggleTask());
        setIntervalCount((prevCount) => prevCount + 1);
      }

      if (timer === 1495 && intervalCount === 2) {
        // worktimer 0 work 2
        dispatch(timerActions.toggleTimer());
        clearInterval(interval);
        setTimer(INITIAL_SHORT_BREAK_TIME_IN_SECONDS);
        dispatch(queryActions.toggleTask());
        setIntervalCount((prevCount) => prevCount + 1);
      }

      if (timer === 295 && intervalCount === 3) {
        // shortBr timer 0 shortbr 2
        dispatch(timerActions.toggleTimer());
        clearInterval(interval);
        setTimer(INITIAL_WORK_TIME_IN_SECONDS);
        dispatch(queryActions.toggleTask());
        setIntervalCount((prevCount) => prevCount + 1);
      }

      if (timer === 1495 && intervalCount === 4) {
        // worktimer 0 work 3
        dispatch(timerActions.toggleTimer());
        clearInterval(interval);
        setTimer(INITIAL_SHORT_BREAK_TIME_IN_SECONDS);
        dispatch(queryActions.toggleTask());
        setIntervalCount((prevCount) => prevCount + 1);
      }

      if (timer === 295 && intervalCount === 5) {
        // shortBr timer 0 shortbr 3
        dispatch(timerActions.toggleTimer());
        clearInterval(interval);
        setTimer(INITIAL_WORK_TIME_IN_SECONDS);
        dispatch(queryActions.toggleTask());
        setIntervalCount((prevCount) => prevCount + 1);
      }

      if (timer === 1495 && intervalCount === 6) {
        // worktimer 0 work 4
        dispatch(timerActions.toggleTimer());
        clearInterval(interval);
        setTimer(INITIAL_LONG_BREAK_TIME_IN_SECONDS);
        dispatch(queryActions.toggleTask());
        setIntervalCount((prevCount) => prevCount + 1);
      }

      if (timer === 895 && intervalCount === 7) {
        // longBR 1
        dispatch(timerActions.toggleTimer());
        clearInterval(interval);
        setTimer(INITIAL_WORK_TIME_IN_SECONDS);
        dispatch(queryActions.toggleTask());
        setIntervalCount(0);
      }
      console.log(intervalCount);

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
