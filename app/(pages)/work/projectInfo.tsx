import React from "react";

type ProjectInfoProps = {
  Overview?: React.ReactNode;
  Challenge?: React.ReactNode;
  Role?: React.ReactNode;
  Timeline?: React.ReactNode;
  Team?: React.ReactNode;
  Impact?: React.ReactNode;
};

const ProjectInfo = ({
  Overview,
  Challenge,
  Role,
  Timeline,
  Team,
  Impact,
}: ProjectInfoProps) => {
  return (
    <section className="w-full flex flex-col gap-8">
      {(Overview || Challenge) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Overview && (
            <div className="rounded-3xl bg-almostwhite p-6">
              <p className="h6 uppercase opacity-50 mb-3">Overview</p>
              <p className="h4 whitespace-pre-line">{Overview}</p>
            </div>
          )}
          {Challenge && (
            <div className="rounded-3xl bg-almostwhite p-6">
              <p className="h6 uppercase opacity-50 mb-3">Challenge</p>
              <p className="h4 whitespace-pre-line">{Challenge}</p>
            </div>
          )}
        </div>
      )}

      {(Role || Timeline || Team) && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Role && (
            <div className="rounded-3xl bg-hoverbg p-6">
              <p className="h6 uppercase opacity-50 mb-3">Role</p>
              <p className="h4 whitespace-pre-line">{Role}</p>
            </div>
          )}
          {Timeline && (
            <div className="rounded-3xl bg-hoverbg p-6">
              <p className="h6 uppercase opacity-50 mb-3">Timeline</p>
              <p className="h4 whitespace-pre-line">{Timeline}</p>
            </div>
          )}
          {Team && (
            <div className="rounded-3xl bg-hoverbg p-6">
              <p className="h6 uppercase opacity-50 mb-3">Team</p>
              <p className="h4 whitespace-pre-line">{Team}</p>
            </div>
          )}
        </div>
      )}

      {Impact && (
        <div className="rounded-3xl bg-[#EAF4FF] p-6">
          <p className="h6 uppercase opacity-50 mb-3">Impact</p>
          <p className="h4 whitespace-pre-line">{Impact}</p>
        </div>
      )}
    </section>
  );
};

export default ProjectInfo;
