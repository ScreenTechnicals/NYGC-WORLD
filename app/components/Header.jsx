import React from 'react'
import Image from 'next/image'

const Header = () => {
  return (
    <div className='w-full p-5 shadow-sm bg-white flex justify-center items-center'>
        <Image src="/images/logo.png" width="200" height="100" />
    </div>
  )
}

export default Header