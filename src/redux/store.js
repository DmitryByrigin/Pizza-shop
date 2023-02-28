import { configureStore } from '@reduxjs/toolkit';
<<<<<<< HEAD
// import categoriesReducer from './slices/filterCategories';
import sortReducer from './slices/filterSort';

export const store = configureStore({
  reducer: {
    // categoria: categoriesReducer,
    sort: sortReducer,
=======
import counterReducer from './slices/filterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
>>>>>>> c98931b7767fe96f62b706ababc374f341d037a7
  },
});
