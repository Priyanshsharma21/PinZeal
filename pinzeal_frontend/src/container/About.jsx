import React from 'react'
import { motion } from 'framer-motion'


const About = () => {
  return (
   <motion.div
    whileInView={{ opacity: [0, 1] }}
    transition={{ duration:0.5, type: 'tween' }}
   >
     <div className='w-full dark:bg-slate-800'>
        <div className='flex justify-center flex-col dark:bg-slate-800'>
        <motion.image className="bg-about"
         whileInView={{ opacity: [0, 1] }}
        transition={{ duration:3, type: 'tween' }}
         />
            <p className='text-white flex justify-center xl:text-8xl  sm:text-4xl '>Hello There 👋</p>
        </div>

    </div>
    <div className='w-full dark:bg-slate-800'>
        <p className='text-white xl:text-3xl sm:text-base mt-12 flex justify-center'>It's Priyansh Sharma welcome you to Pinzeal</p>
        <p className='text-white xl:text-4xl sm:text-base mt-12 flex justify-center'>An image sharing <p className='text-yellow-400 xl:mr-4 xl:ml-4 sm:mr-1 sm:ml-1'> Social Media </p> where you can </p>
        <p className='text-red-400 xl:text-4xl sm:text-base mt-12 flex justify-center'>Download, Upload, Save, Comment, Share Pictures 100% <p className='text-yellow-400 xl:mr-4 xl:ml-4 sm:mr-1 sm:ml-1'>Free</p></p>
        <p className='text-white xl:text-4xl sm:text-base mt-12 flex justify-center'>Posted by creators around the world</p>
        <p className='text-red-400 xl:text-4xl sm:text-base mt-12 flex justify-center'><p className='text-yellow-400 xl:mr-4 xl:ml-4 sm:mr-1 sm:ml-1'>Pinzeal</p> accepts (jpg, png, vector, illustration, svg, gif) files</p>
        <p className='text-white xl:text-4xl sm:text-base mt-12 flex justify-center'>" For someone it can be source of <p className='text-red-400 xl:mr-4 xl:ml-4 sm:mr-1 sm:ml-1'>Motivation</p>"</p>
        <p className='text-white xl:text-4xl sm:text-base mt-12 flex justify-center'>" For someone it can be source of <p className='text-yellow-400 xl:mr-4 xl:ml-4 sm:mr-1 sm:ml-1'>Entertainment</p> "</p>
        <p className='text-yellow-400 xl:text-4xl sm:text-base mt-12 flex justify-center'>You can contact us on  <a href='mailto:piyuindia4@gmail.com' className='text-green-400 xl:mr-2 xl:ml-2 sm:mr-2 sm:ml-2'>piyuindia4@gmail</a> </p>

    </div>
   </motion.div>
  )
}

export default About