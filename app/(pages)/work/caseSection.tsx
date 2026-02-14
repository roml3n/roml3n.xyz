import React from "react";

type CaseSectionProps = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
};

const CaseSection = ({ title, description, children }: CaseSectionProps) => {
  return (
    <section className="w-full flex flex-col gap-4">
      {title ? <h2 className="h2">{title}</h2> : null}
      {description ? <p className="h4 whitespace-pre-line">{description}</p> : null}
      {children ? <div className="flex flex-col gap-6">{children}</div> : null}
    </section>
  );
};

export default CaseSection;
