import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setMetaData, setSearchData } from "../utils/searchSlice";
import { IoArrowBack } from "react-icons/io5";
import { SearchBarLoader } from "./loaderComponents/SearchLoader";

const Search = () => {
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(true);

  const coordinates = useSelector((state) => state.location.coordinates);
  const [popularCuisine, setPopularCuisine] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchData = useSelector((state) => state.search.searchData);
  const metaData = useSelector((state) => state.search.metaData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ======================================================= This section fetchs the popular cuisine recommendations =======================================================

  useEffect(() => {
    if (
      coordinates?.geometry?.location?.lat &&
      coordinates?.geometry?.location?.lng
    ) {
      axios
        .get(
          `https://cors-proxy-flax-ten.vercel.app/landing/PRE_SEARCH?lat=${coordinates?.geometry?.location?.lat}&lng=${coordinates?.geometry?.location?.lng}`
        )
        .then((res) => {
          setPopularCuisine(res?.data?.data?.cards[1]?.card?.card);
          setTimeout(() => {
            setLoading(false);
          }, 800);
          setTimeout(() => {
            setVisible(false);
          }, 1500);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [coordinates]);

  // ======================================================= This section fetchs the suggestions when the user search =======================================================

  useEffect(() => {
    if (!searchTerm) {
      dispatch(setSearchData([]));
    }

    if (
      coordinates?.geometry?.location?.lat &&
      coordinates?.geometry?.location?.lng
    ) {
      axios
        .get(
          `https://cors-proxy-flax-ten.vercel.app/restaurants/search/suggest?lat=${coordinates?.geometry?.location?.lat}&lng=${coordinates?.geometry?.location?.lng}&str=${searchTerm}&trackingId=undefined&includeIMItem=true`
        )
        .then((res) => {
          res?.data?.data
            ? dispatch(
                setSearchData(
                  res?.data?.data?.suggestions?.filter(
                    (item) => item.category === "Food"
                  )
                )
              )
            : dispatch(setSearchData([]));
        })
        .catch((err) => console.log(err));
    }
  }, [searchTerm, coordinates]);

  // ======================================================= This section is for Data and Function =======================================================

  const popularCuisineTitle = popularCuisine?.header?.title;
  const popularCuisineImg =
    popularCuisine?.gridElements?.infoWithStyle?.info || [];

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (text) => {
    navigate(`/search/${text}`);
  };

  const handleMetaData = (data) => {
    dispatch(setMetaData(data));
  };

  const renderHighlightedText = (text) => {
    const splittedText = text.split(/\{\{(.*?)\}\}/g);

    return splittedText.map((text, index) =>
      // console.log(text +" " + index % 2);

      index % 2 == 1 ? (
        <span key={index} className="font-[Gilroy-Bold] text-black">
          {text}
        </span>
      ) : (
        text
      )
    );
  };

  return (
    <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[95%] md:w-[70%] xl:w-[55%] flex flex-col gap-3 h-[90vh] ">
      <div className="w-full p-3 pt-1 flex flex-col gap-4">
        <button
          onClick={() => navigate(-1)}
          className="text-xl duration-200 cursor-pointer w-10 h-10 flex items-center justify-center hover:bg-neutral-100 p-1 rounded-xl"
        >
          <IoArrowBack />
        </button>
        <div className="relative">
          <input
            type="text"
            onChange={handleSearchTerm}
            value={searchTerm}
            className="border rounded-md w-full px-6 py-2 shadow-sm outline-none text-sm font-[Gilroy-Medium] "
            placeholder="Search for restaurant and food"
          />

          <span
            onClick={() => setSearchTerm("")}
            className={`font-[Gilroy-Semibold] absolute top-1/2 right-3 text-xs text-secondaryFont -translate-y-1/2 cursor-pointer ${
              searchTerm ? "block" : "hidden"
            }`}
          >
            cancel
          </span>
        </div>

        {loading ? (
          <SearchBarLoader />
        ) : (
          <div
            className={`${
              visible ? "opacity-0" : "opacity-100"
            } w-full flex-col gap-5 border-t-8 border-b-8 p-5 mt-6 ${
              searchTerm ? "hidden" : "flex"
            }`}
          >
            <h1 className="text-base md:text-lg font-[Gilroy-ExtraBold]">
              {popularCuisineTitle}
            </h1>
            <div className="h-slider flex overflow-scroll gap-2">
              {popularCuisineImg.map((item, index) => {
                return (
                  <img
                    onClick={() => {
                      setSearchTerm(
                        decodeURIComponent(item.action.link.split("=").at(-1))
                      );
                    }}
                    className="md:w-20 w-16 cursor-pointer"
                    key={index}
                    src={`https://media-assets.swiggy.com/swiggy/image/upload/${item.imageId}`}
                    alt=""
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="v-slider flex flex-col gap-3 w-full  h-full py-2 px-4 overflow-scroll">
        {searchData.map((item, index) => {
          // console.log(item)
          return (
            <div
              onClick={() => {
                handleSearch(item.text);
                handleMetaData(JSON.parse(item.metadata));
              }}
              className="flex gap-4 w-full cursor-pointer"
              key={index}
            >
              <div className="w-14 h-14 overflow-hidden rounded-lg">
                <img
                  className="w-full h-full object-fill"
                  src={`https://media-assets.swiggy.com/swiggy/image/upload/${item.cloudinaryId}`}
                  alt=""
                />
              </div>

              <div className="">
                <h1 className="text-sm text-neutral-800 font-[Gilroy-Medium]">
                  {renderHighlightedText(item.highlightedText)}
                </h1>
                <span className="text-xs text-neutral-500">
                  {item?.tagToDisplay}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Search;
