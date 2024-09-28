import React, { useState } from "react";
import { IoStar, IoArrowForward } from "react-icons/io5";
import { BiFoodTag } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  setAddedItem,
  setCartData,
  setIsDiffResMessage,
  setResInfo,
} from "../../utils/cartSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
const Dishes = ({ card, handleMoreDetail }) => {
  // console.log(card);


  const resInfo = useSelector((state) => state?.cart?.resInfo);
  const cartData = useSelector((state) => state?.cart?.cartData);
  const addedItem = useSelector((state) => state?.cart?.addedItem);
  const dispatch = useDispatch();

  const handleAddToCart = (data, resData) => {
    const isAdded = cartData.find((item) => item.id === data.id);

    if (!isAdded) {
      if (resInfo.id === resData.id || resInfo.length === 0) {
        dispatch(setCartData({...data, qty:1}));
        dispatch(setAddedItem(data.id));
        dispatch(setResInfo(resData));
        toast.success("Item Added");
      } else {
        dispatch(setIsDiffResMessage(true));
      }
    } else {
      toast.error("Item Already Added");
    }
  };


  return (
    <>
      <div className="top w-full h-14 px-3 border-b-2 border-dashed  text-neutral-500 flex justify-between items-center">
        <div className="left">
          <div className="  flex flex-col gap-1">
            <span className="text-xs font-[Gilroy-Semibold]">
              By {card?.restaurant?.info?.name}
            </span>
            <div className="flex gap-1 text-[.62rem]">
              <IoStar /> <span>{card?.restaurant?.info?.avgRating}</span>.
              <span>{card?.restaurant?.info?.sla?.slaString}</span>
            </div>
          </div>
        </div>

        <Link
          to={`/menu/${card?.restaurant?.info?.id}`}
          className="right text-lg"
        >
          <IoArrowForward />
        </Link>
      </div>

      <div className="bottom w-full flex justify-between items-center p-2">
        <div className="left flex flex-col items-start gap-2 w-1/2 p-1">
          <BiFoodTag
            className={`${card?.info?.isVeg ? "text-green-500" : "text-red-500"}`}
          />
          <h1 className="font-[Gilroy-Bold] text-sm text-neutral-600 line-clamp-3">
            {card?.info?.name}
          </h1>
          <span className=" text-sm text-neutral-600 font-[Gilroy-Semibold]">
            ₹
            {card?.info?.defaultPrice
              ? card?.info?.defaultPrice / 100
              : card?.info?.price / 100}
          </span>
          {card?.info?.description ? (
            <button
              onClick={() => handleMoreDetail(card)}
              className="text-[.65rem] text-neutral-500 border px-2 py-1 rounded-full flex items-center gap-2"
            >
              More details <IoIosArrowForward />{" "}
            </button>
          ) : null}
        </div>
        <div className="right">
          <div className="relative">
            <img
              className={`md:w-32 w-24 md:h-32 h-24 rounded-lg object-cover`}
              src={
                card.info.imageId
                  ? `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/${card?.info?.imageId}`
                  : "../../public/img/alt.jpg"
              }
              alt=""
            />

            <button
              onClick={() => handleAddToCart(card.info, card.restaurant.info)}
              className={`bg-white hover:bg-neutral-100 text-green-600 font-[Gilroy-ExtraBold] absolute -bottom-3 shadow-lg border scale-90 md:scale-100 border-neutral-400 px-6 py-1 rounded left-1/2 -translate-x-1/2`}
            >
              {addedItem.includes(card.info.id) ? "ADDED" : "ADD"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dishes;
