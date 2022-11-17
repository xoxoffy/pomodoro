import { createSlice } from '@reduxjs/toolkit';

const INITIAL_WORK_TIME_IN_SECONDS = 25 * 60; // 25 minutes
const INITIAL_SHORT_BREAK_TIME_IN_SECONDS = 5 * 60; // 5 minutes
const INITIAL_LONG_BREAK_TIME_IN_SECONDS = 15 * 60; // 15 minutes

const initialSettingsState = {
  workTime: INITIAL_WORK_TIME_IN_SECONDS,
  shortBreakTime: INITIAL_SHORT_BREAK_TIME_IN_SECONDS,
  longBreakTime: INITIAL_LONG_BREAK_TIME_IN_SECONDS,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState: initialSettingsState,
  reducers: {},
});

export const queryActions = settingsSlice.actions;

export default settingsSlice.reducer;
