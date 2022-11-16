import React from 'react';
import LongBreakTimeSetting from './LongBreakTimeSetting';
import ShortBreakTimeSetting from './ShortBreakTimeSetting';
import WorkTimeSetting from './WorkTimeSetting';

const Settings = () => {
  return (
    <div>
      <WorkTimeSetting />
      <ShortBreakTimeSetting />
      <LongBreakTimeSetting />
    </div>
  );
};

export default Settings;
