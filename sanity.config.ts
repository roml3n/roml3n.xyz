    // sanity.config.ts
    import { visionTool } from "@sanity/vision";
    import { defineConfig } from "sanity";
    import { deskTool } from "sanity/desk";
    import { codeInput } from "@sanity/code-input"; // Make sure this is imported

    import { apiVersion, dataset, projectId } from "./sanity/env";
    import { schema } from "./sanity/schemaTypes";

    export default defineConfig({
      basePath: "/studio",
      projectId,
      dataset,
      schema: {
        types: schema.types,
        // Add custom annotations for Portable Text here
        marks: {
          annotations: [
            {
              name: 'buttonLink', // Unique name for the annotation
              title: 'Button Link',
              type: 'object',
              fields: [
                {
                  name: 'href',
                  title: 'URL',
                  type: 'url',
                },
                {
                  name: 'label',
                  title: 'Button Label (optional, defaults to selected text)',
                  type: 'string',
                },
              ],
            },
          ],
        },
      },
      plugins: [
        deskTool(),
        visionTool({ defaultApiVersion: apiVersion }),
        codeInput(),
      ],
    });