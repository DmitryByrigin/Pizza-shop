import { configureStore } from '@reduxjs/toolkit';
// import categoriesReducer from './slices/filterCategories';
import sortReducer from './slices/filterSort';

export const store = configureStore({
  reducer: {
    // categoria: categoriesReducer,
    sort: sortReducer,
  },
});
