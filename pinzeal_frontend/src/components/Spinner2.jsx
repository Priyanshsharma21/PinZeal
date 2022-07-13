import React from 'react';
import { Audio,Rings,Puff,Hearts,BallTriangle,MutatingDots,Watch } from  'react-loader-spinner'

export const Spinner2 = ({message}) => {
    return (
        <div className="flex flex-col justify-center items-center w-full h-full">
          <Puff
            type="Puff"
            color="#00BFFF"
            height={50}
            width={200}
            className="m-5"
          />
    
          <p className="text-lg dark:text-slate-400 text-center px-2">{message}</p>
        </div>
      );
}

export const Spinner3 = ({message}) => {
    return (
        <div className="flex flex-col justify-center items-center w-full h-full">
          <Rings
            type="Rings"
            color="#00BFFF"
            height={50}
            width={200}
            className="m-5"
          />
    
          <p className="text-lg dark:text-slate-400 text-center px-2">{message}</p>
        </div>
      );
}

export const Spinner4 = ({message}) => {
    return (
        <div className="flex flex-col justify-center items-center w-full h-full">
          <MutatingDots
            type="MutatingDots"
            color="#00BFFF"
            height={50}
            width={200}
            className="m-5"
          />
    
          <p className="text-lg dark:text-slate-400 text-center px-2">{message}</p>
        </div>
      );
}
