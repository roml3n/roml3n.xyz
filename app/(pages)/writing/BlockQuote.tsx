import React from "react";

const BlockQuote = ({
  quote,
  className,
}: {
  quote: React.ReactNode;
  className?: string;
}) => {
  return (
    <span className={`text-2xl opacity-70 italic p-4 border-l-4  ${className}`}>
      {quote}
    </span>
  );
};

export default BlockQuote;