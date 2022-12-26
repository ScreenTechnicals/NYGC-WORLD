"use client";

import { collection } from 'firebase/firestore';
import React, { useRef } from 'react'
import Snowfall from 'react-snowfall'
import { db } from '../../../firebase';
import {useCollection} from "react-firebase-hooks/firestore";
import {ImSpinner2} from 'react-icons/im';

const Page = ({params}) => {
    const id = params.id;

    const greets = collection(db, "greets");
    const [greetSnap, loading] = useCollection(greets);
    const currentGreet = greetSnap?.docs?.filter((g)=> g?.id === id)?.[0]?.data();

    if (loading) return (
        <div className="w-screen h-screen z-[9999] bg-center bg-no-repeat bg-cover absolute top-0 left-0 bg-[#f1f1f1] flex items-center justify-center">
            <ImSpinner2 className='inline-block animate-spin' />
        </div>
    )
  return (
    <div className="w-screen h-screen z-[999] bg-[url('/images/mountain1.jpg')] bg-center bg-no-repeat bg-cover absolute top-0 left-0">
        <div className='absolute top-0 left-0 bg-gradient-to-b from-[#0000008b] to-[#000000] w-screen h-screen text-white flex justify-center flex-col'>
            <Snowfall
            snowflakeCount={100}
            color="#f1f1f1"
            />
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
        </div>
    </div>
  )
}

export default Page