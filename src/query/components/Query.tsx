import React, { Fragment, FunctionComponent, useState } from 'react';
import './Query.css';
import { GiConfirmed } from 'react-icons/gi';

const Query: FunctionComponent = () => {
  const [task, setTask] = useState('');

  return (
    <Fragment>
      <input
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setTask(event.target.value)
        }
        className="query-input"
        placeholder="What are you working on? =)"
        value={task}
      />
      <GiConfirmed type="submit" className="confirm-query" />
    </Fragment>
  );
};

export default Query;
