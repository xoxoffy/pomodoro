import React, {
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
  const workTimer = useSelector((state: any) => state.timer.workTimer);
  const shortBreakTimer = useSelector(
    (state: any) => state.timer.shortBreakTimer
  );
  const longBreakTimer = useSelector(
    (state: any) => state.timer.longBreakTimer
  );

  const [userTime, setCustomWorkTime] = useState<number>(workTimer);
  const [customShortBreakTime, setCustomShortBreakTime] =
    useState<number>(shortBreakTimer);
  const [customLongBreakTime, setCustomLongBreakTime] =
    useState<number>(longBreakTimer);
  const [timer, setTimer] = useState<number>(userTime);
  const [autoStartIsOn, setAutoStartIsOn] = useState(false);

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

  const activateWorkState = (interval?: any, pomodoroState?: string) => {
    if (autoStartIsOn && !active) {
      activateTask(interval);
    }
    setTimer(userTime);
    dispatch(timerActions.increaseIntervalCount());
    dispatch(timerActions.changePomodoroState(pomodoroState));
  };

  const activateBreakState = (interval?: any, pomodoroState?: string) => {
    if (autoStartIsOn && !active) {
      activateTask(interval);
    }
    if (pomodoroState === 'shortBreak') {
      setTimer(customShortBreakTime);
    } else {
      setTimer(customLongBreakTime);
    }
    dispatch(timerActions.increaseIntervalCount());
    dispatch(timerActions.changePomodoroState(pomodoroState));
  };

  useEffect(() => {
    if (active) {
      const interval: number = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);

      if (timer === 0 && intervalCount === 0) {
        activateBreakState(interval, 'shortBreak');
      }

      if (timer === 0 && intervalCount === 1) {
        activateWorkState(interval, 'work');
      }

      if (timer === 0 && intervalCount === 2) {
        activateBreakState(interval, 'shortBreak');
      }

      if (timer === 0 && intervalCount === 3) {
        activateWorkState(interval, 'work');
      }

      if (timer === 0 && intervalCount === 4) {
        activateBreakState(interval, 'shortBreak');
      }

      if (timer === 0 && intervalCount === 5) {
        activateWorkState(interval, 'work');
      }

      if (timer === 0 && intervalCount === 6) {
        activateBreakState(interval, 'longBreak');
      }

      if (timer === 0 && intervalCount === 7) {
        if (!autoStartIsOn) {
          activateTask(interval);
        }
        setTimer(userTime);
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

  const formSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    setTimer(userTime);
  };

  return (
    <Fragment>
      <br />
      <label
        className="toggle"
        style={!active ? { cursor: 'pointer' } : { cursor: 'not-allowed' }}
      >
        <input
          type="checkbox"
          onChange={() => setAutoStartIsOn(!autoStartIsOn)}
          disabled={active}
        />
        <span
          className="labels"
          data-on="Auto-Start: ON"
          data-off="Auto-Start: OFF"
        ></span>
      </label>
      <div className="state-buttons">
        <button onClick={activateWorkState}>Working!</button>
        <button
          disabled={pomodoroState === 'shortBreak'}
          onClick={() => activateBreakState(undefined, 'shortBreak')}
        >
          Short Break
        </button>
        <button
          disabled={pomodoroState === 'longBreak'}
          onClick={() => activateBreakState(undefined, 'longBreak')}
        >
          Long Break
        </button>
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
      <form onSubmit={formSubmitHandler}>
        <input
          onChange={(event) => setCustomWorkTime(event.target.value)}
          type="text"
          placeholder="Custom Work Time"
        />
        <button>Change</button>
      </form>
      <form onSubmit={formSubmitHandler}>
        <input
          onChange={(event) => setCustomShortBreakTime(event.target.value)}
          type="text"
          placeholder="Custom Short Break Time"
        />
        <button>Change</button>
      </form>
      <form onSubmit={formSubmitHandler}>
        <input
          onChange={(event) => setCustomLongBreakTime(event.target.value)}
          type="text"
          placeholder="Custom Long Break Time"
        />
        <button>Change</button>
      </form>
    </Fragment>
  );
};

export default Timer;
