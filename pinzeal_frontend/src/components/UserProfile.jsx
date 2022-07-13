import React, { useEffect, useState } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { useParams, useNavigate } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';

import { userCreatedPinsQuery, userQuery, userSavedPinsQuery } from '../utils/data';
import {fetchUser} from '../utils/fetchUser'
import { client } from '../client';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

const activeBtnStyles = 'bg-red-500 dark:text-slate-200 text-white font-bold p-2 rounded-full w-20 outline-none';
const notActiveBtnStyles = 'bg-primary dark:text-slate-200 mr-4 text-black font-bold p-2 rounded-full w-20 outline-none';


const UserProfile = () => {
  const [user, setUser] = useState();
  const [pins, setPins] = useState();
  const [text, setText] = useState('Created');
  const [activeBtn, setActiveBtn] = useState('created');
  const navigate = useNavigate();
  const { userId } = useParams();

  const User = fetchUser()

  //user data
  useEffect(() => {
    const query = userQuery(userId);
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, [userId]);

  // use to logout
  const logout = ()=>{
    localStorage.clear();
    navigate('/login');
  }

  //use to fetch user created post and post user have saved 

  useEffect(()=>{
    if(text === 'Created'){
      const createdPinsQuery = userCreatedPinsQuery(userId)

      client.fetch(createdPinsQuery).then((data)=>{
        setPins(data)
      })
    }else{
      const savedPinsQuery = userSavedPinsQuery(userId)

      client.fetch(savedPinsQuery).then((data)=>{
        setPins(data)
      })
    }
  },[text,userId])


  if(!user) return <Spinner message="Loading Profile"/>

  return (
    <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
          <div className="relative flex flex-col mb-7">
            <div className="flex flex-col justify-center items-center">
              <img 
              className=" w-full h-370 2xl:h-510 shadow-lg object-cover"
              src="https://source.unsplash.com/1600x900/?nature,photography,technology" // always give random image
              alt="user-pic"
               />
               <img src={user?.image} alt="user-image"
              className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
                />
                <h1 className="font-bold dark:text-slate-200 text-3xl text-center mt-3">
                  {user?.userName}
                </h1>
                <div>
                {/* //if user is the same as one who is viewing then he can logout  */}
                  {userId == user._id && (
                    <GoogleLogout
                      clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
                      render={(renderProps) => (
                        <button
                          type="button"
                          className=" bg-white dark:text-slate-200 p-2 rounded-full cursor-pointer outline-none shadow-md"
                          onClick={renderProps.onClick}
                          disabled={renderProps.disabled}
                        >
                          <AiOutlineLogout color="red" fontSize={21} />
                        </button>
                      )}
                      onLogoutSuccess={logout}
                      cookiePolicy="single_host_origin"
                    />
                  )}
                </div>
            </div>
            <div className='text-center mb-7 dark:text-slate-200'>
                <button
                type="button"
                onClick={(e) => {
                  setText(e.target.textContent);
                  setActiveBtn('created');
                }}
                className={`${activeBtn === 'created' ? activeBtnStyles : notActiveBtnStyles}`}
              >
                Created
              </button>
              <button
                type="button"
                onClick={(e) => {
                  setText(e.target.textContent);
                  setActiveBtn('saved');
                }}
                className={`${activeBtn === 'saved' ? activeBtnStyles : notActiveBtnStyles}`}
              >
                Saved
              </button>
            </div>
            {pins?.length ? (
              <div className="px-2">
                <MasonryLayout pins={pins}/>
              </div>
              ):(
                <div className='flex justify-center dark:text-slate-400 font-bold items-center w-full text-1xl mt-2'>
                  {`${text==='Created' ? 'NO PINS POSTED YET' : 'NO PINS SAVED YET'}`}
                </div>
              )}
            
          </div>
      </div>
    </div>
  )
}

export default UserProfile