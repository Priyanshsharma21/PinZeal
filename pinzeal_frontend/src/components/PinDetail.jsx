// import React, { useEffect, useState } from 'react';
// import { MdDownloadForOffline } from 'react-icons/md';
// import { Link, useParams } from 'react-router-dom';
// import { v4 as uuidv4 } from 'uuid';

// import { client, urlFor } from '../client';
// import MasonryLayout from './MasonryLayout';
// import { pinDetailMorePinQuery, pinDetailQuery } from '../utils/data';
// import {Spinner2, Spinner3, Spinner4} from './Spinner2';

// const PinDetail = ({user}) => {
//   //we can fetch any dynamic params like this
//   const { pinId } = useParams();
//   const [pins, setPins] = useState();
//   const [pinDetail, setPinDetail] = useState();
//   const [comment, setComment] = useState('');
//   const [addingComment, setAddingComment] = useState(false);

//   const addComment = ()=>{
//       if(comment){
//         setAddingComment(true)

//         client.patch(pinId) // getting comment of particular person
//         .setIfMissing({comment : []})
//         .insert('after','comment[-1]', [{ // add at last, means just like post new comment first
//           comment,
//           _key : uuidv4(), // generate unique id for comment
//           postedBy : {
//             _type:'postedBy',
//             _ref: user._id
//           }
//         }])
//         .commit()
//         .then(()=>{
//           fetchPinDetails();
//           setComment('')
//           setAddingComment(false) // after adding do this
//         })
//       }
//   }

//   const fetchPinDetails = ()=>{
//     const query = pinDetailQuery(pinId);

//     if(query){
//       client.fetch(query)
//       .then((data)=>{
//         setPinDetail(data[0]); // getting single pins what we have clicked

//         if(data[0]){
//           query = pinDetailMorePinQuery(data[0])

//           client.fetch(query).then((res)=>{
//             setPins(res) // all the pins with similar category
//           })
//         }
//       })
//     }
//   }

//   useEffect(()=>{
//     fetchPinDetails()
//   },[pinId])

//   if(!pinDetail) return <Spinner2 message="Loading pin."/>


//   return (
   
//     <>
//        <div className="flex xl:flex-row flex-col m-auto bg-white" style={{ maxWidth: '1500px', borderRadius: '32px' }}>
//           <div className="flex justify-center items-center md:items-start flex-initial">
//             <img
//               className="rounded-t-3xl rounded-b-lg"
//               src={(pinDetail?.image && urlFor(pinDetail?.image).url())}
//               alt="user-post"
//             />
//           </div>
//           <div className="w-full p-5 flex-1 xl:min-w-620">
//             <div className="flex items-center justify-between">
//               <div className="flex gap-2 items-center">
//                 <a
//                   href={`${pinDetail.image.asset.url}?dl=`}
//                   download
//                   className="bg-secondaryColor p-2 text-xl rounded-full flex items-center justify-center text-dark opacity-75 hover:opacity-100"
//                 >
//                   <MdDownloadForOffline />
//                 </a>
//               </div>
//               <a href={pinDetail.destination} target="_blank" rel="noreferrer">
//                 {pinDetail.destination?.slice(8)}
//               </a>
//             </div>
//               <div>
//                   <h1 className='text-4-xl font-bold break-words mt-3'>
//                     {pinDetail.title}
//                   </h1>
//                   <p className="mt-3">{pinDetail.about}</p>
//               </div>
//               <Link to={`/user-profile/${pinDetail?.postedBy._id}`} className="flex gap-2 mt-5 items-center bg-white rounded-lg ">
//               <img src={pinDetail?.postedBy.image} className="w-10 h-10 rounded-full" alt="user-profile" />
//               <p className="font-bold">{pinDetail?.postedBy.userName}</p>
//             </Link>
//             <h2 className="mt-5 text-2xl">Comments</h2>
//             <div className="max-h-370 overflow-y-auto">
//               {pinDetail?.comments?.map((item,i)=>(
//                 <div className="flex gap-2 mt-5 items-center bg-white rounded-lg" key={i}>
//                   <img src={item?.postedBy?.image} alt='user-profile' 
//                   className="w-10 h-10 rounded-full cursor-pointer" />

//                   <div className="flex flex-col">
//                     <p className='font-bold'>{item?.postedBy.userName}</p>
//                     <p>{item?.comment}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <div className="flex flex-wrap mt-6 gap-3">
//             <Link to={`/user-profile/${pinDetail?.postedBy._id}`}>
//               <img src={pinDetail?.postedBy.image} className="w-10 h-10 rounded-full cursor-pointer" alt="user-profile" />
//             </Link>
//             <input type="text" 
//              className=" flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300"
//              placeholder='Add a comment'
//              value={comment}
//              onChange={(e)=>setComment(e.target.value)}
//              />
//              <button
//                 type="button"
//                 className="bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none"
//                 onClick={addComment}
//               >
//                 {addingComment ? 'Posting...' : 'Post'}
//               </button>
//             </div>
//           </div>
//     </div>
//       {pins?.length > 0 ? (
//         <>
//           <h2 className='text-center font-bold text-2x mt-8 mb-4'>More Like This</h2>
//           <MasonryLayout pins={pins}/>
//         </>
//       ):(
//         <Spinner3 message="Loading more pins"/>
//       )}
//     </>

