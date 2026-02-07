import React from "react";

interface InterviewCardProps {
  
  description: string;
}

const TuchezeCard: React.FC<InterviewCardProps> = ({
  
  description = "Quote",
}) => {
  return (
    <div className="flex flex-col w-full gap-6 p-6 rounded-3xl overflow-hidden bg-[#EAEBF7]">
    
      <p className="h4 w-full">{description}</p>
    </div>
  );
};

export default TuchezeCard;
