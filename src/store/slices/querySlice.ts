import { createSlice } from '@reduxjs/toolkit';

const initialQueryState = {
  task: '',
  isTaskVisible: false,
};

const querySlice = createSlice({
  name: 'query',
  initialState: initialQueryState,
  reducers: {
    changeTask(state, action) {
      state.task = action.payload;
    },
    toggleTask(state) {
      state.isTaskVisible = !state.isTaskVisible;
    },
  },
});

export const queryActions = querySlice.actions;

export default querySlice.reducer;
