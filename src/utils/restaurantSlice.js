import { createSlice } from "@reduxjs/toolkit";

const restaurantSlice = createSlice({
    name: 'restaurant',
    initialState: {
        detailsData: [],
        offersData: [],
        menuData: []
    },
    reducers: {
setDetailsData: (state,action) => {
    state.detailsData = action.payload;
},
setOffersData: (state,action) => {
    state.offersData = action.payload
},
setMenuData: (state,action) => {
    state.menuData = action.payload
},
    }
})

export const {setDetailsData, setOffersData, setMenuData} = restaurantSlice.actions;
export default restaurantSlice.reducer;