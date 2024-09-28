import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IoArrowForward, IoArrowBack } from "react-icons/io5";
import { Link } from "react-router-dom";

const OnYourMind = () => {
  const homeData = useSelector((state) => state?.home?.homeData) || [];
  const [headerTitle, setHeaderTitle] = useState("");
  const [sliderImg, setSliderImg] = useState([]);
  const [dataNotFound, setDataNotFound] = useState(false);

  useEffect(() => {
    if (homeData?.cards?.length > 0) {
      const dataFinder = homeData.cards.find(
        (data) => data?.card?.card?.id === "whats_on_your_mind"
      );

      if (dataFinder) {
        const title = dataFinder.card.card.header.title;
        setHeaderTitle(title);

        const sliderImages = dataFinder.card?.card?.imageGridCards?.info;
        setSliderImg(sliderImages);

        setDataNotFound(false);
      } else {
        setDataNotFound(true);
      }
    }
  }, [homeData]);

  return (
    <div>
      {dataNotFound ? null : (
        <div className={`mb-8 border-b-2 `}>
          <div className="flex items-center justify-between">
            <h2 className="text-base md:text-lg font-[Gilroy-ExtraBold]">
              {headerTitle}
            </h2>

            {/* <div className="flex gap-4 text-xl text-zinc-800">
              <button
                className={`text-sm w-6 h-6 rounded bg-zinc-300 flex items-center justify-center transition-opacity duration-300 `}
              >
                <IoArrowBack />
              </button>
              <button
                className={`text-sm w-6 h-6 rounded bg-zinc-300 flex items-center justify-center transition-opacity duration-300`} // Disable button if at the end
              >
                <IoArrowForward />
              </button>
            </div> */}
          </div>

          <div className="h-slider flex gap-[.3rem] overflow-x-scroll scroll-smooth mt-5 pb-7">
            {sliderImg.map((item, index) => {
              const url = item.action.link;
              const collectionIdMatch = url.match(/collection_id=(.*?)&type=rcv2/);
              const collectionId = collectionIdMatch ? collectionIdMatch[1] : null;

              return (
                <Link to={`/restaurants_by_food/${collectionId}`} key={index}>
                  <div>
                    <img
                      className="lg:min-w-28 min-w-24"
                      src={`https://media-assets.swiggy.com/swiggy/image/upload/${item.imageId}`}
                      alt=""
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default OnYourMind;
