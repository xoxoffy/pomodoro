import React, { Fragment } from 'react';

interface Props {
  formSubmitHandler: (event: React.FormEvent) => void;
  setCustomWorkTime: any;
  setCustomShortBreakTime: any;
  setCustomLongBreakTime: any;
}

const TimerSettings: React.FunctionComponent<Props> = ({
  formSubmitHandler,
  setCustomWorkTime,
  setCustomShortBreakTime,
  setCustomLongBreakTime,
}) => {
  return (
    <Fragment>
      <form onSubmit={formSubmitHandler}>
        <input
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setCustomWorkTime(event.target.value)
          }
          type="text"
          placeholder="Custom Work Time"
        />
        <button>Change</button>
      </form>
      <form onSubmit={formSubmitHandler}>
        <input
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setCustomShortBreakTime(event.target.value)
          }
          type="text"
          placeholder="Custom Short Break Time"
        />
        <button>Change</button>
      </form>
      <form onSubmit={formSubmitHandler}>
        <input
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setCustomLongBreakTime(event.target.value)
          }
          type="text"
          placeholder="Custom Long Break Time"
        />
        <button>Change</button>
      </form>
    </Fragment>
  );
};

export default TimerSettings;
