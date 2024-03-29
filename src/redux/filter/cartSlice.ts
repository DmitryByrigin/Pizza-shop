import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

type CartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: number;
  size: number;
  count: number;
};

interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}

const initialState: CartSliceState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
        state.totalPrice += findItem.price;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
        state.totalPrice += action.payload.price;
      }

      state.totalPrice = state.items.reduce((sum, item) => {
        return sum + item.price * item.count;
      }, 0);
    },
    removeItem(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.totalPrice = state.items.reduce((sum, item) => {
        return sum + item.price * item.count;
      }, 0);
    },
    createItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },

    onClickClear(state) {
      state.items = [];
      state.totalPrice = 0;
    },

    minusItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload);

      if (findItem) {
        findItem.count--;
        state.totalPrice -= findItem.price;
        //state.totalPrice = state.totalPrice - count;
      }
    },
  },
});

export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id === id);

export const { addItem, removeItem, onClickClear, createItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
