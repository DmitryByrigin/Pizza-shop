import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  page: 1,
  sort: {
    name: 'популярности',
    sortProperty: 'rating',
  },
};

export const sort = createSlice({
  name: 'sort',
  initialState: initialState,
  reducers: {
    changeSort: (state, action) => {
      state.sort.name = action.payload.name;
      state.sort.sortProperty = action.payload.sortProperty;
    },

    changeCategories: (state, id) => {
      state.categoryId = id.payload;
    },

    changePage: (state, id) => {
      state.page = id.payload;
    },

    setFilters(state, action) {
      state.page = parseInt(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
      state.sort.sortProperty = action.payload.sortProperty;
      state.sort.name = action.payload.name;
    },
  },
});

export const { changeSort, changeCategories, changePage, setFilters } = sort.actions;

export default sort.reducer;
