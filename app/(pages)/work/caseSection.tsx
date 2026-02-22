import React from "react";

type CaseSectionProps = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  className?: React.ReactNode;
};

const CaseSection = ({
  title,
  description,
  children,
  className,
}: CaseSectionProps) => {
  return (
    <section
      className={`w-full flex flex-col gap-4 col-span-4 md:col-span-8 lg:col-span-12 ${className}`}
    >
      {title ? <h3 className="h3 opacity-70">{title}</h3> : null}
      {description ? (
        <h5 className="h5 !font-normal whitespace-pre-line">{description}</h5>
      ) : null}
      {children ? <div className="flex flex-col gap-6">{children}</div> : null}
    </section>
  );
};

export default CaseSection;
