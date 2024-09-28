import { createSlice } from "@reduxjs/toolkit";

const navSlice = createSlice({
  name: "menu",
  initialState: {
    menuClick: false,
    locationClick: false,
    cartClick: false,
    authClick: false,
  },
  reducers: {
    setMenuClick: (state, action) => {
      state.menuClick = action.payload;
    },

    setLocationClick: (state, action) => {
      state.locationClick = action.payload
    },

    setCartClick: (state, action) => {
      state.cartClick = action.payload;
    },
    setAuthClick: (state, action) => {
      state.authClick = action.payload;
    }
  },
});

export const { setMenuClick, setLocationClick, setCartClick, setAuthClick } = navSlice.actions;
export default navSlice.reducer;
