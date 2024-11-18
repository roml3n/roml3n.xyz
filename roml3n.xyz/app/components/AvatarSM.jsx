import React from 'react'
import Image from 'next/image';

const AvatarSM = () => {
  return (
    <Image
    src="/images/home/rlAvatar.png"
    alt="Avatar Image"  
    width={48}  
    height={48}
    className="rounded-full border border-solid border-midgrey"
  />
  )
}

export default AvatarSM 
