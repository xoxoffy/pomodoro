import React, { Fragment, FunctionComponent, useState } from 'react';
import './Query.css';
import { GiConfirmed } from 'react-icons/gi';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { useSelector } from 'react-redux/es/exports';
import { queryActions } from '../../store/slices/querySlice';
import { timerActions } from '../../store/slices/timerSlice';

const Query: FunctionComponent = () => {
  const dispatch = useDispatch();

  const taskIsAccepted = useSelector((state: any) => state.query.isTaskVisible);

  const activateTaskHandler = () => {
    dispatch(queryActions.toggleTask());
    dispatch(timerActions.toggleTimer());
  };
  return (
    <Fragment>
      <input
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          dispatch(queryActions.changeTask(event.target.value))
        }
        className="query-input"
        placeholder="What are you working on? =)"
        type="text"
        disabled={taskIsAccepted}
      />
      <GiConfirmed
        type="submit"
        className="confirm-query"
        onClick={activateTaskHandler}
      />
    </Fragment>
  );
};

export default Query;
