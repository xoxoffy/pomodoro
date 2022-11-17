import React, { Fragment, FunctionComponent, useState } from 'react';
import './Query.css';
import { GiConfirmed } from 'react-icons/gi';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { useSelector } from 'react-redux/es/exports';
import { queryActions } from '../../store/slices/querySlice';
import { timerActions } from '../../store/slices/timerSlice';
import { MdOutlineDisabledByDefault } from 'react-icons/md';

const Query: FunctionComponent = () => {
  const dispatch = useDispatch();

  const taskIsAccepted = useSelector((state: any) => state.query.isTaskVisible);
  const task = useSelector((state: any) => state.query.task);

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
        maxLength={32}
      />
      {!taskIsAccepted ? (
        <GiConfirmed
          type="submit"
          className={
            task ? 'confirm-query-button__valid' : 'confirm-query-button'
          }
          onClick={activateTaskHandler}
        />
      ) : (
        <MdOutlineDisabledByDefault
          onClick={activateTaskHandler}
          className="cancel-query-button"
        />
      )}
    </Fragment>
  );
};

export default Query;
