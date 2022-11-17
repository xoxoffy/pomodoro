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
import { breakMessages, workMessages } from '../../assets/messages';
import { BsFillSkipEndFill } from 'react-icons/bs';

const Timer: FunctionComponent = () => {
  const INITIAL_WORK_TIME_IN_SECONDS = 25 * 60; // 25 minutes
  const INITIAL_SHORT_BREAK_TIME_IN_SECONDS = 5 * 60; // 5 minutes
  const INITIAL_LONG_BREAK_TIME_IN_SECONDS = 15 * 60; // 15 minutes

  const [timer, setTimer] = useState(INITIAL_WORK_TIME_IN_SECONDS);

  const dispatch = useDispatch();
  const active = useSelector((state: any) => state.timer.isTimerActive);
  const taskIsAccepted = useSelector((state: any) => state.query.isTaskVisible);

  const task = useSelector((state: any) => state.query.task);
  const intervalCount = useSelector((state: any) => state.timer.intervalCount);
  const pomodoroState = useSelector((state: any) => state.timer.pomodoroState);

  const randomBreakMessage = useMemo(
    () => breakMessages[Math.floor(Math.random() * 5)].text,
    [pomodoroState]
  );

  const randomWorkMessage = useMemo(
    () => workMessages[Math.floor(Math.random() * 5)].text,
    [pomodoroState]
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

      if (timer === 0 && intervalCount === 0) {
        activateTask(interval);
        setTimer(INITIAL_SHORT_BREAK_TIME_IN_SECONDS);
        dispatch(timerActions.increaseIntervalCount());
        dispatch(timerActions.changePomodoroState('shortBreak'));
      }

      if (timer === 0 && intervalCount === 1) {
        activateTask(interval);
        setTimer(INITIAL_WORK_TIME_IN_SECONDS);
        dispatch(timerActions.increaseIntervalCount());
        dispatch(timerActions.changePomodoroState('work'));
      }

      if (timer === 0 && intervalCount === 2) {
        activateTask(interval);
        setTimer(INITIAL_SHORT_BREAK_TIME_IN_SECONDS);
        dispatch(timerActions.increaseIntervalCount());
        dispatch(timerActions.changePomodoroState('shortBreak'));
      }

      if (timer === 0 && intervalCount === 3) {
        activateTask(interval);
        setTimer(INITIAL_WORK_TIME_IN_SECONDS);
        dispatch(timerActions.increaseIntervalCount());
        dispatch(timerActions.changePomodoroState('work'));
      }

      if (timer === 0 && intervalCount === 4) {
        activateTask(interval);
        setTimer(INITIAL_SHORT_BREAK_TIME_IN_SECONDS);
        dispatch(timerActions.increaseIntervalCount());
        dispatch(timerActions.changePomodoroState('shortBreak'));
      }

      if (timer === 0 && intervalCount === 5) {
        activateTask(interval);
        setTimer(INITIAL_WORK_TIME_IN_SECONDS);
        dispatch(timerActions.increaseIntervalCount());
        dispatch(timerActions.changePomodoroState('work'));
      }

      if (timer === 0 && intervalCount === 6) {
        activateTask(interval);
        setTimer(INITIAL_LONG_BREAK_TIME_IN_SECONDS);
        dispatch(timerActions.increaseIntervalCount());
        dispatch(timerActions.changePomodoroState('longBreak'));
      }

      if (timer === 0 && intervalCount === 7) {
        activateTask(interval);
        setTimer(INITIAL_WORK_TIME_IN_SECONDS);
        dispatch(timerActions.resetIntervalCount());
        dispatch(timerActions.changePomodoroState('work'));
      }

      return () => {
        clearInterval(interval);
      };
    }
  }, [active, timer]);

  const minutes = useMemo(() => Math.floor(timer / 60), [timer]);
  const seconds = useMemo(() => timer % 60, [timer]);

  const skipTimerHandler = () => {
    if (active && taskIsAccepted) {
      setTimer(0);
    }
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
        onClick={activateTask}
        src="https://i.pinimg.com/originals/8c/5b/1e/8c5b1e51887a9c76d35c27da5a133d1d.jpg"
      />
      <h1 className="task">{active && taskIsAccepted && task}</h1>
      <h1>
        {(pomodoroState === 'shortBreak' || pomodoroState === 'longBreak') &&
          randomBreakMessage}
      </h1>
      <h1>{pomodoroState === 'work' && randomWorkMessage}</h1>
      <h1 className="timer">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        {active && taskIsAccepted && (
          <BsFillSkipEndFill
            className="skip-button"
            onClick={skipTimerHandler}
          />
        )}
      </h1>
    </Fragment>
  );
};

export default Timer;
