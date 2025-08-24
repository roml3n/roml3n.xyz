import { type SchemaTypeDefinition } from "sanity";
import { blogType } from "./blogType";
import { caseStudyType } from "./caseStudyType";
import { videoType } from "./videoType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blogType, caseStudyType, videoType],
};
