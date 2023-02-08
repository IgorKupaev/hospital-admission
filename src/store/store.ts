import { configureStore, combineReducers } from '@reduxjs/toolkit';
import loginReducer from './reducers/loginSlice';
import regReducer from './reducers/registerSlice';
import admissionReducer from './reducers/admissionSlice';
import sortReducer from './reducers/sortSlice';
import filterReducer from './reducers/filterSlice';

const rootReducer = combineReducers({
  loginReducer,
  regReducer,
  admissionReducer,
  sortReducer,
  filterReducer
});

export const setupStore = (): any => {
  return configureStore({
    reducer: rootReducer
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
