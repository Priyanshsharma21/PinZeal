import React from 'react';
import { Audio,Rings,Puff,Hearts,BallTriangle,MutatingDots,Watch } from  'react-loader-spinner'

function Spinner({ message }) {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <Watch
        type="Circles"
        color="#00BFFF"
        height={50}
        width={200}
        className="m-5"
      />

      <p className="text-lg dark:text-slate-400 text-center px-2">{message}</p>
    </div>
  );
}

export default Spinner;