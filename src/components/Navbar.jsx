import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { IoSearch, IoLocationOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { MdLogout } from "react-icons/md";
import { TbMenu, TbX, TbCurrentLocation } from "react-icons/tb";
import { BsBag } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  setAuthClick,
  setCartClick,
  setLocationClick,
  setMenuClick,
} from "../utils/navSlice";
import {
  setCoordinates,
  setLocationData,
  setLocationSearchTerm,
  setPlaceId,
} from "../utils/locationSlice";
import axios from "axios";
import Checkout from "./NavComponents/Checkout";
import { removeUserData } from "../utils/authSlice";
// import Login from "./AuthComponents/Login";
// import SignUp from "./AuthComponents/SignUp";
// import { setIsLogin } from "../utils/authSlice";

const Navbar = () => {
  const iconMapping = {
    Search: <IoSearch className="md:text-sm text-xl " />,
    Locate: <TbCurrentLocation className="md:text-sm text-xl " />,
    Cart: <BsBag className="md:text-sm text-xl " />,
    Login: <FiUser className="md:text-sm text-xl " />,
  };

  const [menuLink] = useState([
    { link: "Search", path: "/search" },
    { link: "Locate" },
    { link: "Cart" },
    { link: "Login", path: "/login" },
  ]);

  const menuClick = useSelector((state) => state.nav.menuClick);
  const locationClick = useSelector((state) => state.nav.locationClick);
  const cartClick = useSelector((state) => state.nav.cartClick);
  // const authClick = useSelector((state) => state.nav.authClick);

  const locationSearchTerm = useSelector(
    (state) => state.location.locationSearchTerm
  );
  const locationData = useSelector((state) => state.location.locationData);
  const placeId = useSelector((state) => state.location.placeId);
  const coordinates = useSelector((state) => state.location.coordinates);

  const cartData = useSelector((state) => state.cart.cartData);

  const userData = useSelector((state) => state.auth.userData);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `https://cors-proxy-flax-ten.vercel.app/misc/place-autocomplete?input=${locationSearchTerm}`
      )
      .then((res) =>
        res?.data?.data ? dispatch(setLocationData(res?.data?.data)) : []
      )
      .catch((err) => console.log(err));
  }, [locationSearchTerm]);

  useEffect(() => {
    axios
      .get(
        `https://cors-proxy-flax-ten.vercel.app/misc/address-recommend?place_id=${placeId}`
      )
      .then((res) => {
        res?.data?.data ? dispatch(setCoordinates(res?.data?.data[0])) : [];
      })
      .catch((err) => console.log(err));
  }, [placeId]);

  const toggleMenuClick = () => {
    dispatch(setMenuClick(!menuClick));
  };

  const toggleLocationClick = () => {
    dispatch(setLocationClick(!locationClick));
  };
  const toggleCartClick = () => {
    dispatch(setCartClick(!cartClick));
  };

  // const toggleAuthClick = () => {
  //   dispatch(setAuthClick(!authClick));
  // };

  const handleLocationSearchTerm = (e) => {
    dispatch(setLocationSearchTerm(e.target.value));
  };

  const handlePlaceId = (id) => {
    dispatch(setPlaceId(id));
  };

  // const handleIsLogin = () => {
  //   dispatch(setIsLogin(!isLogin))
  // }


  const handleLogout = () => {
    dispatch(removeUserData())
  }

  const placeName = coordinates?.formatted_address
    ? coordinates?.formatted_address
    : "";
  const trimPlaceName = placeName ? placeName.substring(0, 35) + "..." : [];

  return (
    <>
      {/* ========================================== This Section is for Desktop Nav ================================================= */}

      <div className="fixed p-3 z-[1000] w-full bg-white shadow-md shadow-zinc-200 text-xs font-[Gilroy-SemiBold] text-primaryFont">
        <div className="lg:w-[75%] w-full px-3 mx-auto flex justify-between items-center">
          <div className="left-nav flex items-center gap-4">
            <Link to={"/"}>
              <div className="logo">
                <svg className="h-9" viewBox="0 0 559 825" fill="#ff5200">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M542.92 388.542C546.805 366.526 542.355 349.598 530.881 340.76C513.621 327.466 487.698 320.236 425.954 320.236C380.271 320.236 331.225 320.286 310.268 320.275C308.322 319.894 301.285 317.604 301.02 309.112L300.734 174.289C300.727 165.779 307.531 158.857 315.943 158.839C324.369 158.825 331.204 165.723 331.211 174.226C331.211 174.226 331.421 247.414 331.441 273.424C331.441 275.936 332.892 281.8 338.549 283.328C375.43 293.267 561.865 285.999 558.967 251.804C543.147 109.96 424.476 0 280.394 0C235.021 0 192.065 10.9162 154.026 30.2754C62.9934 77.5955 -1.65904 173.107 0.0324268 283.43C1.23215 361.622 52.2203 500.605 83.434 521.234C97.8202 530.749 116.765 527.228 201.484 527.228C239.903 527.228 275.679 527.355 293.26 527.436C295.087 527.782 304.671 530.001 304.671 538.907L304.894 641.393C304.915 649.907 298.104 656.826 289.678 656.829C281.266 656.843 274.434 649.953 274.42 641.446C274.42 641.446 275.17 600.322 275.17 584.985C275.17 581.435 275.424 575.339 265.178 570.727C231.432 555.553 121.849 564.712 115.701 581.457C113.347 587.899 125.599 612.801 144.459 644.731C170.102 685.624 211.889 747.245 245.601 792.625C261.047 813.417 268.77 823.813 280.467 824.101C292.165 824.389 300.514 814.236 317.213 793.928C383.012 713.909 516.552 537.663 542.92 388.542Z"
                    fill="url(#paint0_linear_19447_66107)"
                  ></path>
                  <defs>
                    <linearGradient
                      id="paint0_linear_19447_66107"
                      x1="445.629"
                      y1="63.8626"
                      x2="160.773"
                      y2="537.598"
                      gradientUnits="userDataSpaceOnUse"
                    >
                      <stop stopColor="#FF993A"></stop>
                      <stop offset="1" stopColor="#FF5200"></stop>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </Link>
            {placeName.length > 35 ? (
              <span className="text-[.65rem] text-neutral-500 font-[Gilroy-Medium] tracking-wide">
                {trimPlaceName}
              </span>
            ) : (
              <span className="text-[.65rem] text-neutral-500 font-[Gilroy-Medium] tracking-wide">
                {coordinates.formatted_address}
              </span>
            )}
          </div>

          <div className="right-nav md:flex text-xs items-center hidden">
            <nav className="flex gap-10">
              {menuLink.map((m, index) =>
                 m.link !== "Login" ? 
                 <Link
                 to={m.path}
                 key={index}
                 onClick={() => {
                   if (m.link === "Locate") {
                     toggleLocationClick();
                   } else if (m.link === "Cart") {
                     toggleCartClick();
                   } else if (m.link === "Login") {
                     // toggleAuthClick();
                     dispatch(setMenuClick(false));
                   } else if (m.link === "Search") {
                     dispatch(setMenuClick(false));
                   }
                 }}
                 className="flex items-center gap-1 w-full hover:text-secondaryFont relative"
               >
                 <span className="flex gap-1">
                   {iconMapping[m.link]} {m.link}{" "}
                   {m.link === "Cart" && (
                     <span className="text-secondaryFont text-[.7rem] pl-1">
                       {cartData.length > 0
                         ? cartData.length < 100
                           ? cartData.length
                           : "99+"
                         : []}
                     </span>
                   )}
                 </span>
               </Link>
                :
                <Link
                to={userData ? null : m.path}
                key={index}
                onClick={() => {
                  if (m.link === "Locate") {
                    toggleLocationClick();
                  } else if (m.link === "Cart") {
                    toggleCartClick();
                  } else if (m.link === "Login") {
                    // toggleAuthClick();
                    dispatch(setMenuClick(false));
                  } else if (m.link === "Search") {
                    dispatch(setMenuClick(false));
                  }
                }}
                className="flex items-center gap-1 w-full hover:text-secondaryFont relative"
              >
                <span className="flex gap-1" onClick={handleLogout}>
                {userData ? <MdLogout /> : iconMapping[m.link]}
                {userData ? "Logout" : m.link}
                  {m.link === "Cart" && (
                    <span className="text-secondaryFont text-[.7rem] pl-1">
                      {cartData.length > 0
                        ? cartData.length < 100
                          ? cartData.length
                          : "99+"
                        : []}
                    </span>
                  )}
                </span>
              </Link>
                
              )}
            </nav>
          </div>

          <div className="relative md:hidden">
            <TbMenu
              onClick={toggleMenuClick}
              className="cursor-pointer md:hidden block text-2xl"
            />
            <span
              className={` ${
                cartData.length > 0 ? "flex" : "hidden"
              } md:hidden absolute -top-3 -right-4 h-6 w-6 text-white items-center justify-center bg-orange-500 rounded-full`}
            >
              {cartData.length > 0
                ? cartData.length < 100
                  ? cartData.length
                  : "99+"
                : []}
            </span>
          </div>
        </div>
      </div>

      {/* ========================================== This Section is for Mobile Nav ================================================= */}

      <div className="h-screen absolute">
        <div
          onClick={toggleMenuClick}
          className={`w-full h-full z-[1000] bg-neutral-900 opacity-50 fixed top-0 left-0 ${
            menuClick ? "block" : "hidden"
          }`}
        ></div>

        <div
          className={`sm:w-[45%] w-full h-full bg-neutral-100 fixed duration-300 ease-in-out top-0 z-[1001] ${
            menuClick ? "right-0" : "-right-full"
          }`}
        >
          <TbX
            onClick={toggleMenuClick}
            className="cursor-pointer md:hidden block absolute top-5 right-6 text-xl"
          />

          <nav className="flex flex-col h-full justify-center text-2xl w-full items-center px-10 gap-6 font-[Gilroy-Semibold]">
            {menuLink.map((m, index) =>
                m.link !== "Login" ? 
                <Link
                  to={m.path}
                  key={index}
                  onClick={() => {
                    if (m.link === "Locate") {
                      toggleLocationClick();
                    } else if (m.link === "Cart") {
                      toggleCartClick();
                    } else if (m.link === "Login") {
                      // toggleAuthClick();
                      dispatch(setMenuClick(false));
                    } else if (m.link === "Search") {
                      dispatch(setMenuClick(false));
                    }
                  }}
                  className="flex relative items-center gap-1 hover:text-secondaryFont px-4 py-2"
                >
                  <span className="flex gap-1">
                    {iconMapping[m.link]} {m.link}{" "}
                    {m.link === "Cart" && (
                      <span className="text-secondaryFont text-xl ml-2 mt-[.11rem]">
                        {cartData.length > 0
                          ? cartData.length < 100
                            ? cartData.length
                            : "99+"
                          : []}
                      </span>
                    )}
                  </span>
                </Link>
                 : 
                 <Link
                 to={userData ? null : m.path}
                  key={index}
                  onClick={() => {
                    if (m.link === "Locate") {
                      toggleLocationClick();
                    } else if (m.link === "Cart") {
                      toggleCartClick();
                    } else if (m.link === "Login") {
                      // toggleAuthClick();
                      dispatch(setMenuClick(false));
                    } else if (m.link === "Search") {
                      dispatch(setMenuClick(false));
                    }
                  }}
                  className="flex relative items-center gap-1 hover:text-secondaryFont px-4 py-2"
                >
                  <span className="flex gap-1" onClick={handleLogout}>
                    {userData ? <MdLogout /> : iconMapping[m.link]}
                    {userData ? "Logout" : m.link}
                    {m.link === "Cart" && (
                      <span className="text-secondaryFont text-xl ml-2 mt-[.11rem]">
                        {cartData.length > 0
                          ? cartData.length < 100
                            ? cartData.length
                            : "99+"
                          : []}
                      </span>
                    )}
                  </span>
                </Link>
              
            )}
          </nav>
        </div>
      </div>

      {/* ========================================== This Section is for Location ================================================= */}

      <div className=" font-[Gilroy-Medium]">
        <div
          onClick={toggleLocationClick}
          className={`w-full h-screen fixed z-[1000] top-0 left-0 ${
            locationClick ? "block" : "hidden"
          } opacity-55 bg-zinc-800`}
        ></div>

        <div
          className={`md:w-[45%] w-full flex flex-col px-4 pt-16 h-screen fixed z-[1001] top-0 duration-300 ease-in-out ${
            locationClick ? "left-0" : "-left-full"
          } bg-neutral-100`}
        >
          <TbX
            onClick={toggleLocationClick}
            className="cursor-pointer block absolute top-5 right-6 text-xl"
          />

          <div className="relative">
            <input
              type="text"
              onChange={handleLocationSearchTerm}
              value={locationSearchTerm}
              className="border rounded-md w-full px-6 py-2 shadow-sm outline-none text-sm font-[Gilroy-Medium] "
              placeholder="Search for area, street name..."
            />

            <span
              onClick={() => dispatch(setLocationSearchTerm(""))}
              className={`${
                locationSearchTerm ? "block" : "hidden"
              } absolute top-1/2 right-3 text-xs text-secondaryFont -translate-y-1/2 cursor-pointer`}
            >
              cancel
            </span>
          </div>

          <div className="mt-4">
            {locationData.map((data, index) => {
              const isLastItem = index === locationData.length - 1;
              return (
                <div className="" key={index}>
                  {locationSearchTerm ? (
                    <div
                      onClick={() => {
                        handlePlaceId(data.place_id);
                        dispatch(setLocationClick(false));
                        dispatch(setMenuClick(false));
                        navigate("/");
                      }}
                      className={`py-4 flex w-full items-center gap-2 cursor-pointer ${
                        isLastItem ? "" : "border-b-2 border-dashed"
                      }`}
                    >
                      <IoLocationOutline className="text-lg w-[10%]" />
                      <div className="w-[90%]">
                        <h2 className="text-xs">
                          {data?.structured_formatting?.main_text}
                        </h2>
                        <p className="text-[.65rem] text-neutral-400">
                          {data?.structured_formatting?.secondary_text}
                        </p>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ========================================== This Section is for Cart ================================================= */}

      <div className={`  relative`}>
        <div
          onClick={toggleCartClick}
          className={`w-full h-full fixed left-0 top-0 z-[1000] ${
            cartClick ? "block" : "hidden"
          }  bg-neutral-900 opacity-50 `}
        ></div>
        <div
          className={`md:w-[50%] w-full min-h-screen overflow-scroll fixed top-0 z-[1001] duration-300 ease-in-out ${
            cartClick ? "right-0" : "-right-full"
          } bg-neutral-100`}
        >
          <Checkout />
        </div>
      </div>

      <Outlet />
    </>
  );
};

export default Navbar;