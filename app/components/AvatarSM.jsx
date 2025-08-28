import React from "react";
import Image from "next/image";
import Link from "next/link";

const AvatarSM = () => {
  return (
    <Link href="/" passHref>
        <Image
          src="/images/home/rlAvatar.png"
          alt="Avatar Image"
          width={48}
          height={48}
          className="rounded-full border border-solid border-midgrey"
        />
    </Link>
  );
};

export default AvatarSM;
