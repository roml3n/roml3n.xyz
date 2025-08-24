import { defineType, defineField } from "sanity";

export const videoType = defineType({
  name: "video",
  title: "Video",
  type: "object",
  fields: [
    defineField({
      name: "file",
      title: "Video File",
      type: "file",
      options: {
        accept: "video/mp4,video/webm,video/webp",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "alt",
      title: "Alt Text",
      type: "string",
    }),
    defineField({
      name: "poster",
      title: "Poster Image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
});
