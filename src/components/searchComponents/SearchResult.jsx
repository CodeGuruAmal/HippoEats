import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { IoArrowBack } from "react-icons/io5";
import Dishes from "./Dishes";
import { setMoreDetail } from "../../utils/searchSlice";
import MoreDetails from "./MoreDetails";
import CartRefresher from "../CartComponents/CartRefresher";
import Restaurants from "./Restaurants";
import { SearchResultLoader } from "../loaderComponents/SearchLoader";
// import { SearchRestaurant } from "../loaderComponents/SearchLoader";

const SearchResult = () => {
  const { result } = useParams();
  const navigate = useNavigate();
  const metaData = useSelector((state) => state.search.metaData);
  const coordinates = useSelector((state) => state.location.coordinates);
  const [isActive, setIsActive] = useState(
    metaData?.type !== "DISH" ? "RESTAURANT" : "DISH"
  );
  const [restaurantData, setRestaurantData] = useState([]);
  const [dishData, setDishData] = useState([]);
  const [resLoading, setResLoading] = useState(true);
  const [disLoading, setDisLoading] = useState(true);
  const [visible, setVisible] = useState(true);

  // const [dataNotFound, setDataNotFound] = useState(false);
  const dispatch = useDispatch();

  const fetchRestaurantData = () => {
    if (
      coordinates?.geometry?.location?.lat &&
      coordinates?.geometry?.location?.lng
    ) {
      axios
        .get(
          `https://cors-proxy-flax-ten.vercel.app/restaurants/search/v3?lat=${coordinates?.geometry?.location?.lat}&lng=${coordinates?.geometry?.location?.lng}&str=${result}&trackingId=undefined&submitAction=ENTER&queryUniqueId=d66807b7-7a3e-0232-6800-908aceb6ae0b&selectedPLTab=RESTAURANT`
        )
        .then((res) => {
          setRestaurantData(
            res?.data?.data?.cards[0]?.groupedCard?.cardGroupMap?.RESTAURANT
              ?.cards
          );

          setTimeout(() => {
            setResLoading(false);
          }, 800);
        })
        .catch((err) => {
          console.log(err);
          setResLoading(false);
        });
    }
  };

  const fetchDishData = () => {
    if (
      coordinates?.geometry?.location?.lat &&
      coordinates?.geometry?.location?.lng
    ) {
      axios
        .get(
          `https://cors-proxy-flax-ten.vercel.app/restaurants/search/v3?lat=${coordinates?.geometry?.location?.lat}&lng=${coordinates?.geometry?.location?.lng}&str=${result}&trackingId=null&submitAction=SUGGESTION&queryUniqueId=9ad4cd61-57b9-e2db-8622-7d4802804dd3&metaData=%7B%22type%22%3A%22DISH%22%2C%22data%22%3A%7B%22vegIdentifier%22%3A%22${metaData?.data?.vegIdentifier}%22%2C%22cloudinaryId%22%3A%22${metaData?.data?.cloudinaryId}%22%2C%22dishFamilyId%22%3A%22${metaData?.data?.dishFamilyId}%22%2C%22dishFamilyIds%22%3A%5B%22${metaData?.data?.dishFamilyId}%22%5D%7D%2C%22businessCategory%22%3A%22SWIGGY_FOOD%22%2C%22displayLabel%22%3A%22Dish%22%7D`
        )
        .then((res) => {
          setDishData(
            res?.data?.data?.cards[1].groupedCard?.cardGroupMap?.DISH?.cards
          )
          setTimeout(() => {
            setDisLoading(false);
          }, 800);
        }
        )
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    if (isActive === "RESTAURANT") {
      fetchRestaurantData();
    } else if (isActive === "DISH") {
      fetchDishData();
    }
  }, [isActive, coordinates]);

  let categoryBtn = [
    { name: "Restaurant", type: "RESTAURANT" },
    { name: "Dishes", type: "DISH" },
  ];

  const toggleCategoryButton = (type) => {
    setIsActive(type);
  };

  const handleMoreDetail = (detail) => {
    dispatch(setMoreDetail(detail));
  };

  return (
    <div className="w-full min-h-screen">
      <MoreDetails />

      <CartRefresher />

      <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[95%] md:w-[45rem] lg:w-[50rem] flex flex-col items-center gap-3 h-[90vh]">
        <div className="w-full py-2 flex sm:flex-col gap-4 sm:items-start items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="text-xl duration-200 cursor-pointer hover:bg-neutral-100 p-2 rounded-xl"
          >
            <IoArrowBack />
          </button>

          <div className="font-[Gilroy-semibold]">
            <div className="categoryBtn flex gap-3 text-xs ">
              {categoryBtn.map((ctg) => {
                return (
                  <button
                    key={ctg.type}
                    onClick={() => toggleCategoryButton(ctg.type)}
                    className={`${
                      isActive === ctg.type ? "bg-secondaryFont" : ""
                    } border border-neutral-200 shadow-sm px-3 py-1 rounded-full`}
                  >
                    {ctg.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="w-full h-full overflow-scroll bg-neutral-100 font-[Gilroy-Medium] p-2 shadow-inner">
          {resLoading ? (
            <div
            className={`${
              isActive === "RESTAURANT" ? "flex" : "hidden"
            }`}
          >
            <SearchResultLoader />
            </div>
          ) : (
            <div
              className={`${
                isActive === "RESTAURANT" ? "flex" : "hidden"
              } restaurants relative w-[100%] mx-auto  flex-wrap justify-between gap-3 p-2 h-full `}
            >
              {restaurantData &&
                restaurantData.map(
                  ({
                    card: {
                      card: { info },
                    },
                  }) => {
                    return <Restaurants key={info?.id} info={info} />;
                  }
                )}
            </div>
          )}

          {disLoading ? (
            <div
            className={`${
              isActive === "DISH" ? "flex" : "hidden"
            }`}
          >
            <SearchResultLoader />
            </div>
          ) : (
            <div
              className={`${
                isActive === "DISH" ? "flex" : "hidden"
              } dishes relative w-[100%] mx-auto  flex-wrap justify-between gap-3 h-full `}
            >
              {dishData.map(({ card: { card } }) => {
                return (
                  card?.info && (
                    <div
                      key={card?.info?.id}
                      className="sm:w-[48%] w-full h-56 sm:h-60 bg-white shadow-md border rounded-2xl overflow-hidden"
                    >
                      <Dishes card={card} handleMoreDetail={handleMoreDetail} />
                    </div>
                  )
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
