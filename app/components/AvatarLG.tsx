import React from "react";
import Image from "next/image";

const AvatarLG = () => {
  return (
    <Image
      src="/images/home/rlAvatar.png"
      alt="Avatar Image"
      width={64}
      height={64}
      className="rounded-full border border-solid border-midgrey size-12 md:size-16 shadow-[0px_28px_34px_-19px_rgba(0,0,0,1)]"
    />
  );
};
export default AvatarLG;
