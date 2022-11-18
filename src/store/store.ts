import { configureStore } from '@reduxjs/toolkit';

import timerReducer from './slices/timerSlice';
import queryReducer from './slices/querySlice';

const store = configureStore({
  reducer: { timer: timerReducer, query: queryReducer },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
