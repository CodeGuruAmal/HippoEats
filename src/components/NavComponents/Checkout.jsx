import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiFoodTag } from "react-icons/bi";
import { TbX } from "react-icons/tb";
import { MdStars } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { setCartClick, setMenuClick } from "../../utils/navSlice";
import {
  clearCart,
  decrementQty,
  incrementQty,
  removeItem,
  setAddedItem,
  setCartData,
} from "../../utils/cartSlice";
import toast from "react-hot-toast";

const Checkout = () => {
  const cartData = useSelector((state) => state?.cart?.cartData);
  const addedItem = useSelector((state) => state?.cart?.addedItem);
  const resInfo = useSelector((state) => state?.cart?.resInfo);

  const userData = useSelector((state) => state?.auth?.userData);

  // console.log(resInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log(cartData)

  const [isDescExpanded, setIsDescExpanded] = useState([]);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const handleRemoveItem = (itemId) => {
    if (cartData.length > 1) {
      dispatch(removeItem(itemId));
      toast.success("Item Removed");
    } else {
      handleClearCart();
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success("Cart is Cleared");
  };

  const toggleIsDescExpanded = (id) => {
    setIsDescExpanded((prev) => {
      if (prev.includes(id)) {
        return prev.filter((i) => i !== id);
      } else {
        return [...prev, id];
      }
    });

    // console.log(id)
  };

  const togglePlaceOrder = () => {
    setIsOrderPlaced(!isOrderPlaced);
    if (isOrderPlaced) {
      toast.error("Order has been Cancelled");
    } else {
      toast.success("Order has been Placed");
    }
  };

  const total = cartData.reduce(
    (acc, curVal) =>
      acc + curVal.qty * (curVal.price / 100 || curVal.defaultPrice / 100),
    0
  );

  // // const deliveryFee = resInfo?.feeDetails?.totalFee
  // //   ? resInfo.feeDetails?.totalFee / 100
  // //   : 0;

  // const totalQty = cartData.reduce((acc, item) => acc + item.qty, 0);

  // // console.log(totalQty); // Output: 22 (10 + 5 + 7)

  // const total = subTotal;

  // console.log( cartData)
  if (cartData.length === 0) {
    return (
      <div className="absolute top-5 px-5 w-full">
        <div className="flex items-center justify-between">
          <h2 className="font-[Gilroy-ExtraBold] text-lg">My Cart</h2>
          <TbX
            onClick={() => dispatch(setCartClick(false))}
            className="cursor-pointer text-xl"
          />
        </div>

        <div className="flex flex-col gap-3 items-center justify-center h-[90vh] w-full">
          <h1 className="font-[Gilroy-ExtraBold] text-2xl">
            Your Cart is Empty
          </h1>
          <p className="font-[Gilroy-Medium] text-xs text-neutral-500">
            You can go to home page to view more restaurants
          </p>
          <Link to={"/"}>
            <button
              onClick={() => {
                dispatch(setCartClick(false));
                dispatch(setMenuClick(false));
              }}
              className="font-[Gilroy-Bold] text-white text-sm px-4 py-2 bg-secondaryFont"
            >
              See restaurants near you
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute top-5 px-5 w-full">
      <div className="flex items-center justify-between">
        <h2 className="font-[Gilroy-ExtraBold] text-lg">My Cart</h2>
        <TbX
          onClick={() => dispatch(setCartClick(false))}
          className="cursor-pointer text-xl"
        />
      </div>

      <button
        onClick={handleClearCart}
        className="bg-red-600 px-4 py-2 absolute top-10 font-[Gilroy-Semibold] text-sm right-5 rounded-md text-white"
      >
        Clear
      </button>

      <div className="mt-14">
        <h1 className="text-2xl font-[Gilroy-ExtraBold]">{resInfo.name}</h1>
        <span className="text-xs font-[Gilroy-Semibold] text-neutral-400">
          {resInfo.areaName}
        </span>
      </div>

      <div className="mt-9 flex flex-col gap-3">
        {cartData.map((item, index) => {
          const description = item.description ? item.description : "";
          const trimDescription = description
            ? description.substring(0, 85) + "..."
            : [];

          return (
            <div
              key={index}
              className="items-center flex justify-between  cart-items w-full px-5 py-3 pb-6 bg-white border shadow-sm rounded-xl"
            >
              <div className="w-[75%] flex flex-col gap-1">
                <BiFoodTag
                  className={`${
                    item?.itemAttribute?.vegClassifier
                      ? item.itemAttribute.vegClassifier === "VEG"
                        ? "text-green-600"
                        : "text-red-600"
                      : ""
                  }`}
                />

                <h2 className="text-sm font-[Gilroy-Bold] text-neutral-700">
                  {item.name}
                </h2>

                <span className="text-[.8rem] font-[Gilroy-Semibold]">
                  ₹{item.price ? item.price / 100 : item.defaultPrice / 100}
                </span>

                {item?.ratings?.aggregatedRating?.rating && (
                  <div className="items-center flex gap-1">
                    <MdStars className="text-green-600" />{" "}
                    <div className="text-[.65rem] mt-1 font-[Gilroy-Semibold]">
                      <span>{item.ratings.aggregatedRating.rating}</span>{" "}
                      <span>
                        ({item.ratings.aggregatedRating.ratingCountV2})
                      </span>
                    </div>
                  </div>
                )}

                <div className="w-[85%]">
                  {description.length > 85 ? (
                    <p
                      className={`text-[.67rem] font-[Gilroy-Medium] mt-3 leading-5 text-neutral-600 `}
                    >
                      {isDescExpanded.includes(item.id)
                        ? description
                        : trimDescription}{" "}
                      <button
                        onClick={() => toggleIsDescExpanded(item.id)}
                        className="text-xs font-[Gilroy-Semibold] text-blue-500"
                      >
                        {isDescExpanded.includes(item.id) ? "Less" : "More"}
                      </button>
                    </p>
                  ) : (
                    <p
                      className={`text-[.67rem] font-[Gilroy-Medium] mt-3 leading-5 text-neutral-600 `}
                    >
                      {description}
                    </p>
                  )}
                </div>

                <div className="mt-3 shadow-sm border flex gap-2 text-green-600 font-[Gilroy-Semibold] text-xs rounded-md items-center w-fit">
                  <button
                    onClick={() => dispatch(decrementQty(item.id))}
                    className="w-7 h-7 hover:bg-neutral-200 rounded-md"
                  >
                    -
                  </button>
                  <span>{item.qty}</span>
                  <button
                    onClick={() => dispatch(incrementQty(item.id))}
                    className="w-7 h-7 hover:bg-neutral-200 rounded-md"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="relative w-[35%]">
                <img
                  className={`w-32 md:w-36 h-28 md:h-32 mx-auto object-cover rounded-lg  ${
                    item.imageId ? "visible" : "invisible"
                  }`}
                  src={
                    item?.imageId
                      ? `https://media-assets.swiggy.com/swiggy/image/upload/${item.imageId}`
                      : "../../public/img/alt.jpg"
                  }
                  alt=""
                />

                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className={`bg-white hover:bg-neutral-100 text-red-600 font-[Gilroy-ExtraBold] absolute text-sm shadow-lg border scale-90 lg:scale-95 border-neutral-400 px-6 py-1 rounded left-1/2 -translate-x-1/2 ${
                    item.imageId ? "-bottom-3" : "top-1/2"
                  }`}
                >
                  REMOVE
                </button>
              </div>
            </div>
          );
        })}
      </div>


      <div className="w-full p-5 border-2 bg-white shadow-sm my-5 rounded-xl">
        <h2 className="font-[Gilroy-Bold] text-secondaryFont text-xl">
          Bill Details:
        </h2>
        <div className="w-full border-b border-neutral-400 pb-4 mb-4 flex flex-col gap-2 text-xs text-neutral-600 mt-5 font-[Gilroy-Medium]">
          <div className="flex flex-col gap-2">
            {cartData.map((item) => {
              return (
                <div className="flex justify-between" key={item.id}>
                  <div className="flex gap-1"><span>{item.name}</span><span className="font-[Gilroy-Bold] text-neutral-700">(Qty: {item.qty})</span></div>
                  <span>₹{item.price ? (item.price / 100) * item.qty : (item.defaultPrice / 100) * item.qty}</span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="text-lg font-[Gilroy-Bold] flex items-center justify-between">
          <span>Total:</span>
          <span>₹{parseFloat(total.toFixed(2))}</span>
        </div>

      </div>

      {userData ? (
        <button
          onClick={togglePlaceOrder}
          className={`${
            isOrderPlaced ? "bg-red-600 text-white" : "bg-green-600"
          } px-4 py-2 mt-5 font-[Gilroy-Semibold] text-sm rounded-md w-full`}
        >
          {isOrderPlaced ? "Cancel Order" : "Place Order"}
        </button>
      ) : (
        <div className="flex gap-3 my-6">
          <button
            onClick={() => {
              navigate("/login");

              dispatch(setCartClick(false));
              dispatch(setMenuClick(false));
            }}
            className={`flex flex-col items-center border-2 border-secondaryFont px-4 py-2 mt-5 font-[Gilroy-Semibold] text-sm rounded-md `}
          >
            <span>Have an account?</span>
            <span>LOGIN</span>
          </button>

          <button
            onClick={() => {
              navigate("/register");

              dispatch(setCartClick(false));
              dispatch(setMenuClick(false));
            }}
            className={`flex flex-col items-center bg-secondaryFont px-4 py-2 mt-5 font-[Gilroy-Semibold] text-sm rounded-md `}
          >
            <span>New to Swiggy?</span>
            <span>SIGNUP</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Checkout;
