"use client";

import { collection } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react'
import Snowfall from 'react-snowfall'
import { db } from '../../../firebase';
import {useCollection} from "react-firebase-hooks/firestore";
import { ImSpinner2 } from 'react-icons/im';
import { BsFillPlayCircleFill, BsPauseCircleFill } from 'react-icons/bs';

const Page = ({params}) => {
    const id = params.id;
    const videoRef = useRef(null);
    const [musicButtons, setmusicButtons] = useState(false);
    const playMusic = async() =>{
        setmusicButtons(true);
        videoRef.current.play();
    }
    const pauseMusic = async() =>{
        setmusicButtons(false);
        videoRef.current.pause();
    }

    const greets = collection(db, "greets");
    const [greetSnap, loading] = useCollection(greets);
    const currentGreet = greetSnap?.docs?.filter((g)=> g?.id === id)?.[0]?.data();

    if (loading) return (
        <div className="w-screen h-screen z-[9999] bg-center bg-no-repeat bg-cover absolute top-0 left-0 bg-[#f1f1f1] flex items-center justify-center">
            <ImSpinner2 className='inline-block animate-spin text-4xl' />
        </div>
    )
    
  return (
    <div className="w-screen h-screen z-[999] bg-[url('/images/itachi2.jpg')] bg-center bg-no-repeat bg-cover absolute top-0 left-0">
        <div className='absolute top-0 left-0 bg-gradient-to-b from-[#0000008b] to-[#000000] w-screen h-screen text-white flex justify-center flex-col'>
            <Snowfall
            snowflakeCount={100}
            color="red"
            />
            <div className='z-[999] absolute bottom-20 left-1/2 -translate-x-1/2 text-white'>
                <a href="https://nygc-world.vercel.app/" className='z-[9999] font-bold text-center'>Click Me To Create Your Own </a>
            </div>
            <div className='p-10'>
                <h1 className='text-4xl font-jockey tracking-wider'>To</h1>
                <h1 className='text-4xl font-jockey tracking-wider'>{currentGreet?.to_user}</h1>
            </div>
            <div className='px-10'>
                <p>
                    {currentGreet?.greet}
                </p>
            </div>
            <div className='flex flex-col items-end p-10'>
                <div>
                    <h1 className='text-4xl font-jockey tracking-wider'>From</h1>
                    <h1 className='text-4xl font-jockey tracking-wider'>{currentGreet?.from_user}</h1>
                </div>
            </div>
            <div className='absolute bottom-5 left-1/2 -translate-x-1/2'>
                {
                    musicButtons ? <button className='text-5xl motion-safe:animate-spin ' onClick={()=>{pauseMusic()}}><BsPauseCircleFill /></button> :  <button className='text-5xl' onClick={()=>{playMusic()}}><BsFillPlayCircleFill /></button>
                }
               
                
            </div>
        </div>
        <div>
            <audio src="/music/newyear.mp3" controls loop ref={videoRef} className="hidden"></audio>
        </div>
    </div>
  )
}

export default Page