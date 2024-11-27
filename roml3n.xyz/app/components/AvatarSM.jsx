import React from "react";
import Image from "next/image";
import Link from "next/link";

const AvatarSM = () => {
  return (
    <Link href="/" passHref legacyBehavior>
      <a>
        <Image
          src="/images/home/rlAvatar.png"
          alt="Avatar Image"
          width={48}
          height={48}
          className="rounded-full border border-solid border-midgrey"
        />
      </a>
    </Link>
  );
};

export default AvatarSM;
