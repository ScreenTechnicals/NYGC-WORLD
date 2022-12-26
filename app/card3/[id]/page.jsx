"use client";

import { collection } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react'
import Snowfall from 'react-snowfall'
import { db } from '../../../firebase';
import {useCollection} from "react-firebase-hooks/firestore";
import { ImSpinner2 } from 'react-icons/im';
import { BsFillPlayCircleFill, BsPauseCircleFill } from 'react-icons/bs';
import Image from 'next/image';

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
    <div className="w-screen h-screen z-[999] bg-[#fff] bg-center bg-no-repeat bg-cover absolute top-0 left-0">
        <div className='absolute top-0 left-0 bg-gradient-to-b from-[#ffffff] to-[#ffffff] w-screen h-screen flex justify-center flex-col'>
            <Snowfall
            snowflakeCount={100}
            color="#dcdcdc"
            />
            <div className='w-screen absolute bottom-10'>
                <Image src="/gifs/crackers.gif" width={500} height={200} className="mx-auto" />
            </div>
            <div>
                <div className='w-screen relative -top-24'>
                    <Image src="/gifs/hny.gif" width={500} height={200} className="mx-auto" />
                </div>
                <div>
                    <h1 className='text-center text-9xl font-jockey relative -top-24'>2023</h1>
                </div>
                <div className='flex flex-wrap justify-center items-center'>
                    <h1 className='text-2xl font-poppins font-extrabold tracking-wider m-2'>{currentGreet?.from_user}</h1>
                    <h1 className='text-2xl font-poppins font-extrabold tracking-wider m-2'>To</h1>
                    <h1 className='text-2xl font-poppins font-extrabold tracking-wider m-2'>{currentGreet?.to_user}</h1>
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