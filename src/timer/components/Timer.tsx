import { Fragment } from 'react';
import './Timer.css';

const Timer = () => {
  return (
    <Fragment>
      <br />
      <div className="state-buttons">
        <button>Working!</button>
        <button>Short Break</button>
        <button>Long Break</button>
      </div>
      <br />
      <img src="https://i.pinimg.com/originals/8c/5b/1e/8c5b1e51887a9c76d35c27da5a133d1d.jpg" />
      <h1 className="task">Task</h1>
      <h1 className="timer">25:00</h1>
    </Fragment>
  );
};

export default Timer;
