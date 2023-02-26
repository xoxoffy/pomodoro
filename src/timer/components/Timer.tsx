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
import { RootState } from '../../store/store';
import TimerSettings from '../../../timerSettings/TimerSettings';
import TimerAutoStart from './../../../timerAutoStartButton/TimerAutoStart';
import TimerBreakButtons from './../../../timerBreakButtons/TimerBreakButtons';
import TimerCountdown from './../../../timerCountdown/TimerCountdown';

const Timer: FunctionComponent = () => {
  const shortBreakTimer = useSelector(
    (state: RootState) => state.timer.shortBreakTimer
  );
  const longBreakTimer = useSelector(
    (state: RootState) => state.timer.longBreakTimer
  );

  const workTimer = useSelector((state: any) => state.timer.workTimer);
  const [userTime, setCustomWorkTime] = useState<number>(workTimer);
  const [customShortBreakTime, setCustomShortBreakTime] =
    useState<number>(shortBreakTimer);
  const [customLongBreakTime, setCustomLongBreakTime] =
    useState<number>(longBreakTimer);
  const [timer, setTimer] = useState<number>(userTime);
  const [autoStartIsOn, setAutoStartIsOn] = useState<boolean>(false);

  const dispatch = useDispatch();
  const active = useSelector((state: any) => state.timer.isTimerActive);
  const taskIsAccepted = useSelector((state: any) => state.query.isTaskVisible);

  const task = useSelector((state: any) => state.query.task);
  const intervalCount = useSelector((state: any) => state.timer.intervalCount);
  const pomodoroState = useSelector((state: any) => state.timer.pomodoroState);

  const activateTask = (interval: any) => {
    dispatch(queryActions.toggleTask());
    dispatch(timerActions.toggleTimer());

    clearInterval(interval);
  };

  const activateWorkState = (interval?: any, pomodoroState?: string) => {
    if (!autoStartIsOn && active) {
      activateTask(interval);
    }
    setTimer(userTime);
    dispatch(timerActions.increaseIntervalCount());
    dispatch(timerActions.changePomodoroState(pomodoroState));
  };

  const activateBreakState = (interval?: any, pomodoroState?: string) => {
    if (!autoStartIsOn && active) {
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

  const randomBreakMessage = useMemo(
    () => breakMessages[Math.floor(Math.random() * breakMessages.length)].text,
    [pomodoroState]
  );

  const randomWorkMessage = useMemo(
    () => workMessages[Math.floor(Math.random() * workMessages.length)].text,
    [pomodoroState]
  );

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
      <TimerAutoStart
        active={active}
        setAutoStartIsOn={setAutoStartIsOn}
        autoStartIsOn={autoStartIsOn}
      />
      <TimerBreakButtons
        activateWorkState={activateWorkState}
        pomodoroState={pomodoroState}
        activateBreakState={activateBreakState}
      />
      <br />
      <TimerCountdown
        activateTask={activateTask}
        active={active}
        taskIsAccepted={taskIsAccepted}
        task={task}
        pomodoroState={pomodoroState}
        randomBreakMessage={randomBreakMessage}
        randomWorkMessage={randomWorkMessage}
        minutes={minutes}
        seconds={seconds}
        skipTimerHandler={skipTimerHandler}
      />
      <TimerSettings
        formSubmitHandler={formSubmitHandler}
        setCustomWorkTime={setCustomWorkTime}
        setCustomShortBreakTime={setCustomShortBreakTime}
        setCustomLongBreakTime={setCustomLongBreakTime}
      />
    </Fragment>
  );
};

export default Timer;
