import { useDispatch, useSelector } from 'react-redux';
import './Settings.css';
import React, { useState } from 'react';
import { timerActions } from '../../store/slices/timerSlice';

const Settings = () => {
  const [workTime, setWorkTime] = useState<number>(0);
  const [shortBreakTime, setShortBreakTime] = useState<number>();
  const [longBreakTime, setLongBreakTime] = useState<number>();

  const dispatch = useDispatch();

  const active = useSelector((state: any) => state.timer.isTimerActive);
  const taskIsAccepted = useSelector((state: any) => state.query.isTaskVisible);

  const settingConfirmHandler = (event: React.FormEvent) => {
    event.preventDefault();

    dispatch(timerActions.changeWorkTimer(workTime));
  };

  return (
    <div className="settings-inputs">
      <form onSubmit={settingConfirmHandler}>
        <input
          onChange={(event) => setWorkTime(event.target.value)}
          placeholder="Custom work time"
          value={workTime}
        />
        <button type="submit">Confirm</button>
      </form>
      <form>
        <input
          onChange={(event) => setShortBreakTime(event.target.value)}
          placeholder="Custom short break time"
        />
        <button type="submit">Confirm</button>
      </form>
      <form>
        <input
          onChange={(event) => setLongBreakTime(event.target.value)}
          placeholder="Custom long break time"
        />
        <button type="submit">Confirm</button>
      </form>
    </div>
  );
};

export default Settings;
