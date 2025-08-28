import { type SchemaTypeDefinition } from "sanity";
import { blogType } from "./blogType";
import { videoType } from "./videoType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blogType, videoType],
};
