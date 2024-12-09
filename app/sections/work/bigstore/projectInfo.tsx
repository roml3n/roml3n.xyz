import React from "react";

const ProjectInfo = () => {
  return (
    <div className="w-full flex flex-col gap-12 pt-0 pb-6 px-3 relative border-b border-midgrey">
      <div className="w-full flex flex-col gap-9 items-start relative">
        <div className="w-full flex flex-col gap-1 items-start relative">
          <h2 className="h2 w-full">Goal</h2>

          <p className="h4 w-full">
            Redesign Bigstore’s web app to streamline the shopping experience,
            fixing any issues and generating more sales.
          </p>
        </div>

        <div className="flex flex-col gap-6 w-full sm:flex-row sm:justify-between sm:gap-12">
          <div className="flex-col gap-1 w-full sm:w-auto">
            <h2 className="h2">Timeline</h2>
            <p className="h4">2 months</p>
          </div>

          <div className="flex-col gap-1 w-full sm:w-auto">
            <h2 className="h2">Role</h2>
            <p className="h4">Lead Designer</p>
          </div>

          <div className="flex-col gap-1 w-full sm:w-auto">
            <h2 className="h2">Team</h2>
            <p className="h4">
              Hempstone (Project Lead)
              <br />
              Roman (Design Lead)
              <br />
              Gerald (Engineering Lead)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectInfo;
