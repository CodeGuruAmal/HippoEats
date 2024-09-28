import React from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';

const NoService = () => {
    const homeData = useSelector((state) => state.home.homeData)

    const title = homeData?.cards ? (homeData?.cards[0]?.card?.card?.title) : ''
  return (
    <div className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 max-h-[85vh]'>
        <img className='w-72 mx-auto' src='https://media-assets.swiggy.com/swiggy/image/upload/portal/m/location_unserviceable.png' alt="" />
       <div className="text-center mt-6">
       <h1 className='font-[Gilroy-ExtraBold]'>{title}</h1>
       <p className='text-neutral-500  mx-auto font-[Gilroy-Medium] text-sm w-[80%]'>We don’t have any services here till now. Try changing location.</p>
       </div>
    </div>
  )
}

export default NoService