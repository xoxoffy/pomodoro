import { configureStore } from '@reduxjs/toolkit';

import timerReducer from './slices/timerSlice';
import queryReducer from './slices/querySlice';

const store = configureStore({
  reducer: { timer: timerReducer, query: queryReducer },
});

export default store;
