import React from "react";
import { MdStars } from "react-icons/md";
import { Link } from "react-router-dom";

const RestaurantCard = (info) => {
  // console.log(info)
  const id = info.id;
  const discountInfoHeader =
    info?.aggregatedDiscountInfoV3?.header ||
    info?.aggregatedDiscountInfoV2?.header;
  const discountInfoSubHeader = info?.aggregatedDiscountInfoV3?.subHeader;
  const restaurantImage = info?.cloudinaryImageId;
  const restaurantName = info?.name;
  const restaurantRating = info?.avgRating;
  const deliveryTime = info?.sla?.slaString;
  const cuisines = info?.cuisines ? (info?.cuisines).join(", ") : "";
  const trimCuisines = cuisines ? cuisines.substring(0, 30) + "..." : [];
  const place = info?.areaName;

  // console.log(restaurantImage)

  return (
    <>
      <Link to={`/menu/${id}`}>
        
          <div className="w-full h-[10rem] overflow-hidden rounded-xl relative">
            <img
              src={
                restaurantImage
                  ? `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${restaurantImage}`
                  : "../../public/img/alt.jpg"
              }
              className="object-center w-full h-full object-cover"
              alt=""
            />

            <h1 className="absolute bottom-1 left-2 flex flex-col gap-1 sm:flex-row text-[1rem] text-zinc-100 z-10 font-[ProximaNova]">
              <span>{discountInfoHeader}</span>{" "}
              <span>{discountInfoSubHeader}</span>
            </h1>

            <div className="overlay absolute z-5 w-full h-20 rounded-s-xl bg-gradient-to-t from-black to-transparent bottom-0 left-0"></div>
          </div>

          <div className="card-details text-sm scale-95 py-1">
            <h2 className="name font-[Gilroy-Bold] ">{restaurantName}</h2>
            <div className="flex -center gap-2">
              {restaurantRating && (
                <MdStars
                  className={` text-base ${
                    restaurantRating > 2 ? "text-green-600" : "text-yellow-600"
                  }`}
                />
              )}
              <div>
                <span className="rating font-[Gilroy-Medium]">
                  {restaurantRating} •{" "}
                </span>{" "}
                <span className="delivery-time font-[Gilroy-Semibold]">
                  {deliveryTime}
                </span>
              </div>
            </div>

            <p className="cuisines line-clamp-3 text-[.8rem] font-[Gilroy-Semibold] text-nowrap text-zinc-700">
              {trimCuisines}
            </p>
            <p className="area text-xs font-[Gilroy-Semibold] text-zinc-500">
              {place}
            </p>
          </div>

      </Link>
    </>
  );
};

export default RestaurantCard;
