import React from "react";

const BlockQuote = ({quote} : {quote:string}) => {
  return (
    <span className="text-2xl opacity-70 italic p-4 border-l-4  ">
      {quote}
    </span>
  );
};

export default BlockQuote;
