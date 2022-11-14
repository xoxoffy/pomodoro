import React, { Fragment } from 'react';
import './Query.css';
import { GiConfirmed } from 'react-icons/gi';

const Query = () => {
  return (
    <Fragment>
      <input placeholder="What are you working on? =)" />
      <GiConfirmed className="confirm-query" />
    </Fragment>
  );
};

export default Query;
