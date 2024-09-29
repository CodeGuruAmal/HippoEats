import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, setIsDiffResMessage } from "../../utils/cartSlice";
import toast from "react-hot-toast";

const CartRefresher = () => {
  const isDiffResMessage = useSelector(
    (state) => state?.cart?.isDiffResMessage
  );
  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success("Cart is Cleared");
  };

  return (
    <div
      className={`h-full w-full fixed top-0 left-0 z-[10001] ${
        isDiffResMessage ? "block" : "hidden"
      }`}
    >
      <div
        onClick={() => dispatch(setIsDiffResMessage(false))}
        className="h-full w-full bg-neutral-900 opacity-50"
      ></div>
      <div
        className={`h-52 w-96 scale-[.8] sm:scale-95 bg-neutral-100 absolute left-1/2 -translate-x-1/2 duration-300 px-4 py-5 ease-in-out flex flex-col gap-3 ${
          isDiffResMessage ? "bottom-3" : "-bottom-32"
        }`}
      >
        <h1 className="text-2xl font-[Gilroy-Bold]">Items already in cart</h1>
        <p className="text-[.86rem] font-[Gilroy-Medium]">
          Your cart contains items from other restaurant. Would you like to
          reset your cart for adding items from this restaurant?
        </p>
        <div className="flex justify-between gap-2 font-[Gilroy-Semibold]">
          <button
            className="border-2 w-full px-4 py-2 text-sm border-green-500 text-green-500"
            onClick={() => dispatch(setIsDiffResMessage(false))}
          >
            NO
          </button>
          <button
            className=" bg-green-500 w-full px-4 py-2 text-sm text-white"
            onClick={() => {
              handleClearCart();
              dispatch(setIsDiffResMessage(false));
            }}
          >
            YES, START AFRESH
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartRefresher;
