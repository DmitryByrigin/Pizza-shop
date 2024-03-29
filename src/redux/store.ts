import { configureStore } from '@reduxjs/toolkit';
import filter from './filter/slice';
import cart from './filter/cartSlice';
import pizza from './slices/pizzaSlice';
import { type } from 'os';

export const store = configureStore({
  reducer: {
    filter,
    cart,
    pizza,
  },
});

export type RootState = ReturnType<typeof store.getState>;
