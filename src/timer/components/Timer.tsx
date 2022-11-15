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
import { messages } from '../../assets/BreakMessages';

const Timer: FunctionComponent = () => {
  const INITIAL_WORK_TIME_IN_SECONDS = 25 * 60; // 25 minutes
  const INITIAL_SHORT_BREAK_TIME_IN_SECONDS = 5 * 60; // 5 minutes
  const INITIAL_LONG_BREAK_TIME_IN_SECONDS = 15 * 60; // 15 minutes

  const [timer, setTimer] = useState(INITIAL_WORK_TIME_IN_SECONDS);

  const dispatch = useDispatch();
  const active = useSelector((state: any) => state.timer.isTimerActive);
  const task = useSelector((state: any) => state.query.task);
  const taskIsAccepted = useSelector((state: any) => state.query.isTaskVisible);
  const intervalCount = useSelector((state: any) => state.timer.intervalCount);
  const isBreakTime = useSelector((state: any) => state.timer.pomodoroState);

  const randomBreakMessage = useMemo(
    () => messages[Math.floor(Math.random() * 5)].text,
    [isBreakTime]
  );

  const activateTask = (interval: any) => {
    dispatch(queryActions.toggleTask());
    dispatch(timerActions.toggleTimer());

    clearInterval(interval);
  };

  useEffect(() => {
    if (active) {
      const interval = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);

      if (timer === 1495 && intervalCount === 0) {
        activateTask(interval);
        setTimer(INITIAL_SHORT_BREAK_TIME_IN_SECONDS);
        dispatch(timerActions.increaseIntervalCount());
        dispatch(timerActions.changePomodoroState('shortBreak'));
      }
      console.log(intervalCount);
      if (timer === 295 && intervalCount === 1) {
        activateTask(interval);
        setTimer(INITIAL_WORK_TIME_IN_SECONDS);
        dispatch(timerActions.increaseIntervalCount());
        dispatch(timerActions.changePomodoroState('work'));
      }

      if (timer === 1495 && intervalCount === 2) {
        activateTask(interval);
        setTimer(INITIAL_SHORT_BREAK_TIME_IN_SECONDS);
        dispatch(timerActions.increaseIntervalCount());
        dispatch(timerActions.changePomodoroState('shortBreak'));
      }

      if (timer === 295 && intervalCount === 3) {
        activateTask(interval);
        setTimer(INITIAL_WORK_TIME_IN_SECONDS);
        dispatch(timerActions.increaseIntervalCount());
        dispatch(timerActions.changePomodoroState('work'));
      }

      if (timer === 1495 && intervalCount === 4) {
        activateTask(interval);
        setTimer(INITIAL_SHORT_BREAK_TIME_IN_SECONDS);
        dispatch(timerActions.increaseIntervalCount());
        dispatch(timerActions.changePomodoroState('shortBreak'));
      }

      if (timer === 295 && intervalCount === 5) {
        activateTask(interval);
        setTimer(INITIAL_WORK_TIME_IN_SECONDS);
        dispatch(timerActions.increaseIntervalCount());
        dispatch(timerActions.changePomodoroState('work'));
      }

      if (timer === 1495 && intervalCount === 6) {
        activateTask(interval);
        setTimer(INITIAL_LONG_BREAK_TIME_IN_SECONDS);
        dispatch(timerActions.increaseIntervalCount());
        dispatch(timerActions.changePomodoroState('longBreak'));
      }

      if (timer === 895 && intervalCount === 7) {
        activateTask(interval);
        setTimer(INITIAL_WORK_TIME_IN_SECONDS);
        dispatch(timerActions.resetIntervalCount());
        dispatch(timerActions.changePomodoroState('work'));
      }
      console.log(intervalCount);

      return () => {
        clearInterval(interval);
      };
    }
  }, [active, timer]);

  const minutes = useMemo(() => Math.floor(timer / 60), [timer]);
  const seconds = useMemo(() => timer % 60, [timer]);

  // const previousPomodoroState = () => {
  //   setIntervalCount((prevIntervalCount) => prevIntervalCount - 1);
  // };

  // const skipCurrentPomodoroState = () => {
  //   setIntervalCount((prevIntervalCount) => prevIntervalCount + 1);
  // };

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
        onClick={activateTask}
        src="https://i.pinimg.com/originals/8c/5b/1e/8c5b1e51887a9c76d35c27da5a133d1d.jpg"
      />
      <h1 className="task">{active && taskIsAccepted && task}</h1>
      <h1>
        {(isBreakTime === 'shortBreak' || isBreakTime === 'longBreak') &&
          randomBreakMessage}
      </h1>
      <h1 className="timer">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </h1>
      <div style={{ marginTop: '-35px' }}>
        <button>PREV</button> <button>SKIP</button>
      </div>
      <br />
    </Fragment>
  );
};

export default Timer;
