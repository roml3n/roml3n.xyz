"use client";

import {
  PortableText as PortableTextComponent,
  PortableTextReactComponents,
  PortableTextComponentProps,
  PortableTextTypeComponentProps,
  PortableTextMarkComponentProps,
} from "@portabletext/react";
import {
  PortableTextBlock,
  PortableTextMarkDefinition,
  TypedObject,
} from "@portabletext/types";
import { urlFor } from "@/lib/sanity";
import React from "react";
import Image from "next/image";
import BlockQuote from "@/app/(pages)/writing/BlockQuote";
import ButtonLink from "@/app/components/ButtonLink";

interface SanityAssetRef {
  _ref: string;
  _type: "reference";
}

interface SanityImageBlock {
  _key: string;
  _type: "image";
  asset: SanityAssetRef;
  caption?: string;
  alt?: string;
}

interface SanityCodeBlock {
  _key: string;
  _type: "code";
  code: string;
  language?: string;
  filename?: string;
}

interface SanityLinkMark {
  _type: "link";
  href: string;
}

interface SanityVideoBlock {
  _key: string;
  _type: "video";
  file: { asset: SanityAssetRef };
  alt?: string;
  poster?: SanityImageBlock;
}

interface PortableTextProps {
  value: PortableTextBlock[];
  className?: string;
}

const components: PortableTextReactComponents = {
  types: {
    image: ({ value }: PortableTextTypeComponentProps<SanityImageBlock>) => {
      const imageUrl = urlFor(value).url();
      if (!imageUrl) return null;
      return (
        <div className="my-8">
          <Image
            src={imageUrl}
            alt={value.alt || "Image"}
            width={1000}
            height={1000}
            className="w-full h-auto rounded-lg shadow-lg"
          />
          {value.caption && (
            <p className="text-sm text-gray-600 mt-2 text-center italic">
              {value.caption}
            </p>
          )}
        </div>
      );
    },
    code: ({ value }: PortableTextTypeComponentProps<SanityCodeBlock>) => {
      return (
        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto my-4">
          <code>{value.code}</code>
        </pre>
      );
    },
    video: ({ value }: PortableTextTypeComponentProps<SanityVideoBlock>) => {
      const videoUrl = urlFor(value.file).url();
      if (!videoUrl) return null;
      return (
        <div className="my-8">
          <video
            controls
            className="w-full h-auto rounded-lg shadow-lg"
            poster={value.poster ? urlFor(value.poster).url() : undefined}
          >
            <source
              src={videoUrl}
              type={
                value.file.asset._ref.endsWith("webm")
                  ? "video/webm"
                  : value.file.asset._ref.endsWith("webp")
                    ? "video/webp"
                    : "video/mp4"
              }
            />
            Your browser does not support the video tag.
          </video>
          {value.alt && (
            <p className="text-sm text-gray-600 mt-2 text-center italic">
              {value.alt}
            </p>
          )}
        </div>
      );
    },
  },
  marks: {
    // Handle inline links
    link: ({
      children,
      value,
    }: PortableTextMarkComponentProps<SanityLinkMark>) => {
      return <ButtonLink URL={value?.href ?? ""} Label={String(children)} />;
    },
    strong: ({
      children,
    }: PortableTextMarkComponentProps<PortableTextMarkDefinition>) => (
      <strong className="font-bold">{children}</strong>
    ),
    em: ({
      children,
    }: PortableTextMarkComponentProps<PortableTextMarkDefinition>) => (
      <em className="italic">{children}</em>
    ),
  },
  block: {
    h1: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <h1 className="h1 my-4">{children}</h1>
    ),
    h2: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <h2 className="h2 my-4">{children}</h2>
    ),
    h3: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <h3 className="h3 my-3">{children}</h3>
    ),
    h4: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <h4 className="h3 mb-4 mt-8">{children}</h4>
    ),
    blockquote: ({
      children,
    }: PortableTextComponentProps<PortableTextBlock>) => (
      <div className="my-12">
        <BlockQuote
          quote={children as React.ReactNode}
          className="opacity-50"
        />
      </div>
    ),
    normal: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <p className="h4">{children}</p>
    ),
    unknownBlockStyle: ({
      children,
      value,
    }: PortableTextComponentProps<PortableTextBlock>) => {
      console.warn("Unknown block style encountered:", value.style);
      return <p>{children}</p>;
    },
  },
  list: {
    bullet: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <ul className="h4 list-disc list-inside my-4 space-y-1 text-fullgrey">
        {children}
      </ul>
    ),
    number: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <ol className="h4 list-decimal list-inside my-4 space-y-1 text-fullgrey">
        {children}
      </ol>
    ),
  },
  listItem: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
    <li className="ml-4">{children}</li>
  ),
  hardBreak: () => <br />,
  // Required unknown handlers
  unknownType: ({ value }: PortableTextTypeComponentProps<TypedObject>) => {
    console.warn("Unknown type encountered:", value);
    return <div>Unknown content type</div>;
  },
  unknownMark: ({
    children,
    value,
  }: PortableTextMarkComponentProps<PortableTextMarkDefinition>) => {
    console.warn("Unknown mark encountered:", value);
    return <span>{children}</span>;
  },
  unknownBlockStyle: ({
    children,
    value,
  }: PortableTextComponentProps<PortableTextBlock>) => {
    console.warn("Unknown block style encountered:", value?.style);
    return <p>{children}</p>;
  },
  unknownList: ({
    children,
  }: PortableTextComponentProps<PortableTextBlock>) => {
    console.warn("Unknown list type encountered");
    return <ul>{children}</ul>;
  },
  unknownListItem: ({
    children,
  }: PortableTextComponentProps<PortableTextBlock>) => {
    console.warn("Unknown list item encountered");
    return <li>{children}</li>;
  },
};

export default function PortableText({ value, className }: PortableTextProps) {
  return (
    <div className={`prose max-w-none ${className}`}>
      <PortableTextComponent value={value} components={components} />
    </div>
  );
}
