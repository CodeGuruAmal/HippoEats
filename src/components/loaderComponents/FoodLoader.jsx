import React from "react";

const FoodLoader = () => {
  return (
    <div className="absolute top-20 w-[95%] sm:w-[75%] left-1/2 flex flex-col gap-5 -translate-x-1/2 h-[50vh]">
      <div className="w-full min-h-5 shimmer-bg rounded-sm"></div>
      <div className="w-[25%] min-h-2 shimmer-bg rounded-sm"></div>

      <div className="sm:w-[75%] w-full flex mx-auto gap-3 p-4 ">
        <div className="w-full flex flex-col gap-2">
          <div className="min-w-[50%] md:h-56 h-40 shimmer-bg rounded-sm"></div>
          <div className="w-[75%] h-2 shimmer-bg rounded-sm"></div>
          <div className="w-[20%] h-2 shimmer-bg rounded-sm"></div>
          <div className="w-[10%] h-2 shimmer-bg rounded-sm"></div>
        </div>

        <div className="w-full flex flex-col gap-2">
          <div className="min-w-[50%] md:h-40 h-32 shimmer-bg rounded-sm"></div>
          <div className="w-[80%] h-2 shimmer-bg rounded-sm"></div>
          <div className="w-[50%] h-2 shimmer-bg rounded-sm"></div>
          <div className="w-[10%] h-2 shimmer-bg rounded-sm"></div>
        </div>

        {/* <div className="w-1/2 h-40 shimmer-bg"></div> */}
      </div>
    </div>
  );
};

export default FoodLoader;
