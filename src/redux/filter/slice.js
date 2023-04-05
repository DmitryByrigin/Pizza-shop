import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: 'популярности',
    sortProperty: 'rating',
    order: 'asc',
    arrow: 'arrow-down',
  },
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    // change order when user click on arrow in sort
    setOrder(state, action) {
      state.sort.order = state.sort.order === 'desc' ? 'asc' : 'desc';
    },

    setArrow(state, action) {
      state.sort.arrow = state.sort.arrow === 'arrow-down' ? 'arrow-up' : 'arrow-down';
    },
    setFilters(state, action) {
      if (Object.keys(action.payload).length) {
        state.currentPage = Number(action.payload.currentPage);
        state.categoryId = Number(action.payload.categoryId);
        state.sort = action.payload.sort;
      } else {
        state.currentPage = 1;
        state.categoryId = 0;
        state.sort = {
          name: 'популярности',
          sortProperty: 'rating',
          order: 'asc',
        };
      }
    },
  },
});

export const {
  setCategoryId,
  setSort,
  setOrder,
  setCurrentPage,
  setFilters,
  setSearchValue,
  setArrow,
} = filterSlice.actions;

export const selectSort = (state) => state.filter.sort;
export const selectFilter = (state) => state.filter;

export default filterSlice.reducer;
