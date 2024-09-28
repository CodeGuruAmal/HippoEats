import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IoArrowForward, IoArrowBack } from "react-icons/io5";
import RestaurantCard from "./RestaurantCard";

const TopRestaurant = () => {
  const homeData = useSelector((state) => state?.home?.homeData) || [];
  const [headerTitle, setHeaderTitle] = useState("");
  const [restaurantDetails, setRestaurantDetails] = useState([]);
  const [dataNotFound, setDataNotFound] = useState(false);

  // console.log(homeData)
  useEffect(() => {
    if (homeData?.cards?.length > 0) {
      const dataFinder = homeData.cards.find(
        (data) => data?.card?.card?.id === "top_brands_for_you"
      );

      if (dataFinder) {
        const title = dataFinder.card.card.header.title;
        setHeaderTitle(title);

        const details =
          dataFinder.card?.card?.gridElements?.infoWithStyle?.restaurants;
        setRestaurantDetails(details);

        setDataNotFound(false);
      } else {
        setDataNotFound(true);
      }
    }
  }, [homeData]);

  return (
    <div>
      {dataNotFound ? null : (
        <div className="mb-8 border-b-2">
          <div className="flex items-center justify-between">
            <h2 className="text-base md:text-lg font-[Gilroy-ExtraBold]">
              {headerTitle}
            </h2>
            {/* <div className="flex gap-4 text-xl text-zinc-800">
              <button
                className={`text-sm w-6 h-6 rounded bg-zinc-300 flex items-center justify-center transition-opacity duration-300 `}
              >
                <IoArrowBack />
              </button>
              <button
                className={`text-sm w-6 h-6 rounded bg-zinc-300 flex items-center justify-center transition-opacity duration-300 `}
              >
                <IoArrowForward />
              </button>
            </div> */}
          </div>

          <div className="h-slider flex gap-[.2rem] overflow-x-scroll scroll-smooth mt-5 pb-1">
            {restaurantDetails
              ? restaurantDetails.map(({ info }) => (
                  <div key={info.id} className="scale-90">
                    <div className="card duration-100 hover:scale-95 w-[12rem] md:w-[14rem] ">
                      <RestaurantCard {...info} />
                    </div>
                  </div>
                ))
              : []}
            <div></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopRestaurant;
