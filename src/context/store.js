import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice.js';
import fitnessReducer from './fitnessSlice.js';
import uiReducer from './uiSlice.js';
import { loadState, saveState } from '../services/storage.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    fitness: fitnessReducer,
    ui: uiReducer,
  },
  preloadedState: loadState(),
});

store.subscribe(() => saveState(store.getState()));
