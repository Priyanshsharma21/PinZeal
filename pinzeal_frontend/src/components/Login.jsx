import React from 'react';
import GoogleLogin from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logo3.png';
import { gapi } from "gapi-script";
import { client } from '../client';

const Login = () => {
  const navigate = useNavigate()

  // according to new update 2022 to get user info we have to do this
  window.gapi.load('client:auth2', () => {
    window.gapi.client.init({
        clientId: `${process.env.REACT_APP_GOOGLE_API_TOKEN}`,
        plugin_name: "chat"
    })})

  const responseGoogle = (response)=>{
      localStorage.setItem('user',JSON.stringify(response.profileObj))
      //getting the items from the profileObj of user
      const {name, googleId, imageUrl} = response.profileObj

      //we have to create new user in sanity database hance
      const doc = {
        _id: googleId,
        //we have this fields in user schema
        _type:'user',
        userName : name,
        image : imageUrl,
      }
// client not exist then it will create user and login it to home of our website
      client.createIfNotExists(doc).then(()=>{
        navigate('/',{replace:true})
      })
  }
  return (
    <div className='flex justify-start items-center flex-col h-screen'>
    <div className="relative w-full h-full">
     
       <video loop autoPlay muted className='w-full h-full object-cover' controls={false}>
        <source src={shareVideo} type="video/mp4" />
      </video>

      <div className=" bg-blackOverlay absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0">
        <div className="p-5">
          <img src={logo} width='130px' alt="logo" />
        </div>

        <div className="shadow-2xl">
          <GoogleLogin 
            clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
            render={(renderProps)=>(
              <button 
              type='button'
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              className='bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none'
              >
              <FcGoogle className='mr-4'/> Sign in with google

              </button>
            )}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy="single_host_origin"
            //everything will be look up by google for us
          />
        </div>
      </div>

    </div>
    </div>
  )
}

export default Login