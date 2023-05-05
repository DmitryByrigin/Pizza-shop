import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
interface FetchPizzasParams {
  currentPage: number;
  category: string;
  sortBy: string;
  order: string;
  search: string;
  changeArrow: string;
}

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async (params: FetchPizzasParams) => {
    const { currentPage, category, sortBy, order, search, changeArrow } = params;
    const searchChange = search.split('=')[1];
    const newParams = category === '' ? '' : params;
    const { data } = await axios.get(`https://63c47de98067b6bef6d9df3d.mockapi.io/items`, {
      params: {
        page: currentPage,
        limit: 4,
        sortBy,
        // changeArrow,
        ...newParams,
        order: order,
        search: searchChange,
      },
    });
    console.log();
    return data;
  },
);

const initialState = {
  items: [],
  status: 'loading', // 'success' | 'loading' | 'error'
};

type FetchPizzaActionTypes =
  | typeof fetchPizzas.pending
  | typeof fetchPizzas.fulfilled
  | typeof fetchPizzas.rejected;

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    });
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = 'error';
      state.items = [];
    });
    builder.addMatcher(
      (action): action is { type: FetchPizzaActionTypes } => {
        return (
          action.type === fetchPizzas.pending ||
          action.type === fetchPizzas.fulfilled ||
          action.type === fetchPizzas.rejected
        );
      },
      (state, action) => {
        state.status = 'loading';
        state.items = [];
      },
    );
  },
});

export const selectPizzaData = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
