import React from "react";
import { IoArrowForward, IoArrowBack } from "react-icons/io5";
import { useSelector } from "react-redux";

const Offers = () => {
  const offersData = useSelector((state) => state?.restaurant?.offersData);

  return (
    <div className="offers mt-5 p-3">
      <div className="flex justify-between items-center">
        <h3 className="text-base md:text-lg font-[Gilroy-ExtraBold]">
          Deals For You
        </h3>

        <div className="flex gap-4 text-xl text-zinc-800">
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
        </div>
      </div>

      <div className="h-slider flex mt-4 w-full overflow-x-scroll gap-3 whitespace-nowrap">
        {offersData.map(({ info }, index) => {
          const offerLogo = info?.offerLogo;
          const headerTitle = info?.header;
          const description = info.description;
          const couponCode = info?.couponCode;
          const expiryTime = info.expiryTime;
          return (
            <div
              className="md:min-w-[16.5rem] w-full px-4 py-2 flex md:flex-row flex-col items-center rounded-2xl gap-3 border border-neutral-300"
              key={index}
            >
              <div className="md:w-[20%] w-full flex items-center justify-center">
                <img
                  className="w-10"
                  src={`https://media-assets.swiggy.com/swiggy/image/upload/${offerLogo}`}
                  alt=""
                />
              </div>

              <div className="md:w-[80%] w-full h-full">
                <h4 className="text-[80%] font-[Gilroy-Bold] text-center md:text-left">
                  {headerTitle}
                </h4>

                <p className="text-[65%] text-zinc-500 font-[Gilroy-Semibold] text-center md:text-left">
                  {description ? (
                    <span>{description}</span>
                  ) : couponCode ? (
                    <span>{couponCode}</span>
                  ) : (
                    <span>{expiryTime}</span>
                  )}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Offers;
