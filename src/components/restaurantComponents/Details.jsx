import React from "react";
import { MdStars } from "react-icons/md";
import { IoBicycleSharp } from "react-icons/io5";
import { useSelector } from "react-redux";

const Details = () => {
  const detailsData = useSelector((state) => state?.restaurant?.detailsData);

  const restaurantName = detailsData?.name;
  const ratings = detailsData?.avgRating;
  const ratingsCount = detailsData?.totalRatingsString;
  const costForTwo = detailsData?.costForTwoMessage;
  const cuisines = detailsData?.cuisines?.join(", ");
  const place = detailsData.areaName;
  const deliveryTime = detailsData?.sla?.slaString;
  const miles = detailsData?.sla?.lastMileTravelString;

  return (
    <div className="details mt-4">
      <h2 className="text-2xl md:text-xl font-[Gilroy-ExtraBold]">
        {restaurantName}
      </h2>

      <div className="w-full h-full bg-gradient-to-b from-neutral-50 from-20% to-neutral-300 mt-5 p-4 pt-0 rounded-b-3xl">
        <div className="inner-details bg-white w-full flex flex-col gap-2 rounded-xl  p-4 border border-neutral-300 text-xs font-[Gilroy-Bold]">
          <div className=" flex items-center gap-1">
            <MdStars className="text-green-600" />
            <h4 className="rating">
              {ratings} {`(${ratingsCount})`}
            </h4>{" "}
            •<h4 className="rate-for-two">{costForTwo}</h4>
          </div>

          <div className="text-secondaryFont ">
            <span className="underline">{cuisines}</span>
          </div>

          <div className="flex gap-4 pt-2 pb-3">
            <div className="flex flex-col items-center justify-center">
              <div className="w-[7px] h-[7px] bg-neutral-300 rounded-full"></div>
              <div className="w-[.5px] h-5 bg-neutral-400"></div>
              <div className="w-[7px] h-[7px] bg-neutral-300  rounded-full"></div>
            </div>
            <div className="flex flex-col gap-1">
              <div className=" flex gap-2">
                <span>Outlet</span>
                <span className="text-[.6rem] text-neutral-500 font-[Gilroy-Medium]">
                  {place}
                </span>
              </div>
              <span className="text-[.65rem]">{deliveryTime}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Details;
