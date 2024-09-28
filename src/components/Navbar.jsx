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
    dispatch(removeUserData());
  };

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
                <svg
                  className="h-10"
                  viewBox="0 0 136 179"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M23.0107 3.5L44.0107 18.5C64.7083 8.43395 76.3127 6.84377 97.0107 18.5L118.511 3C122.62 8.71396 124.729 12.0008 127.011 18.5C126.418 26.3698 124.721 29.3908 119.511 32.5L113.511 33C116.826 40.3209 117.644 44.8533 116.511 54C129.134 61.6788 132.027 69.3259 134.011 85.5C134.374 106.011 128.521 116 120.011 119C111.5 122 83.0077 104.179 21.5107 117.5C16.0001 116.5 12.0001 112.5 9.5001 105C7.0001 97.5 5.57401 95.6875 5.5 87C5.26239 72.8168 10.4632 64.3797 24.5107 54C23.8151 44.3297 24.6451 40.4093 27.0107 33C25.4249 33.2708 24.5449 33.3183 23.0107 33C16.3706 30.3139 14.0513 27.3822 13.5107 18.5C15.0088 11.4914 17.2047 8.26742 23.0107 3.5Z"
                    fill="#E2A76C"
                  />
                  <path
                    d="M116.511 54C117.644 44.8533 116.826 40.3209 113.511 33L119.511 32.5C124.721 29.3908 126.418 26.3698 127.011 18.5C124.729 12.0008 122.62 8.71396 118.511 3L97.0107 18.5C76.3127 6.84377 64.7083 8.43395 44.0107 18.5L23.0107 3.5C17.2047 8.26742 15.0088 11.4914 13.5107 18.5C14.0513 27.3822 16.3706 30.3139 23.0107 33C24.5449 33.3183 25.4249 33.2708 27.0107 33C24.6451 40.4093 23.8151 44.3297 24.5107 54M116.511 54C129.134 61.6788 132.027 69.3259 134.011 85.5C134.374 106.011 128.521 116 120.011 119C111.5 122 83.0077 104.179 21.5107 117.5C16.0001 116.5 12.0001 112.5 9.5001 105C7.0001 97.5 5.57401 95.6875 5.5 87C5.26239 72.8168 10.4632 64.3797 24.5107 54M116.511 54C79.0987 46.511 59.0155 46.8073 24.5107 54"
                    stroke="black"
                    strokeWidth="3"
                  />
                  <mask id="path-3-inside-1_174_69" fill="white">
                    <path d="M61 50C61 48.5555 60.8577 47.1251 60.5813 45.7905C60.3049 44.4559 59.8998 43.2433 59.3891 42.2218C58.8784 41.2004 58.272 40.3901 57.6048 39.8373C56.9375 39.2845 56.2223 39 55.5 39C54.7777 39 54.0625 39.2845 53.3952 39.8373C52.728 40.3901 52.1216 41.2004 51.6109 42.2218C51.1002 43.2433 50.6951 44.4559 50.4187 45.7905C50.1423 47.1251 50 48.5555 50 50L55.5 50H61Z" />
                  </mask>
                  <path
                    d="M61 50C61 48.5555 60.8577 47.1251 60.5813 45.7905C60.3049 44.4559 59.8998 43.2433 59.3891 42.2218C58.8784 41.2004 58.272 40.3901 57.6048 39.8373C56.9375 39.2845 56.2223 39 55.5 39C54.7777 39 54.0625 39.2845 53.3952 39.8373C52.728 40.3901 52.1216 41.2004 51.6109 42.2218C51.1002 43.2433 50.6951 44.4559 50.4187 45.7905C50.1423 47.1251 50 48.5555 50 50L55.5 50H61Z"
                    fill="black"
                    stroke="black"
                    strokeWidth="4"
                    mask="url(#path-3-inside-1_174_69)"
                  />
                  <mask id="path-4-inside-2_174_69" fill="white">
                    <path d="M90 50C90 48.5555 89.8577 47.1251 89.5813 45.7905C89.3049 44.4559 88.8998 43.2433 88.3891 42.2218C87.8784 41.2004 87.272 40.3901 86.6048 39.8373C85.9375 39.2845 85.2223 39 84.5 39C83.7777 39 83.0625 39.2845 82.3952 39.8373C81.728 40.3901 81.1216 41.2004 80.6109 42.2218C80.1002 43.2433 79.6951 44.4559 79.4187 45.7905C79.1423 47.1251 79 48.5555 79 50L84.5 50H90Z" />
                  </mask>
                  <path
                    d="M90 50C90 48.5555 89.8577 47.1251 89.5813 45.7905C89.3049 44.4559 88.8998 43.2433 88.3891 42.2218C87.8784 41.2004 87.272 40.3901 86.6048 39.8373C85.9375 39.2845 85.2223 39 84.5 39C83.7777 39 83.0625 39.2845 82.3952 39.8373C81.728 40.3901 81.1216 41.2004 80.6109 42.2218C80.1002 43.2433 79.6951 44.4559 79.4187 45.7905C79.1423 47.1251 79 48.5555 79 50L84.5 50H90Z"
                    fill="black"
                    stroke="black"
                    strokeWidth="4"
                    mask="url(#path-4-inside-2_174_69)"
                  />
                  <ellipse
                    cx="29.7628"
                    cy="73.0908"
                    rx="6.38422"
                    ry="9.92332"
                    transform="rotate(52.7156 29.7628 73.0908)"
                    fill="black"
                  />
                  <ellipse
                    cx="110.799"
                    cy="71.7121"
                    rx="6.38422"
                    ry="9.92332"
                    transform="rotate(122.452 110.799 71.7121)"
                    fill="black"
                  />
                  <ellipse
                    cx="50.3637"
                    cy="65.0799"
                    rx="3"
                    ry="4.5"
                    transform="rotate(82.2432 50.3637 65.0799)"
                    fill="#FAD336"
                  />
                  <ellipse
                    cx="40.405"
                    cy="82.9171"
                    rx="3"
                    ry="4.5"
                    transform="rotate(58.298 40.405 82.9171)"
                    fill="#FAD336"
                  />
                  <ellipse
                    cx="71.9544"
                    cy="67.7391"
                    rx="3"
                    ry="4.5"
                    transform="rotate(100.048 71.9544 67.7391)"
                    fill="#FAD336"
                  />
                  <ellipse
                    cx="57.69"
                    cy="82.2934"
                    rx="3"
                    ry="4.5"
                    transform="rotate(86.1767 57.69 82.2934)"
                    fill="#FAD336"
                  />
                  <ellipse
                    cx="92.5804"
                    cy="64.122"
                    rx="3"
                    ry="4.5"
                    transform="rotate(91.5676 92.5804 64.122)"
                    fill="#FAD336"
                  />
                  <ellipse
                    cx="82.1343"
                    cy="80.0857"
                    rx="3"
                    ry="4.5"
                    transform="rotate(74.625 82.1343 80.0857)"
                    fill="#FAD336"
                  />
                  <ellipse
                    cx="105.797"
                    cy="83.9689"
                    rx="3"
                    ry="4.5"
                    transform="rotate(112.031 105.797 83.9689)"
                    fill="#FAD336"
                  />
                  <path
                    d="M2.23252 121C1.32132 115.886 4.47315 111.901 10.7326 110C14.2472 113.622 15.1623 116.952 20.5 118.5C60.5074 109.344 82.0927 109.247 119 120C122.778 118.098 124.801 116.938 127.5 114C133.855 119.316 134.367 124.134 133.733 128C132.352 135.155 124.684 132.234 123.733 131C122.781 129.766 116.962 139.55 109.233 140C100.227 137.874 93.5785 126.841 92.7325 129.5C91.8865 132.159 87.0928 140.302 86.2325 140C84.1955 139.768 80.4175 130.753 74.7325 133C69.0475 135.247 37.3006 140.648 34.2325 129.5C31.482 131.459 29.6399 132.478 25.2325 134C18.155 131.756 14.5396 130.231 10.7325 125.5C6.40525 125.459 4.35731 124.789 2.23252 121Z"
                    fill="#9BB24B"
                    stroke="black"
                    strokeWidth="3"
                  />
                  <path
                    d="M29.0002 123.5C28.7564 120.766 28.7719 119.234 29.0002 116.5L53.5002 113C53.7459 116.922 53.7895 119.189 53.5002 123.5C43.5607 125.377 38.1734 125.462 29.0002 123.5Z"
                    fill="#D9D9D9"
                  />
                  <path
                    d="M83.0002 122C82.4235 118.095 82.4951 116.405 83.0001 112.5C95.3978 114.095 100.894 115.146 110.5 118C110.661 120.658 110.717 122.045 110.5 123.5C101.668 124.561 95.3731 123.833 83.0002 122Z"
                    fill="#D9D9D9"
                  />
                  <path
                    d="M29.0002 123.5C28.7564 120.766 28.7719 119.234 29.0002 116.5L53.5002 113C53.7459 116.922 53.7895 119.189 53.5002 123.5C43.5607 125.377 38.1734 125.462 29.0002 123.5Z"
                    stroke="black"
                    strokeWidth="3"
                  />
                  <path
                    d="M83.0002 122C82.4235 118.095 82.4951 116.405 83.0001 112.5C95.3978 114.095 100.894 115.146 110.5 118C110.661 120.658 110.717 122.045 110.5 123.5C101.668 124.561 95.3731 123.833 83.0002 122Z"
                    stroke="black"
                    strokeWidth="3"
                  />
                  <path
                    d="M13.5566 164.5C11.2813 157.674 11.6911 153.696 13.5566 146.5C17.849 147.028 20.2593 147.114 24.5566 147C31.1918 154.783 36.3604 157.578 46.5566 161.5C52.9693 161.924 56.1637 161.289 61.0566 158.5C78.2657 162.3 98.5564 158 100.057 155.5C101.557 153 101.057 150.5 101.057 150.5C106.175 148.142 108.096 145.648 110.557 140C113.567 145.325 116.35 147.057 124.057 147C125.724 154.612 124.828 159.2 122.557 167.5C120.502 172.305 118.43 174.062 113.557 176C80.9505 178.212 60.932 177.925 23.0566 175.5C17.4302 173.663 15.2989 171.325 13.5566 164.5Z"
                    fill="#E2A76C"
                    stroke="black"
                    strokeWidth="3"
                  />
                  <path
                    d="M13.0563 145.5C7.96289 139.235 11.0563 124 12.0563 125C13.0563 126 19.1934 132.773 26.5563 134C30.4987 130.981 34.0563 128.5 35.5563 129C37.0563 129.5 36.5563 132.5 36.5563 132.5C51.2406 138.042 60.315 137.028 77.0563 132.5C77.0488 131.02 86.02 141.301 87.5563 139.5C89.0926 137.699 92.1125 127 94.0563 128.5C96 130 103.131 136.521 110.556 139.5C111.5 140 119.763 135.52 124.056 131L131.056 132.5C129.651 139.785 128.35 143.165 124.056 146.5C116.567 147.678 111.182 142.835 110.556 139.5C107.616 145.867 106.338 147.205 101.556 150C101.814 156.044 98.984 158.277 85.5563 159C76.0697 160.202 70.7175 160.186 61.0563 158C56.8055 160.613 53.6539 161.291 47.0563 161.5C36.6243 157.8 31.5896 154.655 24.5563 146.5C20.0361 146.932 17.5282 146.422 13.0563 145.5Z"
                    fill="#824F1A"
                  />
                  <path
                    d="M110.556 139.5C107.616 145.867 106.338 147.205 101.556 150C101.814 156.044 98.984 158.277 85.5563 159C76.0697 160.202 70.7175 160.186 61.0563 158C56.8055 160.613 53.6539 161.291 47.0563 161.5C36.6243 157.8 31.5896 154.655 24.5563 146.5C20.0361 146.932 17.5282 146.422 13.0563 145.5C7.96289 139.235 11.0563 124 12.0563 125C13.0563 126 19.1934 132.773 26.5563 134C30.4987 130.981 34.0563 128.5 35.5563 129C37.0563 129.5 36.5563 132.5 36.5563 132.5C51.2406 138.042 60.315 137.028 77.0563 132.5C77.0487 131.02 86.02 141.301 87.5563 139.5C89.0926 137.699 92.1125 127 94.0563 128.5C96 130 103.131 136.521 110.556 139.5ZM110.556 139.5C111.182 142.835 116.567 147.678 124.056 146.5C128.35 143.165 129.651 139.785 131.056 132.5L124.056 131C119.763 135.52 111.5 140 110.556 139.5Z"
                    stroke="black"
                    strokeWidth="3"
                  />
                  <path
                    d="M67.5 159.5C59.3312 155.904 54.9009 151.338 52 144.5C59.5006 136.264 65.1182 135.503 67.5 135.5C74.9678 143.571 78.9601 147.887 86 155.5C84.1981 159.735 79.787 160.433 67.5 159.5Z"
                    fill="#EE442C"
                    stroke="black"
                    strokeWidth="3"
                  />
                  <path
                    d="M51.5 143.5C51 142 41.6012 150.552 34 154.5C37.7323 158.85 40.6355 160.535 47.5 162C54.6101 161.717 62 157.5 62 157.5C62 157.5 52 145 51.5 143.5Z"
                    fill="#EE442C"
                    stroke="black"
                    strokeWidth="3"
                  />
                  <path
                    d="M34 154.5C31 155.5 26.4004 142.52 26.4995 134C26.4995 134 32.5 128.5 35 129.5C37.4604 130.484 44.7199 137.258 65.9627 135.111C66.6277 134.834 66.9995 134.777 66.9995 135L78 132.5C80.0302 133.996 84 140 87 140C90 140 90 129.5 94 129.5C98 129.5 99.2839 135.106 104.5 137.5C92.4993 144 88.4995 157.5 88.4995 157.5C88.4995 157.5 66.9993 137 66.9995 135C66.6502 135.039 66.3046 135.076 65.9627 135.111C60.6544 137.323 36.666 153.611 34 154.5Z"
                    fill="#FAD336"
                  />
                  <path
                    d="M66.9995 135C66.9997 133 37 153.5 34 154.5C31 155.5 26.4004 142.52 26.4995 134C26.4995 134 32.5 128.5 35 129.5C37.5 130.5 44.9549 137.478 66.9995 135ZM66.9995 135C66.9993 137 88.4995 157.5 88.4995 157.5C88.4995 157.5 92.4993 144 104.5 137.5C99.2839 135.106 98 129.5 94 129.5C90 129.5 90 140 87 140C84 140 80.0302 133.996 78 132.5L66.9995 135Z"
                    stroke="black"
                    strokeWidth="3"
                  />
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
                m.link !== "Login" ? (
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
                ) : (
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
                )
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
              m.link !== "Login" ? (
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
              ) : (
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
              )
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
