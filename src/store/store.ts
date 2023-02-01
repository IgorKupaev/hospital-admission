import { configureStore, combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({

});

export const setupStore = (): any => {
  return configureStore({
    reducer: {}
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
