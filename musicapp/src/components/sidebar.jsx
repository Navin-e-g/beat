import React from 'react';
import {assets} from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {

    const navigate = useNavigate();

  return (
    <div className='w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex'>
        <div className='bg-[#12121212] h-[15%] rounded flex flex-col justify-around'>
            <div onClick={()=> navigate('/')} className='flex items-center gap-3 pl-8 cursor-pointer'>
                <img className='w-6' src={assets.home_icon} alt='' />
                <p className='font-bold'>HOME</p>
            </div>
            <div className='flex items-center gap-3 pl-8 cursor-pointer'>
                <img className='w-6' src={assets.search_icon} alt='' />
                <p className='font-bold'>SEARCH</p>
            </div>
        </div>
        <div className='bg-[#12121212] h-[85%] rounded'>
            <div className='p-4 flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                        <img className='w-6' src={assets.stack_icon} alt='' />
                        <p className='font-semibold'>YOUR LIBRARY</p>
                    </div>
                    <div className='flex items-center gap-3'>
                        <img className='w-5 cursor-pointer' src={assets.arrow_icon} alt=""/>
                        <img className='w-5 cursor-pointer' src={assets.plus_icon} alt=""/>
                    </div>
            </div>
            <div className='p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify start gap-1 pl-4'>
                <h1>Create your playlist</h1>
                <p className='font-light'>it's easy peasy, we will show you</p>
                <button className='px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4'>CREATE PLAYLIST</button>
            </div>
            <div className='p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify start gap-1 pl-4 mt-4'>
                <h1>Find some podcast's for your evening</h1>
                <p className='font-light'>Don't worry about New episode releases, we're here to notify you</p>
                <button className='px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4'>BROWSE PODCASTS</button>
            </div>
        </div>
    </div>
  );
};
export default Sidebar;