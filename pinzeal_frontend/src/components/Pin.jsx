// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { v4 as uuidv4 } from 'uuid';
// import { MdDownloadForOffline } from 'react-icons/md';
// import { AiTwotoneDelete } from 'react-icons/ai';
// import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';

// import { client, urlFor } from '../client';
// import { fetchUser } from '../utils/fetchUser';

// const Pin = ({pin:{postedBy,image,_id,destination,save}}) => {
//   const navigate = useNavigate();
//   const [postHovered, setPostHovered] = useState(false)
//   const [savingPost, setSavingPost] = useState(false);
//   // access to user
//   const user = fetchUser()

//   const alreadySaved = !!(save?.filter((item)=>item?.postedBy?._id === user.googleId).length); // it means user saved posted
// // working-> usergogleId=1 , peopleWhoLikedIt=[2,4,1], 
// // we filter if 1 present we got -> [1], is already is not a boolean so .length so [1].length,--> 1-!1=false->!false->true
// //                                                                                [0].length- ->0->!0=true->!true=>false                             

     
//   const savePin = (id) => {
//     if (alreadySaved?.length === 0) {
//       setSavingPost(true);

//       client
//         .patch(id)
//         .setIfMissing({ save: [] })
//         .insert('after', 'save[-1]', [{
//           _key: uuidv4(),
//           userId: user?.googleId,
//           postedBy: {
//             _type: 'postedBy',
//             _ref: user?.googleId,
//           },
//         }])
//         .commit()
//         .then(() => {
//           window.location.reload();
//           setSavingPost(false);
//         });
//     }
//   };

//   const deletePin = (id)=>{
//     client.delete(id).then(()=>{window.location.reload()});
//   }

//   return (
//     <div className='m-2'>
//     <div
//     onMouseEnter={()=>setPostHovered(true)}
//     onMouseLeave={()=>setPostHovered(false)}
//     onClick={()=>navigate(`/pin-details/${_id}`)}
//     className=" relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
//     >
//     <img src={urlFor(image).width(250).url()} className='rounded-lg w-full' alt="image_of_post" />
//     {postHovered && (
//       <div
//        className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50"
//        style={{height:'100%'}}
//       >
//        <div className="flex items-center justify-between">
//               <div className="flex gap-2">
//               {/* to download the image we want to  */}
//                 <a 
//                 href={`${image?.asset?.url}?dl=`}
//                 download
//                 onClick={(e)=>e.stopPropagation()} // we use this because behine the downlode button we have image so if we click it then we will downlode the image and also we will redirected to image page to stop that we have this
//                 className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
//                 >
//                 <MdDownloadForOffline />
//                 </a>
//               </div>
//               {alreadySaved ?(
//                 <button 
//                 onClick={(e)=>{
//                   e.stopPropagation();
//                 }}
//                 className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outlined-none'>
//                 {save?.length}  Saved
//                 </button>
//               ):(
//                 <button
//                 onClick={(e)=>{
//                   e.stopPropagation();
//                   savePin(_id);
//                 }}
//                 type='button' className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outlined-none'>
//                {save?.length}   {savingPost ? 'Saving' : 'Save'}
//                 </button>
//               )}
//       </div>
//       <div className=" flex justify-between items-center gap-2 w-full">
//           {destination?.slice(8).length>0 ? (
//             <a href={destination}
//             target="_blank"
//             className="bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md"
//             rel="noreferrer"
//             onClick={(e)=>{
//               e.stopPropagation()
//             }}
//             > 
//             {' '}
//             <BsFillArrowUpRightCircleFill />
//             {destination.length > 20 ? destination.slice(8,20) : destination.slice(8)}...
//             </a>
//           ):undefined}
//           {postedBy?._id == user.googleId && (
//             <button
//              type="button"
//              onClick={(e) => {
//                e.stopPropagation();
//                deletePin(_id);
//              }}
//              className="bg-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-dark opacity-75 hover:opacity-100 outline-none"
//            >
//             <BsFillArrowUpRightCircleFill />
//            </button>
//           )}
//       </div>
//       </div>
//     )}
//     </div>
//     <Link to={`/user-profile/${postedBy?._id}`} className="flex gap-2 mt-2 items-center">
//     {console.log(postedBy.image)}
//         <img
//           className="w-8 h-8 rounded-full object-cover"
//           src={postedBy?.image}
//           alt="user-profile"
//         />
//         <p className="font-semibold capitalize">{postedBy?.userName}</p>
//       </Link>
//     </div>
//   )
// }

// export default Pin


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { MdDownloadForOffline } from 'react-icons/md';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';

import { client, urlFor } from '../client';

const Pin = ({ pin }) => {
  const [postHovered, setPostHovered] = useState(false);
  const [savingPost, setSavingPost] = useState(false);

  const navigate = useNavigate();

  const { postedBy, image, _id, destination } = pin;

  const user = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

  const deletePin = (id) => {
    client
      .delete(id)
      .then(() => {
        window.location.reload();
      });
  };

  let alreadySaved = pin?.save?.filter((item) => item?.postedBy?._id === user?.googleId);

  alreadySaved = alreadySaved?.length > 0 ? alreadySaved : [];

  const savePin = (id) => {
    if (alreadySaved?.length === 0) {
      setSavingPost(true);

      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert('after', 'save[-1]', [{
          _key: uuidv4(),
          userId: user?.googleId,
          postedBy: {
            _type: 'postedBy',
            _ref: user?.googleId,
          },
        }])
        .commit()
        .then(() => {
          window.location.reload();
          setSavingPost(false);
        });
    }
  };

  return (
    <div className="m-2">
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-detail/${_id}`)}
        className=" relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
      >
          {image && (
        <img className="rounded-lg w-full  " src={(urlFor(image).width(250).url())} alt="user-post" /> )}
        {postHovered && (
          <div
            className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50"
            style={{ height: '100%' }}
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <a
                  href={`${image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="bg-white w-9 h-9 p-2 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                ><MdDownloadForOffline />
                </a>
              </div>
              {alreadySaved?.length !== 0 ? (
                <button type="button" className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none">
                  {pin?.save?.length}  Saved
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(_id);
                  }}
                  type="button"
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                >
                  {pin?.save?.length}   {savingPost ? 'Saving' : 'Save'}
                </button>
              )}
            </div>
            <div className=" flex justify-between items-center gap-2 w-full">
              {destination?.slice(8).length > 0 ? (
                <a
                  href={destination}
                  target="_blank"
                  className="bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md"
                  rel="noreferrer"
                >
                  {' '}
                  <BsFillArrowUpRightCircleFill />
                  {destination?.slice(8, 17)}...
                </a>
              ) : undefined}
              {
           postedBy?._id === user?.googleId && (
           <button
             type="button"
             onClick={(e) => {
               e.stopPropagation();
               deletePin(_id);
             }}
             className="bg-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-dark opacity-75 hover:opacity-100 outline-none"
           >
             <AiTwotoneDelete />
           </button>
           )
        }
            </div>
          </div>
        )}
      </div>
      <Link to={`/user-profile/${postedBy?._id}`} className="flex gap-2 mt-2 items-center">
        <img
          className="w-8  h-8 rounded-full object-cover"
          src={postedBy?.image}
          alt="user-profile"
        />
        <p className="font-semibold dark:text-slate-300 capitalize">{postedBy?.userName}</p>
      </Link>
    </div>
  );
};

export default Pin;