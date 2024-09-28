import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
    name: 'home',
    initialState: {
        homeData: [],
        foodRestaurant: []
    },
    reducers: {
        setHomeData: (state, action) => {
            state.homeData = action.payload;
        },
        setFoodRestaurant: (state, action) => {
            state.foodRestaurant = action.payload;
        }
    }
})

export const {setHomeData, setFoodRestaurant} = homeSlice.actions
export default homeSlice.reducer;