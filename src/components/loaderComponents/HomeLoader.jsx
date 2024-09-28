import React from "react";
import { PiHamburgerFill } from "react-icons/pi";
import { GiNoodles } from "react-icons/gi";

const HomeLoader = () => {
  return (
    <div className="h-screen w-full absolute top-14">
      <div className="w-full sm:h-[30%] h-[25%] bg-slate-900 flex flex-col gap-5 justify-center items-center">
        <div className="relative">
          <span className="loader"></span>

          <PiHamburgerFill className="text-white text-3xl animate-image animate-image-1 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2" />

          <GiNoodles className="text-white text-3xl animate-image animate-image-2 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2" />
        </div>
        <h1 className="text-lg sm:text-xl font-[Gilroy-Semibold] text-neutral-300">
          Looking for great food near you...
        </h1>
      </div>

      <div className="w-full h-full flex justify-center gap-8 mt-8 p-5">
        <div className="big-card md:block hidden w-56 h-full rounded-sm   overflow-hidden">
          <div className="w-full p-4 shimmer-bg  flex items-center justify-between">
            <div className="w-10 h-10 bg-white rounded-full"></div>
            <div className="w-[65%] h-2 bg-white rounded-sm"></div>
          </div>
          {Array(10)
            .fill("")
            .map((_, index) => (
              <div
                key={index}
                className="w-full p-4 flex items-center justify-between"
              >
                <div className="w-10 h-10 shimmer-bg  rounded-full"></div>
                <div className="w-[65%] h-2 shimmer-bg  rounded-sm"></div>
              </div>
            ))}
        </div>
        <div className="small-card flex w-full md:w-[60%] justify-center flex-wrap gap-3">
          {Array(10)
            .fill("")
            .map((_, index) => (
              <div
                key={index}
                className="sm:w-44 w-32 sm:h-36 h-44 flex flex-col gap-2 "
              >
                <div className="w-full h-28 shimmer-bg rounded-sm "></div>
                <div className="w-[80%] h-2 shimmer-bg rounded-sm "></div>
                <div className="w-[65%] h-2 shimmer-bg rounded-sm "></div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default HomeLoader;
