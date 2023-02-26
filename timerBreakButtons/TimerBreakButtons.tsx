import React from 'react';

interface Props {
  activateWorkState: () => void;
  pomodoroState: string;
  activateBreakState: (undefined: undefined, breakType: string) => void;
}

const TimerBreakButtons: React.FunctionComponent<Props> = ({
  activateWorkState,
  pomodoroState,
  activateBreakState,
}) => {
  return (
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
  );
};

export default TimerBreakButtons;
