import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { RiHomeFill } from 'react-icons/ri';
import { IoIosArrowForward } from 'react-icons/io';
import {FcAbout} from 'react-icons/fc'
import logo from '../assets/logo3.png';
import { categories } from '../utils/data';

const isNotActiveStyle = 'flex items-center dark:text-slate-400 hover:text-white dark:text-white px-5 gap-3 text-gray-500 hover:text-gray transition-all duration-200 ease-in-out capitalize';
const isActiveStyle = 'flex items-center dark:text-slate-400 hover:text-white dark:text-white px-5 gap-3 font-extrabold border-r-2 border-black  transition-all duration-200 ease-in-out capitalize';

const Sidebar = ({ closeToggle, user }) => {
  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };

  return (
    <div className="flex flex-col justify-between dark:bg-slate-800 bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar">
      <div className="flex flex-col">
        <Link
          to="/"
          className="flex px-5 gap-2 my-6 text-white pt-1 w-190 items-center"
          onClick={handleCloseSidebar}
        >
          <img src={logo} alt="logo" className="w-full" />
        </Link>
        <div className="flex flex-col gap-5">

          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
            onClick={handleCloseSidebar}
          >
            <RiHomeFill />
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
            onClick={handleCloseSidebar}
          >
            <FcAbout />
            About
          </NavLink>
          <h3 className="mt-2 px-5 text-base 2xl:text-xl text-white">Discover cateogries</h3>
          {categories.slice(0, categories.length - 1).map((category) => (
            <NavLink
              to={`/category/${category.name}`}
              className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
              onClick={handleCloseSidebar}
              key={category.name}
            >
              <img src={category.image} className="w-8 h-8 rounded-full shadow-sm" />
              {category.name}
            </NavLink>
          ))}
        </div>
      </div>
      {user && (
        <Link
          to={`user-profile/${user._id}`}
          className="flex my-5 mb-3 gap-2 p-2 items-center dark:bg-slate-800 bg-white rounded-lg shadow-lg mx-3"
          onClick={handleCloseSidebar}
        >
          <img src={user.image} className="w-10 h-10 rounded-full dark:text-slate-400" alt="user-profile" />
          <p className='dark:text-slate-400 hover:text-white'>{user.userName}</p>
          <IoIosArrowForward className='text-white'/>
        </Link>
      )}
    </div>
  );
};

export default Sidebar;