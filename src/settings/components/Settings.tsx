import { useDispatch } from 'react-redux';
import './Settings.css';
import { useState } from 'react';

const Settings = () => {
  const [workTime, setWorkTime] = useState<number>();
  const [shortBreakTime, setShortBreakTime] = useState<number>();
  const [longBreakTime, setLongBreakTime] = useState<number>();

  const dispatch = useDispatch();

  const settingConfirmHandler = () => {};

  return (
    <div className="settings-inputs">
      <form>
        <input
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setWorkTime(event.target.value)
          }
          placeholder="Custom worktime"
        />
      </form>
      <form>
        <input
          onChange={(event) => setShortBreakTime(event.target.value)}
          placeholder="Custom short break time"
        />
      </form>
      <form>
        <input
          onChange={(event) => setLongBreakTime(event.target.value)}
          placeholder="Custom long break time"
        />
      </form>
    </div>
  );
};

export default Settings;
