import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiDish, BiFoodTag } from "react-icons/bi";
import { IoSearch } from "react-icons/io5";
import { MdStars } from "react-icons/md";
import { TbBasketStar } from "react-icons/tb";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import {
  setAddedItem,
  setCartData,
  setIsDiffResMessage,
  setResInfo,
} from "../../utils/cartSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const detailsData = useSelector((state) => state?.restaurant?.detailsData);
  const menuData = useSelector((state) => state?.restaurant?.menuData);
  const resInfo = useSelector((state) => state?.cart?.resInfo);
  const cartData = useSelector((state) => state?.cart?.cartData);
  const addedItem = useSelector((state) => state?.cart?.addedItem);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState([]);
  const [isSubOpen, setIsSubOpen] = useState([]);
  const [isDescExpanded, setIsDescExpanded] = useState([]);

  const toggleIsOpen = (index) => {
    setIsOpen((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  const toggleSubIsOpen = (title) => {
    setIsSubOpen((prev) => {
      if (prev.includes(title)) {
        return prev.filter((i) => i !== title);
      } else {
        return [...prev, title];
      }
    });
    // console.log(title);
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

// console.log(menuData)

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
  // console.log(cartData)


  return (
    <>
      <div className="menus mt-8">
        <div className="flex pb-5 gap-2 items-center justify-center font-[Gilroy-Medium] tracking-[.2rem] text-neutral-600">
          <BiDish />
          <h3 className="text-[.65rem]">MENU</h3>
          <BiDish />
        </div>



        <div className="menu relative">
          {menuData.map(
            (
              {
                card: {
                  card: { itemCards, title, categories, carousel },
                },
              },
              index
            ) => {
              const menuItem = index === menuData.length - 1;
              return (
                <div
                  key={index}
                  className={`${menuItem ? "" : "border-b-8"}  p-4`}
                >
                  <div className="py-2">
                    <button
                      className={`flex items-center w-full justify-between font-[Gilroy-Semibold] `}
                      onClick={() => toggleIsOpen(index)}
                    >
                      <div className="flex items-center gap-1 font-[Gilroy-ExtraBold]">
                        <h2 className="">{title}</h2>
                        {itemCards && (
                          <span>({itemCards ? itemCards.length : ""})</span>
                        )}
                      </div>
                      {itemCards && (
                        <div className="">
                          {isOpen.includes(index) ? (
                            <IoIosArrowDown />
                          ) : (
                            <IoIosArrowUp />
                          )}
                        </div>
                      )}
                    </button>
                  </div>

                  {carousel && (
                    <div className="h-slider flex my-4 w-full overflow-x-scroll gap-3 whitespace-nowrap">
                      {carousel.map((topPick, index) => {
                        const imageId = topPick?.creativeId;
                        const defaultPrice = topPick?.dish?.info?.defaultPrice;
                        const price = topPick?.dish?.info?.price;

                        return (
                          <div className="relative" key={topPick?.bannerId}>
                            <img
                              src={`https://media-assets.swiggy.com/swiggy/image/upload/${imageId}`}
                              alt=""
                              className="sm:max-w-60 max-w-48 sm:max-h-60 max-h-48 "
                            />

                            <div className="flex absolute bottom-2 left-1/2 -translate-x-1/2 w-[90%] md:flex-row items-center flex-col justify-between">
                              <span className=" text-xl text-stroke-1 text-zinc-100 font-[Gilroy-Semibold]">
                                ₹
                                {defaultPrice
                                  ? defaultPrice / 100
                                  : price / 100}
                              </span>
                              <button
                                onClick={() =>
                                  handleAddToCart(
                                    topPick?.dish?.info,
                                    detailsData
                                  )
                                }
                                className={`bg-white text-green-600 hover:bg-neutral-100 text-[80%] w-full md:w-20 flex justify-center font-[Gilroy-ExtraBold] shadow-lg border scale-90 md:scale-100 border-neutral-400 px-6 py-1 rounded  `}
                              >
                                {addedItem.includes(topPick.dish.info.id)
                                ? "ADDED"
                                : "ADD"}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {itemCards &&
                    itemCards.map(({ card: info }, itemIndex) => {

                      // console.log(info.info)
                      const foodClassifiers =
                        info.info.itemAttribute.vegClassifier;
                      const ribbonText = info.info.ribbon.text;
                      const foodName = info.info.name;
                      const price = info.info.price;
                      const defaultPrice = info.info.defaultPrice;
                      const rating = info.info.ratings.aggregatedRating.rating;
                      const ratingCount =
                        info.info.ratings.aggregatedRating.ratingCountV2;
                      const imageId = info.info.imageId;
                      const description = info.info.description
                        ? info.info.description
                        : "";
                      const trimDescription = description
                        ? description.substring(0, 85) + "..."
                        : [];

                      const isLastItem = itemIndex === itemCards.length - 1;

                      return (
                        <div
                          className={` justify-between gap-3 items-center px-3 py-5  pb-8 ${
                            isLastItem ? "" : "border-b-2"
                          } ${isOpen.includes(index) ? "hidden" : "flex"}`}
                        >
                          <div className="w-[60%] flex flex-col items-start gap-1 scale-90 md:scale-100">
                            <div className="flex items-center gap-2">
                              <BiFoodTag
                                className={`${
                                  foodClassifiers === "VEG"
                                    ? "text-green-600"
                                    : "text-red-600"
                                }`}
                              />

                              {ribbonText && (
                                <div className="flex gap-1 items-center text-[#d53d4c]">
                                  <TbBasketStar />{" "}
                                  <span className="text-xs font-[Gilroy-Semibold]">
                                    {ribbonText}
                                  </span>
                                </div>
                              )}
                            </div>

                            <h2 className="font-[Gilroy-Semibold] text-neutral-500">
                              {foodName}
                            </h2>
                            <span className="text-[.8rem] font-[Gilroy-Semibold]">
                              ₹{price ? price / 100 : defaultPrice / 100}
                            </span>

                            {rating && (
                              <div className={`items-center flex`}>
                                <MdStars className="text-green-600" />{" "}
                                <div className="text-[.65rem] mt-1 font-[Gilroy-Semibold]">
                                  <span className="">{rating}</span>{" "}
                                  <span className="">({ratingCount})</span>
                                </div>
                              </div>
                            )}

                            {description.length > 85 ? (
                              <p
                                className={`text-xs font-[Gilroy-Medium] mt-3 leading-5 text-neutral-600 `}
                              >
                                {isDescExpanded.includes(info.info.id)
                                  ? description
                                  : trimDescription}{" "}
                                <button
                                  onClick={() =>
                                    toggleIsDescExpanded(info.info.id)
                                  }
                                  className="text-xs font-[Gilroy-Semibold] text-blue-500"
                                >
                                  {isDescExpanded.includes(info.info.id)
                                    ? "Less"
                                    : "More"}
                                </button>
                              </p>
                            ) : (
                              <p
                                className={`text-xs font-[Gilroy-Medium] mt-3 leading-5 text-neutral-600 `}
                              >
                                {description}
                              </p>
                            )}
                          </div>

                          <div className="relative">
                            <img
                              className={`md:w-32 w-24 md:h-32 h-24 object-cover rounded-lg`}
                              src={imageId ? `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${imageId}` : "../../public/img/alt.jpg"}
                              alt=""
                            />

                            <button
                              onClick={() =>
                                handleAddToCart(info.info, detailsData)
                              }
                              className={`bg-white hover:bg-neutral-100 text-green-600 font-[Gilroy-ExtraBold] absolute -bottom-3 shadow-lg border scale-90 md:scale-100 border-neutral-400 px-6 py-1 rounded left-1/2 -translate-x-1/2 `}
                            >
                              {addedItem.includes(info.info.id)
                                ? "ADDED"
                                : "ADD"}
                            </button>
                          </div>
                        </div>
                      );
                    })}

                  {categories &&
                    categories.map((data, catIndex) => {
                      const isLastItem = catIndex === categories.length - 1;

                      const title = data.title;

                      return (
                        <div className="" key={data.id}>
                          <button
                            className={`flex items-center w-full justify-between text-[.8rem] ${
                              isLastItem ? "" : "border-b-2"
                            } font-[Gilroy-Semibold] md:scale-100 scale-90  `}
                            onClick={() => toggleSubIsOpen(title)}
                          >
                            <div className="flex gap-1 items-center px-1 py-3">
                              <h2 className="">{title}</h2>
                              <span>({data.itemCards.length})</span>
                            </div>
                            {data.itemCards && (
                              <div>
                                {isSubOpen.includes(title) ? (
                                  <IoIosArrowUp />
                                ) : (
                                  <IoIosArrowDown />
                                )}
                              </div>
                            )}
                          </button>

                          {data.itemCards.map(({ card: card }, index) => {
                            const subOpen = isSubOpen.includes(title);
                            const isLastItem =
                              index === data.itemCards.length - 1;
                            const description = card.info.description
                              ? card.info.description
                              : "";
                            const trimDescription = description
                              ? description.substring(0, 80) + "..."
                              : [];

                            const foodClassifiers =
                              card.info.itemAttribute.vegClassifier;
                            const foodName = card.info.name;
                            const price = card.info.price;
                            const defaultPrice = card.info.defaultPrice;
                            const rating =
                              card.info.ratings.aggregatedRating.rating;
                            const ratingCount =
                              card.info.ratings.aggregatedRating.ratingCountV2;
                            const imageId = card.info.imageId;

                            return (
                              <div
                                className={`w-full h-full m-2 gap-2 pb-8 ${
                                  subOpen ? "flex" : "hidden"
                                } ${isLastItem ? "" : "border-b-2"} `}
                              >
                                <div className="w-[70%] h-full p-3">
                                  <BiFoodTag
                                    className={`${
                                      foodClassifiers === "VEG"
                                        ? "text-green-600"
                                        : "text-red-600"
                                    }`}
                                  />
                                  <h2 className="text-sm font-[Gilroy-Semibold] text-neutral-700">
                                    {foodName}
                                  </h2>

                                  <span className="text-[.8rem] font-[Gilroy-Semibold]">
                                    ₹
                                    {price
                                      ? (price / 100).toFixed(2).split(".00")
                                      : (defaultPrice / 100)
                                          .toFixed(2)
                                          .split(".00")}
                                  </span>

                                  {rating && (
                                    <div className={`items-center flex`}>
                                      <MdStars
                                        className={`${
                                          rating >= "3.0"
                                            ? "text-green-500"
                                            : "text-yellow-400"
                                        }`}
                                      />{" "}
                                      <div className="text-[.65rem] mt-1 font-[Gilroy-Semibold]">
                                        <span className="">{rating}</span>{" "}
                                        <span className="">
                                          ({ratingCount})
                                        </span>
                                      </div>
                                    </div>
                                  )}

                                  {description.length > 80 ? (
                                    <p
                                      className={`text-xs font-[Gilroy-Medium] mt-3 leading-5 text-neutral-600 `}
                                    >
                                      {isDescExpanded.includes(card.info.id)
                                        ? card.info.description
                                        : trimDescription}{" "}
                                      <button
                                        onClick={() =>
                                          toggleIsDescExpanded(card.info.id)
                                        }
                                        className="text-xs font-[Gilroy-Semibold] text-blue-500"
                                      >
                                        {isDescExpanded.includes(card.info.id)
                                          ? "Less"
                                          : "More"}
                                      </button>
                                    </p>
                                  ) : (
                                    <p
                                      className={`text-xs font-[Gilroy-Medium] mt-3 leading-5 text-neutral-600 `}
                                    >
                                      {card.info.description}
                                    </p>
                                  )}
                                </div>
                                <div className=" h-full p-2 relative ">
                                  <img
                                    className={`w-32 h-32 mx-auto object-cover rounded-lg`}
                                    src={imageId ? `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${imageId}` : "../../public/img/alt.jpg"}
                                    alt=""
                                  />
                                  <button
                                    onClick={() =>
                                      handleAddToCart(card.info, detailsData)
                                    }
                                    className={`bg-white hover:bg-neutral-100 text-green-600 font-[Gilroy-ExtraBold] absolute shadow-lg border scale-90 md:scale-100 border-neutral-400 px-6 py-1 rounded left-1/2 -translate-x-1/2 -bottom-1`}
                                  >
                                    {addedItem.includes(card.info.id)
                                      ? "ADDED"
                                      : "ADD"}
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                </div>
              );
            }
          )}
        </div>
      </div>
    </>
  );
};

export default Menu;
