import React from "react";

const ProjectInfo = ({
  Overview,
  Challenge,
  Impact,
  Timeline,
  Role,
  Team,
}: {
  Overview: string;
  Challenge?: string;
  Impact?: string;
  Timeline: string;
  Role: string;
  Team?: string;
}) => {
  return (
    <div className="w-full flex flex-col gap-6 md:gap-16 md:flex-row p-0 md:px-3">
      <div className="flex flex-col gap-6 w-full md:w-[80%] shadow-xl shadow-gray-100 mb-6 sm:mb-0 md:-ml-12 rounded-2xl p-3 md:p-6 border border-midgrey">
        <div className="flex-col gap-1 w-full">
          <h2 className="h3">Timeline</h2>
          <p className="h4">{Timeline}</p>
        </div>

        <div className="flex-col gap-1 w-full">
          <h2 className="h3">Role</h2>
          <p className="h4">{Role}</p>
        </div>

        <div className="flex-col gap-1 w-full">
          <h2 className="h3">Team</h2>
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

      <div className="gap-8 flex flex-col">
        <div
          id="overview"
          className="w-full flex flex-col gap-1 items-start relative"
        >
          <h2 className="h3 w-full">Overview</h2>
          <p className="h4 w-full">{Overview}</p>
        </div>
        {Challenge && (
          <div
            id="challenge"
            className="w-full flex flex-col gap-1 items-start relative"
          >
            <h2 className="h3 w-full">Challenge</h2>
            <p className="h4 whitespace-pre-line w-full">{Challenge}</p>
          </div>
        )}
        {Impact && (
          <div
            id="impact"
            className="w-full flex flex-col gap-1 items-start relative"
          >
            <h2 className="h3 w-full">Impact</h2>
            <p className="h4 whitespace-pre-line w-full">{Impact}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectInfo;
