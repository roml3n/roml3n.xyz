import React from "react";

const ProjectInfo = ({
  Overview,
  Timeline,
  Role,
  Team,
}: {
  Overview: string;
  Timeline: string;
  Role: string;
  Team?: string;
}) => {
  return (
    <div className="w-full flex flex-col gap-6 md:flex-row  px-3">
      <div className="flex flex-col gap-6 w-full md:w-[30%] mb-6 sm:mb-0">
        <div className="flex-col gap-1 w-full">
          <h2 className="h2">Timeline</h2>
          <p className="h4">{Timeline}</p>
        </div>

        <div className="flex-col gap-1 w-full">
          <h2 className="h2">Role</h2>
          <p className="h4">{Role}</p>
        </div>

        <div className="flex-col gap-1 w-full">
          <h2 className="h2">Team</h2>
          <p className="h4">
            {Team?.split("\n").map((member, index) => (
              <span key={index}>
                {member.trim()}
                <br />
              </span>
            ))}
          </p>
        </div>
      </div>

      <div className="w-full flex flex-col gap-1 items-start relative">
        <h2 className="h2 w-full">Overview</h2>
        <p className="h4 w-full">{Overview}</p>
      </div>
    </div>
  );
};

export default ProjectInfo;
