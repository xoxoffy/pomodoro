import React from 'react';
import { BsFillSkipEndFill } from 'react-icons/bs';

interface Props {
  activateTask: (interval: any) => void;
  active: boolean;
  taskIsAccepted: boolean;
  task: string;
  pomodoroState: any;
  randomBreakMessage: string;
  randomWorkMessage: string;
  minutes: number;
  seconds: number;
  skipTimerHandler: () => void;
}

const TimerCountdown: React.FunctionComponent<Props> = ({
  activateTask,
  active,
  taskIsAccepted,
  task,
  pomodoroState,
  randomBreakMessage,
  randomWorkMessage,
  minutes,
  seconds,
  skipTimerHandler,
}) => {
  return (
    <div>
      <img
        onClick={activateTask}
        src="https://i.pinimg.com/originals/8c/5b/1e/8c5b1e51887a9c76d35c27da5a133d1d.jpg"
      />
      <h1 className="task">{active && taskIsAccepted && task}</h1>
      <h1>
        {(pomodoroState === 'shortBreak' || pomodoroState === 'longBreak') &&
          active &&
          randomBreakMessage}
      </h1>
      <h1>{pomodoroState === 'work' && active && randomWorkMessage}</h1>
      <h1 className="timer">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        {active && taskIsAccepted && (
          <BsFillSkipEndFill
            className="skip-button"
            onClick={skipTimerHandler}
          />
        )}
      </h1>
    </div>
  );
};

export default TimerCountdown;