//   )
// }

// export default PinDetail


import React, { useEffect, useState } from 'react';
import { MdDownloadForOffline } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { client, urlFor } from '../client';
import MasonryLayout from './MasonryLayout';
import { pinDetailMorePinQuery, pinDetailQuery } from '../utils/data';
import Spinner from './Spinner';
import { Spinner3 } from './Spinner2';

const PinDetail = ({ user }) => {
  const { pinId } = useParams();
  const [pins, setPins] = useState();
  const [pinDetail, setPinDetail] = useState();
  const [comment, setComment] = useState('');
  const [addingComment, setAddingComment] = useState(false);

  const fetchPinDetails = () => {
    const query = pinDetailQuery(pinId);

    if (query) {
      client.fetch(`${query}`).then((data) => {
        setPinDetail(data[0]);
        console.log(data);
        if (data[0]) {
          const query1 = pinDetailMorePinQuery(data[0]);
          client.fetch(query1).then((res) => {
            setPins(res);
          });
        }
      });
    }
  };

  useEffect(() => {
    fetchPinDetails();
  }, [pinId]);

  const addComment = () => {
    if (comment) {
      setAddingComment(true);

      client
        .patch(pinId)
        .setIfMissing({ comments: [] })
        .insert('after', 'comments[-1]', [{ comment, _key: uuidv4(), postedBy: { _type: 'postedBy', _ref: user._id } }])
        .commit()
        .then(() => {
          fetchPinDetails();
          setComment('');
          setAddingComment(false);
        });
    }
  };

  if (!pinDetail) {
    return (
      <Spinner message="Showing pin" />
    );
  }

  return (
    <>
      {pinDetail && (
        <div className="flex dark:bg-slate-800 xl:flex-row flex-col m-auto bg-white" style={{ maxWidth: '1500px', borderRadius: '32px' }}>
          <div className="flex dark:bg-slate-800 justify-center items-center md:items-start flex-initial">
            <img
              className="rounded-t-3xl rounded-b-lg"
              src={(pinDetail?.image && urlFor(pinDetail?.image).url())}
              alt="user-post"
            />
          </div>
          <div className="w-full dark:bg-slate-800 p-5 flex-1 xl:min-w-620">
            <div className="flex items-center justify-between">
              <div className="flex gap-2 items-center">
                <a
                  href={`${pinDetail.image.asset.url}?dl=`}
                  download
                  className="bg-secondaryColor  p-2 text-xl rounded-full flex items-center justify-center text-dark opacity-75 hover:opacity-100"
                >
                  <MdDownloadForOffline />
                </a>
              </div>
              <a href={pinDetail.destination} className='dark:text-yellow-400' target="_blank" rel="noreferrer">
                {pinDetail.destination?.slice(8)}
              </a>
            </div>
            <div>
              <h1 className="text-4xl font-bold dark:text-slate-200 break-words mt-3">
                {pinDetail.title}
              </h1>
              <p className="mt-3 dark:text-slate-300">{pinDetail.about}</p>
            </div>
            <Link to={`/user-profile/${pinDetail?.postedBy._id}`} className="flex gap-2 mt-5 dark:bg-slate-800 items-center bg-white rounded-lg ">
              <img src={pinDetail?.postedBy.image} className="w-10  h-10 rounded-full" alt="user-profile" />
              <p className="font-bold dark:text-slate-400">{pinDetail?.postedBy.userName}</p>
            </Link>
            <h2 className="mt-5 text-2xl dark:text-slate-200">Comments</h2>
            <div className="max-h-370 overflow-y-auto">
              {pinDetail?.comments?.map((item) => (
                <div className="flex dark:bg-slate-800 gap-2 mt-5 items-center bg-white rounded-lg" key={item.comment}>
                  <img
                    src={item.postedBy?.image}
                    className="w-10 h-10 rounded-full cursor-pointer"
                    alt="user-profile"
                  />
                  <div className="flex flex-col">
                    <p className="font-bold dark:text-slate-400">{item.postedBy?.userName}</p>
                    <p className='dark:text-slate-100'>{item.comment}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap mt-6 gap-3">
              <Link to={`/user-profile/${user._id}`}>
                <img src={user.image} className="w-10 h-10 rounded-full cursor-pointer" alt="user-profile" />
              </Link>
              <input
                className=" flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300"
                type="text"
                placeholder="Add a comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                type="button"
                className="bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none"
                onClick={addComment}
              >
                {addingComment ? 'Doing...' : 'Done'}
              </button>
            </div>
          </div>
        </div>
      )}
      {pins?.length > 0 && (
        <h2 className="text-center dark:text-slate-400 font-bold text-2xl mt-8 mb-4">
          More like this
        </h2>
      )}
      {pins ? (
        <MasonryLayout pins={pins} />
      ) : (
        <Spinner3 message="Loading more pins" />
      )}
    </>
  );
};

export default PinDetail;