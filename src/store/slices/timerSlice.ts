import { createSlice } from '@reduxjs/toolkit';

const INITIAL_TIME_IN_SECONDS = 25 * 60; // 25 minutes
const INITIAL_SHORT_BREAK_TIME_IN_SECONDS = 5 * 60; // 5 minutes
const INITIAL_LONG_BREAK_TIME_IN_SECONDS = 15 * 60; // 15 minutes

const initialTimerSlice = {
  workTimer: INITIAL_TIME_IN_SECONDS,
  shortBreakTimer: INITIAL_SHORT_BREAK_TIME_IN_SECONDS,
  longBreakTimer: INITIAL_LONG_BREAK_TIME_IN_SECONDS,
  isTimerActive: false,
};

const timerSlice = createSlice({
  name: 'timer',
  initialState: initialTimerSlice,
  reducers: {
    toggleTimer(state) {
      state.isTimerActive = !state.isTimerActive;
    },
  },
});

export const timerActions = timerSlice.actions;

export default timerSlice.reducer;
