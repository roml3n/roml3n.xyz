import React from "react";
import Image from "next/image";
import TransitionLink from "./transitions/TransitionLink";

const AvatarSM = () => {
  return (
    <TransitionLink href="/">
        <Image
          src="/images/home/rlAvatar.png"
          alt="Avatar Image"
          width={48}
          height={48}
          className="rounded-full border border-solid border-midgrey"
        />
    </TransitionLink>
  );
};

export default AvatarSM;
