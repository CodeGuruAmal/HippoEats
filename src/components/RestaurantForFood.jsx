import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setFoodRestaurant } from "../utils/homeSlice";
import RestaurantCard from "./homeComponents/RestaurantCard";
import { IoArrowBack } from "react-icons/io5";

const RestaurantForFood = () => {
  const { id } = useParams();
  const coordinates = useSelector((state) => state.location.coordinates);
  const foodRestaurant = useSelector((state) => state.home.foodRestaurant);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const splitter = id.split("&");
  // console.log(splitter);
  const mobileId = splitter[0];
  const mobileTag = splitter.at(-1);

  useEffect(() => {
    if (coordinates?.geometry?.location) {
      const isMobile = window.innerWidth <= 768;

      const apiUrl = isMobile
        ? `https://cors-proxy-flax-ten.vercel.app/restaurants/list/v5?lat=${coordinates?.geometry?.location?.lat}&lng=${coordinates?.geometry?.location?.lng}&collection=${mobileId}&${mobileTag}&sortBy=&filters=&type=rcv2&offset=0&carousel=true&third_party_vendor=1`
        : `https://cors-proxy-flax-ten.vercel.app/restaurants/list/v5?lat=${coordinates.geometry.location.lat}&lng=${coordinates.geometry.location.lng}&collection=${id}&sortBy=&filters=&type=rcv2&offset=0&page_type=null`;

        

      axios
        .get(apiUrl)
        .then((res) => dispatch(setFoodRestaurant(res?.data?.data?.cards)))
        .catch((err) => console.log(err));
    }
  }, [coordinates, id]);

  // console.log(foodRestaurant)

  const title = foodRestaurant[0]?.card?.card?.title;
  const description = foodRestaurant[0]?.card?.card?.description;

  const restaurantData = foodRestaurant.slice(3);

  return (
    <div className="lg:w-[80%] w-[95%]  left-1/2 -translate-x-1/2 absolute top-16">
      <button onClick={() => navigate(-1)} className="text-xl duration-200 cursor-pointer hover:bg-neutral-100 p-2 rounded-xl">
        <IoArrowBack  />
      </button>
      <h1 className="text-3xl mt-4 font-[Gilroy-Bold] text-slate-900">
        {title}
      </h1>
      <p className="text-sm font-[Gilroy-Medium] tracking-wide text-neutral-500">
        {description}
      </p>

      <h3 className="text-xl mt-6 font-[Gilroy-ExtraBold]">
        Restaurants to explore
      </h3>

      <div className="flex flex-wrap justify-center gap-[1.5rem] mt-8">
        {restaurantData.map(
          (
            {
              card: {
                card: { info },
              },
            },
            index
          ) => {
            return (
              info && (
                
                  <div  key={index} className="card duration-100 hover:scale-95 w-[10rem] md:w-[12rem] ">
                    <RestaurantCard {...info} />
                  </div>
                
              )
            );
          }
        )}
      </div>
    </div>
  );
};

export default RestaurantForFood;
