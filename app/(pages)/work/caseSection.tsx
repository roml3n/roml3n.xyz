import React from "react";

interface CaseSectionProps {
  title?: string;
  description?: React.ReactNode;
  children?: React.ReactNode;
}

const CaseSection: React.FC<CaseSectionProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="h2">{title}</h2>
        <p className="h4">{description}</p>
      </div>

      <div className="flex-col gap-1 w-full">{children}</div>
    </div>
  );
};

export default CaseSection;
