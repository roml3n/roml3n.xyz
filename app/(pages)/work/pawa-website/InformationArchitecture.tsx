"use client";

import { useState, type KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconChevronRight } from "@tabler/icons-react";

type Side = "before" | "after";

type IANode = {
  label: string;
  flag?: string;
  defaultOpen?: boolean;
  children?: IANode[];
};

const BEFORE_TREE: IANode[] = [
  { label: "Home" },
  {
    label: "Our Cloud Offerings",
    flag: "Vague label",
    defaultOpen: true,
    children: [
      { label: "Google Workspace" },
      { label: "Google Cloud Platform" },
      { label: "Switch to Chromebooks for Education", flag: "Buried" },
      { label: "Private Cloud Solutions" },
    ],
  },
  {
    label: "Our Cloud Solution Pillars",
    flag: "Jargon",
    defaultOpen: false,
    children: [
      { label: "Infrastructure" },
      { label: "Data & Analytics" },
      { label: "AI & Machine Learning" },
      { label: "Security" },
      { label: "Productivity & Collaboration" },
      { label: "Modern Workplace" },
    ],
  },
  {
    label: "Our Initiatives",
    flag: "Campaign copy",
    defaultOpen: true,
    children: [
      { label: "Message to new customers" },
      { label: "Get Google Workspace Today!" },
      { label: "Create Gmail for Business For Your Company" },
      { label: "Go Beyond The Purchase of Google Workspace" },
      { label: "Manage and Scale Your Apps with Kubernetes", flag: "Misfiled" },
    ],
  },
  { label: "Blogs" },
];

const AFTER_TREE: IANode[] = [
  { label: "About" },
  {
    label: "Solutions",
    flag: "CMS-managed",
    defaultOpen: false,
    children: [
      { label: "Productivity & Collaboration" },
      { label: "Enterprise Device Management" },
      { label: "Artificial Intelligence" },
      { label: "Data Analytics" },
      { label: "Cloud Security" },
      { label: "Cloud Storage" },
      { label: "Backup & Disaster Recovery" },
      { label: "Infrastructure Modernization" },
      { label: "Cloud Solutions Consulting" },
      { label: "Enterprise Support" },
    ],
  },
  {
    label: "Products",
    flag: "Discoverable",
    defaultOpen: true,
    children: [
      { label: "Google Workspace" },
      { label: "Google Workspace for Education" },
      { label: "Google Cloud" },
      { label: "AppSheet" },
      { label: "Acer Chromebooks" },
      { label: "Android Enterprise" },
      { label: "ChromeOS" },
      { label: "SAP on Google Cloud" },
    ],
  },
  {
    label: "Resources",
    flag: "CMS-managed",
    defaultOpen: false,
    children: [
      { label: "Blog" },
      { label: "Customer Stories" },
      { label: "Newsroom" },
      { label: "Events" },
      { label: "Videos" },
      { label: "Partners" },
    ],
  },
  { label: "Support Portal" },
  { label: "Careers" },
];

const flagStyles: Record<Side, string> = {
  before: "border-red-300 text-red-500 bg-red-50/60",
  after: "border-mainblue/30 text-mainblue bg-mainblue/5",
};

const FlagPill = ({ label, side }: { label: string; side: Side }) => (
  <span
    className={`inline-flex flex-shrink-0 items-center whitespace-nowrap rounded-full border px-2 py-0.5 text-[11px] font-medium leading-none ${flagStyles[side]}`}
  >
    {label}
  </span>
);

const IARow = ({
  node,
  depth,
  side,
  index,
}: {
  node: IANode;
  depth: number;
  side: Side;
  index?: number;
}) => {
  const isFolder = Array.isArray(node.children);
  const [isOpen, setIsOpen] = useState(!!node.defaultOpen);

  const toggle = () => {
    if (isFolder) setIsOpen((o) => !o);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!isFolder) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  };

  return (
    <motion.li
      initial={typeof index === "number" ? { opacity: 0, y: -4 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15, delay: (index ?? 0) * 0.012 }}
      className="list-none"
    >
      <div
        role={isFolder ? "button" : undefined}
        tabIndex={isFolder ? 0 : undefined}
        aria-expanded={isFolder ? isOpen : undefined}
        onClick={toggle}
        onKeyDown={handleKeyDown}
        style={{ paddingLeft: `${depth * 1.1 + 0.5}rem` }}
        className={`group flex min-w-0 items-center gap-2 rounded-lg pr-2 py-1.5 ${
          isFolder
            ? "cursor-pointer hover:bg-hoverbg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mainblue/40"
            : ""
        }`}
      >
        {isFolder ? (
          <motion.span
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-shrink-0 items-center justify-center text-darkgrey/50"
          >
            <IconChevronRight size={14} />
          </motion.span>
        ) : (
          <span className="w-[14px] flex-shrink-0" />
        )}

        <span className="h6 min-w-0 flex-1 truncate !text-fullgrey">
          {node.label}
        </span>

        {node.flag && <FlagPill label={node.flag} side={side} />}

        {isFolder && !isOpen && (node.children?.length ?? 0) > 0 && (
          <span className="h6 flex-shrink-0 tabular-nums opacity-40">
            ({node.children!.length})
          </span>
        )}
      </div>

      {isFolder && (
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col overflow-hidden"
            >
              {node.children!.map((child, i) => (
                <IARow
                  key={child.label}
                  node={child}
                  depth={depth + 1}
                  side={side}
                  index={i}
                />
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      )}
    </motion.li>
  );
};

const IATree = ({ nodes, side }: { nodes: IANode[]; side: Side }) => (
  <ul className="flex flex-col">
    {nodes.map((node) => (
      <IARow key={node.label} node={node} depth={0} side={side} />
    ))}
  </ul>
);

const IAPanel = ({
  title,
  tag,
  side,
  nodes,
}: {
  title: string;
  tag: string;
  side: Side;
  nodes: IANode[];
}) => (
  <div className="flex flex-col gap-1 rounded-2xl border border-midgrey bg-fullwhite p-4 md:p-5">
    <div className="mb-2 flex items-center justify-between gap-2 border-b border-midgrey pb-3">
      <h4 className="h4">{title}</h4>
      <span
        className={`h6 whitespace-nowrap rounded-full border px-2.5 py-1 leading-none ${
          side === "after"
            ? "border-mainblue/30 bg-mainblue/5 text-mainblue"
            : "border-midgrey text-darkgrey opacity-70"
        }`}
      >
        {tag}
      </span>
    </div>
    <IATree nodes={nodes} side={side} />
  </div>
);

const InformationArchitecture = () => {
  return (
    <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
      <IAPanel
        title="Before"
        tag="4 sections · marketing-led"
        side="before"
        nodes={BEFORE_TREE}
      />
      <IAPanel
        title="After"
        tag="6 sections · intent-led"
        side="after"
        nodes={AFTER_TREE}
      />
    </div>
  );
};

export default InformationArchitecture;
