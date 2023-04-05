import { configureStore } from '@reduxjs/toolkit';
import filter from './filter/slice';
import cart from './filter/cartSlice';
import pizza from './slices/pizzaSlice';

export const store = configureStore({
  reducer: {
    filter,
    cart,
    pizza,
  },
});
