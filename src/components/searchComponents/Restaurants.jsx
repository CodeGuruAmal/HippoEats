import React from "react";
import { IoStar } from "react-icons/io5";
import { Link } from "react-router-dom";

const Restaurants = ({ info }) => {
  // console.log(info)
  const cuisines = info?.cuisines ? (info?.cuisines).join(", ") : "";
  const trimCuisines = cuisines ? cuisines.substring(0, 35) + "..." : [];
  return (
    <>
      {info?.name && (
        <Link
          className="sm:w-[48%] w-full font-[Gilroy-Medium] bg-white shadow-md border rounded-2xl flex p-3 gap-2 items-center overflow-hidden"
          to={`/menu/${info?.id}`}
        >
          <div className="left">
            <img
              className="rounded-lg sm:w-24 w-32 h-20 object-cover"
              src={
                info?.cloudinaryImageId
                  ? `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_264,h_288,c_fill/${info?.cloudinaryImageId}`
                  : "../../public/img/alt.jpg"
              }
              alt=""
            />
          </div>
          <div className="right w-full flex flex-col gap-1 text-xs font-[Gilroy-Medium] ">
            <h1 className="font-[Gilroy-Semibold] text-neutral-600 text-sm">
              {info?.name}
            </h1>

            <div className="flex gap-1 text-neutral-500 text-[.62rem]">
              <IoStar /> <span>{info?.avgRating}</span>•
              <span>{info?.sla?.slaString}</span>•
              <span>{info?.costForTwoMessage}</span>
            </div>
            <span className="">{trimCuisines}</span>
            {/* <span className="sm:hidden block">{cuisines}</span> */}
          </div>
        </Link>
      )}
    </>
  );
};

export default Restaurants;
