// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';

// import { client } from '../client';
// import { feedQuery, searchQuery } from '../utils/data';
// import MasonryLayout from './MasonryLayout';
// // the layout we are trying to achive is masonary layout random patten height and width grid
// import Spinner from './Spinner';


// const Feed = () => {
//   const [loading, setLoading] = useState(false)
//   const [pins, setPins] = useState()
//   const {categoryId} = useParams();

//   useEffect(()=>{
//     if(categoryId){
//       setLoading(true)
//       //when searching for a specific catogery
//       const query = searchQuery(categoryId);
//       client.fetch(query)
//       .then((data)=>{
//         setPins(data)
//         setLoading(false)
//       })
//     }else{
//       //if we are on feed means all
//         client.fetch(feedQuery).then((data)=>{
//           setPins(data)
//           setLoading(false)
//         })
//     }
//   },[categoryId])

//   if(loading) return <Spinner message="We are adding new ideas to your feed"/>
//   return (
//     <div>
//     {pins && <MasonryLayout pins={pins}/>}
//     </div>
//   )
// }

// export default Feed


import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { client } from '../client';
import { feedQuery, searchQuery } from '../utils/data';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

const Feed = () => {
  const [pins, setPins] = useState();
  const [loading, setLoading] = useState(false);
  const { categoryId } = useParams();

  useEffect(() => {
    if (categoryId) {
      setLoading(true);
      const query = searchQuery(categoryId);
      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      setLoading(true);

      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [categoryId]);
  const ideaName = categoryId || 'new';
  if (loading) {
    return (
      <Spinner message={`We are adding ${ideaName} ideas to your feed!`} />
    );
  }

  if(!pins?.length) return <h2 className='flex justify-center items-center dark:text-slate-400'>NO PINS AVAILABLE</h2>
  return (
    <div>
      {pins && (
        <MasonryLayout pins={pins} />
      )}
    </div>
  );
};

export default Feed;