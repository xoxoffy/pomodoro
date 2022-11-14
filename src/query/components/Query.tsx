import React, { Fragment, FunctionComponent } from 'react';
import './Query.css';
import { GiConfirmed } from 'react-icons/gi';

const Query: FunctionComponent = () => {
  return (
    <Fragment>
      <input
        className="query-input"
        placeholder="What are you working on? =)"
      />
      <GiConfirmed className="confirm-query" />
    </Fragment>
  );
};

export default Query;
