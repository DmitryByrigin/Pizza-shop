import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params) => {
  const { currentPage, category, sortBy, order, search, changeArrow } = params;
  const searchChange = search.split('=')[1];
  const newParams = category === '' ? '' : params;
  const { data } = await axios.get(`https://63c47de98067b6bef6d9df3d.mockapi.io/items`, {
    params: {
      page: currentPage,
      limit: 4,
      sortBy,
      changeArrow,
      ...newParams,
      order: order,
      search: searchChange,
    },
  });
  console.log();
  return data;
});

const initialState = {
  items: [],
  status: 'loading', // 'success' | 'loading' | 'error'
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state, action) => {
      // console.log('pending');
      state.status = 'loading';
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    },
    [fetchPizzas.rejected]: (state, action) => {
      // console.log('rejected');
      state.status = 'error';
      state.items = [];
    },
  },
});

export const selectPizzaData = (state) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
