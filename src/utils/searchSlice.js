import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchData: [],
    metaData: {},
    moreDetail: {}
  },
  reducers: {
    setSearchData: (state, action) => {
      state.searchData = action.payload;
    },
    setMetaData: (state, action) => {
      state.metaData = action.payload;
    },

setMoreDetail: (state, action) => {
  state.moreDetail = action.payload;
}

  },
});

export const { setSearchData, setMetaData, setMoreDetail } = searchSlice.actions;
export default searchSlice.reducer;
