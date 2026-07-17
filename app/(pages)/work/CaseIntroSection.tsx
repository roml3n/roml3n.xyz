import React from "react";
import type { Icon } from "@tabler/icons-react";
import { IconMoodSad, IconNotes, IconSparkles } from "@tabler/icons-react";

type Tag = {
  label: string;
  icon?: Icon;
};

type CardContent = {
  title: string;
  description: React.ReactNode;
};

type CaseIntroSectionProps = {
  intro: React.ReactNode;
  role: string[];
  timeline: string[];
  type: string[];
  tools: Tag[];
  problem: CardContent;
  solution: CardContent;
  results: CardContent;
};

const TagGroup = ({ label, tags }: { label: string; tags: Tag[] }) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="h6 uppercase opacity-50">{label}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag.label}
            className="flex items-center gap-1.5 rounded-full border border-midgrey px-3 py-1.5 h6"
          >
            {tag.icon ? <tag.icon size={16} /> : null}
            {tag.label}
          </span>
        ))}
      </div>
    </div>
  );
};

const ResultCard = ({
  content,
  icon: CardIcon,
  iconBg,
}: {
  content: CardContent;
  icon: Icon;
  iconBg: string;
}) => {
  return (
    <div className="rounded-3xl bg-almostwhite p-6 flex flex-col gap-4">
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center ${iconBg}`}
      >
        <CardIcon size={24} />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="h3">{content.title}</h3>
        <div className="h5 !font-normal">{content.description}</div>
      </div>
    </div>
  );
};

const CaseIntroSection = ({
  intro,
  role,
  timeline,
  type,
  tools,
  problem,
  solution,
  results,
}: CaseIntroSectionProps) => {
  return (
    <div className="w-full flex flex-col gap-9 md:gap-16 col-span-4 md:col-span-8 lg:col-span-12">
      <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-x-4 md:gap-x-6 gap-y-9 md:gap-y-6">
        <div className="col-span-4 md:col-span-5 lg:col-span-7 h5 !font-normal whitespace-pre-line">
          {intro}
        </div>
        <div className="col-span-4 md:col-span-3 lg:col-span-4 lg:col-start-9 flex flex-col gap-6">
          <TagGroup label="Role" tags={role.map((label) => ({ label }))} />
          <TagGroup
            label="Timeline"
            tags={timeline.map((label) => ({ label }))}
          />
          <TagGroup label="Type" tags={type.map((label) => ({ label }))} />
          <TagGroup label="Tools" tags={tools} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ResultCard
          content={problem}
          icon={IconMoodSad}
          iconBg="bg-[#FFE29A]"
        />
        <ResultCard content={solution} icon={IconNotes} iconBg="bg-[#EAF4FF]" />
        <ResultCard
          content={results}
          icon={IconSparkles}
          iconBg="bg-[#DFF3E4]"
        />
      </div>
    </div>
  );
};

export default CaseIntroSection;
