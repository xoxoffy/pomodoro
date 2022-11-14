import { createSlice } from '@reduxjs/toolkit';

const initialQuerySlice = {};

const querySlice = createSlice({
  name: 'timer',
  initialState: initialQuerySlice,
  reducers: {},
});

export const queryActions = querySlice.actions;

export default querySlice.reducer;
