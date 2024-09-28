import { configureStore } from "@reduxjs/toolkit";
import navSlice from "./navSlice";
import homeSlice from "./homeSlice";
import restaurantSlice from "./restaurantSlice";
import locationSlice from "./locationSlice";
import cartSlice from "./cartSlice";
import searchSlice from "./searchSlice";
import authSlice from "./authSlice";

export const store = configureStore({
  reducer: {
    home: homeSlice,
    nav: navSlice,
    restaurant: restaurantSlice,
    location: locationSlice,
    cart: cartSlice,
    search: searchSlice,
    auth: authSlice,
  },
});
