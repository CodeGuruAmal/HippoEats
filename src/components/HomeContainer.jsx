import React, { useEffect, useState } from "react";
import OnYourMind from "./homeComponents/OnYourMind"
import TopRestaurant from "./homeComponents/TopRestaurant";
import WithOnlineDelivery from "./homeComponents/WithOnlineDelivery";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setHomeData } from "../utils/homeSlice";
import NoService from "./NoService";
import HomeLoader from "./loaderComponents/HomeLoader";

const HomeContainer = () => {
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(true);
  const locationClick = useSelector((state) => state.nav.locationClick);
  const menuClick = useSelector((state) => state.nav.menuClick);
  const cartClick = useSelector((state) => state.nav.cartClick);
  const authClick = useSelector((state) => state.nav.authClick);
  const homeData = useSelector((state) => state.home.homeData);
  const coordinates = useSelector((state) => state.location.coordinates);

  const dispatch = useDispatch();

  useEffect(() => {
    if (coordinates?.geometry?.location) {
      const { lat, lng } = coordinates.geometry.location;
      const isMobile = window.innerWidth <= 768;

      const apiUrl = isMobile
        ? `https://cors-proxy-flax-ten.vercel.app/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&lat=${lat}&lng=${lng}&carousel=true&third_party_vendor=1`
        : `https://cors-proxy-flax-ten.vercel.app/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;

      // Using axios to fetch data
      axios
        .get(apiUrl)
        .then((res) => {
          dispatch(setHomeData(res?.data?.data));
          setTimeout(() => {
            setLoading(false);
          }, 800);
          setTimeout(() => {
            setVisible(false);
          }, 1600);
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
          if (err.res?.status === 404) {
            // Handle 404 errors
            console.error("Data not found. Status code:", err.res.status);
          }
          setLoading(false);
        });
    }
  }, [coordinates]);

  if (homeData.communication) {
    return <NoService />;
  }

  if (loading) {
    return <HomeLoader />;
  }

  return (
    <div className={`${visible ? "opacity-0" : "opacity-100"}`}>
      <div
        className={`lg:w-[75%] w-full left-1/2 px-5 -translate-x-1/2 absolute top-24 ${
          locationClick || menuClick || cartClick || authClick
            ? "max-h-[85vh] overflow-hidden"
            : ""
        } `}
      >
        <OnYourMind />
        <TopRestaurant />
        <WithOnlineDelivery />
      </div>
    </div>
  );
};

export default HomeContainer;
