import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import HomeContainer from "./components/HomeContainer";
import RestaurantMenu from "./components/RestaurantMenu";
import Search from "./components/Search";
import RestaurantForFood from "./components/RestaurantForFood";
import SearchResult from "./components/searchComponents/SearchResult";
import Login from "./components/AuthComponents/Login";
import SignUp from "./components/AuthComponents/SignUp";
// import MenuLoader from "./loaderComponents/MenuLoader";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeContainer />} />
        <Route path="/menu/:id" element={<RestaurantMenu />} />
        <Route path="/search" element={<Search />} />
        <Route path="/search/:result" element={<SearchResult />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        {/* <Route path="/loader" element={<MenuLoader />} /> */}
        <Route
          path="/restaurants_by_food/:id"
          element={<RestaurantForFood />}
        />
      </Routes>
    </div>
  );
};

export default App;
