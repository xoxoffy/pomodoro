import React from 'react';

interface Props {
  active: boolean;
  setAutoStartIsOn: (autoStartIsOn: boolean) => void;
  autoStartIsOn: boolean;
}

const TimerAutoStart: React.FunctionComponent<Props> = ({
  active,
  setAutoStartIsOn,
  autoStartIsOn,
}) => {
  return (
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
  );
};

export default TimerAutoStart;
