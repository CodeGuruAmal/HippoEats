import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  setDetailsData,
  setMenuData,
  setOffersData,
} from "../utils/restaurantSlice";
import Details from "./restaurantComponents/Details";
import Offers from "./restaurantComponents/Offers";
import Menu from "./restaurantComponents/Menu";
import CartRefresher from "./CartComponents/CartRefresher";
import { IoArrowBack } from "react-icons/io5";
import MenuLoader from "./loaderComponents/MenuLoader";

const RestaurantMenu = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const detailsData = useSelector((state) => state.restaurant.detailsData);
  const coordinates = useSelector((state) => state.location.coordinates);
  const cartClick = useSelector((state) => state.nav.cartClick);
  const menuClick = useSelector((state) => state.nav.menuClick);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      coordinates?.geometry?.location?.lat &&
      coordinates?.geometry?.location?.lng
    ) {
      axios
        .get(
          `https://cors-proxy-flax-ten.vercel.app/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${coordinates?.geometry?.location?.lat}&lng=${coordinates?.geometry?.location?.lng}&restaurantId=${id}&catalog_qa=undefined&submitAction=ENTER`
        )
        .then((res) => {
          dispatch(setDetailsData(res?.data?.data?.cards[2]?.card?.card?.info));
          dispatch(
            setOffersData(
              res?.data?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle
                ?.offers
            )
          );

          // console.log(menuResult)
          let menuResult = res?.data?.data?.cards.filter(
            (item) => item.groupedCard
          );
          dispatch(
            setMenuData(
              menuResult[0]?.groupedCard.cardGroupMap?.REGULAR?.cards?.filter(
                (data) =>
                  data?.card?.card?.categories ||
                  data?.card?.card?.itemCards ||
                  data?.card?.card?.carousel
              )
            )
          );

          setTimeout(() => {
            setLoading(false);
          }, 800)
        })
        .catch((err) => console.log(err));
    }
  }, [
    coordinates?.geometry?.location?.lat,
    coordinates?.geometry?.location?.lng,
  ]);

  if(loading) {
    return <MenuLoader />
  }

  return (
    <>
      <CartRefresher />


      <div
        className={`md:w-[75%] lg:w-[47%] w-[95%]  left-1/2 -translate-x-1/2 absolute top-20 ${
          menuClick || cartClick ? "max-h-[85vh] overflow-hidden" : ""
        } `}>
        <div className="nav text-[.6rem] font-[Gilroy-Medium] tracking-wider text-neutral-400">
          <Link to={"/"}>Home</Link> / <span>{detailsData?.city}</span> /{" "}
          <span className="text-neutral-600">{detailsData?.name}</span>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="text-xl duration-200 cursor-pointer hover:bg-neutral-100 mt-5 p-2 rounded-xl"
        >
          <IoArrowBack />
        </button>

        <Details />
        <Offers />
        <Menu />
      </div>
    </>
  );
};

export default RestaurantMenu;
