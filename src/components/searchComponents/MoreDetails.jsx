import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMoreDetail } from "../../utils/searchSlice";
import {
  setAddedItem,
  setCartData,
  setIsDiffResMessage,
  setResInfo,
} from "../../utils/cartSlice";
import toast from "react-hot-toast";
import { TbX } from "react-icons/tb";

const MoreDetails = () => {
  const moreDetail = useSelector((state) => state.search.moreDetail);
  const resInfo = useSelector((state) => state?.cart?.resInfo);
  const cartData = useSelector((state) => state?.cart?.cartData);
  const addedItem = useSelector((state) => state?.cart?.addedItem);
  const dispatch = useDispatch();

  //   console.log(moreDetail.info.id)
  const handleAddToCart = (data, resData) => {
    const isAdded = cartData.find((item) => item.id === data.id);

    if (!isAdded) {
      if (resInfo.id === resData.id || resInfo.length === 0) {
        dispatch(setCartData(data));
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
    <div
      className={`absolute z-[10001] w-full h-full ${
        Object.keys(moreDetail).length === 0 ? "hidden" : "block"
      }`}
    >
      <div
        onClick={() => dispatch(setMoreDetail({}))}
        className=" w-full h-full bg-neutral-900 opacity-50"
      ></div>
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[25rem] h-[31rem] scale-[.86] rounded-[2rem] bg-neutral-200 overflow-hidden">
        <button className="cursor-pointer absolute top-5 right-6 text-lg p-1 bg-neutral-200 rounded-full">
          <TbX
            onClick={() => dispatch(setMoreDetail({}))}
            className=""
          />
        </button>
        <div className="img h-[62%] w-full">
          <img
            className="w-full h-full object-cover"
            src={
              moreDetail?.info?.imageId
                ? `https://media-assets.swiggy.com/swiggy/image/upload/${moreDetail?.info?.imageId}`
                : "https://i.pinimg.com/564x/fd/24/4b/fd244bb08e07e4fa26adf8285e5cfc09.jpg"
            }
            alt=""
          />
        </div>
        <div className=" w-full flex flex-col gap-4 p-4">
          <div className="">
          <h1 className="font-[Gilroy-Bold] text-lg md:text-sm text-neutral-600">
            {moreDetail?.info?.name && moreDetail?.info?.name}
          </h1>
          <div className="flex w-full items-center justify-between text-sm text-neutral-600 font-[Gilroy-Semibold]">
            ₹
            {moreDetail?.info?.defaultPrice
              ? moreDetail?.info?.defaultPrice / 100
              : moreDetail?.info?.price / 100}
            <button
              onClick={() =>
                handleAddToCart(moreDetail.info, moreDetail.restaurant.info)
              }
              className={`bg-white hover:bg-neutral-100 text-green-600 font-[Gilroy-ExtraBold] shadow-lg border text-lg scale-90 md:scale-100 border-neutral-400 px-6 py-1 rounded `}
            >
              {addedItem.includes(moreDetail?.info?.id) ? "ADDED" : "ADD"}
            </button>
          </div>
          </div>
          <p className="md:text-[.77rem] text-[.85rem] font-[Gilroy-Medium] text-neutral-500">{moreDetail?.info?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default MoreDetails;
