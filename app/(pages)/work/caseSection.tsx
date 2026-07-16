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
      className={`w-full grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-x-4 md:gap-x-6 gap-y-9 md:gap-y-16 col-span-4 md:col-span-6 lg:col-span-8 md:col-start-2 lg:col-start-3 ${className}`}
    >
      {(title || description) && (
        <div className="flex flex-col gap-4 col-span-4 md:col-span-8 lg:col-span-12">
          {title ? <h3 className="h3 opacity-70">{title}</h3> : null}
          {description ? (
            <h5 className="h5 !font-normal whitespace-pre-line">{description}</h5>
          ) : null}
        </div>
      )}
      {children ? (
        <div className="flex flex-col gap-6 col-span-4 md:col-span-8 lg:col-span-12">
          {children}
        </div>
      ) : null}
    </section>
  );
};

export default CaseSection;