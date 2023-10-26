"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

type Props={
    id : string,
    image : string,
    title : string,
    name : string,
    avatarUrl : string,
    userId : string,
}
const ProjectCard = ({id, image, title, name, avatarUrl, userId}:Props) => {
  const [likes, setLikes] = useState(0);
  const [views, setViews] = useState('');

  useEffect(()=>{
      setLikes(Math.floor(Math.random()*1000));
      setViews(String((Math.floor(Math.random()*1000)/1000).toFixed(1)+'k'))
  },[])
  return (
    <div className='flex flex-col items-center justify-center rounded-2xl drop-shadow-lg'>
        <Link 
          href={`/project/${id}`} 
          className='flex items-center justify-center group relative w-full h-full text-lg text-white p-2'
        >
            <Image 
            src={image} 
            width={414}
            height={314}
            className='w-full h-full object-cover rounded-2xl'
            alt='Project image'
            />
            <div 
            className='hidden group-hover:flex justify-center items-center gap-2 w-full h-1/3 absolute bottom-0 right-0 font-semibold  bg-gradient-to-b from-transparent to-black/50 rounded-b-2xl'
            >
              <p>{title}</p>
            </div>
        </Link>
        <div className='w-full flex items-center justify-between px-2 mt-3 font-semibold text-sm'>
          <Link href={`/profile/${userId}`} className='w-full flex items-center justify-around'>
            <div className='flex items-center justify-center gap-2'>
              <Image 
              src={avatarUrl}
              width={25}
              height={25}
              alt="profile image"
              className='rounded-full'
              />
              <p>{name}</p>
            </div>
            <div className='flex items-center justify-center gap-2'>
            <Image 
              src="/heart.svg"
              width={13}
              height={12}
              alt="heart"
              className='rounded-full'
              />
              <p className='text-sm'>{likes}</p>
            </div>
            <div className='flex items-center justify-center gap-2'>
            <Image 
              src="/eye.svg"
              width={13}
              height={12}
              alt="heart"
              className='rounded-full'
              />
              <p className='text-sm'>{views}</p>
            </div>
          </Link>
        </div>
    </div>
  )
}

export default ProjectCard