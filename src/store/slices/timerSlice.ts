import { createSlice } from '@reduxjs/toolkit';

const INITIAL_TIME_IN_SECONDS = 25 * 60; // 25 minutes
const INITIAL_SHORT_BREAK_TIME_IN_SECONDS = 5 * 60; // 5 minutes
const INITIAL_LONG_BREAK_TIME_IN_SECONDS = 15 * 60; // 15 minutes

const initialTimerState = {
  workTimer: INITIAL_TIME_IN_SECONDS,
  shortBreakTimer: INITIAL_SHORT_BREAK_TIME_IN_SECONDS,
  longBreakTimer: INITIAL_LONG_BREAK_TIME_IN_SECONDS,
  isTimerActive: false,
  intervalCount: 0,
  pomodoroState: 'work',
};

const timerSlice = createSlice({
  name: 'timer',
  initialState: initialTimerState,
  reducers: {
    toggleTimer(state) {
      state.isTimerActive = !state.isTimerActive;
    },
    increaseIntervalCount(state) {
      state.intervalCount++;
    },
    resetIntervalCount(state) {
      state.intervalCount = 0;
    },
    changePomodoroState(state, action) {
      state.pomodoroState = action.payload;
    },
  },
});

export const timerActions = timerSlice.actions;

export default timerSlice.reducer;
